import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3, TrendingUp, Users, Activity,
    ArrowUpRight, ArrowDownRight, Zap
} from 'lucide-react';

const PracticeAnalytics: React.FC = () => {
    const metrics = [
        { label: 'Patient Yield', value: '88%', trend: '+4%', up: true },
        { label: 'Clinical Efficacy', value: '94.2%', trend: '+2.1%', up: true },
        { label: 'Avg. Consultation', value: '12m', trend: '-15%', up: true },
    ];

    const chartData = [40, 70, 45, 90, 65, 80, 50];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white/40 dark:bg-[#0f2a47]/60 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-white/10"
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                        <div className="flex justify-between items-end">
                            <h4 className="text-xl font-black">{m.value}</h4>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${m.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {m.trend}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-8 bg-white/40 dark:bg-[#0f2a47]/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 dark:border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter">Clinical Load Trend</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Patient Inflow</p>
                    </div>
                    <div className="flex gap-2">
                        {['Daily', 'Weekly', 'Monthly'].map((t, i) => (
                            <button key={i} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-48 flex items-end gap-3 px-2">
                    {chartData.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                            <div className="w-full relative">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={`w-full rounded-t-xl bg-gradient-to-t ${i === 3 ? 'from-indigo-600 to-sky-400' : 'from-slate-200 dark:from-slate-700 to-slate-300 dark:to-slate-600'} group-hover:from-indigo-500 group-hover:to-sky-300 transition-all duration-500`}
                                />
                                {i === 3 && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-xl">
                                        Peak
                                    </div>
                                )}
                            </div>
                            <span className="text-[8px] font-black text-slate-400 uppercase">D-{6 - i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex justify-between items-start">
                    <div className="space-y-4">
                        <div className="p-3 bg-white/10 rounded-2xl w-fit">
                            <Zap className="w-6 h-6 text-amber-400" />
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter leading-tight">AI Optimisation <br />Report Ready</h4>
                        <p className="text-indigo-200 text-sm font-bold uppercase tracking-tighter">Your clinical efficiency is up by 12%</p>
                    </div>
                    <button className="px-6 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-indigo-50 transition-colors">Generate</button>
                </div>
            </div>
        </div>
    );
};

export default PracticeAnalytics;
