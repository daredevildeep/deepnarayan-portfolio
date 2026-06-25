import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { PERSONAL } from '../../lib/content'
import { scrollToId } from '../../lib/utils'

const ROLES = [
  'AI Gameplay Data Annotator',
  'Remote Contract Operator',
  'Structured Labeling • 1080p / 60fps',
]

/** Typewriter that cycles the role lines. */
function useTypewriter(words, { type = 65, pause = 1600, del = 35 } = {}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[i % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((v) => v + 1)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1)
          )
        },
        deleting ? del : type
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, i, words, type, pause, del])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
}
const letter = {
  hidden: { opacity: 0, y: '0.5em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function AnimatedWord({ text }) {
  return (
    <motion.span variants={container} initial="hidden" animate="show" className="inline-block">
      {text.split('').map((ch, idx) => (
        <motion.span key={idx} variants={letter} className="inline-block">
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HeroText() {
  const typed = useTypewriter(ROLES)

  return (
    <div className="relative z-10 max-w-2xl">
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-dim)] bg-[var(--bg-glass)] px-3 py-1.5"
      >
        <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent-green">
          Available from July 2026 — Immediately
        </span>
      </motion.div>

      {/* Visible name — decorative per-letter animation. The accessible H1 lives
          in Hero.jsx (sr-only), so this is aria-hidden to avoid a duplicate
          heading and garbled per-span text for scrapers/AT (B5). */}
      <div
        aria-hidden="true"
        className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tightest text-text-primary sm:text-6xl md:text-7xl"
      >
        <AnimatedWord text="Deep Narayan" />
        <br />
        <span className="text-gradient">
          <AnimatedWord text="Yadav" />
        </span>
      </div>

      {/* Typed role */}
      <p className="mt-6 font-mono text-base text-accent-glow sm:text-lg">
        <span className="text-text-muted">&gt;_ </span>
        {typed}
        <span className="ml-0.5 inline-block w-[2px] -translate-y-[1px] bg-accent-glow align-middle animate-blink">
          &nbsp;
        </span>
      </p>

      <p className="mt-5 max-w-xl text-text-data">
        Remote contractor with an RTX-powered capture rig and a precise,
        schema-driven annotation workflow. I turn gameplay into clean,
        structured training data — on time, to spec.
      </p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-9 flex flex-wrap items-center gap-4"
      >
        <button
          onClick={() => scrollToId('samples')}
          className="group inline-flex items-center gap-2 rounded bg-accent-core px-6 py-3 font-mono text-sm uppercase tracking-widest text-white shadow-glow transition-colors hover:bg-accent-glow hover:text-void"
        >
          View My Work
          <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
        </button>
        <a
          href={PERSONAL.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded border border-[var(--border-glow)] px-6 py-3 font-mono text-sm uppercase tracking-widest text-accent-glow transition-colors hover:bg-accent-glow/10"
        >
          Download Resume
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </div>
  )
}
