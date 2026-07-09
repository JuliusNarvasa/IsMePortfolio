export type InfrastructureStatus = 'online' | 'standby' | 'offline';

export interface InfrastructureNode {
  label: string;
  status?: InfrastructureStatus;
  description?: string;
  children?: InfrastructureNode[];
}

export interface InfrastructureTree {
  id: 'homelab' | 'vps' | 'local' | 'network' | 'cloud';
  title: string;
  node: InfrastructureNode;
}

export const infrastructure: readonly InfrastructureTree[] = [
  {
    id: 'homelab',
    title: 'Homelab',
    node: {
      label: 'Proxmox · on-prem',
      status: 'online',
      children: [
        {
          label: 'VM 100 · apps',
          status: 'online',
          children: [
            { label: 'Immich (Docker)', status: 'online' },
            { label: 'Jellyfin (native)', status: 'online' },
            { label: 'qBittorrent (native)', status: 'online' },
          ],
        },
        {
          label: 'VM 101 · networkwatcher',
          status: 'online',
          description: 'Grafana UI visualizer for the current ISPs.',
        },
        { label: 'VM 102 · OmadaController', status: 'online' },
        {
          label: 'VM 103 · autoswitcher',
          status: 'online',
          description: 'Cronjob that connects to OmadaController to automatically switch based on response time of the ISP.',
        },
      ],
    },
  },
  {
    id: 'vps',
    title: 'VPS (cloud)',
    node: {
      label: 'VPS · cloud (ARM64)',
      status: 'online',
      children: [
        { label: 'Nginx reverse proxy (public-facing)', status: 'online' },
        { label: 'SillyTavern (node)', status: 'online' },
        { label: 'AI Resume Builder (FastAPI)', status: 'online' },
        { label: 'Re-Fuel API (.NET)', status: 'online' },
        { label: 'Ollama — embeddings', status: 'online' },
        { label: 'vaultwarden', status: 'online' },
        { label: 'n8n', status: 'online' },
        { label: 'PostgreSQL', status: 'online' },
        { label: 'Redis', status: 'online' },
        { label: 'WireGuard', status: 'online' },
      ],
    },
  },
  {
    id: 'local',
    title: 'Local workstation',
    node: {
      label: 'Local workstation',
      children: [
        { label: 'llama.cpp + Qwen3-Coder (LLM inference)', status: 'online' },
        { label: 'ComfyUI (image gen)', status: 'online' },
        { label: 'OpenCode (AI assistant)', status: 'online' },
      ],
    },
  },
  {
    id: 'network',
    title: 'Networking',
    node: {
      label: 'Networking',
      children: [
        { label: 'Tailscale (mesh)', status: 'online' },
        { label: 'WireGuard', status: 'online' },
        { label: 'Cloudflare DNS', status: 'online' },
        { label: 'Nginx reverse proxy', status: 'online' },
      ],
    },
  },
  {
    id: 'cloud',
    title: 'Cloud',
    node: {
      label: 'Cloud',
      children: [
        { label: 'Oracle Cloud (ARM64)', status: 'online' },
      ],
    },
  },
];
