# me.bambaw-tumba.com

Personal developer portfolio for Julius Narvasa. Single-page static site built with Astro.

**Live:** [me.bambaw-tumba.com](https://me.bambaw-tumba.com)

## Stack

| Layer | Tech |
|-------|------|
| Framework | Astro 5 |
| UI | React 18 |
| Styling | TailwindCSS 3.4 |
| Fonts | Inter + JetBrains Mono (fontsource) |
| Language | TypeScript |

## Sections

- Hero with animated image slideshow
- Featured Projects (Re-Fuel, AI Resume Builder, GpuVramMonitor)
- Infrastructure (Proxmox homelab, VPS, networking)
- AI Lab (llama.cpp, ComfyUI, local inference)
- Experience timeline (2019-2026)
- Currently Building
- Contact

## Development

```bash
npm install
npm run dev       # http://localhost:4321
```

## Build

```bash
npm run build     # static output to dist/
npm run preview   # preview the build locally
```

## Deploy

SCP file-by-file to VPS:

```powershell
# Build
Remove-Item dist -Recurse -Force
npm run build

# Package and upload
tar -czf dist.tar.gz -C dist .
scp -i "path/to/sshkey" dist.tar.gz ubuntu@158.101.135.83:/home/ubuntu/portfolio/dist.tar.gz
ssh -i "path/to/sshkey" ubuntu@158.101.135.83 "cd /home/ubuntu/portfolio && rm -rf _astro images index.html favicon.svg og.png .gitkeep && tar -xzf dist.tar.gz && rm dist.tar.gz"
```

## Design

Dark mode default. Teal accent (`#14B8A6`). Glassmorphism panels. Scroll-reveal animations via IntersectionObserver. Reduced-motion support. Skip-to-content link.
