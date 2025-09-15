import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Sphere, Box, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Individual floating geometric shapes
const FloatingShape = ({ geometry, position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.015 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={0.4}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingGeometryScene = ({ isMobile }) => {
  const shapes = useMemo(() => [
    // Octahedrons
    {
      geometry: <octahedronGeometry args={[0.5]} />,
      position: [-8, 2, -3],
      color: '#3b82f6',
      scale: isMobile ? 0.5 : 0.8,
      speed: 0.8
    },
    {
      geometry: <octahedronGeometry args={[0.3]} />,
      position: [8, -1, -2],
      color: '#8b5cf6',
      scale: isMobile ? 0.4 : 0.6,
      speed: 1.2
    },
    
    // Torus shapes
    {
      geometry: <torusGeometry args={[0.4, 0.1, 8, 16]} />,
      position: [-6, -2, -1],
      color: '#06b6d4',
      scale: isMobile ? 0.6 : 1,
      speed: 0.6
    },
    {
      geometry: <torusGeometry args={[0.3, 0.08, 8, 16]} />,
      position: [6, 3, -2.5],
      color: '#10b981',
      scale: isMobile ? 0.5 : 0.8,
      speed: 1.0
    },
    
    // Boxes with different rotations
    {
      geometry: <boxGeometry args={[0.6, 0.6, 0.6]} />,
      position: [-4, 4, -1.5],
      color: '#f59e0b',
      scale: isMobile ? 0.4 : 0.7,
      speed: 1.1
    },
    {
      geometry: <boxGeometry args={[0.4, 0.8, 0.4]} />,
      position: [4, -3, -1],
      color: '#ef4444',
      scale: isMobile ? 0.5 : 0.8,
      speed: 0.9
    },
    
    // Spheres for variety
    {
      geometry: <sphereGeometry args={[0.3, 16, 16]} />,
      position: [-2, 5, -2],
      color: '#ec4899',
      scale: isMobile ? 0.6 : 1,
      speed: 0.7
    },
    {
      geometry: <sphereGeometry args={[0.25, 16, 16]} />,
      position: [2, -4, -1.5],
      color: '#06d6a0',
      scale: isMobile ? 0.5 : 0.8,
      speed: 1.3
    },
    
    // Additional octahedrons for more depth
    {
      geometry: <octahedronGeometry args={[0.2]} />,
      position: [-10, 0, -4],
      color: '#fbbf24',
      scale: isMobile ? 0.3 : 0.5,
      speed: 1.4
    },
    {
      geometry: <octahedronGeometry args={[0.35]} />,
      position: [10, 1, -3.5],
      color: '#a855f7',
      scale: isMobile ? 0.4 : 0.7,
      speed: 0.5
    }
  ], [isMobile]);

  return (
    <group>
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          geometry={shape.geometry}
          position={shape.position}
          color={shape.color}
          scale={shape.scale}
          speed={shape.speed}
        />
      ))}
      
      {/* Ambient lighting for the floating shapes */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      <pointLight position={[-10, -10, 5]} intensity={0.2} color="#3b82f6" />
    </group>
  );
};

const FloatingGeometryCanvas = ({ isMobile = false }) => {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <FloatingGeometryScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default FloatingGeometryCanvas;