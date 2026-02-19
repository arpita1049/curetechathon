import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Clock, AlertTriangle, ChevronRight, FileText, Pill, Search } from 'lucide-react';

const CaseReviewView: React.FC = () => {
    const [cases, setCases] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch('http://localhost:5000/doctor/cases');
                const data = await res.json();
                setCases(data.data.cases || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCases();
    }, []);

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">AI-Assisted Case Review</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Neural Decision Support Engine Active</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-500 text-[10px] font-black uppercase tracking-widest">
                        Confidence: 94.2%
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest">Awaiting Neural Stream...</div>
                    ) : cases.map((c, i) => (
                        <motion.div
                            key={c._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl hover:scale-[1.01] transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl ${c.riskLevel === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                                        <Brain className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{c.patientId?.name || 'Unknown'}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{c.chiefComplaint}</p>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${c.riskLevel === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse' : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'}`}>
                                    {c.riskLevel} Risk
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">AI Recommendation</span>
                                    <p className="text-[10px] font-bold text-slate-700 dark:text-white line-clamp-1">{c.aiAnalysis?.probableDiagnoses?.[0] || 'Awaiting Analysis'}</p>
                                </div>
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Red Flags</span>
                                    <p className="text-[10px] font-bold text-rose-500">{c.aiAnalysis?.redFlags?.length || 0} Indicators Detected</p>
                                </div>
                                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-white/10">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Adherence</span>
                                    <p className="text-[10px] font-bold text-emerald-500">92% Compliance</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Activity className="w-4 h-4" /></span>
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Pill className="w-4 h-4" /></span>
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Clock className="w-4 h-4" /></span>
                                </div>
                                <button className="flex items-center gap-3 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                                    Review Full Profile <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-10">
                    <div className="p-10 bg-indigo-600 rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <Brain className="w-12 h-12 mb-8 text-indigo-200" />
                        <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">Red Flag <br />Detector</h3>
                        <div className="space-y-4">
                            {[
                                "Hypotension Risk (Predicted)",
                                "Non-Adherence Alert (Grid-7)",
                                "Comorbidity Conflict Detected"
                            ].map((flag, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{flag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/20 dark:border-white/10 shadow-2xl">
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-8 text-slate-900 dark:text-white">Neural Adherence Timeline</h4>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-800 dark:text-white">Medication Taken</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Logged: Today, 08:30 AM</p>
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

export default CaseReviewView;
