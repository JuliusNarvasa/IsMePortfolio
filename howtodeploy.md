# Deployment Guide

How to deploy this portfolio site to `me.bambaw-tumba.com`.

**The deploy target is the same machine Hermes runs on** — this box (`reverseproxy`, public IP `158.101.135.83`). There is no scp/ssh round-trip anymore: build locally, sync locally, done.

## Infrastructure

- **VPS (this machine):** `158.101.135.83` — host `reverseproxy`, user `ubuntu` (the Hermes box)
- **Domain:** `me.bambaw-tumba.com` (A record → VPS IP)
- **Web server:** nginx with Let's Encrypt SSL (vhost: `/etc/nginx/sites-available/me.bambaw-tumba.com` → symlinked into `sites-enabled/`)
- **Site root:** `/home/ubuntu/portfolio/`
- **Repo clone (local):** `/mnt/sdb/hermes/workspace/IsMePortfolio`
- **Node:** system node is v18.19.1, but Astro 5.7 requires `>=18.20.8` — **use the nvm node 20** (`/home/ubuntu/.nvm/versions/node/v20.20.2/bin`)

## Deploy steps (from the Hermes box)

Run on this machine:

```bash
cd /mnt/sdb/hermes/workspace/IsMePortfolio

# Astro 5.7 needs Node >=18.20.8; system node is 18.19.1 — use nvm node 20
export PATH=/home/ubuntu/.nvm/versions/node/v20.20.2/bin:$PATH

# First time only (or after package-lock.json changes)
npm ci

# Build — Astro generates static HTML into dist/
npm run build

# Sync to site root. --delete mirrors dist/ exactly (stale assets removed);
# server/ holds the tracking service and is NEVER touched.
rsync -a --delete --exclude server/ dist/ /home/ubuntu/portfolio/

# Record the deploy (source changes, not dist/ — it's gitignored)
git add -A && git commit -m "Deploy message here" && git push
```

No nginx reload needed for static file changes. Verify:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://me.bambaw-tumba.com          # 200
curl -s -o /dev/null -w '%{http_code}\n' https://me.bambaw-tumba.com/tracking/ # 200
```

## Alternative: deploy from a Windows machine (legacy)

Run from the project root in PowerShell. Still works, but you no longer need to
SSH into the VPS — Hermes can do it from the box directly.

```powershell
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue
npm run build
tar -czf dist.tar.gz -C dist .
scp -i "D:\Documents\sshkeys\jpreverseprox" dist.tar.gz ubuntu@158.101.135.83:/home/ubuntu/portfolio/dist.tar.gz
ssh -i "D:\Documents\sshkeys\jpreverseprox" ubuntu@158.101.135.83 "cd /home/ubuntu/portfolio && rm -rf _astro images heroimages tracking index.html favicon.svg og.png .gitkeep && tar -xzf dist.tar.gz && rm dist.tar.gz"
Remove-Item dist.tar.gz
```

## What the deploy does

1. `npm ci` — install locked dependencies (system node 18 is too old for Astro 5.7; nvm node 20 is the supported one)
2. `npm run build` — Astro generates static HTML into `dist/` (2 pages: index + tracking)
3. `rsync -a --delete --exclude server/` — mirrors `dist/` into `/home/ubuntu/portfolio/`:
   - replaces `_astro/`, `images/`, `heroimages/`, `tracking/`, `index.html`, `favicon.svg`, `og.png`
   - removes anything stale, including `.gitkeep` (so a removed/changed `/tracking` page is wiped cleanly between deploys)
   - `server/` (the tracking service) is excluded — it lives outside the static build
4. `git commit && git push` — the repo records what was deployed

## Nginx config

The nginx vhost at `/etc/nginx/sites-available/me.bambaw-tumba.com` (symlinked from `/etc/nginx/sites-enabled/`) serves:

```
limit_req_zone $binary_remote_addr zone=track:10m rate=10r/s;

server {
    listen 80;
    server_name me.bambaw-tumba.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name me.bambaw-tumba.com;

    ssl_certificate /etc/letsencrypt/live/me.bambaw-tumba.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/me.bambaw-tumba.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    root /home/ubuntu/portfolio;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets (fonts, images) aggressively
    location ~* \.(woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|ico|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache JS/CSS for 30 days
    location ~* \.(js|css)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # --- analytics tracking service (reverse-proxy to Node on :4322) ---
    location /api/ {
        limit_req zone=track burst=20 nodelay;

        proxy_pass http://127.0.0.1:4322;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 10s;
        proxy_send_timeout 10s;
    }

    # Serve site (SPA fallback for future routes)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `/api/` block and the `limit_req_zone` directive are also kept in `server/nginx-include.conf` for reference.

Reload nginx after any edit:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Tracking service

The site records pageviews via a small Node + SQLite service. It is **not** part of the static build — it lives in `server/` and runs as a systemd unit (`portfolio-tracking`, active on this box). Full first-time setup is in [`server/README.md`](server/README.md). The two-line version:

```bash
npm --prefix /home/ubuntu/portfolio/server install
sudo cp /home/ubuntu/portfolio/server/systemd/portfolio-tracking.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now portfolio-tracking
```

### If the tracking service is deployed

Because `server/` is excluded from the rsync, **static deploys do not affect it and it does not need a restart.** Restart it only after changing `server/` code (and syncing it to `/home/ubuntu/portfolio/server/`):

```bash
sudo systemctl restart portfolio-tracking
sudo systemctl status portfolio-tracking --no-pager
```

## Access

No SSH needed from Hermes — the site root and nginx are on this box:

```bash
sudo nginx -t && sudo systemctl reload nginx   # after nginx edits
sudo systemctl status portfolio-tracking        # tracking service
```

To reach this machine from the Windows desktop, SSH in as `ubuntu@158.101.135.83` (key: `D:\Documents\sshkeys\jpreverseprox`).

## Git repo

- Remote: `git@github.com:JuliusNarvasa/IsMePortfolio.git` (SSH key on this box: `~/.ssh/id_ed25519`)
- Local clone used for deploys: `/mnt/sdb/hermes/workspace/IsMePortfolio`
- Branches: `master` = deployed line (merged from `funbranch` 2026-08-01); `themes` = React theme migration (not deployed)
- Windows machine git config: `user.name = Julius Narvasa`, `user.email = jibnarvasa@gmail.com`
- GpuVramMonitor SSH key: `D:\Documents\sshkeys\bambaw-github-openssh-private`
