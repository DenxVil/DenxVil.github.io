import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";

const EnhancedStars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
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

// Additional star layers for depth
const StarLayer = ({ count, radius, color, size, speed }) => {
  const ref = useRef();
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(count * 3), { radius })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (speed * 2);
      ref.current.rotation.y -= delta / speed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const EnhancedStarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-2] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          {/* Multiple star layers for depth and visual richness */}
          <EnhancedStars />
          
          {/* Background distant stars */}
          <StarLayer 
            count={2000} 
            radius={2.5} 
            color="#4a5568" 
            size={0.001} 
            speed={25}
          />
          
          {/* Mid-ground stars */}
          <StarLayer 
            count={1500} 
            radius={1.8} 
            color="#6b7280" 
            size={0.0015} 
            speed={20}
          />
          
          {/* Foreground bright stars */}
          <StarLayer 
            count={1000} 
            radius={1.0} 
            color="#e2e8f0" 
            size={0.003} 
            speed={15}
          />
          
          {/* Accent colored stars */}
          <StarLayer 
            count={500} 
            radius={1.5} 
            color="#3b82f6" 
            size={0.002} 
            speed={18}
          />
          
          <StarLayer 
            count={300} 
            radius={1.3} 
            color="#8b5cf6" 
            size={0.0025} 
            speed={22}
          />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default EnhancedStarsCanvas;