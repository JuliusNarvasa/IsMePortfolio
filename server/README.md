# Portfolio Tracking Service

Lightweight Node.js + SQLite analytics tracker for the portfolio site. Records page views and computes basic stats. No cookies, no fingerprinting — just IP+UA hashing.

## First-time server setup

```bash
# 0. Make sure Node 20+ is installed
node --version

# 1. Install dependencies into server/
cd /home/ubuntu/portfolio
npm --prefix server install

# 2. (Optional, recommended) Restrict the dashboard API to a shared key.
#    Generate something like: openssl rand -hex 24
#    Add to the systemd unit's [Service] section as:
#      Environment=TRACKING_KEY=<your-key>
#    Then visit /tracking/?key=<your-key>. The dashboard reads the key from
#    the URL and includes it in its /api/stats fetch.
#    If TRACKING_KEY is not set, /api/stats is publicly readable.

# 3. Install the systemd unit and start it
sudo cp server/systemd/portfolio-tracking.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-tracking
sudo systemctl status portfolio-tracking

# 4. Add the /api/ block to nginx (see "Nginx config" in howtodeploy.md) and reload
sudo nginx -t && sudo systemctl reload nginx

# 5. Verify
curl https://me.bambaw-tumba.com/api/health
# -> {"ok":true,"ts":...}
```

The `server/data/` directory is created automatically on first start (the service calls `mkdirSync(..., { recursive: true })` before opening SQLite). If you want to lock it down further: `chmod 700 /home/ubuntu/portfolio/server/data`.

Then visit `https://me.bambaw-tumba.com/tracking/` to see the dashboard (or `https://me.bambaw-tumba.com/tracking/?key=<your-key>` if you set `TRACKING_KEY`).

## Tail logs

```bash
journalctl -u portfolio-tracking -f
# and/or
tail -f /var/log/portfolio-tracking.log
```

## Data

The SQLite database lives at `server/data/portfolio.db`. Back it up however you like — it's the only stateful thing in this service.

## How visits are counted

- Each page load sends a `POST /api/track` from the static site.
- A "unique visitor" is `sha256(ip | user-agent | accept-language)`. Raw IP is never stored.
- A "session" is a chain of visits where consecutive ones are within 30 minutes of each other; a gap of 30+ minutes starts a new session.
- `/tracking` paths are skipped client-side, so viewing your own dashboard doesn't inflate the count.
- `path` is the URL pathname only — query strings are intentionally dropped to avoid leaking tokens or emails from `?token=...` / `?email=...` links.
