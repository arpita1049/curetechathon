import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, CheckCircle2, Search, Filter, History, Trash2, LayoutGrid, List } from 'lucide-react';

const API_BASE = 'http://localhost:5000/doctor';

const MonitoringView: React.FC = () => {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(`${API_BASE}/notifications`);
                const data = await res.json();
                setAlerts(data.data || []);
            } catch (err) { console.error(err); }
        };
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 10000);
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id: string) => {
        try {
            await fetch(`${API_BASE}/notifications/${id}`, { method: 'PATCH' });
            setAlerts(prev => prev.filter(a => a._id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Monitoring & Alerts</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Surveillance Log Node: SYSL-882 | Real-time Stream Active</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-200 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-white/10">
                        <button className="p-2.5 rounded-xl bg-indigo-600' text-white' shadow-lg"><LayoutGrid className="w-4 h-4" /></button>
                        <button className="p-2.5 rounded-xl text-slate-500"><List className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8 p-12 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-white/10 shadow-2xl min-h-[600px]">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-2xl font-black uppercase tracking-tighter">Active System Alerts</h4>
                        <div className="flex gap-4">
                            <span className="px-5 py-2 bg-indigo-500/10 text-indigo-500 text-[9px] font-black uppercase rounded-full border border-indigo-500/20">{alerts.length} Pending Actions</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {alerts.length > 0 ? alerts.map((alert, i) => (
                            <motion.div
                                key={alert._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-indigo-500/30 transition-all flex items-center gap-8 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${alert.priority === 'URGENT' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center shadow-xl`}>
                                    <Bell className="w-6 h-6 animate-swing" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-black text-xl uppercase tracking-tight text-slate-900 dark:text-white leading-none mb-2">{alert.title}</h5>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{alert.message}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                                    <button
                                        onClick={() => markAsRead(alert._id)}
                                        className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-300 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all shadow-lg"
                                    >
                                        <CheckCircle2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="py-40 text-center space-y-6 flex flex-col items-center opacity-30">
                                <Activity className="w-20 h-20" />
                                <p className="text-xl font-black uppercase tracking-tighter">No high-risk events detected in current stream</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-10">
                    <div className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/20 dark:border-white/10 shadow-2xl">
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-8">System Health Node</h4>
                        <div className="space-y-6">
                            {[
                                { l: 'Latency', v: '0.04ms', c: 'emerald' },
                                { l: 'Data Mesh', v: 'SYNCED', c: 'indigo' },
                                { l: 'API Node', v: 'ACTIVE', c: 'sky' }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.l}</span>
                                    <span className={`text-[10px] font-black uppercase text-${s.c}-500`}>{s.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-10 bg-gradient-to-br from-indigo-900 to-black rounded-[3.5rem] text-white border border-white/10 shadow-3xl">
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-8">Archive Triage</h4>
                        <div className="flex flex-col gap-4">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                                    <p className="text-[10px] font-black uppercase mb-1">Alert ID: #AL-992 {i}</p>
                                    <p className="text-[8px] font-bold text-slate-500 line-clamp-1">Resolved by Senior Node Aditya</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 border border-white/10">View Resolved Log</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringView;
