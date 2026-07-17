# AGENTS.md

## Project Overview

Himanshu's portfolio — Vite + React 19 single-page app. Terminal-inspired "Digital Workbench" aesthetic with embedded systems / robotics focus. Deploys to GitHub Pages (repo name `himanshu-2010.github.io`).

## Tech Stack

- **Vite 8** + **React 19** (JSX, no TS)
- **Vanilla CSS** (custom properties, no Tailwind)
- **Fonts:** Space Grotesk, Inter, JetBrains Mono (Google Fonts)
- `framer-motion` is listed as a dependency and explicitly chunked in `vite.config.js`, but it is **NOT imported anywhere** — scroll/transition animations are done with CSS + an `IntersectionObserver` (`useScrollReveal` in `App.jsx:29`). Do not add framer-motion usage expecting it to be wired up; the chunk will simply never load.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | `eslint src/` — **broken**: eslint is not in `devDependencies`, so this fails on a clean `npm install`. Do not rely on it. |

No tests, no typecheck, no CI. There is no deploy script — publishing is handled by GitHub Pages, not an npm script.

## Architecture

- **No router library.** Routing is hand-rolled in `App.jsx` via `URLSearchParams` + `window.history.pushState`. Routes: `?project=<id>` (datasheet), `?page=gallery` (full gallery), `?page=secret` (gated page), any other `?page=` value → `NotFound`. Anchor nav (`#about`, etc.) is handled by `goToSection` scrolling to element IDs, not by a router.
- **All content is data-driven.** `src/data/portfolio.json` holds every editable string. `App.jsx` imports it once and prop-drills slices to components. No Context API.
- **Sections are lazy-loaded + code-split.** Most components are `React.lazy` with a `<Suspense fallback>` (`SectionFallback` in `App.jsx:25`). `Navbar`, `Hero`, `Metrics`, `About`, `Skills`, `Projects`, `Footer`, `StatusBar`, `BackToTop` are eager; everything else is lazy.
- **Build chunking** is manual (`vite.config.js`): react/react-dom → `vendor-react`, framer-motion → `vendor-animation`, other node_modules → `vendor-other`. `sourcemap: false`, chunk-size warning limit 300 kB.

## Components (`src/components/`)

Eager: `Navbar` (fixed nav + mobile drawer + `SearchModal`), `Hero`, `Metrics`, `About`, `Skills`, `Projects`, `Footer`, `StatusBar`, `BackToTop`.

Lazy: `Gallery`, `Timeline`, `Blog`, `OpenSource` (live GitHub API), `Achievements`, `Quotes`, `Contact`, `ProjectPage` (per-project datasheet), `GalleryPage`, `SecretPage`, `NotFound`, `SearchModal` (cmd/ctrl-K search over portfolio content).

## portfolio.json Sections

| Key | Purpose |
|---|---|
| `personal` | Name, bio, tagline, philosophy, terminal boot lines |
| `links` | GitHub, email, LinkedIn, YouTube, resume PDF — Contact auto-renders these |
| `metrics` | Counter values + labels |
| `skillCategories` | Domain cards; `items` accept raw HTML |
| `projects` | Per-project system params, BOM, pin config, failure logs, firmware snippets |
| `gallery` / `galleryCategories` | Masonry items (placeholder divs) + filter labels |
| `timeline` | Year + title + description |
| `blog` | Category, title, preview, read time |
| `openSourceRepos` | GitHub repo slugs fetched live at runtime |
| `achievements` | Icon, title, description, `locked` flag |
| `projectFilterCategories` | Project filter bar labels |
| `quotes` | Quote cards (rendered by `Quotes`) |
| `secret` | Title/subtitle/lines + image list for the gated `SecretPage` |

## Special / Non-Obvious Features

- **SecretPage** (`?page=secret` or the nav secret trigger): password-gated private page. Passkey is hardcoded in `SecretPage.jsx:102` (`'himanshu.ilu'`); "Are you Soumya?" path unlocks via `localStorage` flag `secret_auth`. Backed by `portfolio.json > secret` + `public/images/secret/*.info.json`. Treat as private content.
- **Secret intro + broken state:** after unlock, `IntroLoader` (`src/components/IntroLoader.jsx`) plays a heart loader showing `secret.introTexts` (two messages sequentially), shatters into a full-hearts burst, then ~5s later the page glitches to a broken-heart theme. That broken state is persisted permanently in `localStorage` (`secret_broken`); the **Replay Intro** button re-runs the loader (visual only). In the broken state all hearts render as `💔`, and the background heart's pulse decays to a flat "no beat". Honors `prefers-reduced-motion` (skips straight to broken, no decay animation).
- **OpenSource** calls the GitHub API at runtime — needs network; fails gracefully if rate-limited/offline.

## Design System

- Colors in `:root` of `src/styles/index.css` (`--bg-main:#0B0F17`, `--brand-cyan:#00D9FF`, `--neon-green:#10B981`). All styles live in that one file.
- Code blocks: `--bg-surface` + left 3px cyan border. Failure logs: amber left border. Status badges: `.status-active/.status-complete/.status-prototype/.status-open-source`.

## Editing Rules

- **Content changes → edit `portfolio.json`, never component JSX text.**
- Add a social link by extending `links` (Contact auto-renders it). Add a project by appending to `projects` with the existing schema. Gallery images are placeholder divs — swap for real `<img>`/uploads.
