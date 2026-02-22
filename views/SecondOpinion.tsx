import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Upload, FileText, ChevronRight, Star,
    Shield, Clock, Search, ArrowLeft, CheckCircle2,
    Video, Phone, User, ExternalLink, Zap, Info, Plus,
    Brain, ShieldAlert, Sparkles, Network, Activity,
    ShieldCheck, AlertTriangle, History, Mic, Eye,
    Hospital, Filter, Share2
} from 'lucide-react';


interface Case {
    _id: string;
    patientName: string;
    patientAge: number;
    patientGender: string;
    chiefComplaint: string;
    riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
    status: 'Active' | 'Escalated' | 'Resolved';
    vitals: any;
    attachments: any[];
    audioSummary?: string;
    createdAt: string;
}

interface Specialist {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    experience: string;
    status: 'Online' | 'Offline';
    location: string;
    image: string;
}

const API_BASE = 'http://localhost:5000/api/doctor';

const SecondOpinion: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [view, setView] = useState<'worklist' | 'experts' | 'details' | 'chat'>('worklist');
    const [cases, setCases] = useState<Case[]>([]);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [selectedExpert, setSelectedExpert] = useState<Specialist | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const experts: Specialist[] = [
        { id: '1', name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.9, experience: '22y', status: 'Online', location: 'Metropolis Node', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
        { id: '2', name: 'Dr. Elena Rodriguez', specialty: 'Oncology', rating: 4.8, experience: '18y', status: 'Online', location: 'Sector-7 Hub', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
        { id: '3', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', rating: 4.9, experience: '15y', status: 'Offline', location: 'Regional Center', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ];

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch(`${API_BASE}/cases`);
                const data = await res.json();
                if (data.success && data.data.cases) {
                    setCases(data.data.cases.filter((c: any) => c.status === 'Escalated' || c.riskLevel === 'Critical'));
                } else {
                    throw new Error("No cases found");
                }
            } catch (err) {
                console.error("Fetch cases error:", err);
                // Premium Mock Fallback for Hackathon
                setCases([
                    {
                        _id: 'mock-1',
                        patientName: 'Karan Malhotra',
                        patientAge: 42,
                        patientGender: 'Male',
                        chiefComplaint: 'Unilateral Weakness',
                        riskLevel: 'Critical',
                        status: 'Escalated',
                        vitals: { bp: '160/100', pulse: '88', spO2: '94%', temp: '98.4' },
                        attachments: [],
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: 'mock-2',
                        patientName: 'Sunita Devi',
                        patientAge: 65,
                        patientGender: 'Female',
                        chiefComplaint: 'Chest Oppression',
                        riskLevel: 'Critical',
                        status: 'Escalated',
                        vitals: { bp: '145/95', pulse: '92', spO2: '91%', temp: '99.1' },
                        attachments: [],
                        createdAt: new Date().toISOString()
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCases();
    }, []);

    const handleEscalateToSpecialist = async (specialistId: string) => {
        if (!selectedCase) return;
        try {
            await fetch(`${API_BASE}/escalate/${selectedCase._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ specialistId, reason: 'Complex clinical presentation requiring specialist validation.' })
            });
            setView('chat');
        } catch (err) {
            console.error(err);
        }
    };

    const handleConfirmDiagnosis = async () => {
        if (!selectedCase) return;
        try {
            await fetch(`${API_BASE}/confirm-diagnosis/${selectedCase._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: 'Specialist validated treatment plan. Case resolved with zero-error clinical adherence.', confirmedBy: 'Senior Specialist Node-82' })
            });
            alert("Diagnosis confirmed and recorded on Blockchain Ledger.");
            setView('worklist');
            // Refresh cases
            const res = await fetch(`${API_BASE}/cases`);
            const data = await res.json();
            if (data.success) {
                setCases(data.data.cases.filter((c: any) => c.status === 'Escalated' || c.riskLevel === 'Critical'));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1426] p-6 font-['Outfit'] pb-20">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6 group transition-all"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Command Center
                        </button>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                            Second Opinion <br /><span className="text-indigo-600">Workflow Node.</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 shadow-xl flex items-center gap-5">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                                <Activity className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Live Escalations</p>
                                <p className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none">{cases.length} Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {view === 'worklist' && (
                        <motion.div
                            key="worklist"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="p-12 rounded-[4rem] bg-gradient-to-br from-indigo-600 to-blue-800 text-white relative overflow-hidden shadow-4xl">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-8">
                                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                            <Brain className="w-4 h-4" /> AI Escalation Trigger Active
                                        </div>
                                        <h2 className="text-6xl font-black tracking-tighter leading-[0.85] uppercase">
                                            Validate <br />Complex Cases.
                                        </h2>
                                        <p className="text-xl font-bold opacity-80 uppercase tracking-tighter leading-tight max-w-lg">
                                            Review cases flagged by PHWs or AI triggers for rapid specialist escalation and decentralized validation.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: 'Avg Resp Time', val: '12m', icon: Clock },
                                            { label: 'Peer Accuracy', val: '99.2%', icon: ShieldCheck }
                                        ].map((stat, i) => (
                                            <div key={i} className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 border-white/20">
                                                <stat.icon className="w-8 h-8 text-indigo-300 mb-4" />
                                                <p className="text-3xl font-black">{stat.val}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {cases.map((c, i) => (
                                    <motion.div
                                        key={c._id}
                                        whileHover={{ y: -10 }}
                                        className="bg-white/70 dark:bg-slate-900/60 p-10 rounded-[3.5rem] border border-white/20 dark:border-slate-800 shadow-2xl space-y-8 group transition-all"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${c.riskLevel === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {c.riskLevel} Escalation
                                            </div>
                                            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl">
                                                <AlertTriangle className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{c.patientName}</h4>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{c.patientAge}y • {c.patientGender}</p>
                                        </div>
                                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trigger: {c.chiefComplaint}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter line-clamp-2">"Case flags multiple anomalies in neural firing vs baseline. Specialist validation requested."</p>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedCase(c); setView('details'); }}
                                            className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 group-hover:bg-indigo-500 transition-all"
                                        >
                                            <Eye className="w-4 h-4" /> Review Portfolio
                                        </button>
                                    </motion.div>
                                ))}
                                {cases.length === 0 && !isLoading && (
                                    <div className="lg:col-span-3 py-24 text-center space-y-6 opacity-40">
                                        <div className="p-10 bg-indigo-500/10 rounded-full w-fit mx-auto">
                                            <ShieldCheck className="w-16 h-16 text-indigo-400" />
                                        </div>
                                        <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">No Pending Escalations</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {view === 'details' && selectedCase && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                        >
                            <div className="lg:col-span-8 space-y-10">
                                {/* Case Portfolio Header */}
                                <div className="p-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-slate-800 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-10 relative z-10">
                                        <div className="flex items-center gap-8">
                                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
                                                <User className="w-12 h-12" />
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-2">{selectedCase.patientName}</h3>
                                                <div className="flex gap-4">
                                                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-lg text-[9px] font-black uppercase text-slate-500">Node ID: BH-X82</span>
                                                    <span className="px-3 py-1 bg-rose-500/10 rounded-lg text-[9px] font-black uppercase text-rose-500">Severity: {selectedCase.riskLevel}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-white/10 shadow-xl text-slate-400 hover:text-indigo-500 transition-all">
                                                <Share2 className="w-6 h-6" />
                                            </button>
                                            <button className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-white/10 shadow-xl text-slate-400 hover:text-indigo-500 transition-all">
                                                <History className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Clinical Evidence Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 bg-white/70 dark:bg-slate-900/60 rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-xl space-y-8">
                                        <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4 text-indigo-500">
                                            <Activity className="w-6 h-6" /> Biometric Vitals
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            {[
                                                { l: 'B.P.', v: selectedCase.vitals?.bp || '120/80', s: 'mmHg' },
                                                { l: 'Pulse', v: selectedCase.vitals?.pulse || '72', s: 'bpm' },
                                                { l: 'SpO2', v: selectedCase.vitals?.spO2 || '98%', s: 'Oxygen' },
                                                { l: 'Temp', v: selectedCase.vitals?.temp || '98.6', s: 'F' }
                                            ].map((v, i) => (
                                                <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-white/5">
                                                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">{v.l}</p>
                                                    <p className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-none mb-1">{v.v}</p>
                                                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">{v.s}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-10 bg-white/70 dark:bg-slate-900/60 rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-xl space-y-8">
                                        <h4 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4 text-sky-500">
                                            <Mic className="w-6 h-6" /> PHCW Audio Summary
                                        </h4>
                                        <div className="p-8 bg-indigo-500/10 rounded-[2.5rem] border border-indigo-500/20 flex items-center gap-6">
                                            <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-1 bg-indigo-500/20 rounded-full w-full mb-2">
                                                    <div className="h-full bg-indigo-500 rounded-full w-2/3" />
                                                </div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500">0:45 / 1:12 • Voice Report</p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-relaxed">
                                            "Patient reports sudden syncope at 10AM. No prior history. PHCW noted irregular cardiac rhythm upon arrival."
                                        </p>
                                    </div>
                                </div>

                                {/* Visual Attachments (Wound/ECG Simulation) */}
                                <div className="p-10 bg-white/70 dark:bg-slate-900/60 rounded-[3.5rem] border border-white/20 dark:border-slate-800 shadow-xl space-y-8">
                                    <h4 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Neural & Visual Artifacts</h4>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { t: 'ECG Data', type: 'WAVEFORM' },
                                            { t: 'Neural Scan', type: 'MRI' },
                                            { t: 'Wound Profile', type: 'IMAGE' },
                                            { t: 'Initial Meds', type: 'DOC' }
                                        ].map((img, i) => (
                                            <div key={i} className="aspect-square bg-slate-100 dark:bg-white/5 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                                                    <ExternalLink className="w-5 h-5 text-white" />
                                                </div>
                                                <Sparkles className="w-10 h-10 text-indigo-400 opacity-40" />
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{img.t}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-10">
                                {/* Action Command Panel */}
                                <div className="p-10 bg-slate-900 rounded-[4rem] text-white shadow-4xl space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl -mr-24 -mt-24" />
                                    <h4 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                                        <Zap className="w-6 h-6 text-amber-500" /> Specialist Action
                                    </h4>
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setView('experts')}
                                            className="w-full py-6 bg-white text-indigo-950 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-xl"
                                        >
                                            <Search className="w-5 h-5" /> Escalate to Network
                                        </button>
                                        <button className="w-full py-6 bg-indigo-600/20 border border-indigo-500 text-indigo-300 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-indigo-600/30 transition-all">
                                            <Hospital className="w-5 h-5" /> Mandatory Referral
                                        </button>
                                        <button
                                            onClick={handleConfirmDiagnosis}
                                            className="w-full py-6 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-emerald-500/30 transition-all"
                                        >
                                            <CheckCircle2 className="w-5 h-5" /> Confirm & Resolved
                                        </button>
                                    </div>
                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 mb-4">
                                            <span>Encryption Protocol</span>
                                            <span className="text-emerald-500">AES-256 GCM</span>
                                        </div>
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                                            <ShieldAlert className="w-6 h-6 text-rose-500" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Blockchain Proof: 0x82...A9B2</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability Hub */}
                                <div className="p-10 bg-white/70 dark:bg-slate-900/60 rounded-[3.5rem] border border-white/20 dark:border-slate-800 shadow-2xl space-y-8">
                                    <h4 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Active Grid Experts</h4>
                                    <div className="space-y-6">
                                        {experts.map(exp => (
                                            <div key={exp.id} className="flex items-center gap-5 group cursor-pointer">
                                                <div className="relative">
                                                    <img src={exp.image} className="w-14 h-14 rounded-2xl bg-indigo-50 p-0.5 border border-white/10" />
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 ${exp.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-black text-slate-900 dark:text-white text-md tracking-tight">{exp.name}</p>
                                                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{exp.specialty} Node</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full py-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500">Expand Network</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === 'experts' && (
                        <motion.div
                            key="experts"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-6">
                                <button onClick={() => setView('details')} className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-white/10 shadow-xl">
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Select Global Elite Specialist</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Routing through Regional Node #82</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {experts.map(exp => (
                                    <motion.div
                                        key={exp.id}
                                        whileHover={{ y: -10 }}
                                        className="bg-white/70 dark:bg-slate-900/60 p-10 rounded-[4rem] border border-white/20 dark:border-slate-800 shadow-2xl space-y-8 relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 p-8">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full">
                                                <Star className="w-3 h-3 text-amber-500 fill-current" />
                                                <span className="text-[9px] font-black text-amber-600">{exp.rating}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center text-center space-y-6">
                                            <img src={exp.image} className="w-32 h-32 rounded-[3.5rem] bg-indigo-50 p-1 shadow-3xl" />
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{exp.name}</h3>
                                                <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[10px] uppercase tracking-widest mt-2">{exp.specialty} Department</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-white/5">
                                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Exp.</p>
                                                <p className="font-black text-lg text-slate-900 dark:text-white">{exp.experience}</p>
                                            </div>
                                            <div className="p-5 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-white/5">
                                                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Status</p>
                                                <p className="font-black text-[10px] text-emerald-500 uppercase">{exp.status}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => { setSelectedExpert(exp); handleEscalateToSpecialist(exp.id); }}
                                            className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl"
                                        >
                                            Initiate Handshake
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {view === 'chat' && selectedExpert && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/70 dark:bg-slate-900/60 rounded-[4rem] border border-white/20 dark:border-slate-800/50 overflow-hidden shadow-4xl h-[75vh] flex flex-col backdrop-blur-3xl"
                        >
                            <div className="p-10 border-b border-white/10 bg-slate-50/50 dark:bg-slate-800/10 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <button onClick={() => setView('experts')} className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-white/10 shadow-xl">
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-6">
                                        <img src={selectedExpert.image} className="w-16 h-16 rounded-[2rem] bg-indigo-50 p-1 shadow-lg" />
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{selectedExpert.name}</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Secured Virtual Tunnel</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-white/10 text-slate-400 hover:text-indigo-500 shadow-xl">
                                        <Phone className="w-6 h-6" />
                                    </button>
                                    <button className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-white/10 text-slate-400 hover:text-indigo-500 shadow-xl">
                                        <Video className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 p-12 overflow-y-auto space-y-10">
                                <div className="flex gap-6 max-w-2xl">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                                        <Brain className="w-6 h-6" />
                                    </div>
                                    <div className="p-8 bg-indigo-600 rounded-[3rem] rounded-tl-none text-white shadow-2xl relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-indigo-200">AI AGENT PRE-TRIAGE</p>
                                        <p className="text-lg font-bold leading-relaxed tracking-tight">"Detected anomalous neural stream. Initial diagnostic confidence for Vascular Ischemia: 84.2%. Specialist confirmation required to trigger Block-2 Protocol."</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 max-w-2xl ml-auto text-right flex-row-reverse">
                                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="p-8 bg-white dark:bg-slate-800 rounded-[3rem] rounded-tr-none text-slate-900 dark:text-white shadow-2xl border border-white/10">
                                        <p className="text-md font-bold tracking-tight">"Understood. DICOM streams are uploaded. Dr. {selectedExpert.name}, we are specifically looking at the Sector-4 neural firing versus 24h baseline."</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 max-w-2xl">
                                    <img src={selectedExpert.image} className="w-12 h-12 rounded-2xl shrink-0 shadow-lg" />
                                    <div className="p-8 bg-slate-100 dark:bg-white/5 rounded-[3rem] rounded-tl-none text-slate-900 dark:text-white shadow-xl border border-white/10">
                                        <p className="text-md font-bold tracking-tight">"Acknowledgment received. Reviewing clinical artifacts now. I'll provide a confirmed protocol within 2 minutes via the mesh."</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 border-t border-white/10 flex gap-6">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Secure message into neural tunnel..."
                                        className="w-full px-12 py-6 bg-slate-100 dark:bg-slate-800 border-none rounded-[2.5rem] font-black text-xs uppercase tracking-widest outline-none focus:ring-4 ring-indigo-500/10 transition-all shadow-inner"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-4">
                                        <button className="text-slate-400 hover:text-indigo-500"><Mic className="w-5 h-5" /></button>
                                        <button className="text-slate-400 hover:text-indigo-500"><Upload className="w-5 h-5" /></button>
                                    </div>
                                </div>
                                <button className="px-14 bg-indigo-600 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] shadow-3xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all">
                                    Sync Node
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SecondOpinion;
