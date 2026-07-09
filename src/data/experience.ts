export interface ExperienceEntry {
  year: string;
  role: string;
  description: string;
  achievements: string[];
}

export const experience: readonly ExperienceEntry[] = [
  {
    year: '2019',
    role: 'Joined Netzon Tech',
    description: 'Backend dev, internal tooling.',
    achievements: [],
  },
  {
    year: '2020',
    role: 'Helped API development',
    description: 'Gonna — social media platform for businesses.',
    achievements: [],
  },
  {
    year: '2021',
    role: 'Helped API development',
    description: 'Angebot — drag-and-drop document builder for sharing and signing documents between businesses.',
    achievements: [],
  },
  {
    year: '2022',
    role: 'Led API development',
    description: 'ChargeHeroes — Airbnb-like rental platform for vacant EV chargers. Acquired by a competitor a year later.',
    achievements: [],
  },
  {
    year: '2023',
    role: 'Led full stack + devops development',
    description: 'Ment v2 — platform for parents with children who have ADHD and mental disabilities.',
    achievements: [],
  },
  {
    year: '2024',
    role: 'Freelance API Development',
    description: 'Platform-based project for a client in Australia.',
    achievements: [],
  },
  {
    year: '2025',
    role: 'Local AI infrastructure',
    description: 'Self-hosted inference + image gen.',
    achievements: [
      'llama.cpp + ROCm on RX 7800 XT',
      'ComfyUI for image generation',
    ],
  },
  {
    year: '2026',
    role: 'AI & computer vision',
    description: 'Started Re-Fuel price-board detection.',
    achievements: [
      'YOLOv8 on-device via ONNX',
      'OCR preprocessing pipelines',
    ],
  },
];
