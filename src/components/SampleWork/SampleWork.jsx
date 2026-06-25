import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  X,
  Clapperboard,
  Download,
  HardDriveDownload,
  Send,
  Check,
} from 'lucide-react'
import { SAMPLES, RIG_STATUS, PERSONAL } from '../../lib/content'
import { useReveal } from '../../hooks/useReveal'
import Section from '../Section'

/** Prefilled "request this sample" mailto link. */
function requestHref(sample) {
  const label = `${sample.game} ${sample.title}`
  const subject = `Sample Request — ${label}`
  const body = `Hi Deep, I'd like to see the sample recording for the ${label.toLowerCase()} task.`
  return `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`
}

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
                {sample.game} — {sample.title}
              </p>
              <p className="mt-2 max-w-sm px-6 text-sm text-text-muted">
                Full recording available on request via Google Drive. Reach out
                and I'll share the {sample.spec} capture.
              </p>
              <a
                href={requestHref(sample)}
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
    <div
      data-reveal
      className="glass-panel glow-border-hover group flex flex-col overflow-hidden rounded-xl"
    >
      {/* Thumbnail — click to preview / request info */}
      <button
        type="button"
        onClick={onPlay}
        data-cursor="hover"
        aria-label={`Preview ${sample.game} ${sample.title}`}
        className="relative grid aspect-video place-items-center overflow-hidden bg-gradient-to-br from-panel to-void"
      >
        {/* faux scanline shimmer */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(56,189,248,0.05)_0,rgba(56,189,248,0.05)_1px,transparent_1px,transparent_4px)]" />
        <Clapperboard size={34} className="text-text-muted transition-colors group-hover:text-accent-glow" />

        {/* duration badge */}
        <span className="absolute bottom-3 right-3 rounded bg-void/80 px-2 py-1 font-mono text-[10px] text-text-data">
          {sample.duration} · {sample.spec}
        </span>

        {/* play overlay */}
        <span className="absolute inset-0 grid place-items-center bg-void/0 transition-colors group-hover:bg-void/40">
          <span className="grid h-14 w-14 translate-y-2 place-items-center rounded-full border border-[var(--border-glow)] bg-void/70 text-accent-glow opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Play size={20} className="ml-0.5" />
          </span>
        </span>
      </button>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-5">
        <span className="eyebrow">{sample.id}</span>
        <h3 className="mt-2 font-display text-lg font-bold tracking-tightest text-text-primary">
          {sample.game} — {sample.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-text-muted">
          <span className="rounded border border-[var(--border-dim)] px-2 py-0.5 text-accent-glow/80">
            {sample.task}
          </span>
          <span>{sample.duration} / {sample.spec}</span>
        </div>

        {/* Availability status */}
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
            Available on request
          </span>
        </div>

        {/* Request CTA */}
        <a
          href={requestHref(sample)}
          data-cursor="hover"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded border border-[var(--border-glow)] px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-accent-glow transition-colors hover:bg-accent-glow/10"
        >
          <Send size={13} />
          Request This Sample
        </a>
      </div>
    </div>
  )
}

/** HUD-style readiness panel above the sample grid (Part C2). */
function RigStatus() {
  return (
    <div className="glass-panel mb-8 rounded-xl border border-[var(--border-dim)] bg-void/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold uppercase tracking-tightest text-text-primary">
            Capture Rig — Ready
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
            Online
          </span>
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {RIG_STATUS.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 font-mono text-xs text-accent-glow"
          >
            <Check size={14} className="shrink-0 text-accent-green" />
            <span className="text-text-data">{item}</span>
          </li>
        ))}
      </ul>
    </div>
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
      <p className="mb-8 max-w-2xl text-text-data">
        Representative session types, available on request. Real recordings
        attach here as they're produced — each ships at 1080p / 60fps with
        session notes.
      </p>

      <RigStatus />

      <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((s) => (
          <SampleCard key={s.id} sample={s} onPlay={() => setActive(s)} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <HardDriveDownload size={16} className="text-accent-glow" />
          Full session recordings delivered via Google Drive within 24 hours of
          task receipt.
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
