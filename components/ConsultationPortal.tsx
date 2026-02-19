import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronRight, ChevronLeft, Mic,
    Video, FileText, Pill, Activity,
    Plus, Send, History, CheckCircle2,
    ShieldCheck, Brain
} from 'lucide-react';
import RiskMeter from './RiskMeter';

interface ConsultationPortalProps {
    patient: any;
    onClose: () => void;
}

const ConsultationPortal: React.FC<ConsultationPortalProps> = ({ patient, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [transcription, setTranscription] = useState('');
    const [isListening, setIsListening] = useState(false);

    const steps = [
        { id: 'HISTORY', label: 'Subject History', icon: History },
        { id: 'VITALS', label: 'Clinical Vitals', icon: Activity },
        { id: 'DIAGNOSIS', label: 'AI Diagnosis', icon: Brain },
        { id: 'RX', label: 'Prescription', icon: Pill },
    ];

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
        else onClose(); // Final step
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0B1426] flex flex-col overflow-hidden"
        >
            {/* Top Bar */}
            <div className="px-12 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
                <div className="flex items-center gap-8">
                    <button onClick={onClose} className="p-4 hover:bg-white/10 rounded-2xl transition-colors">
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">{patient.name}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case ID: {patient.id?.substring(0, 8)}... • {patient.risk}% Risk</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest transition-all">
                        <Video className="w-4 h-4" /> Start Telehealth
                    </button>
                    <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-500/20">
                        <ShieldCheck className="w-4 h-4" /> Finalize Consultation
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Lateral Navigation */}
                <div className="w-96 border-r border-white/5 bg-white/5 backdrop-blur-2xl p-10 flex flex-col">
                    <div className="space-y-4">
                        {steps.map((step, i) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(i)}
                                className={`w-full flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 ${activeStep === i ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}
                            >
                                <div className={`p-3 rounded-xl ${activeStep === i ? 'bg-white/20' : 'bg-slate-800'}`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[11px] font-black uppercase tracking-widest block">{step.label}</span>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest opacity-60 ${activeStep === i ? 'text-indigo-200' : ''}`}>
                                        {i < activeStep ? 'Completed' : i === activeStep ? 'In-Progress' : 'Pending'}
                                    </span>
                                </div>
                                {i < activeStep && <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-400" />}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto p-8 bg-gradient-to-br from-indigo-900/40 to-slate-900/40 rounded-[2.5rem] border border-white/10">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Patient Risk Trend</h4>
                        <RiskMeter value={patient.risk} size={120} />
                    </div>
                </div>

                {/* Active Workspace */}
                <div className="flex-1 overflow-y-auto p-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-12"
                        >
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
                                        {steps[activeStep].label}
                                    </h1>
                                    <p className="text-slate-400 text-xl font-bold uppercase tracking-tighter mt-4">
                                        Clinical Phase {activeStep + 1} of 4
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsListening(!isListening)}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:scale-110 shadow-3xl shadow-indigo-500/40'}`}
                                >
                                    <Mic className="w-8 h-8 text-white" />
                                </button>
                            </div>

                            {activeStep === 0 && (
                                <div className="space-y-10">
                                    <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 shadow-inner">
                                        <textarea
                                            value={transcription}
                                            onChange={(e) => setTranscription(e.target.value)}
                                            placeholder="Symptoms, history, and primary complaints..."
                                            className="w-full h-80 bg-transparent border-none outline-none font-bold text-2xl text-white placeholder:text-slate-600 resize-none no-scrollbar"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                                            <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Subjective Analysis</h5>
                                            <p className="text-sm font-bold text-white tracking-tight">Patient mentions recurring pain in upper thoracic region. Onset: 48h ago.</p>
                                        </div>
                                        <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
                                            <h5 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">Neural Flags</h5>
                                            <p className="text-sm font-bold text-white tracking-tight">Potential ischemia indicators. Suggest urgent vitals reconciliation.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="p-10 bg-indigo-600 rounded-[3rem] text-white space-y-8 shadow-3xl">
                                        <Brain className="w-10 h-10 text-indigo-200" />
                                        <h3 className="text-3xl font-black uppercase tracking-tighter">AI Diagnostic Probabilities</h3>
                                        <div className="space-y-6">
                                            {[
                                                { l: 'Myocardial Infarction', p: 82, c: 'rose' },
                                                { l: 'Angina Pectoris', p: 12, c: 'amber' },
                                                { l: 'Gastrointestinal Distress', p: 6, c: 'teal' }
                                            ].map((d, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                                        <span>{d.l}</span>
                                                        <span>{d.p}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${d.p}%` }} className="h-full bg-white" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem]">
                                            <h4 className="text-xl font-black uppercase mb-6">Differential Validation</h4>
                                            <p className="text-slate-400 font-bold text-sm leading-relaxed">Neural model suggests immediate ECG node verification to exclude STEMI. Troponin-I levels recommended.</p>
                                        </div>
                                        <button className="w-full py-6 bg-slate-800 text-white rounded-[2.5rem] font-black uppercase text-xs tracking-widest border border-white/10">Request specialist Review</button>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="pt-20 flex justify-between items-center">
                                <button
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-widest disabled:opacity-30"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Previous Session
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-16 py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-3xl"
                                >
                                    {activeStep === steps.length - 1 ? 'Complete Consult' : 'Proceed to Step'} <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default ConsultationPortal;
