import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import AnnotationCanvas from '../../three/AnnotationCanvas'
import ParticleField from '../../three/ParticleField'
import FloatingRings from '../../three/FloatingRings'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { prefersReducedMotion } from '../../lib/utils'

/** Eases the camera toward the mouse for a subtle parallax (Part 3). */
function CameraRig({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    const targetX = mouse.current.x * 0.6
    const targetY = -mouse.current.y * 0.4
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  const mouse = useMouseParallax()
  const reduced = useRef(prefersReducedMotion()).current

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#38BDF8" />
      <pointLight position={[-5, -3, 2]} intensity={20} color="#1D6FA4" />

      <Suspense fallback={null}>
        <Stars
          radius={60}
          depth={40}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.5}
        />
        <ParticleField count={reduced ? 150 : 400} />
        <FloatingRings />
        <AnnotationCanvas />

        <EffectComposer disableNormalPass>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>

      {!reduced && <CameraRig mouse={mouse} />}
    </Canvas>
  )
}
