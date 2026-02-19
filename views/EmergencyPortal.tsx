import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, MapPin, AlertCircle, Shield, Clock, Plus,
    ArrowLeft, Navigation, Activity, Zap, Loader2,
    Heart, Info, ChevronRight, User, MoreVertical
} from 'lucide-react';

interface EmergencyHosp {
    name: string;
    distance: string;
    time: string;
    specialty: string;
    beds: number;
    phone: string;
}

const EmergencyPortal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [sosActive, setSosActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [status, setStatus] = useState<'idle' | 'counting' | 'alerted'>('idle');

    useEffect(() => {
        let timer: any;
        if (status === 'counting' && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setStatus('alerted');
        }
        return () => clearTimeout(timer);
    }, [countdown, status]);

    const hospitals: EmergencyHosp[] = [
        { name: 'City Trauma Care (HQ)', distance: '1.2 km', time: '4 mins', specialty: 'Advanced Trauma', beds: 12, phone: '102' },
        { name: 'Apollo Emergency Unit', distance: '2.8 km', time: '8 mins', specialty: 'Cardiac Care', beds: 5, phone: '1066' },
        { name: 'Jan-Seva Public Hosp', distance: '3.5 km', time: '12 mins', specialty: 'General', beds: 0, phone: '100' }
    ];

    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-rose-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Neural SOS Protocols
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* SOS Trigger */}
                    <div className="flex flex-col items-center justify-center p-12 rounded-[4rem] bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 shadow-sm space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>

                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Emergency Trigger</h2>
                            <p className="text-slate-500 font-bold max-w-xs mx-auto">One-tap connection to Ambulance, Police and Emergency Contacts.</p>
                        </div>

                        {status === 'idle' && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setStatus('counting')}
                                className="w-56 h-56 rounded-full bg-rose-600 text-white shadow-[0_0_50px_rgba(225,29,72,0.3)] shadow-rose-500/50 flex flex-col items-center justify-center gap-2 group transition-all"
                            >
                                <Phone className="w-16 h-16 group-hover:animate-bounce" />
                                <span className="font-black text-2xl tracking-tighter uppercase">SOS ALert</span>
                            </motion.button>
                        )}

                        {status === 'counting' && (
                            <div className="w-56 h-56 rounded-full bg-rose-600 text-white flex flex-col items-center justify-center gap-2 relative">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute inset-0 bg-rose-500 rounded-full"
                                />
                                <span className="text-7xl font-black relative z-10">{countdown}</span>
                                <button
                                    onClick={() => { setStatus('idle'); setCountdown(5); }}
                                    className="mt-4 px-4 py-2 bg-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest relative z-10"
                                >
                                    Cancel SOS
                                </button>
                            </div>
                        )}

                        {status === 'alerted' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 rounded-[3rem] bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30 w-full text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <Shield className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-emerald-600">SOS PROXIES ACTIVATED</h3>
                                <div className="space-y-2 text-sm font-bold text-slate-600 dark:text-slate-400">
                                    <p>✓ Current Location Shared</p>
                                    <p>✓ Nearest Ambulance Dispatched</p>
                                    <p>✓ Family Contacts Alerted via SMS</p>
                                </div>
                                <button
                                    onClick={() => { setStatus('idle'); setCountdown(5); }}
                                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs"
                                >
                                    Safe Now - Terminate
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Nearby Hospitals */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <Navigation className="w-6 h-6 text-rose-600" />
                                Nearby Response Units
                            </h2>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Live Status
                            </span>
                        </div>

                        <div className="space-y-4">
                            {hospitals.map((hosp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-[2.5rem] bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 flex items-center gap-6 shadow-sm group hover:border-rose-500/30 transition-all"
                                >
                                    <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                        <Activity className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{hosp.name}</h4>
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {hosp.distance}</span>
                                            <span className="flex items-center gap-1 font-black text-rose-600"><Clock className="w-3 h-3" /> {hosp.time}</span>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] uppercase ${hosp.beds > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {hosp.beds > 0 ? `${hosp.beds} Beds Avail` : 'No Beds'}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-4 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-10 rounded-[3.5rem] bg-slate-900 text-white space-y-6 shadow-2xl relative overflow-hidden">
                            <h4 className="text-xl font-black tracking-tight uppercase border-b border-white/10 pb-4">Blood Bank - O Positive</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Available Units</p>
                                    <h5 className="text-3xl font-black text-rose-500">12 Units</h5>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Last Refresh</p>
                                    <h5 className="text-lg font-black">2 mins ago</h5>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                                Locate Other Blood Groups
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="p-10 rounded-[3.5rem] bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-100 dark:border-rose-900/30 flex items-center gap-8">
                    <AlertCircle className="w-12 h-12 text-rose-500 flex-shrink-0 animate-pulse" />
                    <div className="flex-1 space-y-1">
                        <h4 className="text-2xl font-black text-rose-600">First Aid AI Prompt</h4>
                        <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed">If there is an unconscious person, check pulse immediately. Stay on the line with the emergency operator who is being connected via the SOS trigger.</p>
                    </div>
                    <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                        Open Trauma Guide
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPortal;
