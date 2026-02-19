import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Particles = () => {
    const count = 1000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    const mesh = useRef<THREE.Points>(null!);
    useFrame((state) => {
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.x += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#2dd4bf"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const ECGWave = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 overflow-hidden">
            <motion.svg
                initial={{ x: 0 }}
                animate={{ x: "-33.33%" }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity
                }}
                width="300%"
                height="100%"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                className="h-full"
            >
                <path
                    d="M 0 100 L 100 100 L 110 80 L 120 120 L 130 50 L 140 150 L 150 100 L 250 100 L 260 80 L 270 120 L 280 50 L 290 150 L 300 100 L 400 100 L 410 80 L 420 120 L 430 50 L 440 150 L 450 100 L 550 100 L 560 80 L 570 120 L 580 50 L 590 150 L 600 100 L 700 100 L 710 80 L 720 120 L 730 50 L 740 150 L 750 100 L 850 100 L 860 80 L 870 120 L 880 50 L 890 150 L 900 100 L 1000 100"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </motion.svg>
        </div>
    );
}

const Premium3DBG: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-slate-50 dark:bg-black transition-colors duration-700">
            {/* 3D Particle Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <Particles />
                </Canvas>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-transparent to-blue-500/5 dark:from-teal-500/10 dark:to-blue-600/10 pointer-events-none" />

            {/* ECG Mesh/Grid Layer */}
            <ECGWave />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none opacity-50" />

            {/* Ambient Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-400/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" />
        </div>
    );
};

export default Premium3DBG;
