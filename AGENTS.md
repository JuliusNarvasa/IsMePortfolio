# AGENTS.md

Guidance for AI coding agents working on this repo.

## What this is

A personal developer portfolio for Julius Narvasa. Single-page Astro site with a dark, slightly-terminal aesthetic. Built on Astro + React, the site serves the same URL in three switchable themes — **Personal**, **Business**, and **Customer** — via a segmented theme switcher in the top nav. Static output deployed to `https://me.bambaw-tumba.com`.

The site is intentionally not a résumé — it shows personality, real shipped projects, live infrastructure, and a timeline (Personal), or — depending on the active theme — a B2B consultancy pitch (Business) or a product showcase (Customer). All three themes share the same data layer and ship from one URL.

**Stack:** Astro 5 (static output) · React 18 islands · Tailwind CSS 3 · TypeScript · `motion@^12` (Framer Motion successor) · `@fontsource` Inter + JetBrains Mono.

## Commands

```sh
npm install        # install deps
npm run dev        # local dev server (http://localhost:4321)
npm run build      # static build → dist/
npm run preview    # serve dist/ locally
```

There are no tests, no linter, and no formatter wired up. Keep changes minimal and self-contained.

## Theming

The site is a single React app (`src/components/PortfolioApp.tsx`) that swaps between three theme Layouts:

- **Personal** — the developer's voice. Who I am, what I build on weekends, my homelab, my timeline.
- **Business** — consultancy pitch for CTOs / founders / engineering managers. Outcomes, scalability, ownership.
- **Customer** — product showcase of the apps Julius ships. Re-Fuel, AI Resume Builder, etc.

Switching is **client-side, no reload, no flash**. State lives in `src/themes/shared/ThemeProvider.tsx` (React context). The theme switcher (`src/themes/shared/ThemeSwitcher.tsx`) lives in the Nav so it survives the body swap; on `<lg` viewports it collapses to icon-only (P / B / C). Theme is persisted in `localStorage` (key `portfolio-theme`).

A `<script is:inline>` in `Layout.astro`'s `<head>` sets `document.documentElement.dataset.theme` from localStorage **before** first paint to avoid FOUC. Three `[data-theme="X"]` rule sets in `src/styles/global.css` swap the CSS variables; all Tailwind color utilities (`bg-accent`, `text-text-muted`, etc.) resolve to those variables via `tailwind.config.mjs`.

The active theme body is rendered by `PortfolioApp` inside `<AnimatePresence mode="wait">` for a 700ms crossfade. All three themes (Personal, Business, Customer) are **dynamic-imported** on first paint; a brief `BodySkeleton` (in `src/components/PortfolioApp.tsx:22`) covers the 30-50ms resolution window. The FOUC script in `<head>` applies the saved theme's CSS variables before paint, so the body content is the only thing waiting on the dynamic import — the colors are correct from the first frame.

**No-JS fallback**: there is none. The portfolio requires JavaScript to function (theme switching is JS-only). A user with JS disabled sees the skip link and a permanently-loading `BodySkeleton`. The original Astro Personal site had implicit no-JS support; this is an accepted trade-off.

### Theme directory layout

```
src/themes/
  tokens.ts                     # ThemeTokens type + personal/business/customer token objects
  registry.ts                   # Theme + 3 theme entries + dynamic-import loaders
  shared/
    ThemeProvider.tsx           # React Context; reads dataset.theme on mount; writes to localStorage
    ThemeSwitcher.tsx           # role=radiogroup, roving tabindex, arrow keys + Enter + Space
    Reveal.tsx                  # framer-motion useInView wrapper (replaces data-reveal)
    MotionPreset.ts             # shared variants (pageEnter, stagger, etc.)
    ui/                         # cross-theme primitives: HandleRow, SectionHeader, StatusDot
  personal/
    PersonalLayout.tsx          # composes the 9 Personal sections
    sections/                   # Hero, Beyond, PetProjects, Projects, Infrastructure,
                                #   AILab, Experience, NowBuilding, Contact
    ui/                         # Personal-only: ProjectCard, StatusRow, TreeNode, InterestIcon
  business/
    BusinessLayout.tsx          # composes the 8 Business sections
    sections/                   # Hero, WhatIBuild, CaseStudies, TechStack, Testimonials,
                                #   Experience, CTA, Contact
  customer/
    CustomerLayout.tsx          # composes the 8 Customer sections
    sections/                   # Hero, Screenshots, Features, Testimonials, Downloads,
                                #   MoreApps, About, Contact
```

To add or change a section, edit the relevant theme's `sections/` directory. Section order is dictated by the order of components in the theme's `Layout.tsx`. `data-theme-body="<theme-id>"` is the source of truth for the Nav IntersectionObserver.

## Section order

The active theme is chosen by the user via the switcher. Section order is **per theme**, baked into each `Layout.tsx`:

**Personal** (`src/themes/personal/PersonalLayout.tsx`) — 9 sections:
1. `Hero` (id: `top`)
2. `Beyond` (id: `beyond-the-code`) — interests, narrative
3. `PetProjects` (id: `pet-projects`) — "built because it annoyed me"
4. `Projects` (id: `projects`)
5. `Infrastructure` (id: `infrastructure`) — homelab, VPS, etc.
6. `AILab` (id: `ai-lab`) — local LLMs, AI tinkering
7. `Experience` (id: `experience`) — timeline
8. `NowBuilding` (id: `building`) — current focus
9. `Contact` (id: `contact`)

**Business** (`src/themes/business/BusinessLayout.tsx`) — 8 sections:
1. `Hero` (id: `hero`)
2. `WhatIBuild` (id: `what-i-build`)
3. `CaseStudies` (id: `case-studies`)
4. `TechStack` (id: `tech-stack`)
5. `Testimonials` (id: `testimonials`)
6. `Experience` (id: `experience`)
7. `CTA` (id: `cta`)
8. `Contact` (id: `contact`)

**Customer** (`src/themes/customer/CustomerLayout.tsx`) — 8 sections:
1. `Hero` (id: `hero`)
2. `Screenshots` (id: `screenshots`)
3. `Features` (id: `features`)
4. `Testimonials` (id: `testimonials`)
5. `Downloads` (id: `downloads`)
6. `MoreApps` (id: `more-apps`)
7. `About` (id: `about`)
8. `Contact` (id: `contact`)

## Repo layout

```
src/
  layouts/
    Layout.astro              # <html> shell, <head>, OG/Twitter meta, FOUC-prevention script
  pages/
    index.astro               # composes Layout + <PortfolioApp client:load buildDate={...} />
    tracking.astro            # private analytics dashboard (Astro)
  components/
    PortfolioApp.tsx          # React island. ThemeProvider + MotionConfig + Nav + Body + Footer
    Nav.tsx                   # sticky top nav; theme-body-scoped IntersectionObserver; hosts ThemeSwitcher
    Footer.tsx                # build-date + back-to-top (buildDate prop from index.astro)
  themes/                     # see "Theming" above for the full tree
  data/                       # shared content (single source of truth)
    profile.ts                # name, role, contact, socials
    projects.ts               # all 4 projects
    interests.ts              # personal interests + icons
    petProjects.ts            # "built because it annoyed me" items with images
    experience.ts             # timeline entries
    infrastructure.ts         # homelab + VPS + local + network + cloud trees
    stack.ts                  # tech stack (Business theme)
    nowBuilding.ts
  styles/
    global.css                # CSS variables per [data-theme], keyframes, .tree / hero / pet / lightbox rules
  scripts/                    # only the tracking endpoints remain
    tracking.ts               # silent page-view beacon (POSTs to /api/track on every Layout page)
    tracking-dashboard.ts     # /tracking page renderer (fetches /api/stats, draws SVG chart)
public/
  images/
    projects/                 # project screenshots
    personality/              # Personal "built because it annoyed me" card images
  heroimages/                 # Personal hero slideshow (1.jpg … 6.jpg)
  favicon.svg
  og.png                      # social card
src/hero2/                    # local staging area for user-supplied source images
                              # NOT deployed; assets here are copied into public/images/personality/
server/                       # Node + SQLite tracking service. NOT in dist/. See server/README.md
                              # and howtodeploy.md for VPS setup. Runs on :4322 behind nginx /api/.
tailwind.config.mjs           # all design tokens live here; colors resolve to var(--<token>)
```

## Other pages

- `/tracking` — private analytics dashboard (`src/pages/tracking.astro`). Not in the main nav. Loads `src/scripts/tracking-dashboard.ts` which fetches `/api/stats` from the Node tracking service (see `server/`). The page itself is not tracked (the tracking pixel skips `/tracking` paths client-side).

## Design system — read these two files first

- `tailwind.config.mjs` — every color, font size, shadow, spacing, radius, and keyframe the project uses. Tokens are namespaced (`bg`, `bg-elevated`, `text`, `text-muted`, `text-dim`, `accent`, `accent-hover`, `accent-muted`, `accent-glow`, `border`, `border-strong`, `success`, `warning`, `danger`). **All color values resolve to CSS variables (`var(--<token>)`)** so the same Tailwind class (e.g. `bg-accent`) renders the per-theme color.
- `src/styles/global.css` — three `[data-theme="X"]` rule sets (one each for `personal`, `business`, `customer`) that define the CSS variables, plus `.hero-slide` / `.pet-slide` / `.lightbox` / `.tree` rules, `[data-reveal]` rules (used only by the tracking page), and `prefers-reduced-motion` handling.

**Do not add new tokens** without a strong reason. The system is intentionally tight; reach for the existing classes first.

## Visual conventions

- **Sections** are `class="py-section px-6"` with `class="mx-auto max-w-content"` (or `max-w-narrow` for tighter sections).
- **Glass cards** are `class="rounded-lg border border-border bg-bg-glass backdrop-blur-glass"` (or `bg-bg-glass-strong` for higher-contrast surfaces like the Nav).
- **Solid cards** (project cards, status lists) are `class="rounded-lg border border-border bg-bg-elevated shadow-subtle"`.
- **Hover lift** for interactive cards: `hover:-translate-y-1 hover:border-accent hover:shadow-accent-glow focus-within:border-accent focus-within:shadow-accent-glow` with `transition-all duration-slow ease-out-snappy`.
- **Mono accents** (eyebrows, terminal-style labels, key/value pairs) use `font-mono` or `font-mono-sm uppercase tracking-wider` and `text-accent` for highlights.
- **Reveal staggering**: wrap top-level content in `<Reveal>` (from `src/themes/shared/Reveal.tsx`) with `delay={80 | 160 | 240 | 320 | 400}`. The Reveal wrapper uses framer-motion's `useInView` and honours `prefers-reduced-motion`.
- **Accessibility**: every section has `aria-labelledby` pointing at its title, every interactive element inherits focus rings from `global.css`, all decorative images use `loading="lazy"`, the ThemeSwitcher is a `role="radiogroup"` with roving tabindex and arrow-key navigation.

## Adding a new section (checklist)

1. Create `src/themes/<theme>/sections/MySection.tsx` (React). The file should default-export the section component; the parent theme's `Layout.tsx` imports and composes it.
2. Compose it in the relevant theme's `Layout.tsx` (e.g. `src/themes/personal/PersonalLayout.tsx`). Reorder the components above/below to slot it into the right visual position.
3. If the section needs a top-nav entry, add `{ label: 'My Section', href: '#my-section' }` to the `navLinks` array in `src/themes/registry.ts` for the relevant theme.
4. Use `<Reveal>` (with the right `delay`) for scroll-in animation.
5. Reuse existing primitives — `SectionHeader` (eyebrow + title), `HandleRow` (contact label-value), `StatusDot` (live status), `ProjectCard`, `StatusRow`, `TreeNode` — instead of inventing new card patterns. If you genuinely need a new pattern, keep it consistent with the existing glass/solid conventions.

## Adding a project to a theme

The shared project data lives in `src/data/projects.ts`. To add a project:

1. Add an entry to `src/data/projects.ts` with `slug`, `title`, `category`, `problem`, `challenges[]`, `tech[]`, `links`, and `screenshot`.
2. The image lives in `public/images/projects/<slug>.png` (or `.jpg`).
3. Personal and Business pick projects up automatically via their `Projects` / `CaseStudies` sections. Customer treats projects as products (Re-Fuel gets a hero feature slot, etc.) — see `src/themes/customer/sections/Hero.tsx` and `Downloads.tsx` for the pattern.

## Image assets

- `public/heroimages/` — used by the Personal hero slideshow (`src/themes/personal/sections/Hero.tsx`).
- `public/images/projects/` — project screenshots referenced by `src/data/projects.ts`.
- `public/images/personality/` — images for the Personal `PetProjects.tsx` "Built Because It Annoyed Me" cards.
- `src/hero2/` — **staging area for user-supplied source images only.** Files here are NOT deployed. Copy/convert into `public/images/<section>/` (prefer `.jpg`/`.png`; the browser renders `.bmp` but it's heavy).

## Tone & copy

- Conversational first-person. No "passionate developer" or "problem solver" clichés.
- The site is the developer's voice, not a marketing page. Honest, grounded, slightly self-deprecating.
- Project `problem` lines read as personal frustrations; `solution` lines describe the tool, not the achievement.
- Interest cards have a concrete noun-phrase description, not an abstract theme statement.

## Things to avoid

- **Do not create a second hero.** A full-viewport intro exists at the top of the page in every theme. Every other section uses the standard `py-section` rhythm.
- **Do not add a light theme** unless explicitly asked. `[data-theme="light"]` is reserved in `global.css` for future use; the site ships dark only (across all three themes).
- **Do not add new Tailwind tokens, custom fonts, or design-system primitives** without a strong reason. Reuse what's there.
- **Do not commit `src/hero2/`.** It's a local staging area, not a source of truth. Deployed assets live in `public/images/`.
- **Do not edit `dist/`.** It's the build output. Run `npm run build` to regenerate.
- **Do not add tests, linters, or formatters** unless the user asks. There are intentionally none.
- **Do not duplicate code across themes.** The shared UI primitives (`Reveal`, `SectionHeader`, `HandleRow`, `StatusDot`, `MotionPreset`) and shared data (`src/data/*`) exist to keep all three themes aligned. Only diverge for genuine visual/copy reasons.
- **Do not use any browser to debug or verify changes.** No Playwright, headless Chrome, screenshot tools, DOM scraping, navigation, or visual inspection — the user reviews changes in their own browser. Validate via build output, file inspection, and code-level reasoning only. If a problem can only be confirmed visually, say so and stop.

## When you're done

- Run `npm run build` to confirm a clean build with no warnings.
- Run `npx tsc --noEmit` to confirm no type errors.
- If you changed public-facing copy, sanity-check the voice against the existing section copy.
- If you added a section, update the section-order list in this file (for the relevant theme).
- If you changed a theme palette, run a WCAG contrast check on `--text` / `--text-muted` / `--text-dim` against `--bg` / `--bg-elevated` / `--bg-overlay`. Body text must hit ≥4.5:1.

## Deployment

Static build (`npm run build` → `dist/`) is published to `me.bambaw-tumba.com`. See `howtodeploy.md` for full deploy steps.

## Branches

- **`master`** — production-ready. What gets deployed.
- **`funbranch`** — separate branch for work in progress, experiments, or things not ready for prod.
- Any branch can be deployed to `me.bambaw-tumba.com` — there's no branch restriction.
