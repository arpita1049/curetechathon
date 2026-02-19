import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Heart, Droplets, Footprints, Moon, GlassWater,
    Thermometer, Plus, MoreVertical, TrendingUp, TrendingDown,
    ArrowLeft, PieChart, Calendar, ChevronRight, Zap, Info,
    CheckCircle2, Brain, Coffee, Dumbbell
} from 'lucide-react';

interface HealthStat {
    id: string;
    label: string;
    value: string;
    unit: string;
    status: 'Normal' | 'Warning' | 'Good';
    icon: any;
    color: string;
    trend: 'up' | 'down' | 'stable';
    goal: string;
}

const DailyHealthTracker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedDate, setSelectedDate] = useState('Today');

    const stats: HealthStat[] = [
        { id: 'steps', label: 'Steps', value: '7,420', unit: 'steps', status: 'Good', icon: Footprints, color: 'blue', trend: 'up', goal: '10,000' },
        { id: 'water', label: 'Hydration', value: '1.8', unit: 'Liters', status: 'Normal', icon: GlassWater, color: 'sky', trend: 'stable', goal: '2.5' },
        { id: 'sleep', label: 'Sleep', value: '7h 20m', unit: 'hours', status: 'Normal', icon: Moon, color: 'indigo', trend: 'down', goal: '8h 00m' },
        { id: 'calories', label: 'Exhaustion', value: '340', unit: 'kcal', status: 'Good', icon: Activity, color: 'rose', trend: 'up', goal: '500' },
        { id: 'bp', label: 'Blood Pressure', value: '118/78', unit: 'mmHg', status: 'Good', icon: Heart, color: 'emerald', trend: 'stable', goal: '120/80' },
        { id: 'mood', label: 'Mental Vibe', value: 'Calm', unit: 'status', status: 'Good', icon: Brain, color: 'violet', trend: 'up', goal: 'Positive' }
    ];

    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Bio-Metrics Tracker
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3">
                            <Plus className="w-5 h-5" /> Log Metric
                        </button>
                    </div>
                </div>

                {/* Main Score & Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 p-10 rounded-[4rem] bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 shadow-sm space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Burn Timeline</h3>
                            <div className="flex gap-2">
                                {['Day', 'Week', 'Month'].map(t => (
                                    <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Day' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Chart Placeholder */}
                        <div className="h-64 flex items-end gap-3 px-4">
                            {[40, 65, 45, 90, 55, 75, 85, 60, 40, 70, 95, 80].map((h, i) => (
                                <div key={i} className="flex-1 space-y-3 group cursor-pointer">
                                    <div className="relative h-full w-full">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            className={`w-full rounded-t-xl transition-all ${h > 80 ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : h > 50 ? 'bg-blue-400' : 'bg-blue-100 dark:bg-blue-900/30'} group-hover:scale-y-110`}
                                        />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">{i + 8}h</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { l: 'Heart Rate', v: '72 bpm', i: <Heart className="w-4 h-4 text-rose-500" /> },
                                { l: 'Body Temp', v: '98.6° F', i: <Thermometer className="w-4 h-4 text-orange-500" /> },
                                { l: 'O2 Level', v: '99%', i: <Droplets className="w-4 h-4 text-sky-500" /> },
                                { l: 'Stress Index', v: 'Low', i: <Brain className="w-4 h-4 text-violet-500" /> }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {stat.i} {stat.l}
                                    </div>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">{stat.v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-10 rounded-[4rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white shadow-2xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                        <h3 className="text-2xl font-black tracking-tight">Active Goal: Marathoner</h3>
                        <div className="relative h-48 w-48 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/10" />
                                <motion.circle
                                    cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 80}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - 0.74) }}
                                    transition={{ duration: 1.5 }}
                                    className="text-white"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black tracking-tighter">74%</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Complete</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Coach Insight</p>
                                <p className="text-sm font-bold leading-relaxed">You're on track for your weekly cardio goal. 2,580 more steps to unlock Bronze Badge.</p>
                            </div>
                            <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                                Adjust Weekly Goals
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] p-8 border-2 border-slate-100 dark:border-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-4 rounded-2xl bg-${stat.color}-500 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                                        Goal: {stat.goal} {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-rose-500" />}
                                    </div>
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.status === 'Good' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                        {stat.status}
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</span>
                                <span className="text-lg font-bold text-slate-400">{stat.unit}</span>
                            </div>
                            <div className="mt-8 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">+2</div>
                                </div>
                                <button className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest flex items-center gap-1 group/btn">
                                    Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Insight */}
                <div className="p-10 rounded-[3.5rem] bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-white/70 dark:bg-[#0f2a47]/80 backdrop-blur-3xl rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0 animate-bounce">
                        <Zap className="w-12 h-12" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">Smart Recovery Alert</h4>
                        <p className="text-slate-500 font-bold leading-relaxed">Based on your activity pattern and heart rate variability, we recommend an active recovery day tomorrow. Intense workout is not suggested for the next 24 hours.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyHealthTracker;
