import { useEffect, useRef } from 'react'

/**
 * Tracks normalized mouse position (-1..1 on each axis) in a ref, so 3D /
 * animation frames can read it without triggering React re-renders.
 * Returns a ref to { x, y }.
 */
export function useMouseParallax() {
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pos.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pos
}
