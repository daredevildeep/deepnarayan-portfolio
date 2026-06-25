import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroText from './HeroText'
import HeroStatic from './HeroStatic'
import HeroHud from './HeroHud'

// Lazy-load the WebGL scene so first paint isn't blocked by Three.js (Part 10).
// On mobile we never import it at all (A7).
const HeroScene = lazy(() => import('./HeroScene'))

const DESKTOP_QUERY = '(min-width: 768px)'

export default function Hero() {
  const sectionRef = useRef(null)
  // 0 at hero top, 1 once scrolled one viewport down. Drives the in-canvas
  // camera push / scan speed / extra-box reveal without drei ScrollControls
  // (which would hijack the page's Lenis scroll). Read in useFrame via ref.
  const scrollRef = useRef(0)
  // Shared channel for the in-canvas FPS meter -> HTML HUD.
  const hudRef = useRef({ fps: 0 })
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  )
  const [inView, setInView] = useState(true)

  // Track viewport size so we swap to the static SVG on phones (A7).
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Pause the WebGL render loop when the hero scrolls out of view (A8).
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Track scroll progress through the hero (0 -> 1) for the scene interaction.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      const denom = el.offsetHeight - window.innerHeight
      const p = -top / (denom > 0 ? denom : window.innerHeight)
      scrollRef.current = Math.min(1, Math.max(0, p))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction — Deep Narayan Yadav AI Gameplay Annotator"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Authoritative, scraper-friendly heading (visually hidden). The visible
          title in HeroText is per-letter animated spans, so this carries the
          clean accessible name (B5). */}
      <h1 className="sr-only">
        Deep Narayan Yadav — AI Gameplay Data Annotator, Remote Contractor
      </h1>

      {/* 3D scene (desktop) / static SVG (mobile) fills the section */}
      <div className="absolute inset-0 z-0">
        {isDesktop ? (
          <Suspense
            fallback={
              <div className="grid h-full w-full place-items-center bg-void">
                <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  Initializing feed…
                </span>
              </div>
            }
          >
            <HeroScene active={inView} scrollRef={scrollRef} hudRef={hudRef} />
          </Suspense>
        ) : (
          <HeroStatic />
        )}
      </div>

      {/* Live-session HUD over the canvas (desktop only) */}
      {isDesktop && <HeroHud hudRef={hudRef} />}

      {/* Left-side gradient so text stays legible over the scene */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-void via-void/80 to-transparent" />

      <div className="container-content relative z-10 pt-24">
        <HeroText />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown size={16} className="animate-floaty" />
        </div>
      </div>
    </section>
  )
}
