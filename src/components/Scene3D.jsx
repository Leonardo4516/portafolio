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
  const isVisible = useRef(true)

  // Listen to window-level mouse movement so hovering over DOM elements doesn't stop 3D physics
  useEffect(() => {
    const handlePointerMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    // Pause 3D rendering updates when scrolled down into content to save 100% GPU on mobile
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          isVisible.current = window.scrollY < window.innerHeight * 1.4
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!isVisible.current) return

    const time = clock.getElapsedTime()

    // Smooth LERP damping (0.05 factor)
    currentMouse.current.x = THREE.MathUtils.lerp(currentMouse.current.x, targetMouse.current.x, 0.05)
    currentMouse.current.y = THREE.MathUtils.lerp(currentMouse.current.y, targetMouse.current.y, 0.05)

    const mx = currentMouse.current.x
    const my = currentMouse.current.y

    if (coreRef.current) {
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
      {/* Optimized Crimson Point Lights */}
      <pointLight position={[4, 4, 4]} intensity={3.0} color="#ff1a40" />
      <pointLight position={[-4, -4, -2]} intensity={2.2} color="#991b1b" />

      {/* Lightweight Crimson Sparkles Field */}
      <Sparkles 
        count={45} 
        scale={10} 
        size={2.5} 
        speed={0.4} 
        opacity={0.6} 
        color="#ff1a40" 
      />
      <Sparkles 
        count={25} 
        scale={8} 
        size={2.8} 
        speed={0.5} 
        opacity={0.4} 
        color="#ef4444" 
      />

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <group>
          {/* Obsidian Black Neural Core with Optimized Geometry */}
          <Sphere ref={coreRef} args={[1, 32, 32]}>
            <MeshDistortMaterial
              color="#070709"
              emissive="#450a0a"
              emissiveIntensity={0.8}
              distort={0.4}
              speed={2.0}
              roughness={0.15}
              metalness={0.9}
            />
          </Sphere>

          {/* Glowing Red Torus Ring 1 (Optimized Segments) */}
          <mesh ref={ringRef1}>
            <torusGeometry args={[1.5, 0.02, 12, 48]} />
            <meshStandardMaterial 
              color="#ff1a40" 
              emissive="#ff1a40" 
              emissiveIntensity={1.4}
              wireframe 
            />
          </mesh>

          {/* Dark Crimson Icosahedron Wireframe Ring 2 */}
          <mesh ref={ringRef2}>
            <icosahedronGeometry args={[1.85, 1]} />
            <meshStandardMaterial 
              color="#991b1b" 
              emissive="#ef4444" 
              emissiveIntensity={0.9}
              wireframe 
              transparent 
              opacity={0.45} 
            />
          </mesh>
        </group>
      </Float>
    </>
  )
}
