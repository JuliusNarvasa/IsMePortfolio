export interface ProjectScreenshot {
  src: string;
  alt: string;
  type?: 'web' | 'mobile';
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  demoLabel?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  problem: string;
  challenges: string[];
  tech: string[];
  links: ProjectLinks;
  screenshot: ProjectScreenshot;
}

export const projects: readonly Project[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio',
    category: 'web',
    problem: 'Needed a personal site that feels like a developer dashboard, not a corporate landing page.',
    challenges: [
      'Astro static site with React components',
      'Glassmorphism design system with scroll-reveal',
      'Hero image slideshow with CSS-only crossfade',
    ],
    tech: ['astro', 'react', 'typescript', 'tailwindcss'],
    links: {
      github: 'https://github.com/JuliusNarvasa/IsMePortfolio',
      demo: 'https://me.bambaw-tumba.com',
      demoLabel: 'demo (omg recursion)',
    },
    screenshot: {
      src: '/og.png',
      alt: 'Julius Narvasa portfolio site showing developer dashboard aesthetic',
      type: 'web',
    },
  },
  {
    slug: 'refuel',
    title: 'Re-Fuel',
    category: 'mobile',
    problem: 'Drivers manually log gas prices and fuel consumption across the Philippines — no easy way to see trends or remember which station was cheapest last week.',
    challenges: [
      'GPS-based auto-capture within 150m',
      'On-device YOLOv8 price-board detection (ONNX)',
      'Offline-first IndexedDB cache',
    ],
    tech: ['react', 'capacitor', 'typescript', 'yolov8', 'onnx', 'csharp', 'dotnet-8', 'postgres'],
    links: {
      demo: 'https://refuel.bambaw-tumba.com',
    },
    screenshot: {
      src: '/images/projects/refuel-home.png',
      alt: 'Re-Fuel mobile app home screen showing gas station price tracking',
      type: 'mobile',
    },
  },
  {
    slug: 'airesumebuilder',
    title: 'AI Resume Builder',
    category: 'web',
    problem: 'Tailoring a resume to every job posting is tedious and error-prone. Generic resumes get filtered out.',
    challenges: [
      'PDF + DOCX resume parsing',
      'Playwright-based LinkedIn scraping',
      'Structured LLM output for tailored CV + cover letter',
    ],
    tech: ['fastapi', 'python', 'react', 'vite', 'tailwindcss', 'playwright', 'openai-api', 'pymupdf'],
    links: {
      demo: 'https://cvmaker.bambaw-tumba.com',
    },
    screenshot: {
      src: '/images/projects/airesumebuilder-home.png',
      alt: 'AI Resume Builder upload step showing file drag-and-drop interface',
      type: 'web',
    },
  },
  {
    slug: 'gpuvrammonitor',
    title: 'GpuVramMonitor',
    category: 'desktop',
    problem: 'Windows has no per-process VRAM tool for AMD GPUs. Task Manager shows only the total; AMD Adrenalin shows only the total.',
    challenges: [
      'Parsing GPU Process Memory performance counter instance names',
      'Resolving PIDs and excluding the inflated dwm.exe reading',
      'Real-time refresh with pause/resume',
    ],
    tech: ['csharp', 'wpf', 'dotnet-8', 'windows', 'performance-counters'],
    links: {
      github: 'https://github.com/JuliusNarvasa/GPUVramMonitor',
    },
    screenshot: {
      src: '/images/projects/gpuvrammonitor.png',
      alt: 'GpuVramMonitor showing per-process VRAM usage on AMD Radeon RX 7800 XT',
      type: 'web',
    },
  },
];
