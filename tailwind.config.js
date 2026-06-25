/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Mission-briefing palette (Part 6.2)
        void: '#050810',
        panel: '#0D1526',
        'accent-core': '#1D6FA4',
        'accent-glow': '#38BDF8',
        'accent-gold': '#F59E0B',
        'accent-green': '#10B981',
        'text-primary': '#E2E8F0',
        'text-muted': '#64748B',
        'text-data': '#94A3B8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1280px',
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      boxShadow: {
        glow: '0 0 24px rgba(56,189,248,0.25)',
        'glow-lg': '0 0 48px rgba(56,189,248,0.35)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
