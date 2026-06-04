# AGENTS.md

## Project Overview

Himanshu's portfolio — Vite + React 19 single-page app. Terminal-inspired "Digital Workbench" aesthetic with embedded systems / robotics focus.

## Tech Stack

- **Vite 8** + **React 19** (JSX, no TS)
- **framer-motion** (optional import)
- **Vanilla CSS** (custom properties, no Tailwind)
- **Fonts:** Space Grotesk, Inter, JetBrains Mono (Google Fonts)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── main.jsx                   # Entry point
├── App.jsx                    # Root component (routes: main view / project detail)
├── data/
│   └── portfolio.json         # ALL editable content — links, projects, bio, skills, etc.
├── components/
│   ├── Navbar.jsx             # Fixed top nav + mobile drawer
│   ├── Hero.jsx               # Boot terminal + identity
│   ├── Terminal.jsx           # Typing animation loop
│   ├── Metrics.jsx            # Animated counter bar
│   ├── About.jsx              # Bio + sidebar quick-facts
│   ├── Skills.jsx             # Accordion card grid
│   ├── Projects.jsx           # Filterable project cards
│   ├── Gallery.jsx            # Masonry grid + lightbox
│   ├── Timeline.jsx           # Alternating vertical timeline
│   ├── Blog.jsx               # Article card grid
│   ├── OpenSource.jsx         # GitHub API live data
│   ├── Achievements.jsx       # Locked/unlocked cards
│   ├── Contact.jsx            # Terminal-styled form + links
│   ├── Footer.jsx             # Footer
│   └── ProjectPage.jsx        # Individual project documentation page
├── styles/
│   └── index.css              # All styles (design system + components)
```

## Data Flow (Props Drilling)

All content lives in `src/data/portfolio.json`. `App.jsx` imports it and passes relevant slices as props to each component. No Context API — explicit prop drilling.

### portfolio.json Sections

| Key | Purpose | Editable? |
|---|---|---|
| `personal` | Name, bio, tagline, philosophy, terminal boot lines | Yes |
| `links` | GitHub, email, LinkedIn, YouTube, resume PDF path | Yes |
| `metrics` | Counter values + labels | Yes |
| `skillCategories` | 4 domain cards with bullet items (accepts HTML in items) | Yes |
| `projects` | 6 projects with system params, BOM, pin config, failure logs, firmware snippets | Yes |
| `gallery` | Placeholder items with category + height | Yes |
| `galleryCategories` | Filter labels | Yes |
| `timeline` | Year + title + description | Yes |
| `blog` | Category, title, preview, read time | Yes |
| `openSourceRepos` | GitHub repo names to fetch live | Yes |
| `achievements` | Icon, title, description, locked flag | Yes |
| `projectFilterCategories` | Filter bar labels | Yes |

## Design System

### Colors
- `--bg-main: #0B0F17` / `--brand-cyan: #00D9FF` / `--neon-green: #10B981`
- Full palette in `:root` of `src/styles/index.css:3-15`

### Visual Conventions
- Code blocks: `--bg-surface` + left 3px cyan border
- Failure logs: amber left border
- Cards: `box-shadow: 0 0 0 1px var(--border)` on hover
- Status badges: `.status-active` (green), `.status-complete` (cyan), `.status-prototype` (amber), `.status-open-source` (blue)

## Sections (Anchor Navigation)

`#hero` `#metrics` `#about` `#skills` `#projects` `#gallery` `#timeline` `#blog` `#opensource` `#achievements` `#contact`

## Project Pages

Clicking "View Datasheet" on a project card sets `?project=<id>` in the URL. `App.jsx` reads this and renders `<ProjectPage>` with full engineering documentation (System Parameters, BOM, Pin Config, Firmware Snippets, Failure Analysis Log).

## Important

- **Do NOT edit the HTML directly** — edit `src/data/portfolio.json` for content changes
- Add new social links to `portfolio.json > links` — Contact component auto-renders them
- To add a new project, add it to `portfolio.json > projects` array with the same schema
- Gallery images are placeholder divs — replace with actual `<img>` tags or uploads
- No tests, no CI, no typecheck
