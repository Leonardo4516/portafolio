import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export default function Scene3D() {
  const coreRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const targetMouse = useRef({ x: 0, y: 0 })
  const currentMouse = useRef({ x: 0, y: 0 })

  // Listen to mouse movement ONLY on desktop fine-pointer devices to save mobile battery and avoid delay
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      const handlePointerMove = (e) => {
        targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
        targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      }
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      return () => window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Smooth LERP damping (0.04 factor) for desktop mouse parallax
    currentMouse.current.x = THREE.MathUtils.lerp(currentMouse.current.x, targetMouse.current.x, 0.04)
    currentMouse.current.y = THREE.MathUtils.lerp(currentMouse.current.y, targetMouse.current.y, 0.04)

    const mx = currentMouse.current.x
    const my = currentMouse.current.y

    // 1. Central Core: STRICTLY CONSTANT rotation speed (unaffected by scrolling)
    if (coreRef.current) {
      coreRef.current.position.x = mx * 0.9
      coreRef.current.position.y = my * 0.6 + Math.sin(time * 1.2) * 0.12
      coreRef.current.rotation.x = time * 0.16 + my * 0.25
      coreRef.current.rotation.y = time * 0.22 + mx * 0.35
    }

    // 2. Glowing Red Torus Ring 1: strictly constant orbital rotation
    if (ringRef1.current) {
      ringRef1.current.position.x = mx * 0.6
      ringRef1.current.position.y = my * 0.4 + Math.cos(time * 1.0) * 0.08
      ringRef1.current.rotation.x = time * 0.32
      ringRef1.current.rotation.y = time * 0.24
      ringRef1.current.rotation.z = time * 0.18
    }

    // 3. Dark Crimson Icosahedron Ring 2: strictly constant counter-rotation
    if (ringRef2.current) {
      ringRef2.current.position.x = mx * 0.4
      ringRef2.current.position.y = my * 0.3 - Math.sin(time * 0.9) * 0.08
      ringRef2.current.rotation.x = -time * 0.18
      ringRef2.current.rotation.y = time * 0.38
      ringRef2.current.rotation.z = -time * 0.22
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Optimized Crimson Point Lights */}
      <pointLight position={[4, 4, 4]} intensity={2.8} color="#ff1a40" />
      <pointLight position={[-4, -4, -2]} intensity={2.0} color="#991b1b" />

      {/* Ultra-lightweight particle ambiance for zero mobile lag */}
      <Sparkles 
        count={28} 
        scale={9} 
        size={2.2} 
        speed={0.35} 
        opacity={0.5} 
        color="#ff1a40" 
      />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <group>
          {/* Obsidian Neural Core with Highly Optimized Shader-Free Standard Material */}
          <Sphere ref={coreRef} args={[1, 24, 24]}>
            <meshStandardMaterial
              color="#070709"
              emissive="#38040e"
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.85}
            />
          </Sphere>

          {/* Glowing Red Torus Ring 1 */}
          <mesh ref={ringRef1}>
            <torusGeometry args={[1.5, 0.02, 10, 36]} />
            <meshStandardMaterial 
              color="#ff1a40" 
              emissive="#ff1a40" 
              emissiveIntensity={1.3}
              wireframe 
            />
          </mesh>

          {/* Dark Crimson Icosahedron Wireframe Ring 2 */}
          <mesh ref={ringRef2}>
            <icosahedronGeometry args={[1.85, 1]} />
            <meshStandardMaterial 
              color="#991b1b" 
              emissive="#ef4444" 
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
