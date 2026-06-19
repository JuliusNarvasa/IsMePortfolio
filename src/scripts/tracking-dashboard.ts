// Private analytics dashboard — fetches /api/stats and renders KPIs,
// a hand-rolled SVG bar chart, referrer list, and recent-visits feed.

interface StatsTotals {
  uniques: number;
  pageviews: number;
  sessions: number;
  today_uniques: number;
}

interface DailyEntry {
  date: string;
  uniques: number;
  pageviews: number;
}

interface ReferrerEntry {
  host: string;
  visits: number;
}

interface RecentEntry {
  ts: string;
  path: string;
  browser: string;
  os: string;
  host: string | null;
}

interface Stats {
  totals: StatsTotals;
  daily: DailyEntry[];
  topReferrers: ReferrerEntry[];
  recent: RecentEntry[];
}

const fmt = new Intl.NumberFormat('en-US');

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  return iso.slice(0, 10);
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildChart(daily: DailyEntry[]): string {
  const W = 600;
  const H = 180;
  const padTop = 8;
  const padBottom = 24;
  const padSide = 8;
  const usableW = W - padSide * 2;
  const usableH = H - padTop - padBottom;
  const barCount = daily.length;

  const max = Math.max(...daily.map((d) => d.uniques), 0);
  if (max === 0) {
    return `<text x="${W / 2}" y="${H / 2}" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13">No visits in the last ${barCount} days.</text>`;
  }

  const slotW = usableW / barCount;
  const barW = slotW * 0.7;
  const gap = (slotW - barW) / 2;

  let svg = '';

  // Baseline
  svg += `<line x1="${padSide}" y1="${H - padBottom}" x2="${W - padSide}" y2="${H - padBottom}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;

  // Bars
  daily.forEach((entry, i) => {
    const x = padSide + i * slotW + gap;
    const barH = (entry.uniques / max) * usableH;
    const y = H - padBottom - barH;
    svg += `<rect x="${x}" y="${y}" width="${barW}" height="${Math.max(barH, 0)}" rx="2" fill="#14B8A6" fill-opacity="0.85"><title>Day ${escHtml(entry.date)}: ${entry.uniques} uniques</title></rect>`;
  });

  // X-axis labels: every 7 days, plus the rightmost bar
  const labelEvery = 7;
  const last = daily.length - 1;
  for (let i = 0; i < daily.length; i += labelEvery) {
    const x = padSide + i * slotW + slotW / 2;
    const label = daily[i].date.slice(5); // MM-DD
    svg += `<text x="${x}" y="${H - 4}" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10">${escHtml(label)}</text>`;
  }
  // Always label the last bar so the rightmost edge isn't unlabeled
  if (last > 0 && last % labelEvery !== 0) {
    const x = padSide + last * slotW + slotW / 2;
    const label = daily[last].date.slice(5);
    svg += `<text x="${x}" y="${H - 4}" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10">${escHtml(label)}</text>`;
  }

  return svg;
}

function showOffline(msg = 'Tracker offline — is the service running?') {
  document.getElementById('kpi-uniques')!.textContent = '!';
  document.getElementById('kpi-pageviews')!.textContent = '!';
  document.getElementById('kpi-sessions')!.textContent = '!';
  document.getElementById('chart-today')!.textContent = '— today';
  const html = `<span class="text-warning">${escHtml(msg)}</span>`;
  document.getElementById('chart-container')!.innerHTML = html;
  document.getElementById('referrers')!.innerHTML = `<li class="text-text-dim py-2">${html}</li>`;
  document.getElementById('recent')!.innerHTML = `<li class="text-text-dim py-2">${html}</li>`;
}

function populate(stats: Stats) {
  document.getElementById('kpi-uniques')!.textContent = fmt.format(stats.totals.uniques);
  document.getElementById('kpi-pageviews')!.textContent = fmt.format(stats.totals.pageviews);
  document.getElementById('kpi-sessions')!.textContent = fmt.format(stats.totals.sessions);
  document.getElementById('chart-today')!.textContent = `${fmt.format(stats.totals.today_uniques)} today`;

  document.getElementById('chart-container')!.innerHTML =
    `<svg viewBox="0 0 600 180" preserveAspectRatio="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${buildChart(stats.daily)}</svg>`;

  const refEl = document.getElementById('referrers')!;
  if (!stats.topReferrers || stats.topReferrers.length === 0) {
    refEl.innerHTML = '<li class="text-text-dim py-2">No external referrers yet.</li>';
  } else {
    refEl.innerHTML = stats.topReferrers
      .slice(0, 10)
      .map(
        (r) =>
          `<li class="flex items-baseline justify-between gap-3 border-b border-border py-2 last:border-b-0"><span class="text-text-muted truncate">${escHtml(r.host)}</span><span class="text-accent font-mono text-body-sm">${fmt.format(r.visits)}</span></li>`,
      )
      .join('');
  }

  const recEl = document.getElementById('recent')!;
  if (!stats.recent || stats.recent.length === 0) {
    recEl.innerHTML = '<li class="text-text-dim py-2">No visits recorded yet.</li>';
  } else {
    recEl.innerHTML = stats.recent
      .slice(0, 20)
      .map(
        (v) =>
          `<li class="border-b border-border py-2 last:border-b-0"><div class="flex items-baseline justify-between gap-3"><span class="text-text font-mono text-body-sm">${escHtml(relativeTime(v.ts))}</span><span class="text-text-dim text-body-sm">${escHtml(v.browser)}/${escHtml(v.os)}</span></div><div class="flex items-baseline justify-between gap-3 mt-1"><span class="text-text-muted truncate">${escHtml(v.path)}</span><span class="text-text-dim text-body-sm truncate">${escHtml(v.host || 'direct')}</span></div></li>`,
      )
      .join('');
  }
}

async function loadStats() {
  // If the dashboard URL has ?key=..., forward it to /api/stats so a
  // server-side TRACKING_KEY gate accepts the request.
  const key = new URLSearchParams(location.search).get('key');
  const url = key ? `/api/stats?days=30&key=${encodeURIComponent(key)}` : '/api/stats?days=30';
  try {
    const res = await fetch(url, { headers: key ? { 'X-Tracking-Key': key } : {} });
    if (res.status === 401 || res.status === 403) {
      showOffline('Wrong or missing key. Add ?key=… to the URL.');
      return;
    }
    if (!res.ok) {
      showOffline();
      return;
    }
    const stats: Stats = await res.json();
    populate(stats);
  } catch {
    showOffline();
  }
}

const boot = () => {
  loadStats();

  const btn = document.getElementById('tracking-refresh');
  if (btn) {
    btn.addEventListener('click', loadStats);
    btn.removeAttribute('hidden');
  }
};

if (document.readyState === 'complete') boot();
else window.addEventListener('load', boot, { once: true });
