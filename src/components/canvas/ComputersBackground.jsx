import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";

// 3D Computer-like geometric structure for background
const ComputerGeometry = ({ isMobile }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Create a computer-like geometric structure
  const computerParts = [
    // Monitor/Screen
    { type: 'box', position: [0, 1, 0], args: [2.5, 1.5, 0.1], color: '#1a1a2e' },
    { type: 'box', position: [0, 1, -0.15], args: [2.7, 1.7, 0.05], color: '#16213e' },
    
    // Monitor Stand
    { type: 'box', position: [0, 0, 0], args: [0.3, 1, 0.3], color: '#0f172a' },
    { type: 'box', position: [0, -0.5, 0], args: [1, 0.2, 0.8], color: '#0f172a' },
    
    // Keyboard
    { type: 'box', position: [0, -1.2, 0.8], args: [2, 0.1, 0.8], color: '#1e293b' },
    
    // Mouse
    { type: 'box', position: [1.5, -1.1, 0.6], args: [0.3, 0.1, 0.5], color: '#334155' },
    
    // Floating geometric elements around the computer
    { type: 'box', position: [-3, 2, -1], args: [0.5, 0.5, 0.5], color: '#3b82f6', rotation: [0.5, 0.5, 0] },
    { type: 'box', position: [3, 1, -0.5], args: [0.3, 0.8, 0.3], color: '#8b5cf6', rotation: [0, 1, 0.5] },
    { type: 'box', position: [-2, -1, 1.5], args: [0.4, 0.4, 0.4], color: '#06b6d4', rotation: [1, 0, 0.3] },
    { type: 'box', position: [2.5, 0, 1.2], args: [0.6, 0.2, 0.6], color: '#10b981', rotation: [0.3, 0.8, 0] },
  ];

  return (
    <group ref={groupRef}>
      <Float
        speed={0.5}
        rotationIntensity={isMobile ? 0.2 : 0.4}
        floatIntensity={isMobile ? 0.2 : 0.4}
      >
        <group ref={meshRef} scale={isMobile ? 0.4 : 0.6}>
          {computerParts.map((part, index) => (
            <mesh
              key={index}
              position={part.position}
              rotation={part.rotation || [0, 0, 0]}
            >
              <boxGeometry args={part.args} />
              <meshStandardMaterial
                color={part.color}
                metalness={0.7}
                roughness={0.3}
                emissive={part.color}
                emissiveIntensity={0.05}
              />
            </mesh>
          ))}
          
          {/* Floating particles around the computer */}
          {[...Array(15)].map((_, i) => (
            <mesh
              key={`particle-${i}`}
              position={[
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]}
                emissive={'#ffffff'}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};

const ComputersBackground = ({ isMobile }) => {
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.5} position={[10, 10, 10]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      <ComputerGeometry isMobile={isMobile} />
    </mesh>
  );
};

const ComputersBackgroundCanvas = () => {
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
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.3}
          />
          <ComputersBackground isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersBackgroundCanvas;