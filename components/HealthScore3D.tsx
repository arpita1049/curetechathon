import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ScoreRing = ({ score }: { score: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const innerMeshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.z = time * 0.5;
        innerMeshRef.current.rotation.z = -time * 0.3;
    });

    const progress = score / 100;

    return (
        <group>
            {/* Background Outer Ring */}
            <Torus args={[2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#2d3748" transparent opacity={0.1} />
            </Torus>

            {/* Main Glowing Progress Ring */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Torus ref={meshRef} args={[2.05, 0.08, 16, 100, Math.PI * 2 * progress]} rotation={[Math.PI / 2, 0, 0]}>
                    <MeshDistortMaterial
                        color="#2dd4bf"
                        speed={2}
                        distort={0.1}
                        radius={1}
                        emissive="#14b8a6"
                        emissiveIntensity={2}
                    />
                </Torus>
            </Float>

            {/* Inner Decorative Ring */}
            <Torus ref={innerMeshRef} args={[1.7, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#0ea5e9" transparent opacity={0.3} />
            </Torus>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} />
        </group>
    );
};

interface HealthScore3DProps {
    score: number;
}

const HealthScore3D: React.FC<HealthScore3DProps> = ({ score }) => {
    return (
        <div className="w-full h-full relative cursor-pointer group">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ScoreRing score={score} />
            </Canvas>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-transform group-hover:scale-110 duration-500">
                    {score}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600/80 mt-1">
                    Vitality Index
                </span>
            </div>
        </div>
    );
};

export default HealthScore3D;
