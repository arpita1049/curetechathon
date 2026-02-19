import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
    value: number; // 0 to 100
    label?: string;
    size?: number;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ value, label = "Clinical Risk", size = 160 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    const radius = (size / 2) - 15;
    const center = size / 2;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayValue(value);
        }, 500);
        return () => clearTimeout(timer);
    }, [value]);

    const getColor = (val: number) => {
        if (val < 30) return '#10B981'; // Green
        if (val < 70) return '#F59E0B'; // Amber
        return '#EF4444'; // Red
    };

    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div
                className="relative"
                style={{ width: size, height: size }}
            >
                {/* Background Circle */}
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-200 dark:text-slate-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={getColor(displayValue)}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-3xl font-black tracking-tighter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {Math.round(displayValue)}%
                    </motion.span>
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest mt-1">Severity</span>
                </div>
            </div>

            <div className="mt-6 text-center z-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-1">{label}</h4>
                <div className="flex items-center gap-2 justify-center">
                    <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: getColor(displayValue) }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {displayValue < 30 ? 'Low Risk' : displayValue < 70 ? 'Moderate' : 'Critical Action'}
                    </span>
                </div>
            </div>

            {displayValue > 70 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </motion.div>
            )}
        </div>
    );
};

export default RiskMeter;
