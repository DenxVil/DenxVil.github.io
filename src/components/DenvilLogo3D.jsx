import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced DENVIL 3D Text Component
function DenvilText({ mousePosition }) {
  const textRef = useRef();
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Base rotation with time
      textRef.current.rotation.y = time * 0.3;
      
      // Add mouse interaction
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.05
      );
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        time * 0.3 + mousePosition.x * 0.3,
        0.05
      );
      
      // Gentle floating
      textRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      
      // Subtle scale pulsing
      const scale = 1 + Math.sin(time * 2) * 0.05;
      textRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Center ref={textRef}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={viewport.width < 6 ? 0.8 : 1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        DENVIL
        <meshPhongMaterial 
          color="#3b82f6"
          shininess={100}
          transparent
          opacity={0.9}
        />
      </Text3D>
    </Center>
  );
}

// Fallback geometric text for when font loading fails
function GeometricDenvil({ mousePosition }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Letter shapes as geometric primitives
  const letterShapes = useMemo(() => [
    // D
    [
      { pos: [-2.5, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [-2.2, 0.8, 0], scale: [0.6, 0.2, 0.2] },
      { pos: [-2.2, -0.8, 0], scale: [0.6, 0.2, 0.2] },
      { pos: [-1.8, 0, 0], scale: [0.2, 1.2, 0.2] }
    ],
    // E
    [
      { pos: [-1.5, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [-1.2, 0.8, 0], scale: [0.6, 0.2, 0.2] },
      { pos: [-1.2, 0, 0], scale: [0.4, 0.2, 0.2] },
      { pos: [-1.2, -0.8, 0], scale: [0.6, 0.2, 0.2] }
    ],
    // N
    [
      { pos: [-0.5, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [-0.1, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [-0.3, 0.2, 0], scale: [0.4, 0.2, 0.2], rotation: [0, 0, Math.PI / 6] }
    ],
    // V
    [
      { pos: [0.5, 0.3, 0], scale: [0.2, 1.4, 0.2], rotation: [0, 0, -Math.PI / 8] },
      { pos: [0.9, 0.3, 0], scale: [0.2, 1.4, 0.2], rotation: [0, 0, Math.PI / 8] }
    ],
    // I
    [
      { pos: [1.5, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [1.5, 0.8, 0], scale: [0.4, 0.2, 0.2] },
      { pos: [1.5, -0.8, 0], scale: [0.4, 0.2, 0.2] }
    ],
    // L
    [
      { pos: [2.2, 0, 0], scale: [0.2, 2, 0.2] },
      { pos: [2.5, -0.8, 0], scale: [0.6, 0.2, 0.2] }
    ]
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Base rotation with time
      groupRef.current.rotation.y = time * 0.3;
      
      // Add mouse interaction
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        time * 0.3 + mousePosition.x * 0.3,
        0.05
      );
      
      // Gentle floating
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      
      // Subtle scale pulsing
      const scale = 1 + Math.sin(time * 2) * 0.05;
      groupRef.current.scale.setScalar(scale * (viewport.width < 6 ? 0.6 : 1));
    }
  });

  return (
    <group ref={groupRef}>
      {letterShapes.map((letter, letterIndex) => (
        <group key={letterIndex}>
          {letter.map((shape, shapeIndex) => (
            <mesh
              key={shapeIndex}
              position={shape.pos}
              rotation={shape.rotation || [0, 0, 0]}
            >
              <boxGeometry args={shape.scale} />
              <meshPhongMaterial 
                color={shapeIndex % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                shininess={100}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Particle background effect
function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Blue to purple gradient
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x3b82f6),
        new THREE.Color(0x8b5cf6),
        Math.random()
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.01;
        positions[i3] += Math.cos(time + positions[i3 + 1]) * 0.005;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Lighting setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#404040" />
      <directionalLight
        position={[1, 1, 1]}
        intensity={0.8}
        color="#3b82f6"
      />
      <pointLight
        position={[-1, 1, 2]}
        intensity={0.6}
        color="#8b5cf6"
        distance={100}
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#06b6d4"
        castShadow
      />
    </>
  );
}

// Main 3D DENVIL Logo Component
export default function DenvilLogo3D({ className = "" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [useFallback, setUseFallback] = useState(false);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  return (
    <div 
      className={`relative w-full h-96 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Lighting />
        <ParticleField />
        
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.2}
        >
          {useFallback ? (
            <GeometricDenvil mousePosition={mousePosition} />
          ) : (
            <GeometricDenvil mousePosition={mousePosition} />
          )}
        </Float>
        
        <Sparkles
          count={50}
          scale={10}
          size={2}
          speed={0.4}
          opacity={0.6}
          color="#3b82f6"
        />
      </Canvas>
      
      {/* Neon glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20 animate-pulse-glow" />
      </div>
    </div>
  );
}