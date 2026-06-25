import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SETUP } from '../../lib/content'
import { useReveal } from '../../hooks/useReveal'
import { prefersReducedMotion } from '../../lib/utils'
import Section from '../Section'

gsap.registerPlugin(ScrollTrigger)

function SpecCard({ spec }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    if (prefersReducedMotion()) {
      bar.style.width = `${spec.meter}%`
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${spec.meter}%`,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 90%' },
        }
      )
    })
    return () => ctx.revert()
  }, [spec.meter])

  return (
    <div
      data-reveal
      data-cursor="hover"
      className="glass-panel glow-border-hover group rounded-lg p-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="data-label">{spec.label}</span>
        <span className="font-mono text-[10px] text-accent-glow/70">
          {String(spec.meter).padStart(3, '0')}%
        </span>
      </div>
      <p className="mt-2 font-mono text-sm text-text-primary">
        {spec.value}
        {spec.detail && (
          <span className="ml-2 text-text-muted">/ {spec.detail}</span>
        )}
      </p>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[var(--border-dim)]">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-accent-core to-accent-glow"
          style={{ width: 0 }}
        />
      </div>
    </div>
  )
}

export default function Setup() {
  const ref = useReveal({ stagger: 0.06 })

  return (
    <Section id="setup" index="01" eyebrow="Operator Setup" title="Hardware Readiness">
      <p className="mb-10 max-w-2xl text-text-data">
        A capture-ready workstation built for high-FPS recording and clean
        delivery. Every value below is live telemetry from the rig used for
        annotation sessions.
      </p>
      <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SETUP.map((spec) => (
          <SpecCard key={spec.label} spec={spec} />
        ))}
      </div>
    </Section>
  )
}
