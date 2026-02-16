import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: string;
  extraScale?: number;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomOffset: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#0ea5e9',
  sparkSize = 12,
  sparkRadius = 80,
  sparkCount = 12,
  duration = 800,
  easing = 'ease-out',
  extraScale = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdRef = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const newSparks: Spark[] = [];
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2;
      const randomOffset = Math.random() * 0.3;
      newSparks.push({
        id: sparkIdRef.current++,
        x,
        y,
        angle,
        randomOffset
      });
    }

    setSparks(prev => [...prev, ...newSparks]);

    // Remove sparks after animation completes
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => !newSparks.find(ns => ns.id === spark.id)));
    }, duration);
  }, [sparkCount, duration]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {sparks.map((spark) => {
        const distance = sparkRadius * (1 + spark.randomOffset);
        const endX = Math.cos(spark.angle) * distance;
        const endY = Math.sin(spark.angle) * distance;

        return (
          <motion.div
            key={spark.id}
            initial={{
              x: spark.x,
              y: spark.y,
              opacity: 1,
              scale: 1.5
            }}
            animate={{
              x: spark.x + endX,
              y: spark.y + endY,
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: duration / 1000,
              ease: easing as any
            }}
            style={{
              position: 'fixed',
              width: sparkSize,
              height: sparkSize,
              backgroundColor: sparkColor,
              borderRadius: '50%',
              pointerEvents: 'none',
              boxShadow: `0 0 ${sparkSize * 1.5}px ${sparkColor}, 0 0 ${sparkSize * 3}px ${sparkColor}aa`,
              filter: 'brightness(1.2)',
              marginLeft: -sparkSize / 2,
              marginTop: -sparkSize / 2
            }}
          />
        );
      })}
    </div>
  );
};

export default ClickSpark;
