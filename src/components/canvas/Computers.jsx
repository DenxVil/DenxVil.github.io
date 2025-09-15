import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text3D, Center, Float } from "@react-three/drei";
import * as THREE from 'three';

// Custom 3D Rotating Element Component
const Denvil3DElement = ({ isMobile }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Floating movement
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Create a geometric representation of "DENVIL"
  const letterGeometries = [
    // D
    { type: 'box', position: [-3, 0, 0], args: [0.3, 2, 0.3], color: '#3b82f6' },
    { type: 'box', position: [-2.5, 0.7, 0], args: [0.8, 0.3, 0.3], color: '#3b82f6' },
    { type: 'box', position: [-2.5, -0.7, 0], args: [0.8, 0.3, 0.3], color: '#3b82f6' },
    { type: 'box', position: [-2.1, 0, 0], args: [0.3, 1, 0.3], color: '#3b82f6' },
    
    // E
    { type: 'box', position: [-1.2, 0, 0], args: [0.3, 2, 0.3], color: '#8b5cf6' },
    { type: 'box', position: [-0.7, 0.7, 0], args: [0.8, 0.3, 0.3], color: '#8b5cf6' },
    { type: 'box', position: [-0.8, 0, 0], args: [0.6, 0.3, 0.3], color: '#8b5cf6' },
    { type: 'box', position: [-0.7, -0.7, 0], args: [0.8, 0.3, 0.3], color: '#8b5cf6' },
    
    // N
    { type: 'box', position: [0.1, 0, 0], args: [0.3, 2, 0.3], color: '#06b6d4' },
    { type: 'box', position: [0.7, 0, 0], args: [0.3, 2, 0.3], color: '#06b6d4' },
    { type: 'box', position: [0.4, 0.3, 0], args: [0.6, 0.3, 0.3], color: '#06b6d4', rotation: [0, 0, Math.PI / 4] },
    
    // V
    { type: 'box', position: [1.3, 0.2, 0], args: [0.3, 1.6, 0.3], color: '#10b981', rotation: [0, 0, -Math.PI / 8] },
    { type: 'box', position: [1.7, 0.2, 0], args: [0.3, 1.6, 0.3], color: '#10b981', rotation: [0, 0, Math.PI / 8] },
    
    // I
    { type: 'box', position: [2.3, 0, 0], args: [0.3, 2, 0.3], color: '#f59e0b' },
    { type: 'box', position: [2.3, 0.7, 0], args: [0.6, 0.3, 0.3], color: '#f59e0b' },
    { type: 'box', position: [2.3, -0.7, 0], args: [0.6, 0.3, 0.3], color: '#f59e0b' },
    
    // L
    { type: 'box', position: [3.1, 0, 0], args: [0.3, 2, 0.3], color: '#ef4444' },
    { type: 'box', position: [3.5, -0.7, 0], args: [0.8, 0.3, 0.3], color: '#ef4444' },
  ];

  return (
    <group ref={groupRef}>
      <Float
        speed={1}
        rotationIntensity={isMobile ? 0.3 : 0.6}
        floatIntensity={isMobile ? 0.3 : 0.6}
      >
        <group ref={meshRef} scale={isMobile ? 0.6 : 0.8}>
          {letterGeometries.map((letter, index) => (
            <mesh
              key={index}
              position={letter.position}
              rotation={letter.rotation || [0, 0, 0]}
            >
              <boxGeometry args={letter.args} />
              <meshStandardMaterial
                color={letter.color}
                metalness={0.8}
                roughness={0.2}
                emissive={letter.color}
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
          
          {/* Surrounding particles */}
          {[...Array(20)].map((_, i) => (
            <mesh
              key={`particle-${i}`}
              position={[
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial
                color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)]}
                emissive={'#ffffff'}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};

const Computers = ({ isMobile }) => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      <Denvil3DElement isMobile={isMobile} />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;