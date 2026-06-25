import { Suspense, lazy } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroText from './HeroText'

// Lazy-load the WebGL scene so first paint isn't blocked by Three.js (Part 10).
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D scene fills the section, text overlays on the left */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="grid h-full w-full place-items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Initializing canvas…
              </span>
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

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
