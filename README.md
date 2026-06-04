# Himanshu — Digital Workbench

Terminal-inspired portfolio website with an embedded systems / robotics aesthetic. Built as a single-page React application with engineering-detail project documentation.

## Tech Stack

- **Vite** + **React 19** (JSX)
- **framer-motion** for scroll/transition animations
- **Vanilla CSS** with custom properties
- **Google Fonts:** Space Grotesk, Inter, JetBrains Mono

## Sections

| Section | Anchor |
|---|---|
| Hero Terminal | `#hero` |
| Engineering Metrics | `#metrics` |
| About | `#about` |
| Skills Matrix | `#skills` |
| Projects | `#projects` |
| Gallery | `#gallery` |
| Timeline | `#timeline` |
| Blog | `#blog` |
| Open Source (GitHub API) | `#opensource` |
| Achievements | `#achievements` |
| Contact | `#contact` |

## Project Pages

Each project card opens a detailed engineering datasheet view (`?project=<id>`) with system parameters, bill of materials, pin configuration, firmware snippets, and failure analysis logs.

## Getting Started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Data

All content lives in `src/data/portfolio.json`. No hardcoded text in components — edit the JSON to update bio, projects, skills, links, gallery, blog, timeline, achievements, and quotes.

## Design

Dark terminal theme with cyan accents, code-block card styles, failure-log callouts, and animated scroll reveals. Full design system in `src/styles/index.css`.
