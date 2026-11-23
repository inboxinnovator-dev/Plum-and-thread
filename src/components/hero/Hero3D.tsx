import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { HeroFallback } from './HeroFallback';

/**
 * Creates a procedural micro-weave normal texture for authentic textile hand-feel.
 */
function createProceduralWeaveTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#8080ff'; // default normal flat
    ctx.fillRect(0, 0, size, size);

    // Cross-weave pattern
    ctx.strokeStyle = '#9090ff';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < size; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 18);
  return texture;
}

/**
 * Floating Kinetic Textile Ribbon Sculpture
 */
function TextileSculpture({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const weaveTexture = useMemo(() => createProceduralWeaveTexture(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!reducedMotion) {
      // Smooth interactive rotation tracking cursor position
      const targetRotX = state.pointer.y * 0.35 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      const targetRotY = state.pointer.x * 0.45 + state.clock.elapsedTime * 0.18;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 3);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 3);
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;

      if (outerRingRef.current) {
        outerRingRef.current.rotation.x = -state.pointer.y * 0.2;
        outerRingRef.current.rotation.y = -state.pointer.x * 0.2 - state.clock.elapsedTime * 0.1;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Draped Textile Mobius Torus Knot */}
      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.4}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        <mesh ref={meshRef} castShadow receiveShadow scale={1.25}>
          {/* TorusKnot represents continuous woven yarn / draped haute couture ribbon */}
          <torusKnotGeometry args={[1.1, 0.36, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#C66B4E" // Rich terracotta
            roughness={0.55}
            metalness={0.08}
            clearcoat={0.15}
            clearcoatRoughness={0.3}
            sheen={0.9}
            sheenRoughness={0.35}
            sheenColor={new THREE.Color('#DF8467')}
            normalMap={weaveTexture}
            normalScale={new THREE.Vector2(0.4, 0.4)}
          />
        </mesh>
      </Float>

      {/* Orbiting Golden Filament Thread Accent */}
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={outerRingRef} scale={1.8}>
          <torusGeometry args={[1.45, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#E6C594" // Brass / raw silk thread
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Contact Shadow on Studio Floor */}
      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.45}
        scale={6}
        blur={2.4}
        far={3}
        color="#171717"
      />
    </group>
  );
}

/**
 * WebGL Detection Helper
 */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const Hero3D: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL availability
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
    }

    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!hasWebGL || hasError) {
    return <HeroFallback reducedMotion={reducedMotion} />;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[600px] cursor-grab active:cursor-grabbing select-none">
      {/* Subtle Studio Backdrop Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#C66B4E]/12 to-[#747C66]/10 blur-3xl" />
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]} // Clamped for smooth mobile & high-res screen performance
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onError={() => setHasError(true)}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.8} color="#F4F0E8" />
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.8}
          color="#FFF8EE"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#DF8467" />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#747C66" />

        <TextileSculpture reducedMotion={reducedMotion} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Subtle Interaction Guide Label */}
      <div className="absolute bottom-2 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171717]/8 backdrop-blur-sm border border-[#171717]/10 text-[10px] font-mono text-[#171717]/60 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C66B4E]" />
        INTERACTIVE 3D TEXTILE · DRAG TO ROTATE
      </div>
    </div>
  );
};
