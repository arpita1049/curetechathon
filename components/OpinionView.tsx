import React from 'react';
import { motion } from 'framer-motion';
import {
    Share2, Users, FileText, CheckCircle2,
    MessageSquare, Globe, ArrowUpRight,
    Zap, ShieldCheck, Activity, Search
} from 'lucide-react';

const OpinionView: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Premium Hero Section */}
            <div className="p-20 rounded-[4rem] bg-gradient-to-br from-indigo-900 via-indigo-950 to-black text-white relative overflow-hidden border border-white/10 shadow-3xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] -ml-24 -mb-24" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-500/30 text-indigo-300">
                            <Globe className="w-4 h-4" /> Global Physician Mesh
                        </div>
                        <h2 className="text-7xl font-black tracking-tighter leading-[0.9] uppercase">
                            Consult <br />The Global <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Elite.</span>
                        </h2>
                        <p className="text-xl font-bold opacity-60 leading-relaxed uppercase tracking-tighter max-w-lg">
                            Instantly route critical cases to 500+ verified specialists for neural-peer verification and rapid response coordination.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-12 py-6 bg-white text-indigo-900 rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-3xl hover:scale-105 transition-all">
                                Initiate Global Scan
                            </button>
                            <button className="px-12 py-6 bg-indigo-600/20 border border-indigo-600 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all">
                                Pending Opinion Registry
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 space-y-10 shadow-3xl ring-1 ring-white/10">
                        <h4 className="text-2xl font-black uppercase tracking-tighter text-indigo-400">Collaboration Stream</h4>
                        <div className="space-y-8">
                            {[
                                { c: 'Case #902 - Advanced Ischemia', s: 'Dr. Elena (Cardiology - Mayo Clinic)', d: 'Expert Review in 8m', i: <Activity className="text-indigo-400" /> },
                                { c: 'Case #884 - Neural Pathogen', s: 'Dr. James (Infectious Diseases)', d: 'Final Protocol Generated', i: <CheckCircle2 className="text-emerald-400" /> },
                                { c: 'Case #872 - Pediatric Trauma', s: 'Dr. Sarah (Surgical Node)', d: 'Specialist Awaiting Acknowledgement', i: <Zap className="text-amber-400" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group cursor-pointer">
                                    <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-indigo-600 transition-all duration-500">
                                        {item.i}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-lg text-white group-hover:text-indigo-300 transition-colors uppercase tracking-tight leading-tight">{item.c}</p>
                                        <p className="text-[10px] font-black opacity-60 text-slate-400 uppercase tracking-widest mt-1">{item.s} • {item.d}</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-all" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all">View All Collaboration History</button>
                    </div>
                </div>
            </div>

            {/* Quick Consultation Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl flex flex-col items-center text-center">
                    <MessageSquare className="w-12 h-12 text-indigo-500 mb-6" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Direct Messaging</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Secure encrypted clinical communication with regional specialists.</p>
                    <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-indigo-600 hover:text-white transition-all">Open Terminal</button>
                </div>

                <div className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl flex flex-col items-center text-center">
                    <Globe className="w-12 h-12 text-sky-500 mb-6" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Regional Referrals</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Streamlined transfer protocols to tertiary healthcare centers.</p>
                    <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-sky-600 hover:text-white transition-all">Initiate Refer</button>
                </div>

                <div className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl flex flex-col items-center text-center">
                    <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Compliance Node</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Audit and verification of external clinical decisions.</p>
                    <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-emerald-600 hover:text-white transition-all">Review Audit</button>
                </div>
            </div>
        </div>
    );
};

export default OpinionView;
