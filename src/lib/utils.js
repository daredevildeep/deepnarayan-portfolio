import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names without Tailwind conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Format seconds as "Mm Ss" — small helper for media durations. */
export function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

/** True when the user prefers reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Smooth-scroll to a section id using the global Lenis instance if present. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
