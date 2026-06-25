import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, GraduationCap, Languages } from 'lucide-react'
import { EXPERIENCE, EDUCATION, LANGUAGES } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'
import Section from '../Section'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const root = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = el.querySelectorAll('[data-job]')
    const line = lineRef.current

    if (prefersReducedMotion()) {
      gsap.set(cards, { opacity: 1, x: 0 })
      if (line) line.style.transform = 'scaleY(1)'
      return
    }

    const ctx = gsap.context(() => {
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: el,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: true,
            },
          }
        )
      }
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 48 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Section
      id="experience"
      ariaLabel="Professional experience"
      index="04"
      eyebrow="Track Record"
      title="Experience"
    >
      <p className="mb-12 max-w-2xl text-text-data">
        Five roles built on reliability, instruction-following, and detail —
        the same disciplines that make annotation work trustworthy.
      </p>

      <div ref={root} className="relative pl-8 md:pl-10">
        {/* Timeline rail */}
        <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--border-dim)] md:left-[11px]" />
        <span
          ref={lineRef}
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent-glow to-accent-core md:left-[11px]"
        />

        <ol className="space-y-8">
          {EXPERIENCE.map((job) => (
            <li key={`${job.company}-${job.period}`} data-job className="relative">
              {/* Node */}
              <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-[var(--border-glow)] bg-void md:-left-10">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
              </span>

              <div className="glass-panel glow-border-hover rounded-lg p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold tracking-tightest text-text-primary">
                    {job.title}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent-glow">{job.company}</p>
                <p className="mt-4 flex items-start gap-2 text-sm text-text-data">
                  <ArrowRight size={15} className="mt-0.5 shrink-0 text-accent-gold" />
                  <span>
                    <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                      Skill bridge:{' '}
                    </span>
                    {job.bridge}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Education + Languages */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="glass-panel rounded-lg p-6">
          <div className="flex items-center gap-2 text-accent-glow">
            <GraduationCap size={18} />
            <span className="data-label text-accent-glow">Education</span>
          </div>
          <p className="mt-3 font-display text-lg font-bold tracking-tightest text-text-primary">
            {EDUCATION.degree}
          </p>
          <p className="mt-1 text-sm text-text-data">{EDUCATION.college}</p>
          <p className="mt-2 font-mono text-xs text-text-muted">
            CGPA {EDUCATION.cgpa}
          </p>
        </div>

        <div className="glass-panel rounded-lg p-6">
          <div className="flex items-center gap-2 text-accent-glow">
            <Languages size={18} />
            <span className="data-label text-accent-glow">Languages</span>
          </div>
          <ul className="mt-3 space-y-2">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-3">
                <span className="text-text-primary">{l.name}</span>
                <span className="font-mono text-xs text-text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
