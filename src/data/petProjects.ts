export interface PetProjectImage {
  src: string;
  alt: string;
}

export interface PetProject {
  title: string;
  problem: string;
  solution: string;
  images: PetProjectImage[];
  href?: string;
}

export const petProjects: readonly PetProject[] = [
  {
    title: 'Homelab',
    problem: 'Every service in the internet requires a subscription now. Photos storage, watching anime, password managers... Why not do it for free?',
    solution: 'A Proxmox box running Immich, Jellyfin, Vaultwarden, qBittorrent, and a few too many things.',
    images: [
      { src: '/images/personality/homelab-1.png', alt: 'The Immich photo library UI, self-hosted and showing ~4 TB of personal photos indexed and searchable.' },
      { src: '/images/personality/homelab-2.jpg', alt: 'The Jellyfin home screen with Anime and Movies libraries set up on a local server.' },
      { src: '/images/personality/homelab-3.jpg', alt: 'The Vaultwarden login screen — Bitwarden’s unofficial rewrite, running on a Raspberry Pi-class box.' },
      { src: '/images/personality/homelab-4.jpg', alt: 'A homelab monitor displaying a wall of red systemd service-failed messages — the day the boxes collectively gave up.' },
      { src: '/images/personality/homelab-5.jpg', alt: 'A stock Globe at Home ISP router with a troubleshooting sticker — the edge of the network before the real homelab starts.' },
      { src: '/images/personality/homelab-6.jpg', alt: 'A TP-Link ER605 Omada router being held up for a photo — the upgrade that retired the ISP one.' },
      { src: '/images/personality/homelab-7.jpg', alt: 'The back of a small form factor PC with USB, Ethernet, and power cables plugged in — a new homelab node being wired up.' },
      { src: '/images/personality/homelab-8.jpg', alt: 'Inside a mini PC chassis: two Seagate drives (a 4 TB BarraCuda and a 6 TB Enterprise) seated where an optical drive used to be.' },
    ],
  },
  {
    title: 'Re-Fuel',
    problem: 'I wanted to know whether the gas I bought last week was actually a good deal, and to catch price changes the moment they happened.',
    solution: 'A mobile app that auto-logs every fill-up with GPS and reads the price board with the camera.',
    images: [
      { src: '/images/personality/refuel-1.jpg', alt: 'Re-Fuel app showing detected gas prices for a Phoenix Super LPG station — Premium 98, Premium 95, Super Regular, and Biodiesel.' },
      { src: '/images/personality/refuel-2.jpg', alt: 'Re-Fuel in driving mode, automatically capturing a price board at a Phoenix station via the rear camera.' },
      { src: '/images/personality/refuel-3.jpg', alt: 'A Re-Fuel scan result with detection failed on both stations — honest documentation of the OCR’s bad days.' },
    ],
    href: 'https://refuel.bambaw-tumba.com',
  },
  {
    title: 'NetworkWatcher',
    problem: 'I had no idea if my ISP failover was actually working.',
    solution: 'A self-hosted Grafana dashboard that graphs latency and downtime per ISP in real time.',
    images: [
      { src: '/images/personality/networkwatcher-1.bmp', alt: 'NetworkWatcher Grafana dashboard showing ISP latency and uptime per ISP.' },
    ],
  },
  {
    title: 'Local Llama',
    problem: 'Cloud LLM APIs were getting expensive and laggy for daily use.',
    solution: 'A local llama.cpp + ROCm rig running a 30B model on my GPU, free of charge.',
    images: [
      { src: '/images/personality/locallama-1.jpg', alt: 'A locally-hosted LLM chat showing a real-time token counter (32.8k) and an in-flight API request.' },
      { src: '/images/personality/locallama-2.bmp', alt: 'A local llama.cpp chat session running on a consumer AMD GPU, no cloud involved.' },
    ],
  },
  {
    title: 'GPU VRAM Monitor',
    problem: 'Windows could not tell me which process was eating my VRAM.',
    solution: 'A small WPF tool that shows per-process VRAM usage for AMD GPUs.',
    images: [
      { src: '/images/projects/gpuvrammonitor.png', alt: 'GPU VRAM Monitor — a WPF tool showing per-process VRAM usage for an AMD Radeon RX 7800 XT.' },
    ],
    href: 'https://github.com/JuliusNarvasa/GPUVramMonitor',
  },
];
