import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Circle, Tag, Upload, Check } from 'lucide-react'
import { WORKFLOW, QUALITY_COMMITMENTS, ANNOTATION_TABLE } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'
import Section from '../Section'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { FileText, Circle, Tag, Upload }

export default function Workflow() {
  const root = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const steps = el.querySelectorAll('[data-step]')
    const checks = el.querySelectorAll('[data-check]')
    const line = lineRef.current

    if (prefersReducedMotion()) {
      gsap.set(steps, { opacity: 1, y: 0 })
      gsap.set(checks, { scale: 1, opacity: 1 })
      if (line) line.style.strokeDashoffset = 0
      return
    }

    const ctx = gsap.context(() => {
      // Draw the connecting line as the user scrolls through the section.
      if (line) {
        const len = line.getTotalLength()
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        })
      }

      // Reveal each step + pop its checkpoint when it enters view.
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 80%' },
          }
        )
        const check = checks[i]
        if (check) {
          gsap.fromTo(
            check,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: { trigger: step, start: 'top 70%' },
            }
          )
        }
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Section
      id="workflow"
      ariaLabel="Annotation workflow process"
      index="03"
      eyebrow="Process"
      title="How I Annotate"
    >
      <p className="mb-14 max-w-2xl text-text-data">
        No annotation guesswork — a repeatable, four-stage pipeline that maps the
        actual job from brief to delivery. Precision and instruction-adherence at
        every step.
      </p>

      <div ref={root} className="relative">
        {/* Connector line (desktop): vertical SVG drawn on scroll */}
        <svg
          className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-2 md:block"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="url(#wf-grad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="wf-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D6FA4" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="space-y-6">
          {WORKFLOW.map((step) => {
            const Icon = ICONS[step.icon] ?? FileText
            return (
              <li
                key={step.id}
                data-step
                className="relative grid grid-cols-[56px_1fr] gap-5 md:gap-8"
              >
                {/* Node */}
                <div className="relative flex justify-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-[var(--border-glow)] bg-panel text-accent-glow shadow-glow">
                    <Icon size={22} />
                  </div>
                  {/* Checkpoint badge */}
                  <span
                    data-check
                    className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border border-void bg-accent-green text-void"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                </div>

                {/* Card */}
                <div className="glass-panel glow-border-hover rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-accent-glow/60">
                      {step.id}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tightest text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-text-data">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Quality commitments */}
        <div className="mt-12 flex flex-wrap gap-3 md:pl-[88px]">
          {QUALITY_COMMITMENTS.map((q) => (
            <span
              key={q}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dim)] bg-[var(--bg-glass)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-data"
            >
              <Check size={12} className="text-accent-green" />
              {q}
            </span>
          ))}
        </div>

        {/* "What I Annotate" reference table — static, scraper-friendly (D6) */}
        <div className="mt-12 md:pl-[88px]">
          <h3 className="eyebrow mb-4">What I Annotate</h3>
          <div className="overflow-x-auto rounded-lg border border-[var(--border-dim)]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-dim)] bg-[var(--bg-glass)]">
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-accent-glow">
                    Game Category
                  </th>
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-accent-glow">
                    Annotation Type
                  </th>
                  <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-accent-glow">
                    Signal to Recruiter
                  </th>
                </tr>
              </thead>
              <tbody>
                {ANNOTATION_TABLE.map((row) => (
                  <tr
                    key={row.category}
                    className="border-b border-[var(--border-dim)] last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-text-primary">
                      {row.category}
                    </td>
                    <td className="px-4 py-3 text-text-data">{row.type}</td>
                    <td className="px-4 py-3 text-text-data">{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  )
}
