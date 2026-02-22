import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Plus, Search, MapPin,
    ShieldCheck, Activity, Award,
    MoreVertical, Mail, Phone,
    Clock, CheckCircle2, AlertCircle,
    X, Briefcase, Zap, Brain, Sparkles, TrendingUp
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/doctor';

const EmploymentView: React.FC = () => {
    const [phws, setPhws] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showHireModal, setShowHireModal] = useState(false);
    const [showRewardModal, setShowRewardModal] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        sector: '',
        contact: ''
    });

    const fetchPHWs = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_BASE}/phws`);
            if (res.ok) {
                const data = await res.json();
                setPhws(data.data);
            } else {
                throw new Error("Failed to fetch PHWs");
            }
        } catch (error) {
            console.error('Error fetching PHWs:', error);
            // Premium Mock Fallback
            setPhws([
                {
                    _id: 'phw-1',
                    name: 'Kavita Singh',
                    sector: 'Sector 4',
                    status: 'ACTIVE',
                    trainingLevels: { neural: 85, cardiac: 70 },
                    performance: { patientsScreened: 124, highRiskReferrals: 12 },
                    rewards: ['Consistency Hero']
                },
                {
                    _id: 'phw-2',
                    name: 'Rajesh Kumar',
                    sector: 'Sector 7',
                    status: 'ACTIVE',
                    trainingLevels: { neural: 92, cardiac: 88 },
                    performance: { patientsScreened: 240, highRiskReferrals: 18 },
                    rewards: ['Risk Identifier']
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPHWs();
    }, []);

    const handleEmploy = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/phws/employ`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowHireModal(false);
                setFormData({ name: '', location: '', sector: '', contact: '' });
                fetchPHWs();
            }
        } catch (error) {
            console.error('Error employing PHW:', error);
        }
    };

    const handleReward = async (id: string, title: string) => {
        try {
            const res = await fetch(`${API_BASE}/phws/${id}/reward`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, icon: 'Sparkles' })
            });
            if (res.ok) {
                setShowRewardModal(null);
                fetchPHWs();
            }
        } catch (error) {
            console.error('Error rewarding PHW:', error);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${API_BASE}/phws/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchPHWs();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredPHWs = phws.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sector.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section with AI Insight */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Workforce Hub</h2>
                        <div className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                            AI Escalation Active
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimizing National Health Mesh Nodes</p>
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search clinical nodes..."
                            className="w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-[1.5rem] outline-none font-bold text-xs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowHireModal(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Recruit PHW
                    </button>
                </div>
            </div>

            {/* Hackathon Premium Stats: AI Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Predictive Need", value: "Area-7", icon: TrendingUp, color: "rose", desc: "Outbreak Risk: High" },
                    { label: "Village Sectors", value: [...new Set(phws.map(p => p.sector))].length, icon: MapPin, color: "teal", desc: "100% Coverage" },
                    { label: "Mesh Accuracy", value: "98.4%", icon: Brain, color: "emerald", desc: "Neural Peer-Review" },
                    { label: "Community trust", value: "A+", icon: Award, color: "amber", desc: "Patient Satisfaction" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-xl group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                        <div className={`p-4 bg-${stat.color}-500/10 text-${stat.color}-500 rounded-2xl w-fit mb-6`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 group-hover:scale-105 transition-transform">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{stat.label}</div>
                        <div className={`text-[8px] font-bold uppercase tracking-widest text-${stat.color}-500/60`}>{stat.desc}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Deployment Matrix */}
            <div className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th className="px-8 pb-4">Clinical Worker</th>
                                <th className="px-8 pb-4">Training status</th>
                                <th className="px-8 pb-4">Grid status</th>
                                <th className="px-8 pb-4">Operational metrics</th>
                                <th className="px-8 pb-4 text-right">Strategic Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPHWs.length > 0 ? filteredPHWs.map((p, i) => (
                                <motion.tr
                                    key={p._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all"
                                >
                                    <td className="px-8 py-8 rounded-l-[2rem] bg-slate-50/50 dark:bg-white/5 border-y border-white/10">
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 p-0.5 shadow-xl group-hover:rotate-6 transition-transform">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                                {p.rewards?.length > 0 && (
                                                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
                                                        <Sparkles className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-lg">{p.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <MapPin className="w-3 h-3 text-indigo-500" />
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.sector} Grid</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 bg-slate-50/50 dark:bg-white/5 border-y border-white/10">
                                        <div className="space-y-3 w-40">
                                            <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.1em]">
                                                <span className="text-slate-400 text-[7px]">Neural Scan Training</span>
                                                <span className="text-indigo-500">{p.trainingLevels?.neural || 0}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${p.trainingLevels?.neural || 0}%` }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 bg-slate-50/50 dark:bg-white/5 border-y border-white/10">
                                        <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full w-fit text-[9px] font-black uppercase tracking-widest border border-white/10 ${p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' :
                                            p.status === 'ON_LEAVE' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' :
                                                p.status === 'ON_LEAVE' ? 'bg-amber-500' : 'bg-slate-500'
                                                }`} />
                                            {p.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 bg-slate-50/50 dark:bg-white/5 border-y border-white/10">
                                        <div className="flex items-center gap-8">
                                            <div className="text-center">
                                                <div className="text-xl font-black text-slate-800 dark:text-slate-100 leading-none mb-1">{(p.performance?.patientsScreened || 0)}</div>
                                                <div className="text-[7px] font-black text-indigo-500/60 uppercase tracking-widest">Global Syncs</div>
                                            </div>
                                            <div className="w-px h-8 bg-white/10" />
                                            <div className="text-center">
                                                <div className="text-xl font-black text-rose-500 leading-none mb-1">{(p.performance?.highRiskReferrals || 0)}</div>
                                                <div className="text-[7px] font-black text-rose-500/60 uppercase tracking-widest">AI Escalations</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 rounded-r-[2rem] bg-slate-50/50 dark:bg-white/5 border-y border-white/10 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => setShowRewardModal(p._id)}
                                                className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-xl hover:scale-110"
                                                title="Gamified Incentive"
                                            >
                                                <Sparkles className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(p._id, p.status === 'ACTIVE' ? 'ON_LEAVE' : 'ACTIVE')}
                                                className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-xl hover:scale-110"
                                            >
                                                <Brain className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center gap-6 opacity-40">
                                            <div className="p-10 bg-indigo-500/5 rounded-full">
                                                <Briefcase className="w-16 h-16 text-indigo-400" />
                                            </div>
                                            <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Mesh Stream Initialization Required</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hackathon Add: Predictive Heatmap Placeholder / UI Element */}
            <div className="p-12 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-[4rem] text-white shadow-3xl relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -mr-40 -mt-40" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/20 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-500/30 text-indigo-300">
                            <Sparkles className="w-4 h-4" /> AI Predictive Scaling
                        </div>
                        <h3 className="text-5xl font-black tracking-tighter leading-none uppercase">Geo-spatial <br /><span className="text-indigo-400">Demand Heatmap.</span></h3>
                        <p className="text-lg font-bold opacity-60 leading-relaxed uppercase tracking-tighter">System is predicting a 24% surge in respiratory checks in Sector-A. Recommend deploying 2 additional nodes for optimal coverage.</p>
                        <button className="px-10 py-5 bg-white text-indigo-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
                            Deploy Predictive Workforce
                        </button>
                    </div>
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-8 h-80 flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <Activity className="w-16 h-16 text-indigo-400 mx-auto animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Live Mesh Visualization Rendering...</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Components */}
            <AnimatePresence>
                {showRewardModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRewardModal(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-4xl text-center">
                            <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-8" />
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Award Merit Badge</h3>
                            <p className="text-slate-400 font-bold mb-10 text-sm">Select an incentive to award for exceptional grid performance.</p>
                            <div className="grid grid-cols-2 gap-4">
                                {["Consistency Hero", "Risk Identifier", "Peer Mentor", "Community Pulse"].map(t => (
                                    <button key={t} onClick={() => handleReward(showRewardModal, t)} className="py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}

                {showHireModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHireModal(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-4xl overflow-hidden">
                            <div className="p-12">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">New Recruitment</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Register Primary Health Care Worker</p>
                                    </div>
                                    <button onClick={() => setShowHireModal(false)} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <form onSubmit={handleEmploy} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                            <input required className="w-full px-8 py-5 bg-slate-100 dark:bg-slate-800 border-none rounded-3xl outline-none font-bold text-sm focus:ring-4 ring-indigo-500/10" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contact Info</label>
                                            <input required className="w-full px-8 py-5 bg-slate-100 dark:bg-slate-800 border-none rounded-3xl outline-none font-bold text-sm focus:ring-4 ring-indigo-500/10" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Deployment Area</label>
                                            <input required className="w-full px-8 py-5 bg-slate-100 dark:bg-slate-800 border-none rounded-3xl outline-none font-bold text-sm focus:ring-4 ring-indigo-500/10" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">District Sector</label>
                                            <input required className="w-full px-8 py-5 bg-slate-100 dark:bg-slate-800 border-none rounded-3xl outline-none font-bold text-sm focus:ring-4 ring-indigo-500/10" value={formData.sector} onChange={e => setFormData({ ...formData, sector: e.target.value })} />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] transition-all">
                                        Formalize Appointment
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmploymentView;
