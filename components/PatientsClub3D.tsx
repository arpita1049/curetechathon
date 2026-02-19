
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Particle = ({ position, color }: { position: [number, number, number], color: string }) => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
            mesh.current.rotation.x += 0.005;
            mesh.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={mesh} position={position}>
            <octahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color={color} transparent opacity={0.6} metalness={1} roughness={0} />
        </mesh>
    );
};

const FloatingHormones = ({ color }: { color: string }) => {
    const particles = Array.from({ length: 40 }, () => ({
        position: [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        ] as [number, number, number],
        color: color
    }));

    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {particles.map((p, i) => (
                <Particle key={i} {...p} />
            ))}

            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 64, 64]} position={[-3, 0, -2]}>
                    <MeshDistortMaterial
                        color={color}
                        speed={2}
                        distort={0.4}
                        radius={1}
                        emissive={color}
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.3}
                    />
                </Sphere>
            </Float>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Sphere args={[0.5, 64, 64]} position={[4, 2, -1]}>
                    <MeshDistortMaterial
                        color={color}
                        speed={3}
                        distort={0.5}
                        radius={1}
                        transparent
                        opacity={0.2}
                    />
                </Sphere>
            </Float>
        </>
    );
};

export const PatientsClub3D: React.FC<{ themeColor?: string }> = ({ themeColor = '#10b981' }) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <FloatingHormones color={themeColor} />
            </Canvas>
        </div>
    );
};
