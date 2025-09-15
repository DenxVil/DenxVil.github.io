import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (props) => {
  const ref = useRef();
  
const Stars = (props) => {
  const ref = useRef();
  
  // Create sphere with bulletproof error handling to prevent NaN values
  const [sphere] = useState(() => {
    try {
      // Use a more reliable method to generate star positions
      const count = 5000;
      const positions = new Float32Array(count);
      const radius = 1.2;
      
      for (let i = 0; i < count; i += 3) {
        // Generate random points in a sphere using rejection sampling
        let x, y, z, length;
        do {
          x = (Math.random() - 0.5) * 2;
          y = (Math.random() - 0.5) * 2; 
          z = (Math.random() - 0.5) * 2;
          length = Math.sqrt(x * x + y * y + z * z);
        } while (length > 1 || length === 0);
        
        // Normalize and scale by radius
        const scale = (Math.random() * radius) / length;
        positions[i] = x * scale;
        positions[i + 1] = y * scale;
        positions[i + 2] = z * scale;
        
        // Double-check for NaN values and replace with safe defaults
        if (!isFinite(positions[i]) || isNaN(positions[i])) positions[i] = 0;
        if (!isFinite(positions[i + 1]) || isNaN(positions[i + 1])) positions[i + 1] = 0;
        if (!isFinite(positions[i + 2]) || isNaN(positions[i + 2])) positions[i + 2] = 0;
      }
      
      console.log('Star positions generated successfully:', positions.length / 3, 'stars');
      return positions;
    } catch (error) {
      console.warn("Error generating star positions, using simple fallback:", error);
      
      // Ultra-simple fallback: generate basic sphere positions
      const fallbackPositions = new Float32Array(1500); // Fewer stars for safety
      for (let i = 0; i < 1500; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.random() * 1.2;
        
        fallbackPositions[i] = r * Math.sin(phi) * Math.cos(theta) || 0;
        fallbackPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta) || 0;
        fallbackPositions[i + 2] = r * Math.cos(phi) || 0;
      }
      
      return fallbackPositions;
    }
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={(state) => {
          // Safari-friendly WebGL context setup
          try {
            const gl = state.gl;
            gl.outputEncoding = 3001; // sRGBEncoding
            gl.toneMapping = 1; // LinearToneMapping
            gl.setClearColor(0x050816, 0); // Transparent background
          } catch (error) {
            console.warn("Canvas setup error:", error);
          }
        }}
        onError={(error) => {
          console.warn("Canvas error:", error);
        }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;