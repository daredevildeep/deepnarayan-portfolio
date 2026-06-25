import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view using IntersectionObserver.
 * Pass the list of section ids (in document order).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}
