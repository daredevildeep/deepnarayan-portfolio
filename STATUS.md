# PROJECT STATUS
Last updated: 2026-06-25
Current phase: 10 of 10 — COMPLETE + improvement pass complete
Last commit: see `git log --oneline`
Next step: Push to GitHub and deploy on Netlify (see DEPLOY.md). Then swap the
OG image for a PNG and drop in the real resume PDF + sample clips.

## Improvement Pass (2026-06-25)
Performance + AI readability + sample section + new UX features.
- PASS A — Perf: gsap.ticker drives Lenis (single RAF) + ScrollTrigger sync,
  wheelMultiplier 0.8; Canvas frameloop="demand" + dpr[1,1.5] + performance min;
  FrameDriver invalidates only while hero in view (IntersectionObserver) so the
  GPU idles below the fold; mobile (<768px) renders a static SVG (no Three.js).
- PASS B — AI/ATS: exact recruiter meta + keywords; JSON-LD Person schema;
  sr-only plaintext bio in static HTML; aria-label on every section; ids aligned
  to top/setup/games/workflow/experience/samples/contact; authoritative sr-only H1.
- PASS C — Samples: on-request cards (game/task/duration/status + "Request This
  Sample" mailto); "CAPTURE RIG — READY" HUD panel; 24h delivery note.
- PASS D — UX: 2px progress bar; live IST clock; email+phone clipboard copy;
  back-to-top; "What I Annotate" table; dated availability badge.
- Verified by an adversarial multi-lens review workflow (react/perf/ATS/a11y/spec).
  Two low-severity reduced-motion gaps in BackToTop were found and fixed; the
  whole app is now wrapped in <MotionConfig reducedMotion="user">.

## Completed Phases
- [x] Phase 0 — Scaffold + all dependencies
- [x] Phase 1 — Foundation (CSS tokens, Lenis, content, hooks)
- [x] Phase 2 — Navigation (progress bar, active section, mobile menu)
- [x] Phase 3 — Hero + 3D Annotation Canvas (the showpiece)
- [x] Phase 4 — Technical Setup section
- [x] Phase 5 — Gaming Experience section
- [x] Phase 6 — Annotation Workflow section ⭐
- [x] Phase 7 — Professional Experience timeline
- [x] Phase 8 — Sample Work section (lightbox)
- [x] Phase 9 — Contact section
- [x] Phase 10 — Polish, custom cursor, reduced-motion, meta, deploy guide

## Key File Locations
- Main entry: src/main.jsx
- App root: src/App.jsx (assembles all sections + overlays + cursor)
- All copy: src/lib/content.js  ← edit text here, not in components
- 3D scene: src/components/Hero/HeroScene.jsx + src/three/*
- Hooks: src/hooks/* (useLenis, useScrollProgress, useReveal, useActiveSection, useMouseParallax)
- Resume generator: scripts/gen-resume.cjs → public/resume-deep-narayan-yadav.pdf

## Build / Run
- `npm run dev`     → http://localhost:5173
- `npm run build`   → dist/ (verified clean: 0 errors)
- `npm run preview` → preview the production build

## Known Issues / Follow-ups
- OG image is SVG (placeholder) — replace with 1200×630 PNG for social previews.
- Resume PDF is a generated placeholder — replace with a real export.
- Sample Work cards are placeholders — add real clips + set `src` in SAMPLES.
- Verify LinkedIn/GitHub URLs in content.js point to real profiles.

## Decisions Made
See DECISIONS.md (Tailwind v3 pin, R3F v8 line, CanvasTexture annotation UI,
lazy-loaded 3D, reduced-motion at source, dependency-free PDF generator).
