import React from 'react';
import { motion } from 'framer-motion';
import {
    X, Activity, ClipboardList, Share2,
    ChevronRight, Calendar, User,
    AlertCircle, Clock, Download
} from 'lucide-react';
import RiskBadge from './medical/RiskBadge';

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
    // Determine risk level for consistency
    const getRiskLevel = (score: number): 'Low' | 'Moderate' | 'High' | 'Critical' => {
        if (score < 30) return 'Low';
        if (score < 60) return 'Moderate';
        if (score < 85) return 'High';
        return 'Critical';
    };

    const riskLevel = getRiskLevel(patient.risk);

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-10">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl overflow-hidden flex h-[80vh] shadow-2xl border border-slate-200 dark:border-slate-800"
            >
                {/* Sidebar Info */}
                <div className="w-80 bg-slate-50 dark:bg-slate-800/20 p-10 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center gap-8">
                    <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`}
                            className="w-full h-full object-cover"
                            alt={patient.name}
                        />
                    </div>

                    <div className="text-center space-y-1">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{patient.name}</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patient ID: {patient.id}</p>
                    </div>

                    <div className="w-full space-y-6">
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Triage Priority</p>
                            <RiskBadge level={riskLevel} />
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={onStartConsult}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-500/20 transition-all"
                            >
                                Start Clinical Review
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-4 text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest transition-colors"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-12 overflow-y-auto space-y-10 bg-white dark:bg-slate-900">
                    <header className="flex justify-between items-start">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Medical Chart Overview</h4>
                            <div className="flex items-center gap-4">
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-bold uppercase">Age: 28 Years</span>
                                </div>
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                                    <User className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-bold uppercase">Sex: Female</span>
                                </div>
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                                    <Activity className="w-3 h-3 text-slate-400" />
                                    <span className="text-[10px] font-bold uppercase">Blood: O+</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
                            <Download className="w-5 h-5" />
                        </button>
                    </header>

                    <div className="grid grid-cols-2 gap-8">
                        <section className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <ClipboardList className="w-4 h-4" /> Chief Complaint (Recent)
                            </h4>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 italic leading-relaxed">
                                    "Patient reports persistent acute headache since 4 days, localized in the frontal region. Associated nausea and light sensitivity."
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Clinical Actions
                            </h4>
                            <div className="space-y-3">
                                <button
                                    onClick={onRequestOpinion}
                                    className="w-full p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-indigo-600 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                            <Share2 className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Request Second Opinion</p>
                                            <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Escalate to specialist pool</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">Next Scheduled Follow-up</p>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Feb 24, 2026 • 10:30 AM</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Historical Vital Trends
                        </h4>
                        <div className="h-32 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-700 flex items-center justify-center">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Stable baseline detected over last 3 sessions</p>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientProfileView;
