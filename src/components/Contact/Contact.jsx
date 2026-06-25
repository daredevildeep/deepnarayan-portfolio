import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Mail, Linkedin, Github, MapPin } from 'lucide-react'
import { PERSONAL } from '../../lib/content'
import Section from '../Section'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable — no-op, mailto still works.
    }
  }

  return (
    <Section id="contact" index="06" eyebrow="Contact" title="Ready to Annotate">
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
                onClick={copyEmail}
                data-cursor="hover"
                className="grid h-9 w-9 shrink-0 place-items-center rounded border border-[var(--border-dim)] text-text-muted transition-colors hover:border-[var(--border-glow)] hover:text-accent-glow"
                aria-label="Copy email"
              >
                {copied ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
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

          <div className="mt-5 flex items-center gap-2 border-t border-[var(--border-dim)] pt-5 text-sm text-text-muted">
            <MapPin size={15} className="text-accent-gold" />
            India (IST, UTC+5:30) — Flexible hours
          </div>
        </div>
      </div>
    </Section>
  )
}
