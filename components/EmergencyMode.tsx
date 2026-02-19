import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertOctagon, PhoneCall, MapPin,
    Stethoscope, Activity, Heart,
    ChevronRight, Volume2, ShieldAlert
} from 'lucide-react';

interface EmergencyModeProps {
    onExit: () => void;
}

const EmergencyMode: React.FC<EmergencyModeProps> = ({ onExit }) => {
    const [activeStep, setActiveStep] = useState(0);

    const emergencyProtocol = [
        { title: "Airway & Breathing", action: "Check for obstruction. Administer oxygen if SpO2 < 90%.", icon: Activity },
        { title: "Cardiac Support", action: "Identify rhythm. Prepare for CPR if no pulse detected.", icon: Heart },
        { title: "Trauma Stabilisation", action: "Apply pressure to active bleeding. Immobilize neck if suspected injury.", icon: ShieldAlert },
        { title: "Emergency Medication", action: "Adrenaline 1mg IM every 3-5 mins if anaphylaxis suspected.", icon: Stethoscope },
    ];

    return (
        <div className="fixed inset-0 z-[500] bg-red-600 flex flex-col overflow-hidden">
            {/* Background Warning Animation */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute inset-0 bg-black pointer-events-none"
            />

            {/* Header */}
            <div className="relative z-10 p-10 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-6">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="p-5 bg-white rounded-3xl text-red-600 shadow-2xl"
                    >
                        <AlertOctagon className="w-10 h-10" />
                    </motion.div>
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">EMERGENCY ASSIST MODE</h1>
                        <p className="text-red-100 font-bold uppercase tracking-[0.3em] text-[10px] opacity-80">Priority Clinical Response Active</p>
                    </div>
                </div>
                <button
                    onClick={onExit}
                    className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest transition-all"
                >
                    Exit Emergency Mode
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row p-10 gap-10">
                {/* Left Side: Protocol Steps */}
                <div className="flex-1 space-y-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                        <Volume2 className="w-6 h-6 animate-pulse" /> Immediate Protocols
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {emergencyProtocol.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setActiveStep(i)}
                                className={`p-8 rounded-[3rem] border-2 transition-all cursor-pointer relative group overflow-hidden ${activeStep === i ? 'bg-white border-white shadow-4xl' : 'bg-red-700/40 border-white/10 hover:border-white/30 text-white'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-6">
                                        <div className={`p-4 rounded-2xl ${activeStep === i ? 'bg-red-600 text-white' : 'bg-white/10'}`}>
                                            <p.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-black uppercase tracking-tight ${activeStep === i ? 'text-red-600' : 'text-white'}`}>{p.title}</h3>
                                            {activeStep === i && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="text-slate-600 font-bold mt-2 text-sm max-w-lg leading-relaxed"
                                                >
                                                    {p.action}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                    {activeStep === i ? <ChevronRight className="w-6 h-6 text-red-600" /> : null}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Emergency Services */}
                <div className="w-full lg:w-[450px] space-y-8">
                    <div className="p-10 bg-black/30 backdrop-blur-3xl rounded-[4rem] border border-white/10 text-white space-y-10 shadow-4xl">
                        <h3 className="text-xl font-black uppercase tracking-widest border-b border-white/5 pb-6">Nearest Trauma Center</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/10 rounded-2xl"><MapPin className="w-6 h-6" /></div>
                                <div>
                                    <h4 className="font-black uppercase text-lg">District General Hospital</h4>
                                    <p className="text-sm font-bold opacity-60">12.4 KM • 18 mins travel time</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full py-6 bg-white text-red-600 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all">
                                    <PhoneCall className="w-4 h-4" /> Dispatch Ambulance
                                </button>
                                <button className="w-full py-6 bg-red-600 text-white rounded-[2rem] border border-white/20 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-500 transition-all">
                                    Notify Hospital Team
                                </button>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-white/5">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-6 px-2">
                                <span>Vitals Monitoring</span>
                                <span className="text-red-400">Syncing...</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/5 rounded-3xl text-center">
                                    <p className="text-[8px] font-black uppercase opacity-60 mb-1">Heart Rate</p>
                                    <p className="text-2xl font-black text-white">124 <span className="text-[10px] opacity-40">BPM</span></p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl text-center">
                                    <p className="text-[8px] font-black uppercase opacity-60 mb-1">SpO2</p>
                                    <p className="text-2xl font-black text-white">88 <span className="text-[10px] opacity-40">%</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyMode;
