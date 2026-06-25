import { PERSONAL } from '../../lib/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-dim)] py-10">
      <div className="container-content flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-tightest text-text-primary">
            {PERSONAL.name}
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            {PERSONAL.role} — {PERSONAL.location}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-dot" />
          System online — built with React, Three.js & GSAP
        </div>
      </div>
    </footer>
  )
}
