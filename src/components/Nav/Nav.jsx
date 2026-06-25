import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SECTIONS, PERSONAL } from '../../lib/content'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToId, cn } from '../../lib/utils'

export default function Nav() {
  const progress = useScrollProgress()
  const ids = useMemo(() => SECTIONS.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setScrolled(progress > 0.01)
  }, [progress])

  const handleNav = (id) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'glass-panel' : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('top')}
          className="group flex items-center gap-2 font-display text-sm font-bold uppercase tracking-tightest"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
          <span className="text-text-primary">DN</span>
          <span className="text-accent-glow">/</span>
          <span className="hidden text-text-muted transition-colors group-hover:text-text-data sm:inline">
            Yadav
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleNav(s.id)}
                className={cn(
                  'relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors',
                  active === s.id
                    ? 'text-accent-glow'
                    : 'text-text-muted hover:text-text-data'
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded bg-accent-glow/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="hidden rounded border border-[var(--border-glow)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-glow transition-colors hover:bg-accent-glow/10 sm:inline-block"
          >
            Hire
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="-mr-2 grid h-11 w-11 place-items-center text-text-data md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <div className="relative h-0.5 w-full bg-[var(--border-dim)]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-core to-accent-glow shadow-glow"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-panel overflow-hidden md:hidden"
          >
            <ul className="container-content flex flex-col py-4">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav(s.id)}
                    className={cn(
                      'w-full py-3 text-left font-mono text-sm uppercase tracking-widest',
                      active === s.id ? 'text-accent-glow' : 'text-text-data'
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
