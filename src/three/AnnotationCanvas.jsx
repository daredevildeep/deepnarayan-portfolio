import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// The annotation "tasks" that label themselves on screen, in sequence.
const BOXES = [
  { x: 0.16, y: 0.30, w: 0.26, h: 0.30, label: 'PLAYER', color: '#38BDF8', t: 0.0 },
  { x: 0.55, y: 0.22, w: 0.22, h: 0.24, label: 'ENEMY_NPC', color: '#F59E0B', t: 1.0 },
  { x: 0.62, y: 0.58, w: 0.20, h: 0.22, label: 'OBJECTIVE', color: '#10B981', t: 2.0 },
  { x: 0.30, y: 0.66, w: 0.16, h: 0.16, label: 'ITEM_PICKUP', color: '#38BDF8', t: 3.0 },
]

const CYCLE = 6 // seconds for the full reveal/reset loop

/**
 * A floating monitor whose screen is a live <canvas> texture. The annotation
 * boxes fade + scale in one by one and label themselves — directly visualizing
 * the job (Part 6.4). Redrawn every frame from the R3F clock.
 */
export default function AnnotationCanvas() {
  const screenRef = useRef()

  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 640
    const ctx = canvas.getContext('2d')
    const texture = new THREE.CanvasTexture(canvas)
    texture.anisotropy = 4
    texture.colorSpace = THREE.SRGBColorSpace
    return { texture, ctx, canvas }
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const W = canvas.width
    const H = canvas.height

    // Background
    ctx.fillStyle = '#0A1120'
    ctx.fillRect(0, 0, W, H)

    // Faint grid
    ctx.strokeStyle = 'rgba(56,189,248,0.08)'
    ctx.lineWidth = 1
    for (let gx = 0; gx <= W; gx += 64) {
      ctx.beginPath()
      ctx.moveTo(gx, 0)
      ctx.lineTo(gx, H)
      ctx.stroke()
    }
    for (let gy = 0; gy <= H; gy += 64) {
      ctx.beginPath()
      ctx.moveTo(0, gy)
      ctx.lineTo(W, gy)
      ctx.stroke()
    }

    // Header bar
    ctx.fillStyle = 'rgba(13,21,38,0.9)'
    ctx.fillRect(0, 0, W, 56)
    ctx.fillStyle = '#EF4444'
    ctx.beginPath()
    ctx.arc(28, 28, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#E2E8F0'
    ctx.font = '600 22px "JetBrains Mono", monospace'
    ctx.fillText('REC', 44, 35)
    ctx.fillStyle = '#94A3B8'
    ctx.font = '20px "JetBrains Mono", monospace'
    ctx.fillText('ANNOTATION SESSION', 130, 35)
    const tc = Math.floor(time) % 3600
    const mm = String(Math.floor(tc / 60)).padStart(2, '0')
    const ss = String(tc % 60).padStart(2, '0')
    ctx.fillStyle = '#38BDF8'
    ctx.textAlign = 'right'
    ctx.fillText(`00:${mm}:${ss}`, W - 24, 35)
    ctx.textAlign = 'left'

    // Animated bounding boxes
    const loop = time % CYCLE
    BOXES.forEach((b) => {
      const appear = Math.max(0, Math.min(1, (loop - b.t) / 0.6))
      if (appear <= 0) return
      const ease = 1 - Math.pow(1 - appear, 3)

      const bx = b.x * W
      const by = b.y * H
      const bw = b.w * W * ease
      const bh = b.h * H * ease
      const cx = bx + (b.w * W) / 2
      const cy = by + (b.h * H) / 2

      ctx.globalAlpha = ease
      ctx.strokeStyle = b.color
      ctx.lineWidth = 2.5
      ctx.strokeRect(cx - bw / 2, cy - bh / 2, bw, bh)

      // Corner ticks
      const tick = 12
      ctx.beginPath()
      ctx.moveTo(cx - bw / 2, cy - bh / 2 + tick)
      ctx.lineTo(cx - bw / 2, cy - bh / 2)
      ctx.lineTo(cx - bw / 2 + tick, cy - bh / 2)
      ctx.stroke()

      // Label chip
      if (appear > 0.6) {
        ctx.globalAlpha = (appear - 0.6) / 0.4
        ctx.font = '600 18px "JetBrains Mono", monospace'
        const labelW = ctx.measureText(b.label).width + 18
        ctx.fillStyle = b.color
        ctx.fillRect(cx - bw / 2, cy - bh / 2 - 26, labelW, 22)
        ctx.fillStyle = '#050810'
        ctx.fillText(b.label, cx - bw / 2 + 9, cy - bh / 2 - 9)
      }
      ctx.globalAlpha = 1
    })

    // Footer status line
    ctx.fillStyle = 'rgba(13,21,38,0.9)'
    ctx.fillRect(0, H - 40, W, 40)
    ctx.fillStyle = '#10B981'
    ctx.font = '16px "JetBrains Mono", monospace'
    const labeled = BOXES.filter((b) => loop > b.t).length
    ctx.fillText(
      `SCHEMA: GAMEPLAY_V2   LABELS: ${labeled}/${BOXES.length}   STATUS: ON-TASK`,
      20,
      H - 15
    )

    texture.needsUpdate = true

    // Gentle screen tilt toward viewer
    if (screenRef.current) {
      screenRef.current.rotation.y = Math.sin(time * 0.3) * 0.04
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={screenRef}>
        {/* Screen */}
        <mesh>
          <planeGeometry args={[3.2, 2, 1, 1]} />
          <meshStandardMaterial
            map={texture}
            emissive="#1D6FA4"
            emissiveMap={texture}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>

        {/* Bezel */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[3.46, 2.26, 0.12]} />
          <meshStandardMaterial
            color="#0D1526"
            metalness={0.6}
            roughness={0.35}
            emissive="#38BDF8"
            emissiveIntensity={0.08}
          />
        </mesh>
      </group>
    </Float>
  )
}
