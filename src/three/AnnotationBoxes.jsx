import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Floating cyan wireframe annotation boxes, each with a drei <Html> label.
 *
 * - `mount` boxes fade in one-by-one on load (0.4s stagger).
 * - `scroll` boxes appear as the user scrolls through the hero (more boxes
 *   reveal as scrollRef rises 0 -> 1).
 *
 * Under reduced motion every box is shown immediately (no animation), since the
 * frame loop is not driven (see HeroScene FrameDriver).
 */
const BOXES = [
  // Appear on mount (staggered)
  { label: 'NPC_GUARD', pos: [-3, -1.1, -1], size: [1.9, 2.1, 1.9], mount: 0 },
  { label: 'ROUTE_NODE', pos: [-1.2, -1.5, 1], size: [1.3, 1.3, 1.3], mount: 1 },
  { label: 'OBJECTIVE_3', pos: [0, -1.6, -4], size: [2.3, 1.1, 2.3], mount: 2 },
  { label: 'INTERACT_ZONE', pos: [2.4, -1.4, -2], size: [1.5, 1.5, 1.5], mount: 3 },
  { label: 'ENEMY_SPAWN', pos: [4, -1.2, -3.5], size: [1.7, 1.9, 1.7], mount: 4 },
  { label: 'CHECKPOINT', pos: [-4.5, -1.5, -3], size: [1.3, 1.3, 2.5], mount: 5 },
  { label: 'ITEM_DROP', pos: [1.2, 0.4, 0], size: [0.7, 0.7, 0.7], mount: 6 },
  { label: 'PATROL_PATH', pos: [-2.2, 0.2, -2], size: [0.9, 0.6, 0.9], mount: 7 },
  // Revealed on scroll
  { label: 'ROUTE_NODE', pos: [3.2, 0.6, -1], size: [0.8, 0.8, 0.8], scroll: 0.3 },
  { label: 'ITEM_DROP', pos: [-3.6, 0.5, 0.5], size: [0.7, 0.7, 0.7], scroll: 0.5 },
  { label: 'OBJECTIVE_3', pos: [0.6, -0.2, -2.5], size: [0.9, 0.9, 0.9], scroll: 0.68 },
  { label: 'CHECKPOINT', pos: [2.1, -0.6, 1.2], size: [0.8, 0.8, 0.8], scroll: 0.85 },
]

function AnnotationBox({ data, scrollRef, reduced }) {
  const matRef = useRef()
  const labelRef = useRef()

  // Wireframe edges of a box, built once per size.
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(...data.size)),
    [data.size]
  )

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    const scroll = scrollRef.current || 0

    const target =
      data.mount != null
        ? t > data.mount * 0.4
          ? 1
          : 0
        : scroll > data.scroll
        ? 1
        : 0

    const mat = matRef.current
    if (mat) mat.opacity += (target - mat.opacity) * 0.12
    if (labelRef.current) {
      labelRef.current.style.opacity = mat ? mat.opacity.toFixed(3) : '0'
    }
  })

  return (
    <group position={data.pos}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          ref={matRef}
          color="#00d4ff"
          transparent
          opacity={reduced ? 1 : 0}
        />
      </lineSegments>

      <Html
        position={[0, data.size[1] / 2 + 0.28, 0]}
        center
        zIndexRange={[20, 0]}
        wrapperClass="feed-label-wrap"
      >
        <span
          ref={labelRef}
          className="feed-label"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {data.label}
        </span>
      </Html>
    </group>
  )
}

export default function AnnotationBoxes({ scrollRef, reduced }) {
  return (
    <group>
      {BOXES.map((b, i) => (
        <AnnotationBox key={i} data={b} scrollRef={scrollRef} reduced={reduced} />
      ))}
    </group>
  )
}
