// Single source of truth for identity, contact, and recruiter-facing facts.
// Anything that appears in more than one section (title, years, résumé link,
// handles) lives here so the hero, nav, contact, and <head> never disagree.

export const site = {
  name: 'Julius Narvasa',
  role: 'Software Engineer',
  location: 'Philippines',
  timezone: 'UTC+8',
  startYear: 2019,

  // Drop the PDF into public/ and set this to e.g. '/julius-narvasa-resume.pdf'.
  // While empty, résumé buttons are hidden in production and shown as a
  // dashed placeholder in `npm run dev` so the layout can still be reviewed.
  resumeUrl: '',

  url: 'https://me.bambaw-tumba.com',
  email: 'jibnarvasa@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bambaw-tumba/',
  github: 'https://github.com/JuliusNarvasa',
  repo: 'https://github.com/JuliusNarvasa/IsMePortfolio',
} as const;

// Computed at build time so the number never goes stale.
export const yearsExperience = new Date().getFullYear() - site.startYear;

export const description =
  `${site.role} with ${yearsExperience} years shipping APIs, web and mobile apps, cloud infrastructure, ` +
  `and data platforms. Based in the ${site.location} (${site.timezone}).`;
