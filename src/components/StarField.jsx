import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from 'three';

// Detect mobile device
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const Stars = (props) => {
  const ref = useRef();
  const mobile = useMemo(() => isMobile(), []);
  const starCount = mobile ? 2000 : 5000; // Reduce stars on mobile
  
  const [sphere] = useState(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / (mobile ? 20 : 10); // Slower rotation on mobile
    ref.current.rotation.y -= delta / (mobile ? 30 : 15);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#3b82f6'
          size={mobile ? 0.003 : 0.002} // Slightly larger on mobile for visibility
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarField = () => {
  const mobile = useMemo(() => isMobile(), []);
  
  return (
    <div className='w-full h-full absolute inset-0 z-[-1]'>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={mobile ? 1 : Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio on mobile
        gl={{ 
          antialias: !mobile, // Disable antialiasing on mobile
          powerPreference: mobile ? "low-power" : "default"
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

export default StarField;