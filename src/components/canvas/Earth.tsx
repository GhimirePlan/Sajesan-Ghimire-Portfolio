import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const LoadingFallback = memo(() => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#915EFF" />
    </mesh>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

const Earth = memo(() => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
});

Earth.displayName = 'Earth';

const EarthCanvas = memo(() => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <OrbitControls
            autoRotate
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
});

EarthCanvas.displayName = 'EarthCanvas';

export default EarthCanvas;
