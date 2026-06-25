import { useEffect, useState } from 'react'

/**
 * Returns page scroll progress as a 0–1 value.
 * Listens to Lenis when available, otherwise falls back to native scroll.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const compute = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0)
    }

    const lenis = window.__lenis
    if (lenis) {
      const onScroll = ({ progress }) => setProgress(progress ?? 0)
      lenis.on('scroll', onScroll)
      compute()
      return () => lenis.off('scroll', onScroll)
    }

    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    compute()
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return progress
}
