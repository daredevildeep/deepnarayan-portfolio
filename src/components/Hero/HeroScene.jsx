import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import GameWorld from '../../three/GameWorld'
import AnnotationBoxes from '../../three/AnnotationBoxes'
import ScanLine from '../../three/ScanLine'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { prefersReducedMotion } from '../../lib/utils'

/**
 * With frameloop="demand" the scene only renders when a frame is requested.
 * This driver requests frames every tick while the hero is in view, and stops
 * when it scrolls offscreen (active=false) or under reduced motion — so the GPU
 * goes idle below the fold. NO post-processing/bloom (it caused flashing);
 * glow comes from emissive materials.
 */
function FrameDriver({ active }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (!active) return
    let id
    const tick = () => {
      invalidate()
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [active, invalidate])
  return null
}

/**
 * Scroll pushes the camera forward (z 8 -> 3) through the annotation feed.
 * Mouse adds a very gentle parallax offset (lerp 0.03). Both are read from
 * refs so they never trigger React re-renders.
 */
function CameraRig({ mouse, scrollRef, reduced }) {
  useFrame(({ camera }) => {
    if (reduced) return
    const scroll = scrollRef.current || 0
    const targetZ = 8 - scroll * 5
    camera.position.z += (targetZ - camera.position.z) * 0.1
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.03
    camera.position.y += (0.6 - mouse.current.y * 0.4 - camera.position.y) * 0.03
    camera.lookAt(0, 0, -1)
  })
  return null
}

/** Counts actual rendered frames per second into hudRef for the HTML HUD. */
function FpsMeter({ hudRef }) {
  const acc = useRef({ frames: 0, time: 0 })
  useFrame((_, delta) => {
    acc.current.frames += 1
    acc.current.time += delta
    if (acc.current.time >= 1) {
      hudRef.current.fps = acc.current.frames
      acc.current.frames = 0
      acc.current.time = 0
    }
  })
  return null
}

export default function HeroScene({ active = true, scrollRef, hudRef }) {
  const mouse = useMouseParallax()
  const reduced = useRef(prefersReducedMotion()).current

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0.6, 8], fov: 50 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fogExp2 attach="fog" args={['#050d1a', 0.035]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 5]} intensity={0.6} color="#3a6ea5" />

      <Suspense fallback={null}>
        <GameWorld />
        <AnnotationBoxes scrollRef={scrollRef} reduced={reduced} />
        <ScanLine scrollRef={scrollRef} reduced={reduced} />
      </Suspense>

      <CameraRig mouse={mouse} scrollRef={scrollRef} reduced={reduced} />
      {hudRef && <FpsMeter hudRef={hudRef} />}
      <FrameDriver active={active && !reduced} />
    </Canvas>
  )
}
