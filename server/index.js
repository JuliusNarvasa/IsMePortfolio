// Portfolio Tracking Service
// Receives pageview hits from the static Astro site via POST /api/track,
// stores them in SQLite, and exposes basic stats via GET /api/stats.

import express from 'express';
import { createHash } from 'node:crypto';
import { openDb, recordVisit, getStats, parseUA } from './db.js';

// --- Config ---
const PORT = process.env.PORT || 4322;
const DB_PATH = process.env.DB_PATH || './data/portfolio.db';
const TRACKING_KEY = process.env.TRACKING_KEY || '';

// --- Database ---
const db = openDb(DB_PATH);

// --- Express ---
const app = express();

// Trust only the local proxy (nginx on 127.0.0.1). Setting `trust proxy` to a
// number lets clients spoof X-Forwarded-For; we trust the loopback only and
// read the rightmost XFF entry, falling back to the socket address.
app.set('trust proxy', 'loopback');
app.use(express.json({ limit: '4kb' }));

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

/**
 * Derive the real client IP. With `trust proxy: loopback` the leftmost entry
 * of X-Forwarded-For is the original client, but to avoid a client-controlled
 * header we read the rightmost entry (set by nginx) and fall back to the
 * socket address. This still works for IPv6 clients.
 */
function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    return parts[parts.length - 1] || req.socket.remoteAddress || '';
  }
  return req.socket.remoteAddress || '';
}

// --- Routes ---

// POST /api/track — record a pageview
app.post('/api/track', (req, res) => {
  const { path: rawPath, referrer } = req.body;

  // Validate path
  if (!rawPath || typeof rawPath !== 'string' || !rawPath.startsWith('/')) {
    return res.status(400).json({ error: 'path must be a string starting with /' });
  }
  const path = rawPath.slice(0, 200);

  // Derive referrer host
  let referrerHost = null;
  if (referrer && typeof referrer === 'string' && referrer.trim()) {
    try {
      referrerHost = new URL(referrer).host;
    } catch {
      referrerHost = null;
    }
  }
  if (referrerHost) referrerHost = referrerHost.slice(0, 200);

  // Visitor fingerprint: sha256(ip | ua | accept-language)
  const ip = clientIp(req);
  const ua = req.get('user-agent') || '';
  const lang = req.get('accept-language') || '';
  const visitorId = createHash('sha256').update(`${ip}|${ua}|${lang}`).digest('hex');

  const { browser, os } = parseUA(ua);
  const ts = Date.now();

  recordVisit(db, { visitorId, ts, path, referrerHost, browser, os });

  res.status(204).end();
});

// Middleware: gate /api/stats when TRACKING_KEY is set.
function requireKey(req, res, next) {
  if (!TRACKING_KEY) return next();
  const supplied = (req.query.key ?? req.get('x-tracking-key')) || '';
  if (supplied === TRACKING_KEY) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// GET /api/stats — aggregated analytics
app.get('/api/stats', requireKey, (req, res) => {
  let days = parseInt(req.query.days, 10);
  if (Number.isNaN(days) || days < 1) days = 1;
  if (days > 365) days = 365;

  const stats = getStats(db, days);
  res.set('Cache-Control', 'no-store');
  res.json(stats);
});

// GET /api/health — liveness probe
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// 404 for unknown /api/* paths
app.all('/api/*', (_req, res) => {
  res.status(404).json({ error: 'not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal' });
});

// --- Start ---
app.listen(PORT, () => {
  const auth = TRACKING_KEY ? 'auth=key' : 'auth=off';
  console.log(`Tracking service listening on port ${PORT}, db=${DB_PATH}, ${auth}`);
});
