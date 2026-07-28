# AGENTS.md

## Project Overview

Personal portfolio website for Ferdiansyach. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4. Deployed on Vercel at `ferdiansyach-portfolio.vercel.app`.

## Commands

```bash
npm run dev          # Dev server (Turbopack enabled)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm run test         # Vitest (watch mode, no tests yet)
npm run test:run     # Vitest single run
```

## Architecture

- `src/app/` - App Router pages:
  - `page.tsx` - Main SPA (client-rendered, wraps all sections)
  - `layout.tsx` - Root layout (Inter + Lora fonts, SEO metadata, JSON-LD)
  - `portfolio-pdf/` - ATS-friendly CV export (redirects to `/` in production)
  - `projects-pdf/` - Project portfolio PDF (uses `<img>` intentionally, ESLint rule disabled)
  - `projects/[slug]/` - Dynamic project detail pages
- `src/components/sections/` - Page sections (Hero, About, Skills, Projects, Experience, Education, Certifications, Contact, Stats, Testimonials)
- `src/components/ui/` - Reusable UI primitives (GlassCard, TiltCard, AnimatedSection, etc.)
- `src/components/layout/` - Navbar, Footer, ScrollToTop
- `src/data/` - Content data files (all bilingual `id`/`en` via `TranslatedText` type)
- `src/hooks/` - `useTheme`, `useLanguage`, `useReducedMotion`, `useScrollReveal`, `cn` (clsx + tailwind-merge)
- `src/types/index.ts` - Shared TypeScript interfaces

## Key Conventions

### Theming (Reflect.app Design System)

Design tokens are CSS variables in `src/app/globals.css`. Use `var(--color-*)` references, not hardcoded hex.

- Dark mode default, `.light` class toggles overrides
- Primary accent: `--color-primary: #7c3aed` (violet)
- Canvas: `--color-canvas` / `--color-canvas-elevated`
- Borders: `--color-hairline`
- Typography: Lora (serif, `--font-lora`) for headings, Inter (sans, `--font-inter`) for body
- Utility class `glass-card` provides pre-styled card with border + shadow + hover

### i18n

All user-facing text uses `{ id: string; en: string }` objects. The `useLanguage().t()` function selects the current language. Never hardcode display strings.

### Path Alias

`@/*` maps to `./src/*`.

### State Management

Theme and language state use `useSyncExternalStore` backed by `localStorage` (no Redux/Zustand).

### PDF Routes

- `/portfolio-pdf` blocks production access via `NODE_ENV` check
- `/projects-pdf` uses raw `<img>` for print compatibility (ESLint `no-img-element` off)

## Gotchas

- **No vitest config file** - Vitest uses defaults; if adding tests, you may need a `vitest.config.ts`
- **No test files exist** - `npm run test` will find nothing
- **Tailwind CSS 4** - Uses `@tailwindcss/postcss` plugin (not v3 config). PostCSS config is in `postcss.config.mjs`
- **Turbopack** - Dev server uses Turbopack (configured in `next.config.ts`)
- **`scripts/generate_docx.py`** - Windows-only (requires `win32com.client` for Word COM automation). Generates CV `.docx`/`.pdf` files to `public/cv/`
- **Sensitive files gitignored** - `/public/npwp*`, `/public/*.pdf`, `/public/Sertifikat/` are in `.gitignore`
- **`reflect_instructions.md`** - Design refactor guide (gitignored), not canonical. Design tokens live in `globals.css`
