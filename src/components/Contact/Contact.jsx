import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Mail, Phone, Linkedin, Github, MapPin, Clock } from 'lucide-react'
import { PERSONAL } from '../../lib/content'
import Section from '../Section'

const IST_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

export default function Contact() {
  // Track which field was last copied so its icon flips to a check (D3).
  const [copiedKey, setCopiedKey] = useState(null)
  const [istTime, setIstTime] = useState(() => IST_FORMAT.format(new Date()))

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500)
    } catch {
      // Clipboard unavailable — no-op, the mailto/tel link still works.
    }
  }

  // Live IST clock for US recruiters (D2).
  useEffect(() => {
    const id = setInterval(() => setIstTime(IST_FORMAT.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Section
      id="contact"
      ariaLabel="Contact Deep Narayan Yadav"
      index="06"
      eyebrow="Contact"
      title="Ready to Annotate"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="max-w-xl text-lg text-text-data">
            Available immediately for annotation contracts. Tell me the game, the
            schema, and the deadline — I'll handle capture and labeling to spec.
          </p>

          {/* Email block */}
          <div className="mt-8">
            <span className="data-label">Direct line</span>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="break-all font-display text-2xl font-bold tracking-tightest text-text-primary transition-colors hover:text-accent-glow sm:text-3xl"
              >
                {PERSONAL.email}
              </a>
              <button
                onClick={() => copy(PERSONAL.email, 'email')}
                data-cursor="hover"
                className="grid h-9 w-9 shrink-0 place-items-center rounded border border-[var(--border-dim)] text-text-muted transition-colors hover:border-[var(--border-glow)] hover:text-accent-glow"
                aria-label="Copy email"
              >
                {copiedKey === 'email' ? (
                  <Check size={16} className="text-accent-green" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Phone block */}
          <div className="mt-5">
            <span className="data-label">Phone</span>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${PERSONAL.phone.replace(/\s+/g, '')}`}
                className="font-mono text-lg text-text-primary transition-colors hover:text-accent-glow"
              >
                {PERSONAL.phone}
              </a>
              <button
                onClick={() => copy(PERSONAL.phone, 'phone')}
                data-cursor="hover"
                className="grid h-9 w-9 shrink-0 place-items-center rounded border border-[var(--border-dim)] text-text-muted transition-colors hover:border-[var(--border-glow)] hover:text-accent-glow"
                aria-label="Copy phone number"
              >
                {copiedKey === 'phone' ? (
                  <Check size={16} className="text-accent-green" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent-green">
              Currently accepting contracts
            </span>
          </motion.div>
        </div>

        {/* Links + meta */}
        <div className="glass-panel rounded-xl p-6">
          <div className="space-y-3">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="glow-border-hover flex items-center gap-3 rounded-lg border border-[var(--border-dim)] p-4 text-text-data"
            >
              <Mail size={18} className="text-accent-glow" />
              <span className="font-mono text-sm">Email</span>
              <span className="ml-auto truncate text-xs text-text-muted">{PERSONAL.email}</span>
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border-hover flex items-center gap-3 rounded-lg border border-[var(--border-dim)] p-4 text-text-data"
            >
              <Linkedin size={18} className="text-accent-glow" />
              <span className="font-mono text-sm">LinkedIn</span>
              <span className="ml-auto truncate text-xs text-text-muted">in/deepnarayanyadav</span>
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border-hover flex items-center gap-3 rounded-lg border border-[var(--border-dim)] p-4 text-text-data"
            >
              <Github size={18} className="text-accent-glow" />
              <span className="font-mono text-sm">GitHub</span>
              <span className="ml-auto truncate text-xs text-text-muted">Portfolio repo</span>
            </a>
          </div>

          <div className="mt-5 space-y-2 border-t border-[var(--border-dim)] pt-5">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <MapPin size={15} className="text-accent-gold" />
              India (IST, UTC+5:30) — Flexible hours
            </div>
            <div className="flex items-center gap-2 text-sm text-text-data">
              <Clock size={15} className="text-accent-glow" />
              Current time in India:{' '}
              <span className="font-mono text-text-primary" aria-live="off">
                {istTime} IST
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
