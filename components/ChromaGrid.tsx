
import React, { useEffect, useRef } from 'react';

interface ChromaGridProps {
    gridSize?: number;
    color?: string;
    lineWidth?: number;
    chromaStrength?: number;
    speed?: number;
    className?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
    gridSize = 40,
    color = 'rgba(255, 255, 255, 0.1)',
    lineWidth = 1,
    chromaStrength = 3,
    speed = 0.5,
    className = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Add subtle movement to create "breathing" effect
        let frameId: number;
        let time = 0;

        const animate = () => {
            time += speed * 0.01;

            // Select layers by class
            const layers = container.querySelectorAll('.chroma-layer') as NodeListOf<HTMLElement>;

            layers.forEach((layer, i) => {
                // Offset each layer slightly differently based on time
                const offset = (i - 1) * chromaStrength; // -strength, 0, +strength
                const movement = Math.sin(time + i) * 2;

                layer.style.transform = `translate(${offset + movement}px, ${offset - movement}px) scale(${1 + Math.sin(time) * 0.005})`;
            });

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [chromaStrength, speed]);

    // Generate grid background style
    const gridStyle = {
        backgroundImage: `
      linear-gradient(${color} ${lineWidth}px, transparent ${lineWidth}px),
      linear-gradient(90deg, ${color} ${lineWidth}px, transparent ${lineWidth}px)
    `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
    };

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
            style={{ perspective: '1000px' }}
        >
            {/* Red Layer */}
            <div
                className="chroma-layer absolute inset-[-10%] w-[120%] h-[120%]"
                style={{
                    ...gridStyle,
                    backgroundImage: `
            linear-gradient(rgba(255, 0, 0, 0.15) ${lineWidth}px, transparent ${lineWidth}px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.15) ${lineWidth}px, transparent ${lineWidth}px)
          `,
                    mixBlendMode: 'screen',
                    filter: 'blur(0.5px)',
                    opacity: 0.6
                }}
            />

            {/* Green Layer (Base) */}
            <div
                className="chroma-layer absolute inset-[-10%] w-[120%] h-[120%]"
                style={{
                    ...gridStyle,
                    backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.15) ${lineWidth}px, transparent ${lineWidth}px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.15) ${lineWidth}px, transparent ${lineWidth}px)
          `,
                    mixBlendMode: 'screen',
                    opacity: 0.6
                }}
            />

            {/* Blue Layer */}
            <div
                className="chroma-layer absolute inset-[-10%] w-[120%] h-[120%]"
                style={{
                    ...gridStyle,
                    backgroundImage: `
            linear-gradient(rgba(0, 0, 255, 0.15) ${lineWidth}px, transparent ${lineWidth}px),
            linear-gradient(90deg, rgba(0, 0, 255, 0.15) ${lineWidth}px, transparent ${lineWidth}px)
          `,
                    mixBlendMode: 'screen',
                    filter: 'blur(0.5px)',
                    opacity: 0.6
                }}
            />

            {/* Vignette Overlay to fade edges */}
            <div className="absolute inset-0 dark:hidden" style={{ background: 'radial-gradient(circle, transparent 40%, white 100%)' }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: 'radial-gradient(circle, transparent 20%, #000000 100%)' }} />
        </div>
    );
};

export default ChromaGrid;
