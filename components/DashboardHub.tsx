import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, AlertTriangle, Zap, MessageCircle,
    Activity, Bell, TrendingUp, TrendingDown,
    Clock, CheckCircle2, ShieldAlert, HeartPulse,
    ChevronRight, ArrowUpRight, Search, LayoutGrid
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/doctor/dashboard';

const DashboardHub: React.FC = () => {
    const [data, setData] = useState<any>({
        dailyIntake: { totalPatients: 24, newCases: 18, closedCases: 6, percentageChange: 12, isIncrease: true },
        criticalCases: [
            { _id: 'c1', patientId: { name: 'Arpita Sharma' }, riskLevel: 'CRITICAL', aiConfidenceScore: 92, chiefComplaint: 'Severe Migraine', createdAt: new Date() },
            { _id: 'c2', patientId: { name: 'Rahul Verma' }, riskLevel: 'HIGH', aiConfidenceScore: 85, chiefComplaint: 'Chest Tightness', createdAt: new Date() }
        ],
        liveQueue: [
            { _id: 'q1', patientId: { name: 'Priya Das' }, riskLevel: 'CRITICAL', status: 'PENDING', chiefComplaint: 'Neural Scan', createdAt: new Date() },
            { _id: 'q2', patientId: { name: 'Aditya Sen' }, riskLevel: 'MEDIUM', status: 'UNDER_REVIEW', chiefComplaint: 'Post-Op Checkup', createdAt: new Date() },
            { _id: 'q3', patientId: { name: 'Saira Bano' }, riskLevel: 'LOW', status: 'PENDING', chiefComplaint: 'Fever', createdAt: new Date() },
            { _id: 'q4', patientId: { name: 'Vikram Singh' }, riskLevel: 'MEDIUM', status: 'TREATED', chiefComplaint: 'Influenza', createdAt: new Date() }
        ],
        pendingOpinions: { count: 3, items: [] },
        monitoring: [
            { name: 'Kabir Khan', recoveryProgress: 85, missedMedication: false },
            { name: 'Meera Rajput', recoveryProgress: 45, missedMedication: true }
        ],
        alerts: [
            { type: 'CRITICAL_RISK', message: 'CRITICAL: Arpita Sharma - Vitals Escalating', timestamp: new Date() },
            { type: 'EMERGENCY', message: 'EMERGENCY: New Cardiac Node at Grid-4', timestamp: new Date() }
        ],
        miniAnalytics: { mostCommonDisease: 'Neural Fatigue', avgResponseTime: '8 mins', caseResolutionRate: '92%' }
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const [intake, critical, queue, opinions, monitoring, alerts, analytics] = await Promise.all([
                fetch(`${API_BASE}/daily-intake`).then(res => res.json()),
                fetch(`${API_BASE}/critical-cases`).then(res => res.json()),
                fetch(`${API_BASE}/live-queue`).then(res => res.json()),
                fetch(`${API_BASE}/pending-second-opinions`).then(res => res.json()),
                fetch(`${API_BASE}/monitoring`).then(res => res.json()),
                fetch(`${API_BASE}/alerts`).then(res => res.json()),
                fetch(`${API_BASE}/mini-analytics`).then(res => res.json())
            ]);

            setData(prev => ({
                dailyIntake: intake.status === 'success' ? intake.data : prev.dailyIntake,
                criticalCases: critical.status === 'success' ? critical.data : prev.criticalCases,
                liveQueue: queue.status === 'success' ? queue.data : prev.liveQueue,
                pendingOpinions: opinions.status === 'success' ? opinions.data : prev.pendingOpinions,
                monitoring: monitoring.status === 'success' ? monitoring.data : prev.monitoring,
                alerts: alerts.status === 'success' ? alerts.data : prev.alerts,
                miniAnalytics: analytics.status === 'success' ? analytics.data : prev.miniAnalytics
            }));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const skeletonClasses = "animate-pulse bg-slate-200 dark:bg-slate-800 rounded-3xl";

    return (
        <div className="space-y-10">
            {/* 6️⃣ ALERT SUMMARY STRIP */}
            <AnimatePresence>
                {data.alerts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
                    >
                        {data.alerts.map((alert: any, i: number) => (
                            <div key={i} className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl border ${alert.type === 'CRITICAL_RISK' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
                                <ShieldAlert className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{alert.message}</span>
                                <span className="text-[8px] opacity-60">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-8">
                {/* 1️⃣ DAILY INTAKE PANEL */}
                <div className="lg:col-span-1 p-8 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-xl group hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                            <Users className="w-5 h-5" />
                        </div>
                        {data.dailyIntake && (
                            <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${data.dailyIntake.isIncrease ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {data.dailyIntake.isIncrease ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                                {Math.abs(data.dailyIntake.percentageChange)}%
                            </div>
                        )}
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isLoading ? "---" : data.dailyIntake?.totalPatients || 0}
                    </div>
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Total Intake</div>
                </div>

                <div className="lg:col-span-1 p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-xl group hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isLoading ? "---" : data.dailyIntake?.newCases || 0}
                    </div>
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">New Cases</div>
                </div>

                <div className="lg:col-span-1 p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-xl group hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isLoading ? "---" : data.dailyIntake?.closedCases || 0}
                    </div>
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Resolved Today</div>
                </div>

                {/* 7️⃣ MINI ANALYTICS WIDGET */}
                <div className="lg:col-span-2 p-8 bg-[#0a192f]/90 text-white rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center mb-4">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-300">Predictive Node</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trend Condition</p>
                                <p className="text-sm font-black uppercase tracking-tight">{data.miniAnalytics?.mostCommonDisease || 'Calibrating...'}</p>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Res. Time</p>
                                    <p className="text-sm font-black text-emerald-400">{data.miniAnalytics?.avgResponseTime || '--'}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
                                    <p className="text-sm font-black text-sky-400">{data.miniAnalytics?.caseResolutionRate || '--'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4️⃣ PENDING SECOND OPINIONS */}
                <div className="lg:col-span-1 p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-xl group hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isLoading ? "---" : data.pendingOpinions?.count || 0}
                    </div>
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Pending Sync</div>
                </div>

                <div className="lg:col-span-1 p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-xl group hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl">
                            <Bell className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {isLoading ? "---" : data.monitoring?.length || 0}
                    </div>
                    <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Post-Op Monitor</div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* 3️⃣ LIVE PATIENT QUEUE */}
                <div className="col-span-12 lg:col-span-8 p-12 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Live Triage Queue</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dynamic Sorting by Severity & Wait Time</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=q${i}`} alt="" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">+{data.liveQueue.length} Active Nodes</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            [1, 2, 3].map(i => <div key={i} className={`h-28 ${skeletonClasses}`} />)
                        ) : data.liveQueue.length > 0 ? (
                            data.liveQueue.map((c: any, i: number) => (
                                <motion.div
                                    key={c._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 bg-slate-50/50 dark:bg-white/5 rounded-[2rem] border border-transparent hover:border-indigo-500/20 hover:bg-white dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex items-center gap-6"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm border ${c.riskLevel === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse' :
                                        c.riskLevel === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                            c.riskLevel === 'MEDIUM' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                        }`}>
                                        {c.riskLevel.substring(0, 1)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-lg font-black uppercase tracking-tight">{c.patientId?.name || 'Unknown Node'}</h4>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60">ID: {c._id.substring(c._id.length - 8).toUpperCase()}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                <LayoutGrid className="w-3 h-3" /> {c.chiefComplaint}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-6">
                                        <div className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border ${c.status === 'PENDING' ? 'bg-slate-500/10 text-slate-500' :
                                            c.status === 'UNDER_REVIEW' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            }`}>
                                            {c.status.replace('_', ' ')}
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-20 text-center opacity-40 text-[10px] font-black uppercase tracking-[0.3em]">No patients awaiting review</div>
                        )}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-10">
                    {/* 2️⃣ CRITICAL CASES PANEL */}
                    <div className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 text-rose-500" />
                                Critical Nodes
                            </h4>
                            <span className="text-[9px] font-black text-rose-500 animate-pulse uppercase tracking-widest">Immediate Review</span>
                        </div>
                        <div className="space-y-5">
                            {isLoading ? (
                                [1, 2, 3].map(i => <div key={i} className={`h-20 ${skeletonClasses}`} />)
                            ) : data.criticalCases.length > 0 ? (
                                data.criticalCases.slice(0, 4).map((c: any, i: number) => (
                                    <div key={c._id} className="p-5 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-3xl transition-all cursor-pointer group flex justify-between items-center">
                                        <div>
                                            <p className="font-black text-sm uppercase tracking-tight mb-1">{c.patientId?.name}</p>
                                            <div className="flex gap-3">
                                                <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">AI Confidence: {c.aiConfidenceScore}%</span>
                                            </div>
                                        </div>
                                        <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-rose-500/20 group-hover:scale-110 transition-all">
                                            <ArrowUpRight className="w-4 h-4 text-rose-500" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center text-slate-400 text-[9px] font-black uppercase tracking-widest">All critical points cleared</div>
                            )}
                        </div>
                    </div>

                    {/* 5️⃣ MONITORING PANEL */}
                    <div className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <HeartPulse className="w-5 h-5 text-sky-500" />
                                Active Vitals
                            </h4>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Real-time Stream</span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {isLoading ? (
                                [1, 2].map(i => <div key={i} className={`h-24 ${skeletonClasses}`} />)
                            ) : data.monitoring.length > 0 ? (
                                data.monitoring.map((m: any, i: number) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${m.missedMedication ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}>
                                                {m.missedMedication ? 'Medication Missed' : 'Stable'}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${m.recoveryProgress}%` }} className={`h-full bg-sky-500 rounded-full`} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center text-slate-400 text-[9px] font-black uppercase tracking-widest">No active monitoring nodes</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHub;
