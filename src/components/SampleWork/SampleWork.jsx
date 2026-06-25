import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Clapperboard, Download, HardDriveDownload } from 'lucide-react'
import { SAMPLES, PERSONAL } from '../../lib/content'
import { useReveal } from '../../hooks/useReveal'
import Section from '../Section'

function Lightbox({ sample, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-void/90 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[var(--border-dim)] bg-void/70 text-text-data hover:text-accent-glow"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {sample.src ? (
          <video src={sample.src} controls autoPlay className="aspect-video w-full bg-black" />
        ) : (
          <div className="grid aspect-video w-full place-items-center bg-gradient-to-br from-panel to-void">
            <div className="text-center">
              <Clapperboard size={40} className="mx-auto text-accent-glow/60" />
              <p className="mt-4 font-display text-lg font-bold tracking-tightest text-text-primary">
                {sample.title}
              </p>
              <p className="mt-2 max-w-sm px-6 text-sm text-text-muted">
                Full recording available on request via Google Drive. Reach out
                and I'll share the {sample.spec} capture.
              </p>
              <a
                href={`mailto:${PERSONAL.email}?subject=Sample request: ${encodeURIComponent(
                  sample.title
                )}`}
                className="mt-5 inline-flex items-center gap-2 rounded border border-[var(--border-glow)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-glow hover:bg-accent-glow/10"
              >
                Request Recording
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function SampleCard({ sample, onPlay }) {
  return (
    <button
      data-reveal
      data-cursor="hover"
      onClick={onPlay}
      className="glass-panel glow-border-hover group block overflow-hidden rounded-xl text-left"
    >
      {/* Thumbnail */}
      <div className="relative grid aspect-video place-items-center overflow-hidden bg-gradient-to-br from-panel to-void">
        {/* faux scanline shimmer */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(56,189,248,0.05)_0,rgba(56,189,248,0.05)_1px,transparent_1px,transparent_4px)]" />
        <Clapperboard size={34} className="text-text-muted transition-colors group-hover:text-accent-glow" />

        {/* duration badge */}
        <span className="absolute bottom-3 right-3 rounded bg-void/80 px-2 py-1 font-mono text-[10px] text-text-data">
          {sample.duration}
        </span>

        {/* play overlay */}
        <span className="absolute inset-0 grid place-items-center bg-void/0 transition-colors group-hover:bg-void/40">
          <span className="grid h-14 w-14 translate-y-2 place-items-center rounded-full border border-[var(--border-glow)] bg-void/70 text-accent-glow opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Play size={20} className="ml-0.5" />
          </span>
        </span>
      </div>

      {/* Meta */}
      <div className="p-5">
        <span className="eyebrow">{sample.id}</span>
        <h3 className="mt-2 font-display text-lg font-bold tracking-tightest text-text-primary">
          {sample.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-text-muted">
          <span className="rounded border border-[var(--border-dim)] px-2 py-0.5 text-accent-glow/80">
            {sample.task}
          </span>
          <span>{sample.spec}</span>
        </div>
      </div>
    </button>
  )
}

export default function SampleWork() {
  const ref = useReveal()
  const [active, setActive] = useState(null)

  return (
    <Section
      id="samples"
      ariaLabel="Sample work and recordings"
      index="05"
      eyebrow="Sample Work"
      title="Capture Reels"
    >
      <p className="mb-10 max-w-2xl text-text-data">
        Representative session types. Live placeholders today — real recordings
        attach here as they're produced. Each ships at 1080p / 60fps with session
        notes.
      </p>

      <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((s) => (
          <SampleCard key={s.id} sample={s} onPlay={() => setActive(s)} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <HardDriveDownload size={16} className="text-accent-glow" />
          Full recordings available on request via Google Drive.
        </p>
        <a
          href={PERSONAL.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded bg-accent-core px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white shadow-glow transition-colors hover:bg-accent-glow hover:text-void"
        >
          <Download size={15} />
          Download Resume PDF
        </a>
      </div>

      <AnimatePresence>
        {active && <Lightbox sample={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}
