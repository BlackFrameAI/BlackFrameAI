import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, useGLTF, Sparkles } from '@react-three/drei'
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

function SceneLayout() {
  const { viewport } = useThree()
  // If viewport is narrow (mobile), we kill the cat entirely.
  const isMobile = viewport.width < 8;
  const position: [number, number, number] = [-3.20, 0.20, -2];
  const scale = 2.5;

  return (
    <>
      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.3} color="#35c0ff" />
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
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
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
