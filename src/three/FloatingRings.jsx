import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Decorative wireframe geometry orbiting the main screen — icosahedron +
 * torus rings, slowly rotating, to read as a "data instrument" (Part 3).
 */
export default function FloatingRings() {
  const ico = useRef()
  const ringA = useRef()
  const ringB = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ico.current) {
      ico.current.rotation.x = t * 0.15
      ico.current.rotation.y = t * 0.2
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.3
    if (ringB.current) ringB.current.rotation.z = -t * 0.22
  })

  return (
    <group>
      {/* Far-side icosahedron */}
      <mesh ref={ico} position={[3.2, 1.4, -2.5]} scale={0.9}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1D6FA4" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Small accent node */}
      <mesh position={[-3.4, -1.3, -1]} scale={0.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Orbital rings around the screen */}
      <mesh ref={ringA} position={[0, 0, -0.5]}>
        <torusGeometry args={[3.0, 0.012, 8, 80]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ringB} position={[0, 0, -0.5]} rotation={[0.6, 0.3, 0]}>
        <torusGeometry args={[3.4, 0.01, 8, 80]} />
        <meshBasicMaterial color="#1D6FA4" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
