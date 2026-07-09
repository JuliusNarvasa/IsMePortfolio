export type InterestIcon = 'cpu' | 'server' | 'eye' | 'workflow' | 'paddle' | 'wrench';

export interface Interest {
  title: string;
  description: string;
  icon: InterestIcon;
}

export const interests: readonly Interest[] = [
  {
    title: 'Local AI',
    description: 'Running real LLMs on consumer GPUs at home',
    icon: 'cpu',
  },
  {
    title: 'Homelab & Self-Hosting',
    description: 'Proxmox, Docker, and way too many VMs',
    icon: 'server',
  },
  {
    title: 'Computer Vision',
    description: 'YOLO, OCR, and on-device detection pipelines',
    icon: 'eye',
  },
  {
    title: 'Automation',
    description: 'Cron jobs, scripts, and things that fix themselves',
    icon: 'workflow',
  },
  {
    title: 'Pickleball',
    description: 'Regular games, questionable backhand',
    icon: 'paddle',
  },
  {
    title: 'Hardware Experimentation',
    description: 'Pushing consumer parts beyond the spec sheet',
    icon: 'wrench',
  },
] as const;
