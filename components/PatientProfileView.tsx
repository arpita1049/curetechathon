import React from 'react';
import { motion } from 'framer-motion';
import {
    X, Activity, MessageCircle, Share2,
    ChevronRight, Calendar, User,
    ShieldAlert, Clock, Download
} from 'lucide-react';
import RiskMeter from './RiskMeter';

interface PatientProfileViewProps {
    patient: any;
    onClose: () => void;
    onStartConsult: () => void;
    onRequestOpinion: () => void;
}

const PatientProfileView: React.FC<PatientProfileViewProps> = ({
    patient,
    onClose,
    onStartConsult,
    onRequestOpinion
}) => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0a192f]/60 backdrop-blur-3xl flex items-center justify-center p-10">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-[#0f2a47]/90 backdrop-blur-3xl w-full max-w-6xl rounded-[4rem] overflow-hidden flex h-[85vh] shadow-4xl border border-white/20 dark:border-white/10"
            >
                {/* Lateral Profile Info */}
                <div className="w-96 bg-slate-50 dark:bg-[#0f2a47]/40 p-12 border-r border-slate-100 dark:border-white/10 flex flex-col items-center gap-10">
                    <div className="relative">
                        <div className="w-40 h-40 bg-indigo-500 rounded-[3rem] overflow-hidden shadow-2xl ring-4 ring-white dark:ring-[#0f2a47]">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`}
                                className="w-full h-full object-cover"
                                alt={patient.name}
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white dark:border-[#0f2a47] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{patient.name}</h3>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Global Bio-ID: {patient.id?.substring(0, 12).toUpperCase()}</p>
                    </div>

                    <div className="w-full space-y-6">
                        <RiskMeter value={patient.risk} size={180} />

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onStartConsult}
                                className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                            >
                                Initialize Consult Node
                            </button>
                            <button
                                onClick={onClose}
                                className="text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest transition-colors"
                            >
                                Return to Stream
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-16 space-y-12 overflow-y-auto no-scrollbar bg-white/50 dark:bg-transparent">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Patient Longitudinal Record</h4>
                            <div className="flex items-center gap-6">
                                <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-indigo-500" />
                                    <span className="text-[10px] font-black uppercase">Age: 32Y</span>
                                </div>
                                <div className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-3">
                                    <User className="w-4 h-4 text-sky-500" />
                                    <span className="text-[10px] font-black uppercase">Blood: O+ VE</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 transition-colors">
                            <Download className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    {/* Vitals Trend Placeholder */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                <Activity className="w-5 h-5 text-indigo-500" />
                                Neural Vitals Monitoring
                            </h4>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Real-time Pulse active</span>
                        </div>
                        <div className="h-48 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Awaiting Bio-Metric Stream Validation...</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-amber-500" />
                                Clinical Notes
                            </h4>
                            <div className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                                <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed uppercase tracking-tighter text-sm">
                                    Patient shows stable symptomatic response to current medication node. No contraindications detected in latest G-Mesh scan.
                                </p>
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase">Last updated: 4h ago</span>
                                    <button className="text-[9px] font-black text-indigo-500 uppercase">Edit Record</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                <ShieldAlert className="w-5 h-5 text-rose-500" />
                                Protocols & Flags
                            </h4>
                            <div className="space-y-4">
                                <button
                                    onClick={onRequestOpinion}
                                    className="w-full p-6 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-between group transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-600 rounded-xl text-white">
                                            <Share2 className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-[10px] font-black uppercase block text-slate-900 dark:text-white">Request Peer Review</span>
                                            <span className="text-[8px] font-bold text-slate-500 uppercase">Route to Specialist mesh</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-3xl flex items-center gap-4">
                                    <div className="p-3 bg-rose-600 rounded-xl text-white">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black uppercase block text-slate-900 dark:text-white">Next Sync: Feb 20, 2026</span>
                                        <span className="text-[8px] font-bold text-slate-500 uppercase">Protocol: High-Frequency Checkup</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientProfileView;
