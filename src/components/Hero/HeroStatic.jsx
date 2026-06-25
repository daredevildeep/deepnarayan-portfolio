/**
 * Static, zero-WebGL hero visual rendered on mobile (< 768px) instead of the
 * Three.js canvas (A7). Pure inline SVG — no Three.js chunk is even fetched on
 * phones, so first paint stays light. Mirrors the annotation-screen motif.
 */
export default function HeroStatic() {
  return (
    <div className="grid h-full w-full place-items-center overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="h-auto w-[120%] max-w-none opacity-90"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hs-glow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0D1526" />
            <stop offset="100%" stopColor="#050810" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#hs-glow)" />

        {/* faint grid */}
        <g stroke="rgba(56,189,248,0.10)" strokeWidth="0.5">
          <path d="M0 60 H400 M0 120 H400 M0 180 H400 M0 240 H400" />
          <path d="M80 0 V300 M160 0 V300 M240 0 V300 M320 0 V300" />
        </g>

        {/* floating annotation monitor */}
        <g transform="translate(110,95)">
          <rect x="-6" y="-6" width="192" height="122" rx="6" fill="#0D1526" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
          <rect x="0" y="0" width="180" height="110" rx="3" fill="#0A1120" />
          {/* header */}
          <circle cx="12" cy="12" r="4" fill="#EF4444" />
          <text x="22" y="16" fontFamily="monospace" fontSize="9" fill="#38BDF8">REC · ANNOTATION</text>
          {/* boxes */}
          <rect x="20" y="34" width="44" height="40" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="20" y="26" width="34" height="9" fill="#38BDF8" />
          <text x="23" y="33" fontFamily="monospace" fontSize="6.5" fill="#050810">PLAYER</text>
          <rect x="100" y="44" width="40" height="36" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <rect x="100" y="36" width="48" height="9" fill="#F59E0B" />
          <text x="103" y="43" fontFamily="monospace" fontSize="6.5" fill="#050810">ENEMY_NPC</text>
        </g>

        {/* orbit ring */}
        <ellipse cx="200" cy="150" rx="150" ry="58" fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
        {/* accent node */}
        <path d="M315 70 l8 0 l0 8 l-8 0 z" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  )
}
