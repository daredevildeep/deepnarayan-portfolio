import { useEffect, useState } from 'react'

/**
 * Pure HTML/CSS HUD overlaid on the hero canvas — the "live annotation
 * session" chrome. Subtle (60% opacity), JetBrains Mono. FPS is read from the
 * shared hudRef written by the in-canvas FpsMeter; the timestamp increments
 * locally once a second.
 */
export default function HeroHud({ hudRef }) {
  const [fps, setFps] = useState(0)
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setFps(hudRef?.current?.fps ?? 0)
      setSecs((s) => s + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [hudRef])

  const hh = String(Math.floor(secs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] font-mono text-[11px]"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    >
      {/* Top-left — REC */}
      <span className="absolute left-5 top-20 flex items-center gap-1.5 text-red-500">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-dot" />
        REC
      </span>

      {/* Top-right — live FPS */}
      <span className="absolute right-5 top-20 text-accent-glow">{fps} FPS</span>

      {/* Bottom-left — session timestamp */}
      <span className="absolute bottom-6 left-5 text-accent-glow">
        {hh}:{mm}:{ss}
      </span>

      {/* Bottom-right — capture spec */}
      <span className="absolute bottom-6 right-5 text-accent-glow">
        1080p / 60fps
      </span>
    </div>
  )
}
