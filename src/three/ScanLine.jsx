import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BASE_FREQ = (2 * Math.PI) / 3 // one full sine sweep per 3 seconds

/**
 * A thin cyan plane that sweeps vertically across the scene with a slow sine
 * motion. Sweep frequency increases as the user scrolls the hero (scrollRef).
 * Frozen under reduced motion.
 */
export default function ScanLine({ scrollRef, reduced }) {
  const ref = useRef()
  const phase = useRef(0)

  useFrame((_, delta) => {
    if (reduced || !ref.current) return
    const scroll = scrollRef.current || 0
    phase.current += delta * BASE_FREQ * (1 + scroll * 1.2)
    ref.current.position.y = Math.sin(phase.current) * 5
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[100, 0.05]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
