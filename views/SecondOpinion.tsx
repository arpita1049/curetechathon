import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Upload, FileText, ChevronRight, Star,
    Shield, Clock, Search, ArrowLeft, CheckCircle2,
    Video, Phone, User, ExternalLink, Zap, Info, Plus
} from 'lucide-react';

interface Expert {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    experience: string;
    consultations: number;
    image: string;
    status: 'Online' | 'Offline';
}

const SecondOpinion: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [step, setStep] = useState<'intro' | 'experts' | 'chat'>('intro');
    const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

    const experts: Expert[] = [
        {
            id: '1',
            name: 'Dr. Michael Chen',
            specialty: 'Senior Neurologist',
            rating: 4.9,
            reviews: 450,
            experience: '22 Years',
            consultations: 1200,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            status: 'Online'
        },
        {
            id: '2',
            name: 'Dr. Elena Rodriguez',
            specialty: 'Oncology Expert',
            rating: 4.9,
            reviews: 320,
            experience: '18 Years',
            consultations: 850,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
            status: 'Online'
        },
        {
            id: '3',
            name: 'Dr. James Wilson',
            specialty: 'Cardiac Surgeon',
            rating: 4.8,
            reviews: 510,
            experience: '25 Years',
            consultations: 1500,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
            status: 'Offline'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Second Opinion (Expert)
                        </h1>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="p-16 rounded-[4rem] bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white relative overflow-hidden shadow-3xl">
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                    <div className="space-y-10">
                                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-[0.25em] border border-white/20 backdrop-blur-md">
                                            <Shield className="w-5 h-5 text-orange-200" /> GLOBAL EXPERT VERIFICATION
                                        </div>
                                        <h2 className="text-7xl font-black tracking-tighter leading-[0.85] uppercase">
                                            Validate Your <br />
                                            <span className="text-orange-200">Diagnosis.</span>
                                        </h2>
                                        <p className="text-xl font-bold text-orange-50 max-w-xl leading-relaxed">
                                            Cross-verify complex cases with top-tier specialists. Upload your existing reports and get detailed analysis within 24-48 hours.
                                        </p>
                                        <div className="flex flex-wrap gap-6 pt-4">
                                            <button
                                                onClick={() => setStep('experts')}
                                                className="px-10 py-6 bg-white text-orange-600 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-orange-950/20 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Connect with Experts
                                            </button>
                                            <button className="px-10 py-6 bg-white/10 border-2 border-white/30 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                                                How it works
                                            </button>
                                        </div>
                                    </div>

                                    {/* Trust Markers Grid */}
                                    <div className="bg-white/10 backdrop-blur-3xl p-12 rounded-[4rem] border-2 border-white/20 space-y-10 shadow-2xl">
                                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Trust Indicators</h4>
                                        <div className="space-y-10">
                                            {[
                                                { t: 'Conflict-Free Policy', d: 'Experts have no commercial links with pharma.', i: <CheckCircle2 className="w-8 h-8 text-emerald-300" /> },
                                                { t: 'Secure Data Vault', d: 'Your records are E2E encrypted.', i: <Shield className="w-8 h-8 text-sky-300" /> },
                                                { t: 'Comprehensive Analysis', d: 'Get 5+ page detailed review.', i: <FileText className="w-8 h-8 text-orange-300" /> }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-6 items-start group">
                                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors uppercase">{item.i}</div>
                                                    <div>
                                                        <p className="font-black text-2xl tracking-tighter uppercase mb-1">{item.t}</p>
                                                        <p className="text-base font-bold text-orange-50/80 leading-relaxed">{item.d}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Operational Pillars */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { t: 'Case Review', d: 'Deep dive into your medical history and current scans.', i: <FileText className="w-8 h-8" /> },
                                    { t: 'Live Sync', d: 'Video conference with the expert if required.', i: <Video className="w-8 h-8" /> },
                                    { t: 'Treatment Plan', d: 'Get actionable alternatives and risk scores.', i: <Zap className="w-8 h-8" /> }
                                ].map((service, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -12 }}
                                        className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border-2 border-slate-100 dark:border-slate-800 space-y-8 shadow-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-all" />
                                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                            {service.i}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">{service.t}</h4>
                                            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed">{service.d}</p>
                                        </div>
                                        <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600 opacity-50">
                                            SYSTEM PROTOCOL <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'experts' && (
                        <motion.div
                            key="experts"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by specialty (Oncology, Neurology...)"
                                        className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-lg outline-none focus:border-orange-500 transition-all shadow-sm"
                                    />
                                </div>
                                <button className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] text-slate-500">
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {experts.map((exp, idx) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 border-2 border-slate-100 dark:border-slate-800 hover:border-orange-500/30 transition-all group relative overflow-hidden shadow-sm"
                                    >
                                        <div className="flex items-start gap-6 mb-8">
                                            <div className="relative">
                                                <img src={exp.image} alt={exp.name} className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-900/30" />
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 ${exp.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">{exp.name}</h3>
                                                <p className="text-orange-600 font-bold text-sm mb-2 uppercase tracking-wide">{exp.specialty}</p>
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-sm font-black">{exp.rating}</span>
                                                    <span className="text-slate-400 font-bold text-xs ml-1">({exp.reviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Experience</p>
                                                <p className="font-black text-slate-900 dark:text-white">{exp.experience}</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Consulted</p>
                                                <p className="font-black text-slate-900 dark:text-white">{exp.consultations}+</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedExpert(exp);
                                                setStep('chat');
                                            }}
                                            className="w-full py-5 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                                        >
                                            <MessageSquare className="w-5 h-5" /> Request Review
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'chat' && selectedExpert && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-[4rem] border-2 border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl h-[70vh] flex flex-col"
                        >
                            <div className="p-8 border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setStep('experts')} className="p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-4">
                                        <img src={selectedExpert.image} className="w-12 h-12 rounded-xl bg-orange-50" />
                                        <div>
                                            <h4 className="font-black text-slate-900 dark:text-white">{selectedExpert.name}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> {selectedExpert.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-400">
                                        <Video className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto space-y-6">
                                <div className="max-w-[80%] bg-slate-50 dark:bg-slate-800 p-6 rounded-[2rem] rounded-tl-none">
                                    <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                                        Hello. I am {selectedExpert.name}. To provide an accurate second opinion, please upload your latest MRI/CT scans and the initial diagnosis report. I will review them and we can discuss the findings.
                                    </p>
                                </div>
                                <div className="p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                    <Upload className="w-6 h-6 text-orange-600" />
                                    <span className="font-black uppercase tracking-widest text-xs text-slate-400">Attach Medical Records</span>
                                </div>
                            </div>

                            <div className="p-8 border-t-2 border-slate-100 dark:border-slate-800 flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Type your query to the expert..."
                                    className="flex-1 px-8 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500 rounded-[2rem] font-bold outline-none transition-all"
                                />
                                <button className="px-10 bg-orange-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20">
                                    Send
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Card */}
                <div className="p-10 rounded-[3.5rem] bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-100 dark:border-amber-900/30 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0 text-amber-600 shadow-sm">
                        <Info className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">Why Second Opinion matters?</h4>
                        <p className="text-slate-500 font-bold">Studies show that up to 20% of serious medical conditions are misdiagnosed at first. A second opinion can provide clarity and potentially life-saving alternatives.</p>
                    </div>
                    <button className="whitespace-nowrap px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecondOpinion;
