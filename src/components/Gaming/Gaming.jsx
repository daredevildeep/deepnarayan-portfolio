import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { GAMES } from '../../lib/content'
import { useReveal } from '../../hooks/useReveal'
import { prefersReducedMotion } from '../../lib/utils'
import Section from '../Section'

function GameCard({ game, index, expanded, onToggle }) {
  const reduced = prefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  const handleMove = (e) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Alternate the entrance direction (Part 5: scroll in from alternating sides).
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      data-reveal
      initial={reduced ? false : { opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        data-cursor="hover"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass-panel glow-border-hover w-full rounded-xl p-6 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest text-text-primary">
              {game.category}
            </h3>
          </div>
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border-glow)] text-accent-glow transition-transform duration-300 ${
              expanded ? 'rotate-45' : ''
            }`}
          >
            <Plus size={16} />
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {game.titles.map((t) => (
            <li
              key={t}
              className="rounded border border-[var(--border-dim)] px-2.5 py-1 font-mono text-xs text-text-data"
            >
              {t}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-4 border-t border-[var(--border-dim)] pt-4 text-sm text-text-data">
                <span className="font-mono text-accent-glow">{'// '}</span>
                {game.note}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export default function Gaming() {
  const ref = useReveal()
  const [open, setOpen] = useState(null)

  return (
    <Section
      id="games"
      ariaLabel="Gaming experience and annotation relevance"
      index="02"
      eyebrow="Game Library"
      title="Annotation Depth"
    >
      <p className="mb-10 max-w-2xl text-text-data">
        Breadth across genres means familiarity with diverse game states,
        mechanics, and UIs — the context that makes labeling fast and accurate.
        Tap a category for why it matters to annotation.
      </p>
      <div ref={ref} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {GAMES.map((game, i) => (
          <GameCard
            key={game.category}
            game={game}
            index={i}
            expanded={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  )
}
