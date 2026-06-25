/**
 * The "game world" being annotated: a dark cyan floor grid and a handful of
 * simple emissive box geometries suggesting structures/objects at varying
 * distances. No wireframe, no bloom — emissive material provides the subtle
 * glow (Live Annotation Feed concept).
 */

// Boxes sit on the floor plane (y = -2). center.y = -2 + height/2.
const ENV_BOXES = [
  { pos: [-3, -1.1, -1], size: [1.6, 1.8, 1.6] },
  { pos: [2.4, -1.4, -2], size: [1.2, 1.2, 1.2] },
  { pos: [0, -1.6, -4], size: [2.0, 0.8, 2.0] },
  { pos: [-1.2, -1.5, 1], size: [1.0, 1.0, 1.0] },
  { pos: [4, -1.2, -3.5], size: [1.4, 1.6, 1.4] },
  { pos: [-4.5, -1.5, -3], size: [1.0, 1.0, 2.2] },
]

export default function GameWorld() {
  return (
    <group>
      {/* Floor grid — cyan lines, 80% opacity */}
      <gridHelper args={[80, 80]} position={[0, -2, 0]}>
        <lineBasicMaterial
          attach="material"
          color="#00d4ff"
          transparent
          opacity={0.8}
        />
      </gridHelper>

      {/* Game-world objects */}
      {ENV_BOXES.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color="#0a1628"
            emissive="#0a1628"
            emissiveIntensity={0.6}
            metalness={0.2}
            roughness={0.75}
          />
        </mesh>
      ))}
    </group>
  )
}
