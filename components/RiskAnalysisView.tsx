import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, TrendingUp, UserCheck, AlertOctagon, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';
import RiskMeter from './RiskMeter';

const RiskAnalysisView: React.FC = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/doctor/dashboard');
                const data = await res.json();
                setStats(data.data);
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Neural Risk Stratification</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Populations Scanned: 1.2k | Neural Accuracy: 98%</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl"><BarChart3 className="w-5 h-5" /></button>
                    <button className="p-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl"><PieChart className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Hospitalization Risk", value: stats?.criticalCases ? stats.criticalCases * 12 + "%" : "32%", icon: ShieldAlert, color: "rose" },
                    { label: "Predictive Recovery", value: "88.4%", icon: TrendingUp, color: "emerald" },
                    { label: "Clinical Adherence", value: "91% Avg", icon: UserCheck, color: "indigo" }
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${s.color}-500/10 rounded-full blur-3xl -mr-16 -mt-16`} />
                        <div className={`p-4 bg-${s.color}-500/10 text-${s.color}-500 rounded-2xl w-fit mb-8`}>
                            <s.icon className="w-6 h-6" />
                        </div>
                        <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">{s.value}</div>
                        <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-7 p-12 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-10">Regional Risk Distribution</h3>
                    <div className="space-y-12">
                        {[
                            { label: 'Cardiovascular Node-4', val: 78, color: 'rose' },
                            { label: 'Respiratory Zone-2', val: 45, color: 'amber' },
                            { label: 'Neural Surveillance Grid', val: 12, color: 'emerald' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                                    <span className={`text-xl font-black text-${item.color}-500`}>{item.val}% Risk</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                        className={`h-full bg-${item.color}-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 p-12 bg-slate-950 rounded-[4rem] border border-white/10 text-white relative overflow-hidden group shadow-3xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-[100px] -mr-32 -mt-32 " />
                    <AlertOctagon className="w-12 h-12 text-rose-500 mb-10" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">Danger Indicators <br />(Neural Forecast)</h3>
                    <div className="space-y-8">
                        {[
                            { t: "Surge in acute respiratory distress", l: "Grid-India-North", c: "rose" },
                            { t: "Predicting medication shortfall", l: "Zone-7", c: "amber" }
                        ].map((alert, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className={`w-3 h-3 rounded-full bg-${alert.c}-500 mt-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]`} />
                                <div>
                                    <p className="font-black text-sm uppercase tracking-tight leading-tight mb-1">{alert.t}</p>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.l}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-12 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-4 hover:scale-105 transition-all">
                        Deploy Targeted Intervention <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiskAnalysisView;
