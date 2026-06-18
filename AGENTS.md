# AGENTS.md

Guidance for AI coding agents working on this repo.

## What this is

A personal developer portfolio for Julius Narvasa. Single-page Astro site with a dark, slightly-terminal aesthetic. Static output deployed to `https://me.bambaw-tumba.com`. The site is intentionally not a résumé — it shows personality, real shipped projects, live infrastructure, and a timeline.

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
  layouts/
    Layout.astro              # <html> shell, <head>, OG/Twitter meta, dark theme
  pages/
    index.astro               # composes the single page; section order lives here
  components/
    Nav.astro                 # sticky top nav + active-section IntersectionObserver
    Footer.astro              # build-date + back-to-top
    sections/                 # one .astro per page section
      Hero.astro
      Personality.astro
      Projects.astro
      Infrastructure.astro
      AILab.astro
      Experience.astro
      Building.astro
      Contact.astro
    ui/                       # reusable building blocks
      SectionHeader.astro     # eyebrow + title + description pattern
      ProjectCard.astro       # full project card (used in Projects section)
      FrustrationCard.astro   # simpler "built because it annoyed me" card
      Tag.astro
      StatusDot.astro
      StatusRow.astro
      TreeNode.astro          # recursive tree with status dots
      HandleRow.astro         # contact handle row (label · value · link)
  styles/
    global.css                # CSS variables, base layer, [data-reveal] animation, .tree styles
  scripts/
    reveal.ts                 # IntersectionObserver that adds .is-visible to [data-reveal]
    slideshow.ts              # hero image crossfade
public/
  images/
    projects/                 # project screenshots (referenced by /images/projects/…)
    personality/              # frustration-card images (referenced by /images/personality/…)
  heroimages/                 # hero slideshow images (1.jpg … 5.jpg)
  favicon.svg
  og.png                      # social card
src/hero2/                    # local staging area for user-supplied source images
                              # NOT deployed; assets here are copied into public/images/personality/
tailwind.config.mjs           # all design tokens live here
```

## Section order in `src/pages/index.astro`

The page composes sections in this fixed order. Keep the `00`-prefixed sections at the top of the file so the eyebrow numbering (`00 — Beyond the code`, `01 — Projects`, …) stays logical.

```
Hero          (no number; full-viewport intro)
Personality   (00 — Beyond the code; bridge between Hero and Projects)
Projects      (01 — Projects)
Infrastructure(02 — Infrastructure)
AILab         (03 — AI Lab)
Experience    (04 — Experience)
Building      (05 — Now)
Contact       (06 — Contact)
```

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

Each project is an object in the `projects` array with `slug`, `title`, `category`, `problem`, `challenges[]`, `tech[]`, `links`, and `screenshot`. The image lives in `public/images/projects/<slug>.png` (or `.jpg`).

## Image assets

- `public/heroimages/` — used by the hero slideshow (`Hero.astro`).
- `public/images/projects/` — project screenshots referenced by `Projects.astro`.
- `public/images/personality/` — images for the `Personality.astro` "Built Because It Annoyed Me" cards.
- `src/hero2/` — **staging area for user-supplied source images only.** Files here are NOT deployed. Copy/convert into `public/images/<section>/` (prefer `.jpg`/`.png`; the browser renders `.bmp` but it's heavy).

## Tone & copy

- Conversational first-person. No "passionate developer" or "problem solver" clichés.
- The site is the developer's voice, not a marketing page. Honest, grounded, slightly self-deprecating.
- Project `problem` lines read as personal frustrations; `solution` lines describe the tool, not the achievement.
- Interest cards have a concrete noun-phrase description, not an abstract theme statement.

## Things to avoid

- **Do not create a second hero.** A full-viewport intro exists at the top of the page. Every other section uses the standard `py-section` rhythm.
- **Do not add a light theme** unless explicitly asked. `[data-theme="light"]` is reserved in `global.css` for future use; the site ships dark only.
- **Do not add new Tailwind tokens, custom fonts, or design-system primitives** without a strong reason. Reuse what's there.
- **Do not commit `src/hero2/`.** It's a local staging area, not a source of truth. Deployed assets live in `public/images/`.
- **Do not edit `dist/`.** It's the build output. Run `npm run build` to regenerate.
- **Do not add tests, linters, or formatters** unless the user asks. There are intentionally none.

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
