import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals direct children matching `selector` on scroll with a stagger.
 * Returns a ref to attach to the container.
 *
 * Under reduced-motion, elements are shown immediately (no transform).
 */
export function useReveal({ selector = '[data-reveal]', stagger = 0.08, y = 28 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll(selector)
    if (!targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [selector, stagger, y])

  return ref
}
