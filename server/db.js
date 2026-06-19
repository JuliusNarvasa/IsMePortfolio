// db.js — SQLite schema and helpers for the portfolio tracking service.
// Uses better-sqlite3 (synchronous, WAL mode) for simplicity at this scale.

import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * Open (or create) the SQLite database at `dbPath`, enable WAL mode,
 * and ensure the schema exists. Creates the parent directory if needed.
 */
export function openDb(dbPath) {
  mkdirSync(dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id TEXT PRIMARY KEY,
      first_seen INTEGER NOT NULL,
      last_seen INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT NOT NULL,
      ts INTEGER NOT NULL,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer_host TEXT,
      browser TEXT,
      os TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_visits_ts ON visits(ts);
    CREATE INDEX IF NOT EXISTS idx_visits_visitor_ts ON visits(visitor_id, ts);
  `);

  return db;
}

/**
 * Insert a single pageview and upsert the visitor row in one transaction.
 * Sessions are grouped by a 30-minute inactivity window.
 */
export function recordVisit(db, { visitorId, ts, path, referrerHost, browser, os }) {
  return db.transaction(() => {
    // Find the most recent visit for this visitor
    const prev = db.prepare(
      'SELECT ts, session_id FROM visits WHERE visitor_id = ? ORDER BY ts DESC LIMIT 1'
    ).get(visitorId);

    // Mint a new session if last visit was > 30 min ago (or first visit)
    const thirtyMinMs = 30 * 60 * 1000;
    const sessionId = (prev && (ts - prev.ts) < thirtyMinMs)
      ? prev.session_id
      : randomUUID();

    // Upsert visitor row
    const existing = db.prepare('SELECT id FROM visitors WHERE id = ?').get(visitorId);
    if (existing) {
      db.prepare('UPDATE visitors SET last_seen = ? WHERE id = ?').run(ts, visitorId);
    } else {
      db.prepare('INSERT INTO visitors (id, first_seen, last_seen) VALUES (?, ?, ?)').run(visitorId, ts, ts);
    }

    // Insert visit row
    db.prepare(
      'INSERT INTO visits (visitor_id, ts, session_id, path, referrer_host, browser, os) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(visitorId, ts, sessionId, path, referrerHost, browser, os);

    return sessionId;
  })();
}

/**
 * Return aggregated stats for the last `days` calendar days, ending today (UTC).
 */
export function getStats(db, days) {
  // Window: today (UTC, 00:00) is the last day; the window starts `days-1` days earlier.
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const startMs = end.getTime() - (days - 1) * 24 * 60 * 60 * 1000;

  // Totals (all time)
  const totals = db.prepare(`
    SELECT
      (SELECT COUNT(DISTINCT visitor_id) FROM visits) AS uniques,
      (SELECT COUNT(*)                    FROM visits) AS pageviews,
      (SELECT COUNT(DISTINCT session_id)  FROM visits) AS sessions
  `).get();

  // Today (UTC)
  const todayRow = db.prepare(`
    SELECT
      COUNT(DISTINCT visitor_id) AS today_uniques,
      COUNT(*)                    AS today_pageviews
    FROM visits
    WHERE date(ts / 1000, 'unixepoch') = date('now')
  `).get();

  // Daily breakdown for the window (zero-filled below)
  const dailyRows = db.prepare(`
    SELECT
      date(ts / 1000, 'unixepoch') AS date,
      COUNT(DISTINCT visitor_id)    AS uniques,
      COUNT(*)                      AS pageviews
    FROM visits
    WHERE ts >= ?
    GROUP BY date(ts / 1000, 'unixepoch')
    ORDER BY date ASC
  `).all(startMs);

  const dailyMap = new Map();
  for (const row of dailyRows) {
    dailyMap.set(row.date, { date: row.date, uniques: row.uniques, pageviews: row.pageviews });
  }

  // Zero-fill every calendar day in the range, today inclusive
  const daily = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startMs + i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    daily.push(dailyMap.get(key) || { date: key, uniques: 0, pageviews: 0 });
  }

  // Top referrers (top 10, exclude null/empty)
  const topReferrers = db.prepare(`
    SELECT referrer_host AS host, COUNT(*) AS visits
    FROM visits
    WHERE referrer_host IS NOT NULL AND referrer_host != ''
    GROUP BY referrer_host
    ORDER BY visits DESC
    LIMIT 10
  `).all();

  // Recent 20 visits
  const recent = db.prepare(`
    SELECT ts, path, referrer_host AS host, browser, os
    FROM visits
    ORDER BY ts DESC
    LIMIT 20
  `).all().map((r) => ({
    ts: new Date(r.ts).toISOString(),
    path: r.path,
    host: r.host,
    browser: r.browser,
    os: r.os,
  }));

  return {
    totals: {
      uniques: totals.uniques,
      pageviews: totals.pageviews,
      sessions: totals.sessions,
      today_uniques: todayRow.today_uniques,
      today_pageviews: todayRow.today_pageviews,
    },
    daily,
    topReferrers,
    recent,
  };
}

/**
 * Parse a User-Agent string into a { browser, os } pair.
 * Simple regex-based — no library needed for this surface area.
 * Order matters: SamsungBrowser must be checked before Chrome
 * (modern Samsung Internet UAs contain both substrings).
 */
export function parseUA(ua) {
  if (!ua) return { browser: 'Other', os: 'Other' };

  let browser = 'Other';
  if (/Edg\//.test(ua)) browser = 'Edge';
  else if (/OPR\//.test(ua)) browser = 'Opera';
  else if (/SamsungBrowser\//.test(ua)) browser = 'Samsung';
  else if (/Chrome\//.test(ua)) browser = 'Chrome';
  else if (/Firefox\//.test(ua)) browser = 'Firefox';
  else if (/Version\//.test(ua) && /Safari\//.test(ua)) browser = 'Safari';

  let os = 'Other';
  if (/iPad/.test(ua)) os = 'iPadOS';
  else if (/iPhone|iPod/.test(ua)) os = 'iOS';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Windows NT/.test(ua)) os = 'Windows';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Linux/.test(ua)) os = 'Linux';

  return { browser, os };
}
