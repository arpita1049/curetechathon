import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, MeshGradientMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { clock } = state;
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    });

    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
                <MeshDistortMaterial
                    color="#0ea5e9"
                    speed={4}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>
        </Float>
    );
};

const AICore = () => {
    return (
        <div className="w-full h-48 relative overflow-hidden flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                <AnimatedSphere />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default AICore;
