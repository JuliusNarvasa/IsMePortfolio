export const profile = {
  name: 'Julius Narvasa',
  role: 'Software Developer',
  lead: 'I build backend systems, self-hosted AI infrastructure, and developer tooling. Currently exploring local LLMs and computer vision pipelines on AMD hardware.',
  email: 'jibnarvasa@gmail.com',
  socials: {
    github: 'https://github.com/JuliusNarvasa',
    linkedin: 'https://www.linkedin.com/in/bambaw-tumba/',
  },
  // Hero eyebrow + interests line
  heroEyebrow: '~/developer/julius',
  interestsLine: ['backend', 'apis', 'cloud infra', 'local ai', 'self-hosted systems'],
} as const;

export type Profile = typeof profile;
