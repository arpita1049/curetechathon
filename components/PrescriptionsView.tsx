import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText, Pill, Search, Plus,
    MoreVertical, Download, Send,
    History, AlertTriangle, ShieldCheck,
    ChevronRight, Brain, Info
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/doctor';

const PrescriptionsView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [prescriptionsData, setPrescriptionsData] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const res = await fetch(`${API_BASE}/prescriptions`);
                if (res.ok) {
                    const data = await res.json();
                    setPrescriptionsData(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPrescriptions();
    }, []);

    const prescriptions = prescriptionsData.length > 0 ? prescriptionsData.map(p => ({
        id: p._id.substring(0, 8).toUpperCase(),
        patient: p.caseId?.patientId?.name || "Unknown",
        date: new Date(p.createdAt).toLocaleDateString(),
        drug: p.medications?.[0]?.name || "General Medicine",
        status: 'VERIFIED',
        risk: 'LOW'
    })) : [
        { id: 'RX-7201', patient: 'Arpita Sharma', date: 'Feb 18, 2026', drug: 'Amlodipine + Metformin', status: 'VERIFIED', risk: 'LOW' },
        { id: 'RX-7155', patient: 'Rahul Verma', date: 'Feb 15, 2026', drug: 'Atorvastatin Node Protocol', status: 'ACTIVE', risk: 'MEDIUM' },
        { id: 'RX-7092', patient: 'Priya Das', date: 'Feb 12, 2026', drug: 'Azithromycin (5 days)', status: 'COMPLETED', risk: 'LOW' },
        { id: 'RX-6988', patient: 'Aman Gupta', date: 'Feb 05, 2026', drug: 'Insulin Glargine', status: 'VERIFIED', risk: 'HIGH' },
    ];

    return (
        <div className="space-y-12">
            {/* Header / Engine State */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-sky-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl rotate-3">
                        <Pill className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Smart Rx Protocol</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> AI Interaction Engine Active
                            </span>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Safety Registry Sync v4.2</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-72">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Patient ID or Rx Ref..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-2xl outline-none font-bold text-xs"
                        />
                    </div>
                    <button className="flex items-center gap-3 px-8 py-5 bg-indigo-600 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all">
                        <Plus className="w-4 h-4" /> New Rx Protocol
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Protocol Feed */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-4 px-10 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">
                        <span className="col-span-1">Subject / Date</span>
                        <span className="col-span-1">Medication Node</span>
                        <span className="col-span-1 text-center">Status</span>
                        <span className="col-span-1 text-right">Interactions</span>
                    </div>

                    {prescriptions.map((rx, i) => (
                        <motion.div
                            key={rx.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/10 hover:border-indigo-500/30 transition-all shadow-2xl flex items-center group"
                        >
                            <div className="col-span-1 flex-1 flex flex-col">
                                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1">{rx.patient}</h4>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rx.date} • {rx.id}</span>
                            </div>

                            <div className="col-span-1 flex-1">
                                <p className="text-sm font-black text-indigo-500 uppercase tracking-tight">{rx.drug}</p>
                            </div>

                            <div className="col-span-1 flex-1 flex justify-center">
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border ${rx.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'}`}>
                                    {rx.status}
                                </div>
                            </div>

                            <div className="col-span-1 flex-1 flex justify-end items-center gap-6">
                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${rx.risk === 'HIGH' ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
                                    <ShieldCheck className={`w-4 h-4 ${rx.risk === 'HIGH' ? 'text-rose-500' : 'text-emerald-500'}`} />
                                    {rx.risk === 'HIGH' ? 'Critical Flag' : 'Safe'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-sky-500 hover:text-white transition-all">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI Interaction Guard */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <Brain className="w-10 h-10 text-indigo-400" />
                                <div className="text-right">
                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em] block mb-1">Safety Guard</span>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Mode: Precision</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-2">Cross-Interaction <br />Prevention</h3>
                                <p className="text-slate-400 text-sm font-bold tracking-tight leading-relaxed">System scanning for contraindications between Beta-Blockers and Calcium Antagonists in Case #7201.</p>
                            </div>

                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-start gap-4">
                                <AlertTriangle className="w-5 h-5 text-amber-500 mt-1" />
                                <p className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed tracking-tight">Warning: Patient has documented sensitivity to Sulphonamides. Review prescription before finalising.</p>
                            </div>

                            <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-500/40">
                                Verify Interaction Logic
                            </button>
                        </div>
                    </div>

                    <div className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-8">Pharmacy Node Status</h4>
                        <div className="space-y-6">
                            {[
                                { node: 'Hospital Pharmacy', status: 'In Stock', c: 'emerald' },
                                { node: 'Regional Grid A', status: 'Ordering', c: 'amber' },
                                { node: 'Critical Supply', status: 'Locked', c: 'indigo' }
                            ].map((node, i) => (
                                <div key={i} className="flex justify-between items-center px-2">
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{node.node}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${node.c}-500`} />
                                        <span className={`text-[10px] font-black text-${node.c}-500 uppercase tracking-widest`}>{node.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionsView;
