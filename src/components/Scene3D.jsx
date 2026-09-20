import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function Scene3D() {
  const coreRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const targetMouse = useRef({ x: 0, y: 0 })
  const currentMouse = useRef({ x: 0, y: 0 })

  // Listen to window-level mouse movement so hovering over DOM cards doesn't freeze the 3D scene
  useEffect(() => {
    const handlePointerMove = (e) => {
      // Normalized coordinates from -1 to 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Smooth lerp for mouse coords (0.05 = soft damping, zero abrupt jumps)
    currentMouse.current.x = THREE.MathUtils.lerp(currentMouse.current.x, targetMouse.current.x, 0.05)
    currentMouse.current.y = THREE.MathUtils.lerp(currentMouse.current.y, targetMouse.current.y, 0.05)

    const mx = currentMouse.current.x
    const my = currentMouse.current.y

    if (coreRef.current) {
      // Smooth floating + mouse parallax
      coreRef.current.position.x = mx * 1.2
      coreRef.current.position.y = my * 0.8 + Math.sin(time * 1.5) * 0.15
      coreRef.current.rotation.x = time * 0.15 + my * 0.4
      coreRef.current.rotation.y = time * 0.25 + mx * 0.6
    }

    if (ringRef1.current) {
      ringRef1.current.position.x = mx * 0.8
      ringRef1.current.position.y = my * 0.6 + Math.cos(time * 1.2) * 0.1
      ringRef1.current.rotation.x = time * 0.4
      ringRef1.current.rotation.y = time * 0.3
      ringRef1.current.rotation.z = time * 0.2
    }

    if (ringRef2.current) {
      ringRef2.current.position.x = mx * 0.5
      ringRef2.current.position.y = my * 0.4 - Math.sin(time * 1.0) * 0.1
      ringRef2.current.rotation.x = -time * 0.2
      ringRef2.current.rotation.y = time * 0.5
      ringRef2.current.rotation.z = -time * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#00f3ff" />
      <pointLight position={[-5, -5, -3]} intensity={2.5} color="#bc13fe" />
      <pointLight position={[0, -4, 2]} intensity={1.5} color="#3b82f6" />

      {/* Cyber Particle Field */}
      <Sparkles 
        count={80} 
        scale={10} 
        size={2.5} 
        speed={0.4} 
        opacity={0.6} 
        color="#00f3ff" 
      />
      <Sparkles 
        count={40} 
        scale={8} 
        size={3} 
        speed={0.6} 
        opacity={0.4} 
        color="#bc13fe" 
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core AI Entity */}
        <group>
          {/* Inner Organic Distorted Sphere (Neural Core) */}
          <Sphere ref={coreRef} args={[1, 64, 64]}>
            <MeshDistortMaterial
              color="#0d1117"
              emissive="#1e1b4b"
              emissiveIntensity={0.6}
              distort={0.45}
              speed={2.2}
              roughness={0.15}
              metalness={0.9}
            />
          </Sphere>

          {/* Outer Cyber Torus Ring 1 */}
          <mesh ref={ringRef1}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial 
              color="#00f3ff" 
              emissive="#00f3ff" 
              emissiveIntensity={1.2}
              wireframe 
            />
          </mesh>

          {/* Outer Cyber Icosahedron Ring 2 */}
          <mesh ref={ringRef2}>
            <icosahedronGeometry args={[1.85, 1]} />
            <meshStandardMaterial 
              color="#bc13fe" 
              emissive="#bc13fe" 
              emissiveIntensity={0.8}
              wireframe 
              transparent 
              opacity={0.4} 
            />
          </mesh>
        </group>
      </Float>
    </>
  )
}
