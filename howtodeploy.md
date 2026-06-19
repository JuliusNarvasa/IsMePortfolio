# Deployment Guide

How to deploy this portfolio site to `me.bambaw-tumba.com`.

## Infrastructure

- **VPS:** `158.101.135.83`
- **Domain:** `me.bambaw-tumba.com` (A record → VPS IP)
- **Web server:** nginx with Let's Encrypt SSL
- **Site root:** `/home/ubuntu/portfolio/`
- **SSH key:** `D:\Documents\sshkeys\jpreverseprox`

## Deploy steps (PowerShell)

Run from the project root:

```powershell
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue
npm run build
tar -czf dist.tar.gz -C dist .
scp -i "D:\Documents\sshkeys\jpreverseprox" dist.tar.gz ubuntu@158.101.135.83:/home/ubuntu/portfolio/dist.tar.gz
ssh -i "D:\Documents\sshkeys\jpreverseprox" ubuntu@158.101.135.83 "cd /home/ubuntu/portfolio && rm -rf _astro images heroimages index.html favicon.svg og.png .gitkeep && tar -xzf dist.tar.gz && rm dist.tar.gz"
Remove-Item dist.tar.gz
```

### One-liner

```powershell
Remove-Item dist -Recurse -Force; npm run build; tar -czf dist.tar.gz -C dist .; scp -i "D:\Documents\sshkeys\jpreverseprox" "dist.tar.gz" "ubuntu@158.101.135.83:/home/ubuntu/portfolio/dist.tar.gz"; ssh -i "D:\Documents\sshkeys\jpreverseprox" ubuntu@158.101.135.83 "cd /home/ubuntu/portfolio && rm -rf _astro images heroimages tracking index.html favicon.svg og.png .gitkeep && tar -xzf dist.tar.gz && rm dist.tar.gz"
```

### After deploy (commit + push)

```powershell
git add -A && git commit -m "Deploy message here" && git push
```

## What the deploy does

1. Delete local `dist/` (prevents SSR artifact contamination from prior builds)
2. `npm run build` — Astro generates static HTML into `dist/`
3. `tar` the dist folder into a single archive (avoids PowerShell glob bug with `scp -r dist\*` that skips `index.html`)
4. SCP the tarball to the VPS
5. SSH in and clean up old deployed files (`_astro/`, `images/`, `heroimages/`, `tracking/`, `index.html`, `favicon.svg`, `og.png`, `.gitkeep`) — this prevents stale assets from lingering. `tracking/` is included so a removed/changed `/tracking` page is wiped cleanly between deploys.
6. Extract the tarball and remove the archive

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

The site records pageviews via a small Node + SQLite service. It is **not** part of the static build — it lives in `server/` and runs as a systemd unit. Full first-time setup is in [`server/README.md`](server/README.md). The two-line version:

```bash
npm --prefix /home/ubuntu/portfolio/server install
sudo cp /home/ubuntu/portfolio/server/systemd/portfolio-tracking.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now portfolio-tracking
```

After that, see "If the tracking service is deployed" above for the per-deploy restart step.

## SSH access

```bash
ssh -i "D:\Documents\sshkeys\jpreverseprox" ubuntu@158.101.135.83
```

To restart nginx on the VPS:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Git repo

- Remote: `git@github.com:JuliusNarvasa/IsMePortfolio.git`
- Global git config: `core.sshCommand` set, `user.name = Julius Narvasa`, `user.email = jibnarvasa@gmail.com`
- GpuVramMonitor SSH key: `D:\Documents\sshkeys\bambaw-github-openssh-private`
