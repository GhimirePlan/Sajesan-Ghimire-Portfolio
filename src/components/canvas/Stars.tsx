import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import { TypedArray } from "three";
import React from "react";

const Stars = (props: any) => {
  const ref = useRef<THREE.Points>();
  const [sphere, setSphere] = useState<TypedArray | null>(null);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    try {
      const points = random.inSphere(new Float32Array(5001), { radius: 1.2 });
      setSphere(points);
    } catch (err) {
      console.error("Failed to generate stars:", err);
      setError(true);
    }
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-tertiary rounded-2xl">
        <p className="text-white text-center p-4">
          Unable to generate stars effect. Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (!sphere) {
    return null;
  }

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
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
