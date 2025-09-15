import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  
  // Create sphere with error handling to prevent NaN values
  const [sphere] = useState(() => {
    try {
      const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
      
      // Validate positions array to ensure no NaN values
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i]) || !isFinite(positions[i])) {
          positions[i] = 0;
        }
      }
      
      return positions;
    } catch (error) {
      console.warn("Error generating star positions, using fallback:", error);
      
      // Fallback: generate manual sphere positions
      const fallbackPositions = new Float32Array(5000);
      for (let i = 0; i < 5000; i += 3) {
        const radius = Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        fallbackPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        fallbackPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        fallbackPositions[i + 2] = radius * Math.cos(phi);
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
        onCreated={(state) => {
          // Ensure canvas context is valid
          const gl = state.gl.getContext();
          if (!gl) {
            console.warn("WebGL context not available");
            return;
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