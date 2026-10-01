# AGENTS.md

Guidance for AI coding agents working on this repo.

## What this is

A personal developer portfolio for Julius Narvasa. Single-page Astro site with a dark, slightly-terminal aesthetic. Static output deployed to `https://me.bambaw-tumba.com`. It has to work for two readers: a recruiter skimming for 30 seconds (level, shipped work, résumé, contact) and an engineer who wants to see how Julius thinks. Proof comes first on the page, personality second, and the voice stays personal throughout.

**Stack:** Astro 5 (static output) · React 18 islands · Tailwind CSS 3 · TypeScript · `@fontsource` Inter + JetBrains Mono.

## Commands

```sh
npm install        # install deps
npm run dev        # local dev server (http://localhost:4321)
npm run build      # static build → dist/
npm run preview    # serve dist/ locally
```

There are no tests, no linter, and no formatter wired up. Keep changes minimal and self-contained.

## Repo layout

```
src/
  config/
    site.ts                   # name, role, years, résumé URL, handles: single source of truth
  data/
    experience.ts             # work history (employers → engagements); hero counts derive from it
  layouts/
    Layout.astro              # <html> shell, <head>, OG/Twitter meta, JSON-LD Person, dark theme
  pages/
    index.astro               # composes the single page; section order lives here
  components/
    Nav.astro                 # sticky top nav + active-section IntersectionObserver
    Footer.astro              # build-date + back-to-top
    sections/                 # one .astro per page section
      Hero.astro              # intro, at-a-glance facts, résumé CTA
      Experience.astro        # employers → engagements (role, highlights, outcome)
      Projects.astro          # "Selected work": client case studies first, then side projects
      Stack.astro             # grouped skill badges
      Personality.astro       # "Beyond the Code" + pet projects
      Lab.astro               # homelab / cloud / local AI / on-the-bench
      Contact.astro
    ui/                       # reusable building blocks
      SectionHeader.astro     # eyebrow + title + description pattern
      ProjectCard.astro       # full project card (used in Projects section)
      Tag.astro
      StatusDot.astro
      StatusRow.astro
      TreeNode.astro          # recursive tree with status dots
      HandleRow.astro         # contact handle row (label · value · link)
      ResumeLink.astro        # résumé button; hidden in prod while site.resumeUrl is empty
  styles/
    global.css                # CSS variables, base layer, [data-reveal] animation, .tree styles
  scripts/
    reveal.ts                 # IntersectionObserver that adds .is-visible to [data-reveal]
    slideshow.ts              # hero image crossfade
    tracking.ts               # silent page-view beacon (POSTs to /api/track on every Layout page)
    tracking-dashboard.ts     # /tracking page renderer (fetches /api/stats, draws SVG chart)
public/
  images/
    projects/                 # project screenshots (referenced by /images/projects/…)
    personality/              # frustration-card images (referenced by /images/personality/…)
  heroimages/                 # hero slideshow images (1.jpg … 5.jpg)
  favicon.svg
  og.png                      # social card
src/hero2/                    # local staging area for user-supplied source images
                              # NOT deployed; assets here are copied into public/images/personality/
server/                       # Node + SQLite tracking service. NOT in dist/. See server/README.md
                              # and howtodeploy.md for VPS setup. Runs on :4322 behind nginx /api/.
tailwind.config.mjs           # all design tokens live here
```

## Section order in `src/pages/index.astro`

The page composes sections in this fixed order: proof first (who, what level, what shipped), personality second. Don't move personality sections above Experience/Work.

```
Hero           (no number; full-viewport intro + at-a-glance facts)
Experience     (01 — Experience)
Projects       (02 — Work; "Selected work")
Stack          (03 — Stack)
Beyond the Code(04 — About; narrative + interests)
Pet Projects   (no number; // pet_projects.built_from_frustration)
Lab            (05 — Lab; homelab, cloud, local AI, on the bench)
Contact        (06 — Contact)
```

Note: `Beyond the Code` and `Pet Projects` are both rendered from a single component import (`<Personality />` → `src/components/sections/Personality.astro`) but emit **two sibling `<section>` elements** with `id="beyond-the-code"` and `id="pet-projects"`. Pet Projects uses `pb-section` (no top padding) so the two read as one block. The pet-projects block is a stack of full-width feature rows (image on one side, text on the other) with `lg:order-1/2` alternation per row; on mobile the image stacks above the text. Image aspect ratio is `16 / 9`.

## Other pages

- `/tracking` — private analytics dashboard (`src/pages/tracking.astro`). Not in the main nav. Loads `src/scripts/tracking-dashboard.ts` which fetches `/api/stats` from the Node tracking service (see `server/`). The page itself is not tracked (the tracking pixel skips `/tracking` paths client-side).

## Design system — read these two files first

- `tailwind.config.mjs` — every color, font size, shadow, spacing, radius, and keyframe the project uses. Tokens are namespaced (`bg`, `bg-elevated`, `text`, `text-muted`, `text-dim`, `accent`, `accent-hover`, `accent-muted`, `accent-glow`, `border`, `border-strong`, `success`, `warning`, `danger`).
- `src/styles/global.css` — CSS variables that mirror the Tailwind tokens, the `[data-reveal]` scroll-reveal animation (with `data-reveal-delay` values 0/80/160/240/320/400), `.tree` styles, and reduced-motion handling.

**Do not add new tokens** without a strong reason. The system is intentionally tight; reach for the existing classes first.

## Visual conventions

- **Sections** are `class="py-section px-6"` with `class="mx-auto max-w-content"` (or `max-w-narrow` for tighter sections like Contact/Building).
- **Glass cards** are `class="rounded-lg border border-border bg-bg-glass backdrop-blur-glass"` (or `bg-bg-glass-strong` for higher-contrast surfaces).
- **Solid cards** (project cards, status lists) are `class="rounded-lg border border-border bg-bg-elevated shadow-subtle"`.
- **Hover lift** for interactive cards: `hover:-translate-y-1 hover:border-accent hover:shadow-accent-glow focus-within:border-accent focus-within:shadow-accent-glow` with `transition-all duration-slow ease-out-snappy`.
- **Mono accents** (eyebrows, terminal-style labels, key/value pairs) use `font-mono` or `font-mono-sm uppercase tracking-wider` and `text-accent` for highlights.
- **Reveal staggering**: wrap top-level content in `<div data-reveal>` and stagger children with `data-reveal-delay="80"`, `"160"`, `"240"`, `"320"`, `"400"`. `reveal.ts` toggles `.is-visible` via IntersectionObserver.
- **Accessibility**: every section has `aria-labelledby` pointing at its title, every interactive element inherits focus rings from `global.css`, all decorative images use `loading="lazy"`.

## Adding a new section (checklist)

1. Create `src/components/sections/MySection.astro` using `SectionHeader.astro` and the visual conventions above.
2. Import it in `src/pages/index.astro` and add `<MySection />` in the right position. Renumber the eyebrows of downstream sections if you insert in the middle.
3. Add a `{ label: 'My Section', href: '#my-section' }` entry to `navLinks` in `src/components/Nav.astro` (the `IntersectionObserver` in that file will pick it up automatically).
4. Use `data-reveal` / `data-reveal-delay` on top-level blocks.
5. Reuse `ProjectCard.astro`, `FrustrationCard.astro`, `StatusRow.astro`, or `TreeNode.astro` instead of inventing new card patterns. If you genuinely need a new pattern, keep it consistent with the existing glass/solid conventions.

## Adding a project to `Projects.astro`

Each project is an object in the `projects` array with `slug`, `title`, `category`, `problem`, `challenges[]`, `tech[]`, `links`, and either `screenshot` or `diagram` (a plain-text architecture sketch for client work with nothing to screenshot; pair it with `note`). Client work goes before side projects. The image lives in `public/images/projects/<slug>.png` (or `.jpg`).

## Image assets

- `public/heroimages/` — used by the hero slideshow (`Hero.astro`).
- `public/images/projects/` — project screenshots referenced by `Projects.astro`.
- `public/images/personality/` — images for the `Personality.astro` "Built Because It Annoyed Me" cards.
- Keep deployed photos at ≤1600px on the long edge (hero: ≤1400px), JPEG ~70–80 quality: `sips -Z 1600 -s formatOptions 78 in.jpg --out out.jpg`. The site once shipped 41 MB of 4000px photos.
- `src/hero2/` — **staging area for user-supplied source images only.** Files here are NOT deployed. Copy/convert into `public/images/<section>/` (prefer `.jpg`/`.png`; the browser renders `.bmp` but it's heavy).

## Tone & copy

- Conversational first-person. No "passionate developer" or "problem solver" clichés.
- The site is the developer's voice, not a marketing page. Honest, grounded, slightly self-deprecating.
- Project `problem` lines read as personal frustrations; `solution` lines describe the tool, not the achievement.
- Interest cards have a concrete noun-phrase description, not an abstract theme statement.
- **Never invent facts** in Experience, Work, or the hero facts strip: no made-up metrics, titles, or responsibilities. Missing numbers are marked `TODO(julius)` in the data, not guessed.
- **Client confidentiality:** the only client products named publicly are **Ment** and **ChargeHeroes**. Every other client or project (including freelance) is described by what it is ("Retail rewards mobile app", "ISP billing platform"), never by client name or codename. Never publish performance ratings, manager names, or internal document links.

## Things to avoid

- **Do not create a second hero.** A full-viewport intro exists at the top of the page. Every other section uses the standard `py-section` rhythm.
- **Do not add a light theme** unless explicitly asked. `[data-theme="light"]` is reserved in `global.css` for future use; the site ships dark only.
- **Do not add new Tailwind tokens, custom fonts, or design-system primitives** without a strong reason. Reuse what's there.
- **Do not commit `src/hero2/`.** It's a local staging area, not a source of truth. Deployed assets live in `public/images/`.
- **Do not edit `dist/`.** It's the build output. Run `npm run build` to regenerate.
- **Do not add tests, linters, or formatters** unless the user asks. There are intentionally none.
- **Do not use any browser to debug or verify changes.** No Playwright, headless Chrome, screenshot tools, DOM scraping, navigation, or visual inspection — the user reviews changes in their own browser. Validate via build output, file inspection, and code-level reasoning only. If a problem can only be confirmed visually, say so and stop.

## When you're done

- Run `npm run build` to confirm a clean build with no warnings.
- If you changed public-facing copy, sanity-check the voice against the existing section copy.
- If you added a section, update the section-order list in this file.

## Deployment

Static build (`npm run build` → `dist/`) is published to `me.bambaw-tumba.com`. See `howtodeploy.md` for full deploy steps.

## Branches

- **`master`** — production-ready. What gets deployed.
- **`funbranch`** — separate branch for work in progress, experiments, or things not ready for prod.
- Any branch can be deployed to `me.bambaw-tumba.com` — there's no branch restriction.
