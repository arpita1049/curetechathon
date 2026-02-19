import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, FileText, Globe,
    ExternalLink, Search, Bookmark,
    Share2, Filter, MessageCircle,
    ArrowUpRight, BookOpen, Brain,
    Zap, Activity
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/doctor';

const HubView: React.FC = () => {
    const [hubCases, setHubCases] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchHub = async () => {
            try {
                const res = await fetch(`${API_BASE}/clinical-hub`);
                if (res.ok) {
                    const data = await res.json();
                    setHubCases(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHub();
    }, []);

    const articles = hubCases.length > 0 ? hubCases.map(c => ({
        t: `Resolved Case: ${c.chiefComplaint || 'Consultation'}`,
        a: c.patientId?.name || "Anonymous",
        d: new Date(c.updatedAt).toLocaleDateString(),
        c: c.riskLevel === 'CRITICAL' ? 'rose' : 'indigo',
        type: 'RESOLVED_CASE'
    })) : [
        { t: "Updated ICU Protocol for Myocardial Infarction v2.4", a: "Clinical Board", d: "2h ago", c: "indigo", type: "PROTOCOL" },
        { t: "Predictive AI models in early stage Parkinson's detection", a: "Neural Research", d: "1d ago", c: "sky", type: "RESEARCH" },
        { t: "Management of resistant Tuberculosis in rural grids", a: "Public Health", d: "3d ago", c: "amber", type: "GUIDELINE" },
        { t: "Emergency Trauma Stabilisation in limited resource nodes", a: "Surgical Board", d: "5d ago", c: "rose", type: "BEST PRACTICE" }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3 space-y-12">
                {/* Hub Main Area */}
                <div className="p-14 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/20 dark:border-slate-800 rounded-[4rem] shadow-4xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -mr-40 -mt-40" />

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-2">Clinical Hub</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Board Protocols & Research Sync</p>
                        </div>
                        <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-[2rem] border border-white/10">
                            {["Protocols", "Research", "Forums"].map((t, i) => (
                                <button key={i} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-indigo-500'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                        {articles.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 bg-slate-50/50 dark:bg-white/5 rounded-[3.5rem] border border-transparent hover:border-indigo-500/20 transition-all group flex flex-col lg:flex-row items-start lg:items-center gap-10 cursor-pointer shadow-sm hover:shadow-2xl"
                            >
                                <div className={`w-20 h-20 bg-${item.c}-500/10 text-${item.c}-500 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                    <FileText className="w-10 h-10" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-1.5 rounded-full bg-${item.c}-500/10 text-${item.c}-500 text-[9px] font-black uppercase tracking-widest border border-${item.c}-500/10`}>
                                            {item.type}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.a} • {item.d}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-tight group-hover:text-indigo-500 transition-colors">
                                        {item.t}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="p-5 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all shadow-xl">
                                        <Bookmark className="w-6 h-6" />
                                    </button>
                                    <button className="p-5 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-sky-500 hover:bg-sky-500/5 transition-all shadow-xl">
                                        <ExternalLink className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-12">
                <div className="p-12 bg-indigo-600 rounded-[4rem] text-white shadow-4xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <MessageCircle className="w-12 h-12 mb-8" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Clinical <br />Registry Discussion</h4>
                    <p className="text-indigo-100 font-bold mb-10 text-sm tracking-tight leading-relaxed">Join the live peer review session on 'AI safety in diagnostic nodes' starting in 45m.</p>
                    <button className="w-full py-6 bg-white text-indigo-600 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-3xl hover:bg-indigo-50 transition-all">Join Live Mesh</button>
                </div>

                <div className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl space-y-8">
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Training Nodes</h4>
                    {[
                        { l: "Neural Diagnostics", p: 85, c: "indigo" },
                        { l: "Advanced Trauma", p: 40, c: "rose" },
                        { l: "Rural Tele-Medicine", p: 100, c: "emerald" }
                    ].map((item, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase px-1">
                                <span className="text-slate-400">{item.l}</span>
                                <span className={`text-${item.c}-500`}>{item.p}% COMPLETED</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${item.p}%` }} className={`h-full bg-${item.c}-500 rounded-full`} />
                            </div>
                        </div>
                    ))}
                    <button className="w-full py-4 text-indigo-500 font-black uppercase tracking-widest text-[9px] hover:bg-indigo-500/5 rounded-2xl transition-all">View All Modules</button>
                </div>
            </div>
        </div>
    );
};

export default HubView;
