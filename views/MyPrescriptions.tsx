import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pill, Download, Bell, Plus, Clock, FileText,
    ArrowLeft, Search, Filter, AlertTriangle, CheckCircle2,
    Calendar, User, ExternalLink, RefreshCw, ShoppingBag,
    ChevronRight, Zap, Info
} from 'lucide-react';

interface Prescription {
    id: string;
    doctor: string;
    date: string;
    validUntil: string;
    status: 'Active' | 'Expired';
    medicines: {
        name: string;
        dosage: string;
        timing: string;
        refillDue: string;
        instruction: string;
    }[];
}

const MyPrescriptions: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'reminders'>('all');

    const prescriptions: Prescription[] = [
        {
            id: 'PRE-8241',
            doctor: 'Dr. Sarah Mitchell',
            date: 'Oct 12, 2025',
            validUntil: 'Apr 12, 2026',
            status: 'Active',
            medicines: [
                { name: 'Metformin 500mg', dosage: '1-0-1', timing: 'After Meals', refillDue: 'Oct 28', instruction: 'Monitor blood sugar daily' },
                { name: 'Atorvastatin 20mg', dosage: '0-0-1', timing: 'Before Bed', refillDue: 'Oct 28', instruction: 'Report any muscle pain' }
            ]
        },
        {
            id: 'PRE-4402',
            doctor: 'Dr. Rajesh Khanna',
            date: 'Aug 05, 2025',
            validUntil: 'Aug 05, 2026',
            status: 'Active',
            medicines: [
                { name: 'Lisinopril 10mg', dosage: '1-0-0', timing: 'Morning', refillDue: 'Nov 05', instruction: 'Take on empty stomach' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Prescription Hub
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 rounded-2xl font-black flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 shadow-sm">
                            <Plus className="w-5 h-5" /> Manual Entry
                        </button>
                        <button className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black flex items-center gap-2 text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 shadow-sm">
                            <ShoppingBag className="w-5 h-5" /> Order Refill
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                        { id: 'all', label: 'All Timeline', icon: FileText },
                        { id: 'active', label: 'Active Meds', icon: Zap },
                        { id: 'reminders', label: 'Reminders', icon: Bell }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' : 'bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl text-slate-500 border-2 border-slate-100 dark:border-white/10'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Reminders Banner */}
                {activeTab === 'reminders' && (
                    <div className="p-10 rounded-[4rem] bg-gradient-to-br from-amber-500 to-orange-600 text-white space-y-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                <Bell className="w-10 h-10" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black tracking-tighter">Refill Alerts</h3>
                                <p className="text-amber-100 font-bold">2 medications are running low. Refill suggested before Friday.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20 flex justify-between items-center">
                                <div>
                                    <p className="font-black text-xl">Metformin 500mg</p>
                                    <p className="text-xs font-bold uppercase text-amber-100">Only 4 doses left</p>
                                </div>
                                <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-black text-xs uppercase tracking-widest">Refill</button>
                            </div>
                            <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20 flex justify-between items-center">
                                <div>
                                    <p className="font-black text-xl">Atorvastatin 20mg</p>
                                    <p className="text-xs font-bold uppercase text-amber-100">Only 5 doses left</p>
                                </div>
                                <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-black text-xs uppercase tracking-widest">Refill</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Prescription List */}
                <div className="space-y-8">
                    {prescriptions.map((pres, idx) => (
                        <motion.div
                            key={pres.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3.5rem] border-2 border-slate-100 dark:border-white/10 overflow-hidden shadow-sm"
                        >
                            <div className="p-8 border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{pres.id}</h3>
                                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                            <span>Issued: {pres.date}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <span>{pres.doctor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest">
                                        {pres.status}
                                    </span>
                                    <button className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                                        <Download className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <Pill className="w-4 h-4" /> Prescribed Medicines
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {pres.medicines.map((med, midx) => (
                                        <div key={midx} className="p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-emerald-500/20 transition-all flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <Pill className="w-7 h-7" />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h5 className="text-xl font-black text-slate-900 dark:text-white">{med.name}</h5>
                                                        <p className="text-sm font-bold text-emerald-600">{med.dosage} • {med.timing}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-bold text-slate-500 leading-relaxed italic">"{med.instruction}"</p>
                                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                                    <span className="text-[10px] font-black uppercase text-slate-400">Refill Due</span>
                                                    <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">{med.refillDue}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="p-10 rounded-[3rem] bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-white/70 dark:bg-[#0f2a47]/80 backdrop-blur-3xl rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600">
                        <Info className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">Medicines Safety Profile</h4>
                        <p className="text-slate-500 font-bold">Your current combination of Metformin and Lisinopril is safe. No drug-drug interactions detected by our Intelligence Engine.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPrescriptions;
