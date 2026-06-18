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
Remove-Item dist -Recurse -Force; npm run build; tar -czf dist.tar.gz -C dist .; scp -i "D:\Documents\sshkeys\jpreverseprox" "dist.tar.gz" "ubuntu@158.101.135.83:/home/ubuntu/portfolio/dist.tar.gz"; ssh -i "D:\Documents\sshkeys\jpreverseprox" ubuntu@158.101.135.83 "cd /home/ubuntu/portfolio && rm -rf _astro images heroimages index.html favicon.svg og.png .gitkeep && tar -xzf dist.tar.gz && rm dist.tar.gz"
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
5. SSH in and clean up old deployed files (`_astro/`, `images/`, `heroimages/`, `index.html`, `favicon.svg`, `og.png`, `.gitkeep`) — this prevents stale assets from lingering
6. Extract the tarball and remove the archive

## Nginx config

The nginx vhost at `/etc/nginx/sites-available/portfolio.conf` serves:

```
server {
    listen 443 ssl http2;
    server_name me.bambaw-tumba.com;

    root /home/ubuntu/portfolio;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/me.bambaw-tumba.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/me.bambaw-tumba.com/privkey.pem;

    location / {
        try_files $uri $uri/index.html =404;
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /heroimages/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /_astro/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}

server {
    listen 80;
    server_name me.bambaw-tumba.com;
    return 301 https://$host$request_uri;
}
```

Symlinked to `/etc/nginx/sites-enabled/` and nginx reloaded after edits:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

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
