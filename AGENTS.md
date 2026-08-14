# AGENTS.md

## Project Overview

Himanshu's portfolio — Vite + React 19 single-page app. Terminal-inspired "Digital Workbench" aesthetic with embedded systems / robotics focus.

- Git remote: `himanshu-2010/himanshu-port`. `package.json` name is `himanshu-2010.github.io` — the site is published on the GitHub Pages user site. `index.html` and `vite.config.js` use absolute root paths (no `base: './'`), so the build only works served from a domain root, never a `/repo/` subpath.
- No CI, no `.github/` workflows, no deploy script in this repo — publishing happens outside the repo.

## Tech Stack

- **Vite 8** + **React 19** (JSX, no TS). Only runtime deps are react, react-dom, framer-motion.
- **Vanilla CSS** (custom properties, no Tailwind). Fonts: Space Grotesk, Inter, JetBrains Mono (Google Fonts).
- `framer-motion` is a dependency and manually chunked in `vite.config.js` but is **NOT imported anywhere** — all animations are CSS + `IntersectionObserver` (`useScrollReveal` in `App.jsx:29`). Do not add framer-motion usage; the chunk will never load.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build → `dist/` (gitignored) |
| `npm run preview` | Preview production build |
| `npm run lint` | `eslint src/` — **broken**: eslint is not in `devDependencies`, fails on clean install. Don't rely on it. |

No tests, no typecheck, no CI. Verification is `npm run build` only.

## Architecture

- **No router library.** Routing is hand-rolled in `App.jsx` via `URLSearchParams` + `window.history.pushState`. Routes: `?project=<id>` (datasheet; unknown id → NotFound), `?page=gallery`, `?page=secret`, any other `?page=` → `NotFound`. Anchor nav (`#about`, etc.) is `goToSection` scrolling to element IDs, not a router.
- **All content is data-driven.** `src/data/portfolio.json` holds every editable string. `App.jsx` imports it once and prop-drills slices; no Context API. Edit the JSON, never component JSX text.
- **Code-splitting is manual.** Most components are `React.lazy` with `<Suspense fallback>` (`SectionFallback` at `App.jsx:25`). Eager: `Navbar` (fixed nav + mobile drawer), `Hero` (renders `Terminal` boot lines), `Metrics`, `About`, `Skills`, `Projects`, `Footer`, `StatusBar`, `BackToTop`. Everything else is lazy. Chunking in `vite.config.js`: react → `vendor-react`, framer-motion → `vendor-animation`, other node_modules → `vendor-other`; `sourcemap: false`, 300 kB warning limit.
- `src/hooks/` is empty; `useScrollReveal` lives inside `App.jsx`.

## Repo Root — Not App Code

- `pasted-stuff/` — gitignored scratch dir; never edit.
- `session-ses_0911.md` — large untracked raw session transcript; not source.
- `PLAN.md`, `indienotes/`, `himanshu.png`, `assets/`, `projects/`, `resume/` — tracked or untracked leftovers, none imported by the app. `links.resumePdf` points to `/resume/Himanshu_Resume.pdf`, but `resume/` is **not tracked in git** — the file must be added before deploy or the link 404s. `linkedin`/`youtube` are empty strings.

## portfolio.json Sections

| Key | Purpose |
|---|---|
| `personal` | Name, bio, tagline, philosophy, terminal boot lines (fed to `Terminal`) |
| `links` | GitHub, email, LinkedIn, YouTube, resume PDF — Contact auto-renders these |
| `metrics` | Counter values + labels |
| `skillCategories` | Domain cards; `items` accept raw HTML |
| `projects` | Per-project system params, BOM, pin config, failure logs, firmware snippets |
| `gallery` / `galleryCategories` | `{src, height}` items rendered as real `<img>`/`<video>` with lightbox; `galleryCategories` is currently `[]` (filters unused) |
| `timeline` | Year + title + description |
| `blog` | Category, title, preview, read time |
| `openSourceRepos` | GitHub repo slugs fetched live at runtime |
| `achievements` | Icon, title, description, `locked` flag |
| `projectFilterCategories` | Project filter bar labels |
| `quotes` | Quote cards (rendered by `Quotes`) |
| `secret` | Title/subtitle/`introTexts`/lines + madeImages/originals lists for the gated `SecretPage`; optional `birthday` variant (title/subtitle/signature/introTexts/lines) shown all of September |

## Special / Non-Obvious Features

- **SecretPage** (`?page=secret` or nav secret trigger): password-gated private page. Passkey hardcoded at `SecretPage.jsx:102` (`'himanshu.ilu'`); "Are you Soumya?" path unlocks via `localStorage` flag `secret_auth`. Backed by `portfolio.json > secret` — title/subtitle/`introTexts`/lines, optional `birthday` variant, and `madeImages`/`originals` image lists (`public/images/secret/*.info.json` provide AI-prompt details for `madeImages` only — private content, don't publicize).
- **Vibe system (no more broken-heart state):** `SecretPage.jsx` checks the date on mount — if the month is September (`getMonth() === 8`), the whole page switches to the `vibe-birthday` theme (pink/gold gradient, rising 🎈🎂 emoji stream, `secret.birthday` content). Any other day it's the default "friend" vibe. Hearts float as ♥/💜/🫶. The old `secret_broken` localStorage flag and broken-heart 💔 theme are gone. **Testing:** `SecretPage` exposes `window.__setSecretVibe('birthday' | 'friend' | null)` — call it from the devtools console to force/reset the vibe (persisted in `localStorage.secret_vibe_override`).
- **AI images toggle:** the unlocked page shows an `[ AI Images: ON/OFF ]` button filtering `secret.madeImages` (AI pics) out of the masonry, leaving only `originals` (real photos). Preference persisted in `localStorage.secret_show_ai` (default ON).
- **Intro loader:** `IntroLoader` (`src/components/IntroLoader.jsx`) plays `introTexts` (per-vibe) at 2.5s/5s, shatters into a hearts burst, completes at ~6s. Played once on unlock; **Replay Intro** re-runs it (visual only). Honors `prefers-reduced-motion` (skips it).
- **OpenSource** calls the GitHub API at runtime — needs network; fails gracefully if rate-limited/offline.

## Design System

- Colors in `:root` of `src/styles/index.css` (`--bg-main:#0B0F17`, `--brand-cyan:#00D9FF`, `--neon-green:#10B981`). All styles live in that one file.
- Code blocks: `--bg-surface` + left 3px cyan border. Failure logs: amber left border. Status badges: `.status-active/.status-complete/.status-prototype/.status-open-source`.

## Editing Rules

- **Content changes → edit `portfolio.json`, never component JSX text.**
- Add a social link by extending `links` (Contact auto-renders it). Add a project by appending to `projects` with the existing schema. Gallery items: `{"src": "/images/gallery/...", "height": N}`; real files go in `public/images/gallery/`.
