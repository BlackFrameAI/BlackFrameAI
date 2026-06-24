import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import Loader from './Loader'

// We store global mouse coordinates so the canvas tracks even when the mouse is over the HTML UI
const globalMouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
  // Normalize coordinates from -1 to 1
  globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    globalMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  }
});

function CatMesh({ modelPath, position, baseRotationY = 0, scale = 1.5 }: { modelPath: string, position: [number, number, number], baseRotationY?: number, scale?: number }) {
  const meshRef = useRef<THREE.Group>(null)
  
  // Load the model dynamically
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    // Traverse the loaded model and overwrite ALL materials with our glowing wireframe
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: '#35c0ff',
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      // Mouse parallax tracking anchored around the exact base rotation dialed in by the user
      const targetX = baseRotationY + (globalMouse.x * Math.PI) / 8 
      const targetY = 0.2 + (globalMouse.y * Math.PI) / 16
      
      // Horizontal tracking
      meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y)
      
      // X-axis rollover tracking
      meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x)
    }
  })

  // Group holds the base scale and initial rotation to prevent 1-frame snaps
  return (
    <group ref={meshRef} position={position} scale={scale} rotation={[0.2, baseRotationY, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function QuantumParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Create static positions and velocity details
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const phs = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5 // Drift slightly back
      phs[i] = Math.random() * Math.PI * 2
    }
    return [pos, phs]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    
    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1
      const xIdx = i * 3
      
      // Slow elegant upward drift + wave oscillation (cut by ~50% for high subtlety)
      posAttr.array[yIdx] += 0.0035 + Math.sin(time * 0.5 + phases[i]) * 0.0008
      posAttr.array[xIdx] += Math.cos(time * 0.2 + phases[i]) * 0.0012
      
      // Wrap boundaries
      if (posAttr.array[yIdx] > 10) posAttr.array[yIdx] = -10
      if (posAttr.array[xIdx] > 15) posAttr.array[xIdx] = -15
      if (posAttr.array[xIdx] < -15) posAttr.array[xIdx] = 15
    }
    posAttr.needsUpdate = true
  })

  // Create a high-quality soft circular canvas texture
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(53, 192, 255, 1)')
      gradient.addColorStop(0.3, 'rgba(53, 192, 255, 0.4)')
      gradient.addColorStop(1, 'rgba(53, 192, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    }
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation={true}
        map={circleTexture}
        transparent={true}
        opacity={0.14}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

function SceneLayout() {
  const { viewport } = useThree()
  // If viewport is narrow (mobile), we kill the cat entirely.
  const isMobile = viewport.width < 8;
  const position: [number, number, number] = [-3.20, 0.20, -2];
  const scale = 2.5;

  return (
    <>
      <QuantumParticles count={70} />
      {!isMobile && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CatMesh modelPath="/assets/cat_lowpoly.glb" position={position} baseRotationY={-0.54} scale={scale} />
        </Float>
      )}
    </>
  )
}

export default function HoloCat() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <SceneLayout />
          <Environment preset="city" />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
