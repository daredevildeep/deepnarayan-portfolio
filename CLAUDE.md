# CLAUDE.md
# Deep Narayan Yadav — AI Gameplay Annotator Portfolio
# Instructions for Claude Code Opus 4.8
# Version 1.0 — Read this file at the START of every session

---

## ═══════════════════════════════════════
## RULE ZERO — READ BEFORE DOING ANYTHING
## ═══════════════════════════════════════

**Before writing a single line of code:**
1. Read this entire file.
2. Read `STATUS.md` (if it exists) to know where you left off.
3. Run `git log --oneline` to see what phases are done.
4. Run `npm run dev` to confirm current working state.
5. Only then proceed.

---

## ═══════════════════════════════════════════
## PART 1 — ANTI-HALLUCINATION PROTOCOL
## ═══════════════════════════════════════════

These rules prevent broken code and wasted sessions.

### 1.1 — Package Rules
- NEVER write code using a package before installing it.
- NEVER assume an API signature. Always verify with Context7 MCP or by reading the actual installed package docs in `node_modules`.
- After installing, run `cat package.json` and confirm the package is in dependencies.
- If a package has a breaking change between versions (e.g. GSAP v3 vs v2), use Context7 to confirm which syntax applies to the installed version.
- When in doubt: `npx <package> --version` and then look it up.

### 1.2 — Code Rules
- Never invent props, methods, or class names. Check the source.
- Never say "this should work" — verify it works by running the dev server.
- If a component isn't rendering, open browser devtools console FIRST before guessing.
- All imports must match actual file paths. Use `ls src/` to verify.

### 1.3 — Content Rules
- Never invent experience Deep Narayan doesn't have. Refer to the CONTENT SPEC in Part 5.
- All game titles, specs, and dates must match exactly what's in Part 5.
- Job titles, companies, and dates are locked in Part 5 — do not change them.

---

## ══════════════════════════════════════════
## PART 2 — CONTEXT MAINTENANCE PROTOCOL
## ══════════════════════════════════════════

Long sessions break. This prevents data loss.

### 2.1 — STATUS.md (Update after EVERY phase)
After completing any phase, write/update `STATUS.md` with:
```
# PROJECT STATUS
Last updated: [date]
Current phase: [X of 10]
Last commit: [git hash]
Next step: [exact first thing to do next session]

## Completed Phases
- [x] Phase 1 — Foundation
- [ ] Phase 2 — Hero

## Key File Locations
- Main entry: src/main.jsx
- App root: src/App.jsx
- [etc]

## Known Issues
- [any unresolved issues]

## Decisions Made
- [brief log]
```

### 2.2 — DECISIONS.md (Append, never overwrite)
Every time you make a non-obvious choice, append to `DECISIONS.md`:
```
[Date] — Why I used X instead of Y:
Reason: ...
```
Example: "Used Lenis instead of Locomotive Scroll because Lenis is lighter, actively maintained, and has no jQuery dependency."

### 2.3 — Git Discipline
- Commit after EVERY phase that works. 
- Commit message format: `feat: phase-N description`
- NEVER leave uncommitted broken code.
- If a phase breaks, `git stash` or `git checkout .` to restore working state.

### 2.4 — If You Near Context Limit
- Stop coding.
- Write everything to STATUS.md and DECISIONS.md.
- Run `git commit -m "wip: saving context"`.
- Tell the user: "Session approaching limit. STATUS.md updated. Start new session."

---

## ═══════════════════════════════════════════
## PART 3 — PHASE 0: SKILL INSTALLATION
## ═══════════════════════════════════════════

Run this ONCE before starting the project. These make Claude Code smarter.

### 3.1 — MCP Servers (Paste into Claude Code terminal)

**Context7 MCP** — Prevents hallucination of outdated APIs. Use this to verify Three.js, GSAP, Framer Motion syntax before writing code.
```bash
npx -y @upstash/context7-mcp@latest
```

**Sequential Thinking MCP** — Forces step-by-step systematic reasoning. Use when planning complex 3D scenes or animation sequences.
```bash
npx -y @modelcontextprotocol/server-sequential-thinking
```

**Memory MCP** — Stores project context across sessions. Saves key decisions, file paths, and progress.
```bash
npx -y @modelcontextprotocol/server-memory
```

**Puppeteer MCP** — Lets Claude Code open a browser and visually verify the site before declaring a phase done.
```bash
npx -y @modelcontextprotocol/server-puppeteer
```

**Add to Claude Code config file** (`%APPDATA%\Claude\claude_desktop_config.json` on Windows):
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### 3.2 — Create the Project

```bash
# From D:\PORTFOLIOS\
npm create vite@latest deepnarayan-portfolio -- --template react
cd deepnarayan-portfolio

# Initialize Git immediately — never lose work
git init
git add .
git commit -m "chore: vite scaffold"
```

### 3.3 — Install All Dependencies (One command block)

```bash
# 3D rendering — Three.js ecosystem (100k+ stars combined)
npm install three @react-three/fiber @react-three/drei

# Post-processing effects (bloom, chromatic aberration)
npm install @react-three/postprocessing

# GSAP scroll animations (17k+ stars, industry gold standard)
npm install gsap @gsap/react

# Smooth scroll (Lenis — 8k+ stars, best-in-class)
npm install lenis

# React animation library (Framer Motion — 24k+ stars)
npm install framer-motion

# Tailwind CSS (81k+ stars)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Utilities
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Commit
git add .
git commit -m "chore: all dependencies installed"
```

**VERIFY:** Run `cat package.json` and confirm every package above is listed.

---

## ════════════════════════════════════
## PART 4 — TECHNOLOGY DECISIONS
## ════════════════════════════════════

| Layer | Tool | GitHub Stars | Decision Reason |
|---|---|---|---|
| Framework | React 18 + Vite | 67k | Fast HMR, component model |
| 3D engine | Three.js | 103k | Industry standard WebGL |
| React+3D bridge | @react-three/fiber | 27k | React lifecycle + Three.js |
| 3D helpers | @react-three/drei | 8k | Orbit, Float, Stars, etc. |
| Post-processing | @react-three/postprocessing | 1.5k | Bloom, depth effects |
| Scroll animation | GSAP + ScrollTrigger | 17k | Precision, performance |
| Smooth scroll | Lenis | 8k | Natural feel, no jQuery |
| UI animation | Framer Motion | 24k | Page transitions, micro-anim |
| Styling | Tailwind CSS | 81k | Utility-first, no CSS fights |
| Hosting | Netlify | — | Free, CDN, HTTPS, no credit card |
| Source | GitHub | — | Public repo = portfolio proof |

---

## ════════════════════════════════════
## PART 5 — CONTENT SPECIFICATION
## (Locked — Do Not Invent or Change)
## ════════════════════════════════════

### 5.1 — Personal Info
```
Name:      Deep Narayan Yadav
Role:      AI Gameplay Data Annotator | Remote Contractor
Email:     deepnarayanofficial241@gmail.com
Phone:     +91 9019206025
Location:  India (Remote)
LinkedIn:  linkedin.com/in/deepnarayanyadav
```

### 5.2 — Hardware Specs (show as tech readiness)
```
OS:         Windows 11
CPU:        Intel Core i7-14700HX
GPU:        NVIDIA GeForce RTX 5060 (8 GB)
RAM:        32 GB
Internet:   150 Mbps (stable)
Recording:  OBS Studio & NVIDIA ShadowPlay
Output:     1080p / High-FPS
Storage:    Google Drive, OneDrive, Cloud
Input:      Keyboard & Mouse / DualShock Controller
```

### 5.3 — Games (only list, no invented experience)
```
Open-World:    Minecraft, GTA V, Ghost of Tsushima
Action RPG:    Elden Ring, Black Myth: Wukong, God of War
Story:         The Last of Us Part I & II, Uncharted Series, Marvel's Spider-Man Series
Horror:        Resident Evil Series
Multiplayer:   Valorant
```

### 5.4 — Professional Experience
```
Job 1:  Admission & Social Media Manager @ MedFit MBBS  (Sep 2024 – Nov 2025)
Job 2:  Admin Head & Marketing Executive @ Trimurty Group of Colleges (Jul 2023 – Jan 2024)
Job 3:  Telecaller & Meta Ads Specialist @ MW Consultancy (May 2022 – Oct 2023)
Job 4:  Video Editor & Content Writer @ Excel CV (Jul 2021 – Dec 2021)
Job 5:  SEO Content Writer @ Plant Made (Mar 2021 – Jun 2021)
```

### 5.5 — Education
```
Degree: Bachelor of Commerce (B.Com.)
College: LCIT College, Atal Bihari Vajpayee Vishwavidyalaya
CGPA: 7.60
```

### 5.6 — Languages
```
English: Professional Working Proficiency
Hindi:   Native
```

---

## ══════════════════════════════════════════════
## PART 6 — DESIGN SPECIFICATION
## (Distinctive — Not a Template. Must Feel Custom)
## ══════════════════════════════════════════════

### 6.1 — Visual Concept: "Mission Briefing"

This portfolio must feel like a **classified mission briefing screen** from a tactical game — the intersection of a data analyst's dashboard and a game HUD. Not generic "dark gaming" (that's the cliché). Think: The interface a Ubisoft AI team would use to review annotation tasks.

Key visual traits:
- Scanlines and grid-overlay texture (subtle, not 90s retro — modern military HUD)
- Data readout typography — specs feel like telemetry, not feature lists
- Accent animations triggered by scroll, not decoration
- The 3D scene = a floating annotation interface in space, not just a logo

### 6.2 — Color System
```css
:root {
  --bg-void:      #050810;   /* Almost black, slight blue tint */
  --bg-panel:     #0D1526;   /* Panel/card backgrounds */
  --bg-glass:     rgba(13,21,38,0.75); /* Glassmorphism panels */
  --accent-core:  #1D6FA4;   /* Primary blue (matches resume) */
  --accent-glow:  #38BDF8;   /* Neon cyan glow */
  --accent-gold:  #F59E0B;   /* Gaming gold — used sparingly */
  --accent-green: #10B981;   /* Status/online indicators */
  --text-primary: #E2E8F0;   /* Near white */
  --text-muted:   #64748B;   /* Secondary text */
  --text-data:    #94A3B8;   /* Spec/data text */
  --border-dim:   rgba(56,189,248,0.12); /* Subtle blue borders */
  --border-glow:  rgba(56,189,248,0.35); /* Hover glow borders */
  --scan-line:    rgba(56,189,248,0.025); /* Scanline overlay */
}
```

### 6.3 — Typography
```
Display:  "Space Grotesk" — Bold 700/800 — For name, section titles
         Tight tracking (-0.02em), uppercase for headers
Body:     "Inter" — Regular 400, Medium 500 — For descriptions
Data:     "JetBrains Mono" — For specs, file sizes, tech values
```
Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
```

### 6.4 — The Signature Element (One Unforgettable Thing)
**Floating Annotation Canvas** in the Hero section:
- A 3D screen/monitor floating in void space
- On the screen: an animated gameplay annotation UI (boxes, labels, timestamps)
- The annotation boxes appear and label themselves in real-time
- This DIRECTLY visualises what the job is — not just gaming, but annotating
- It's proof, not decoration

### 6.5 — Animation Principles
- Lenis: ease = 0.075, duration = 1.2 — silk smooth scroll
- GSAP ScrollTrigger: All section reveals, parallax, line drawing
- R3F: Hero 3D scene, Floating elements, ambient particle field
- Framer Motion: Hover states, nav transitions, card micro-interactions
- Never stack animations — one primary effect per scroll zone
- Reduce-motion: All animations must have `prefers-reduced-motion` fallback

### 6.6 — Layout Rules
- Max content width: 1280px
- Section padding: 120px top/bottom (desktop), 60px (mobile)
- Grid: 12-column CSS grid for internal layouts
- No centered text paragraphs — left-aligned = more readable, less generic
- Use white space aggressively — give elements room to breathe

---

## ═══════════════════════════════════════════
## PART 7 — FOLDER STRUCTURE
## ═══════════════════════════════════════════

Create exactly this structure from the start:

```
deepnarayan-portfolio/
├── CLAUDE.md                       ← This file
├── STATUS.md                       ← Session state (create after Phase 1)
├── DECISIONS.md                    ← Decision log (create after Phase 1)
├── public/
│   ├── favicon.ico
│   ├── og-image.png                ← 1200x630 social share image
│   └── textures/
│       └── noise.png               ← Subtle noise texture for depth
├── src/
│   ├── main.jsx                    ← Lenis init + React mount
│   ├── App.jsx                     ← All sections assembled
│   ├── index.css                   ← CSS variables + Tailwind + global
│   │
│   ├── components/
│   │   ├── Nav/
│   │   │   └── Nav.jsx             ← Fixed top nav with progress indicator
│   │   ├── Hero/
│   │   │   ├── Hero.jsx            ← Section wrapper
│   │   │   ├── HeroText.jsx        ← Name, role, CTA (Framer Motion)
│   │   │   └── HeroScene.jsx       ← R3F Canvas — Annotation Canvas 3D
│   │   ├── Setup/
│   │   │   └── Setup.jsx           ← Hardware specs with data readout animation
│   │   ├── Gaming/
│   │   │   └── Gaming.jsx          ← Game cards with 3D tilt effect
│   │   ├── Workflow/
│   │   │   └── Workflow.jsx        ← Annotation process — THE KEY SECTION
│   │   ├── Experience/
│   │   │   └── Experience.jsx      ← Job timeline with scroll-drawn line
│   │   ├── SampleWork/
│   │   │   └── SampleWork.jsx      ← Recording placeholders + video player
│   │   ├── Contact/
│   │   │   └── Contact.jsx         ← Email + availability
│   │   └── Footer/
│   │       └── Footer.jsx
│   │
│   ├── three/
│   │   ├── AnnotationCanvas.jsx    ← The hero 3D floating screen
│   │   ├── ParticleField.jsx       ← Background particle system
│   │   └── FloatingRings.jsx       ← Ambient decorative rings
│   │
│   ├── hooks/
│   │   ├── useLenis.js             ← Lenis instance (singleton)
│   │   ├── useScrollProgress.js    ← Page scroll 0-1 value
│   │   └── useMouseParallax.js     ← Mouse position for 3D parallax
│   │
│   └── lib/
│       ├── content.js              ← ALL text content exported as constants
│       └── utils.js                ← cn(), formatTime(), etc.
```

---

## ════════════════════════════════════════
## PART 8 — BUILD PHASES (DO IN ORDER)
## ════════════════════════════════════════

**Rule: Complete a phase fully before starting the next. Commit after each.**

---

### PHASE 1 — Foundation
**Goal:** Working skeleton, smooth scroll, CSS system.

Tasks:
- [ ] Configure `tailwind.config.js` with design tokens from Part 6
- [ ] Set CSS variables in `src/index.css`
- [ ] Import Google Fonts
- [ ] Set up Lenis in `src/main.jsx`:
```jsx
import Lenis from 'lenis'
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)
```
- [ ] Create `App.jsx` with all section components as empty placeholders
- [ ] Create `src/lib/content.js` with all content from Part 5
- [ ] Add global scanline overlay CSS

**Verify before commit:**
- `npm run dev` shows page, smooth scroll works
- No console errors
- CSS variables apply correctly

`git commit -m "feat: phase-1 foundation and smooth scroll"`

---

### PHASE 2 — Navigation
**Goal:** Fixed top nav that tracks scroll position.

Tasks:
- [ ] Fixed nav bar with name + section links
- [ ] Scroll progress bar (thin line under nav, fills as user scrolls)
- [ ] Active section highlight (uses Intersection Observer)
- [ ] Hamburger menu for mobile
- [ ] Nav background: transparent → glass blur on scroll

`git commit -m "feat: phase-2 navigation"`

---

### PHASE 3 — Hero Section (THE SHOWPIECE)
**Goal:** The Floating Annotation Canvas that nobody else has.

3D Scene (`src/three/AnnotationCanvas.jsx`):
- [ ] R3F Canvas, dark void background
- [ ] Floating glowing monitor/screen mesh (box geometry, emissive material)
- [ ] On the "screen" surface: animated plane with annotation UI texture
- [ ] Annotation boxes animate in: `gsap.to(box, { opacity: 1, scale: 1, stagger: 0.3 })`
- [ ] Surrounding floating geometry (icosahedron wireframes, slowly rotating)
- [ ] `<Stars>` from drei for background depth
- [ ] `<Float>` wrapper on main screen for gentle bob
- [ ] Bloom post-processing: glowing edges
- [ ] Camera parallax on mouse move using `useMouseParallax` hook

Hero Text (`src/components/Hero/HeroText.jsx`):
- [ ] Name in Space Grotesk 800, stagger letter reveal with Framer Motion
- [ ] Role subtitle with typing cursor effect
- [ ] Two CTAs: "View My Work ↓" and "Download Resume →" (links to PDF)
- [ ] Status badge: "● Available for Contract" (pulse animation, green dot)

**Verify:** 60fps in Chrome DevTools Performance tab. If below 60fps, reduce post-processing quality.

`git commit -m "feat: phase-3 hero 3D annotation canvas"`

---

### PHASE 4 — Technical Setup Section
**Goal:** Hardware specs that read like mission-critical telemetry.

Tasks:
- [ ] Section header: "OPERATOR SETUP" (mission-briefing language)
- [ ] Grid of spec cards, each with a progress bar (e.g. 32GB RAM bar at ~65% = "gaming headroom shown")
- [ ] Reveal on scroll: GSAP ScrollTrigger, stagger 0.08s per card
- [ ] Mono font for values (JetBrains Mono)
- [ ] Each card has a glow border on hover
- [ ] Include recording software icons (OBS, NVIDIA)

`git commit -m "feat: phase-4 tech setup section"`

---

### PHASE 5 — Gaming Experience Section
**Goal:** Transform the list into proof of depth.

Tasks:
- [ ] Category cards with 3D tilt on hover (use Framer Motion `useMotionValue` + `useTransform`)
- [ ] Each card expands on click to show "gaming depth" note (why it's relevant to annotation)
- [ ] Small annotation-relevant note per category:
  - Minecraft → "Complex spatial exploration, ideal for mapping and route annotation"
  - Elden Ring → "Dense NPC interaction trees, combat state annotation experience"
  - etc.
- [ ] Cards scroll in from alternating left/right

`git commit -m "feat: phase-5 gaming experience"`

---

### PHASE 6 — Annotation Workflow Section ⭐
**Goal:** Fill the #1 gap. Show the recruiter you understand the actual job.

This is the most important section. It turns "no annotation experience" into "I've mapped this process precisely."

Tasks:
- [ ] Section title: "HOW I ANNOTATE" 
- [ ] Animated 4-step workflow (scroll triggers each step):

**Step 1 — BRIEF**
Icon: Document. Text: "Read task assignment, understand game, configure session parameters, verify recording settings before starting."

**Step 2 — CAPTURE**
Icon: Record button. Text: "Launch game, confirm OBS/ShadowPlay active, execute assigned task (exploration, interaction, objective-play), maintain stable 60+ FPS throughout."

**Step 3 — ANNOTATE**
Icon: Tag/label. Text: "Review footage, mark key moments, log timestamps, apply structured labels. Follows exact schema provided — no improvisation."

**Step 4 — DELIVER**
Icon: Upload. Text: "Quality check for lag, audio sync, resolution accuracy. Package with session notes and upload via cloud storage within deadline."

- [ ] A GSAP-animated connecting line draws between steps as user scrolls
- [ ] Each step card has a subtle "checkpoint ✓" that appears when it enters viewport
- [ ] Below the steps: "Quality Commitments" — small badges: Zero Lag / 1080p Minimum / On-Time Delivery / Instruction Adherence

`git commit -m "feat: phase-6 annotation workflow section"`

---

### PHASE 7 — Professional Experience Section
**Goal:** Reframe past jobs as annotation-adjacent skills.

Tasks:
- [ ] Vertical timeline, scroll-triggered line draws downward
- [ ] Each job card reveals from the right on scroll
- [ ] Below each job: add a "Skill Bridge" note in smaller text:
  - MedFit: → "Structured content verification = annotation accuracy"
  - MW Consultancy: → "Script adherence = instruction following"
  - Excel CV: → "Client brief execution = task compliance"
- [ ] Date ranges in mono font

`git commit -m "feat: phase-7 experience timeline"`

---

### PHASE 8 — Sample Work Section
**Goal:** Placeholder now, real recordings later. Still looks credible.

Tasks:
- [ ] Grid of 3 "recording sample" cards
- [ ] Each card shows: Game thumbnail placeholder, duration badge, task type tag, FPS/resolution metadata
- [ ] Card labels:
  - "Sample 01 — Minecraft Cave Exploration — 18m 42s — 1080p / 60fps"
  - "Sample 02 — Open World Navigation — 24m 10s — 1080p / 60fps"  
  - "Sample 03 — Structured Interaction Task — 15m 00s — 1080p / 60fps"
- [ ] A "Play" button overlay that (if video is provided) opens a lightbox player
- [ ] Note below: "Full recordings available on request via Google Drive"
- [ ] "Download Resume PDF" button linking to the generated PDF

`git commit -m "feat: phase-8 sample work section"`

---

### PHASE 9 — Contact Section
**Goal:** Make it effortless to reach out.

Tasks:
- [ ] One-liner: "Ready to annotate. Available immediately."
- [ ] Large email address (click = mailto: link)
- [ ] Copy-to-clipboard button on email
- [ ] Availability status: "● Currently accepting contracts" (pulsing green)
- [ ] Links: LinkedIn, GitHub (portfolio repo)
- [ ] Location + timezone: "India (IST, UTC+5:30) — Flexible hours"

`git commit -m "feat: phase-9 contact section"`

---

### PHASE 10 — Polish & Performance
**Goal:** Make it feel premium, not built in a weekend.

Tasks:
- [ ] Custom cursor: Small crosshair cursor (subtle, not distracting)
- [ ] Page load: Stagger in of all hero elements (300ms delay after fonts load)
- [ ] All hover interactions feel responsive (< 100ms)
- [ ] `prefers-reduced-motion`: All GSAP animations wrapped in `mm.add()` check
- [ ] Lazy load R3F canvas (dynamic import) so initial page load is fast
- [ ] Add meta tags: title, description, og:image
- [ ] Lighthouse: Performance > 85, Accessibility > 90
- [ ] Test on Firefox, Chrome, Edge
- [ ] Test at 375px, 768px, 1280px, 1440px widths

`git commit -m "feat: phase-10 polish complete"`

---

## ═════════════════════════════════════
## PART 9 — DEPLOYMENT (Free + Professional)
## ═════════════════════════════════════

### Step 1: GitHub
```bash
# Create repo at github.com/[username]/deepnarayan-portfolio
git remote add origin https://github.com/[username]/deepnarayan-portfolio.git
git push -u origin main
```

### Step 2: Netlify (Recommended — no credit card needed)
1. Go to `netlify.com` → Sign up with GitHub (free)
2. "Add new site" → "Import from Git" → Select repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy → Gets URL like: `deepnarayan-yadav-portfolio.netlify.app`
5. In Netlify settings, rename site to: `deepnarayan-gaming` → `deepnarayan-gaming.netlify.app`

### Step 3: Verify Live URL
- Open site in incognito
- All sections load
- 3D scene works
- Smooth scroll works
- Mobile looks good

### What to put in resume/application:
```
Portfolio: https://deepnarayan-gaming.netlify.app
Source:    https://github.com/[username]/deepnarayan-portfolio
```

---

## ════════════════════════════════════════
## PART 10 — PHASE VERIFICATION CHECKLIST
## ════════════════════════════════════════

Run before EVERY commit:

```
CHECKLIST:
[ ] npm run build — zero errors, zero warnings (or only expected warnings)
[ ] npm run dev — opens in browser without crashing
[ ] Console: Zero red errors in browser DevTools
[ ] Visual: All sections visible and styled correctly  
[ ] Scroll: Lenis smooth scroll working (not native browser scroll)
[ ] 3D: WebGL canvas renders without errors
[ ] Mobile: Open DevTools → 375px width → No horizontal overflow
[ ] Links: All CTAs and nav links point to correct targets
[ ] Content: All text matches Part 5 EXACTLY (no invented content)
[ ] Performance: Chrome DevTools → Network → Load time < 4s on Fast 3G
```

---

## ══════════════════════════════════
## PART 11 — EMERGENCY RECOVERY
## ══════════════════════════════════

If something breaks catastrophically:

```bash
# See all commits
git log --oneline

# Go back to last working commit
git checkout [commit-hash]

# Or throw away all uncommitted changes
git checkout .
git clean -fd

# Reinstall if node_modules corrupted
rm -rf node_modules
npm install
```

If context is lost entirely:
1. Read `STATUS.md` — tells you current state
2. Read `DECISIONS.md` — tells you why things are the way they are
3. Run `git log --oneline` — tells you what's done
4. Run `npm run dev` — shows you what currently works
5. Continue from where STATUS.md says "Next step"

---

## END OF CLAUDE.md
## This file is the single source of truth.
## When in doubt, re-read it.
