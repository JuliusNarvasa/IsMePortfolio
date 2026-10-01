// Work history, grouped by employer, newest first.
//
// Naming rule: only name products that are public and no longer under client
// confidentiality (Ment, ChargeHeroes). Everything else is described by what
// it is, never by client or codename.
//
// `role` is what I did on that engagement, `outcome` is the one-line result a
// recruiter should walk away with. Never invent metrics, titles, or
// responsibilities; leave a TODO(julius) instead.

export type Engagement = {
  years: string;
  project: string;
  role: string;
  summary: string;
  highlights: string[];
  outcome?: string;
};

export type Employer = {
  company: string;
  kind: string;
  period: string;
  engagements: Engagement[];
};

export const employers: Employer[] = [
  {
    company: 'Netzon Tech',
    kind: 'Full-time',
    period: '2019 — present',
    engagements: [
      {
        years: '2026',
        project: 'Contact-centre data platform',
        role: 'Data Platform Engineer',
        summary: 'An internal, end-to-end data platform on Microsoft Fabric that turns Genesys and Zendesk data into governed KPI reporting.',
        highlights: [
          'Built a wire-level mock of both vendor APIs (22 endpoints, seeded synthetic data, contract tests) and deployed it to an Azure VM with CI',
          'Built the bronze → silver → gold pipelines, then remodeled gold as a star schema so stakeholders could build their own Power BI reports',
          'Declared the repository’s GitHub governance in Terraform, with plan comments on every PR, daily drift checks, and apply-on-merge',
        ],
        outcome: '27 PRs merged in one quarter',
      },
      {
        years: '2024–26',
        project: 'Retail rewards mobile app',
        role: 'Mobile & Full-stack Engineer',
        summary: 'A Cordova shopping-rewards app on iOS and Android.',
        highlights: [
          'Researched a replacement for Firebase Dynamic Links, then completed the migration to AppsFlyer deep links',
          'Reworked login with phone-number sign-in and password reset',
          'Kept the app shippable on new platforms: Android’s 16 KB page-size requirement, the iOS 26 release cycle, and urgent Android plugin fixes',
          'Wrote a one-shot script that rebuilds the iOS and Android projects from scratch',
          'Delivered a partner-page rework and design-matched UI/UX updates through QA',
        ],
      },
      {
        years: '2022–25',
        project: 'Ment',
        role: 'Full-stack & DevOps Lead',
        summary: 'A platform for parents raising children with ADHD and other developmental needs.',
        highlights: [
          'Delivered the v3 rework across DevOps, backend, and the admin frontend',
          'Led a team migrating v4 authentication from BankID to a new identity provider, and deployed v4 web builds across environments',
          'Gave architectural guidance on the AI chatbot subsystem',
          'Owned defect triage and stabilization, and worked through a problematic charting library during the redesign',
          'Worked on the card-picker recommendation algorithm',
        ],
      },
      {
        years: '2024–25',
        project: 'Budget request & tracking system',
        role: 'Software Engineer',
        summary: 'Budget request and tracking tooling for a Fortune 500 technology company.',
        highlights: [
          'Development support and production-readiness checks, then daily production error monitoring',
        ],
      },
      {
        years: '2024',
        project: 'Azure edge infrastructure',
        role: 'Infrastructure',
        summary: 'Azure Front Door setup for a client’s web platform.',
        highlights: [
          'Recreated existing environments as Bicep infrastructure-as-code, learning Bicep on the way',
        ],
      },
      {
        years: '2024',
        project: 'Medical product app',
        role: 'Frontend Developer',
        summary: 'A pharmaceutical client’s app for a nasal-care medical product.',
        highlights: [
          'Frontend development, issue resolution, and release support',
        ],
      },
      {
        years: '2020–23',
        project: 'Loyalty & coupon platform',
        role: 'Backend Developer',
        summary: 'Coupons, reseller sales and claims, eligibility, and notifications for a pet-retail loyalty program.',
        highlights: [
          'Built and documented the .NET backend, PostgreSQL databases, environments, and an optimization migration',
          'Investigated production shutdowns and downtime, and wrote the runbook for when the production API goes down',
          'Brought back in 2023 for performance investigation and optimization, and helped bring production back up during an outage',
          'Produced coupon-claim and bonus-point data exports for the client',
          'Explained the platform’s architecture to the wider team in an internal “project field trip” talk',
        ],
      },
      {
        years: '2023',
        project: 'Enterprise pharmaceutical app',
        role: 'Frontend Developer',
        summary: 'An application for a global pharmaceutical company.',
        highlights: [
          'Built frontend features and adapted desktop-oriented designs for tablet use',
          'Resolved production bugs',
        ],
      },
      {
        years: '2023',
        project: 'Event ticketing platform',
        role: 'Backend Developer',
        summary: 'Ticket reservations for live events.',
        highlights: [
          'Fixed overselling by moving reservation logic from PHP into SQL',
        ],
      },
      {
        years: '2023',
        project: 'Automotive manufacturer',
        role: 'Automation',
        summary: 'Operations tooling for a global carmaker.',
        highlights: [
          'Developed a task bot that checks file availability on client servers',
        ],
      },
      {
        years: '2022',
        project: 'ChargeHeroes',
        role: 'API Lead',
        summary: 'An Airbnb-style marketplace for renting out idle EV chargers.',
        highlights: [
          'Led API development for the marketplace',
        ],
        outcome: 'Acquired by a competitor a year later',
      },
      {
        years: '2021',
        project: 'Web data collection',
        role: 'Developer',
        summary: 'A fleet of scrapers collecting comparison and ranking data from websites.',
        highlights: [
          'Ran onboarding for new engineers and tracked scraper status and site-specific issues',
        ],
      },
      {
        years: '2020–21',
        project: 'B2B document platform',
        role: 'Backend Developer',
        summary: 'A drag-and-drop builder for creating, sharing, and signing documents between businesses.',
        highlights: [
          'Shipped backend fixes and documented the environments and APIs',
        ],
      },
      {
        years: '2020',
        project: 'Social platform for businesses',
        role: 'Backend Developer',
        summary: 'A social media platform built for business accounts.',
        highlights: [
          'Documented the backend and the Instagram API integration, and took part in v2 planning, estimation, and knowledge transfer',
        ],
      },
      {
        years: '2019',
        project: 'Internal tooling',
        role: 'Junior Software Developer',
        summary: 'Joined Netzon and started on internal tools before moving onto client platforms.',
        highlights: [],
      },
    ],
  },
  {
    company: 'Freelance',
    kind: 'Contract',
    period: '2024 — Jun 2026',
    engagements: [
      {
        // TODO(julius): add the year, and merge with the entry below if
        // they are the same engagement.
        years: '',
        project: 'Multi-tenant ISP billing platform',
        role: 'Backend Developer',
        summary: 'Customer and subscription management for internet service providers.',
        highlights: [
          'Built multi-tenant APIs serving many ISPs from one platform',
          'Integrated Stripe and GoCardless payments',
          'Built subscription recovery workflows for failed payments',
        ],
      },
      {
        years: '2024',
        project: 'Platform product for an Australian client',
        role: 'API Developer',
        summary: 'Contract API development for a platform-based product.',
        highlights: [],
      },
    ],
  },
];

// Client and product engagements (internal tooling excluded), for the hero.
export const projectCount = employers
  .flatMap((e) => e.engagements)
  .filter((e) => e.project !== 'Internal tooling').length;
