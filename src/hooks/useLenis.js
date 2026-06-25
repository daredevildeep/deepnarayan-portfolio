import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes a singleton Lenis smooth-scroll instance and exposes it on
 * window.__lenis so non-React helpers (scrollToId) can drive it.
 * Silk-smooth config per CLAUDE.md Part 6.5 (duration 1.2).
 *
 * Lenis is driven by GSAP's ticker (a single shared RAF loop) instead of its
 * own requestAnimationFrame — this keeps scroll and every ScrollTrigger in
 * lockstep on one frame clock and removes a redundant loop (A3). ScrollTrigger
 * is also told to update on Lenis scroll so pinned/scrubbed animations stay in
 * sync with the smoothed position. Disabled entirely under reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    window.__lenis = lenis

    // Keep ScrollTrigger in sync with the smoothed scroll position.
    lenis.on('scroll', ScrollTrigger.update)

    // One ticker to rule them all: GSAP drives Lenis (seconds → ms).
    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
