# Deep Narayan Yadav — AI Gameplay Annotator Portfolio

A "Mission Briefing" themed single-page portfolio for an AI gameplay data
annotator. Built with React + Vite, a Three.js hero scene, GSAP scroll
animations, Lenis smooth scroll, and Framer Motion micro-interactions.

## Tech stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 5 |
| 3D | Three.js · @react-three/fiber · drei · postprocessing |
| Scroll animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| UI animation | Framer Motion |
| Styling | Tailwind CSS v3 |
| Icons | lucide-react |

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build locally
```

## Regenerate the resume PDF

The downloadable resume is generated (placeholder) from locked content:

```bash
node scripts/gen-resume.cjs   # writes public/resume-deep-narayan-yadav.pdf
```

Replace it with a real exported PDF when ready (same filename, in `public/`).

## Structure

```
src/
  components/   section components (Nav, Hero, Setup, Gaming, Workflow, …)
  three/        R3F scene pieces (AnnotationCanvas, ParticleField, FloatingRings)
  hooks/        useLenis, useScrollProgress, useMouseParallax, useReveal, useActiveSection
  lib/          content.js (all copy), utils.js
```

All copy lives in `src/lib/content.js` — edit there, not in components.

## Deploy

See [DEPLOY.md](./DEPLOY.md).
