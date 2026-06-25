import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * Fixed bottom-right "back to top" control. Fades in after 400px of scroll and
 * scrolls smoothly to the top via Lenis (falling back to native scroll). (D5)
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setVisible(y > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          data-cursor="hover"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="glass-panel fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-[var(--border-glow)] text-accent-glow shadow-glow transition-colors hover:bg-accent-glow/10"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
