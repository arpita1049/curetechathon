
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, Activity, Calendar, FileText, Search,
    Plus, Download, ExternalLink, Clock, MapPin,
    Heart, Shield, Zap, Bell, Pill, Phone,
    User, ChevronRight, Droplets, Footprints,
    Thermometer, MessageSquare, Menu, LayoutGrid,
    BarChart3, Stethoscope as StethoscopeIcon,
    CreditCard, Settings, Eye, HelpCircle,
    DollarSign, ArrowRight
} from 'lucide-react';
import Premium3DBG from '../components/Premium3DBG';
import HealthScore3D from '../components/HealthScore3D';
import SmartSymptomChecker from './SmartSymptomChecker';
import TreatmentComparison from './TreatmentComparison';
import Pharmacy from '../components/Pharmacy';
import Mediclaim from '../components/Mediclaim';
import PreventiveCare from '../components/PreventiveCare';
import AppointmentBooking from './AppointmentBooking';
import DigitalHealthLocker from './DigitalHealthLocker';
import MyPrescriptions from './MyPrescriptions';
import DailyHealthTracker from './DailyHealthTracker';
import SecondOpinion from './SecondOpinion';
import EmergencyPortal from './EmergencyPortal';

interface PatientDashboardProps {
    onLogout: () => void;
    user?: any;
}

type DashboardView = 'HOME' | 'SYMPTOM' | 'APPOINTMENTS' | 'RECORDS' | 'PRESCRIPTIONS' | 'PREVENTIVE' | 'PHARMACY' | 'EMERGENCY' | 'COST' | 'OPINION' | 'TRACKER' | 'PROFILE';

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onLogout, user }) => {
    const [currentView, setCurrentView] = useState<DashboardView>('HOME');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavButton = ({ icon: Icon, label, view }: { icon: any, label: string, view: DashboardView }) => (
        <button
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center gap-1 transition-all duration-500 ${currentView === view ? 'text-teal-400 scale-125' : 'text-slate-400 hover:text-slate-200'}`}
        >
            <Icon className={`w-6 h-6 ${currentView === view ? 'fill-current drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );

    const FeatureCard = ({ icon: Icon, label, desc, color, view, delay, tag }: any) => (
        <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
                scale: 1.05,
                rotateX: -5,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView(view)}
            className={`relative overflow-hidden p-8 rounded-[2.5rem] bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl group text-left transition-all preserve-3d`}
        >
            {tag && <div className={`absolute top-4 right-8 px-3 py-1 bg-${color}-500/10 rounded-full text-[10px] font-black text-${color}-600 uppercase tracking-widest`}>{tag}</div>}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-${color}-500/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-${color}-500/20 transition-all`} />
            <div className={`w-16 h-16 bg-gradient-to-br from-${color}-400 to-${color}-600 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl shadow-${color}-500/20 transform-gpu group-hover:rotate-12 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{label}</h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{desc}</p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                INITIATE PROTOCOL <ChevronRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
            </div>
        </motion.button>
    );

    const HomeView = () => (
        <div className="space-y-16 pb-40">
            {/* Ultra Premium Hero Section */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
                <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-widest">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" /> AI HEALTH SYSTEM v2.4
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                            Welcome back, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-blue-600">
                                {user?.displayName || 'Arpita'}
                            </span> 👋
                        </h1>
                        <p className="text-xl text-slate-500 font-bold max-w-lg leading-relaxed">
                            Your biometrics are in synchronization. Health vitality is at peak levels today.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { l: 'Steps', v: '8.4k', c: 'teal', i: Footprints },
                            { l: 'BPM', v: '72', c: 'red', i: Heart },
                            { l: 'O2', v: '99%', c: 'blue', i: Droplets }
                        ].map((stat, i) => (stat &&
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="px-6 py-4 bg-white/40 dark:bg-[#0f2a47]/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl flex items-center gap-4 shadow-lg group hover:bg-white dark:hover:bg-slate-800 transition-all pointer-events-auto cursor-pointer"
                            >
                                <div className={`p-2 bg-${stat.c}-500/10 text-${stat.c}-500 rounded-lg group-hover:scale-110 transition-transform`}>
                                    <stat.i className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.l}</p>
                                    <p className="text-lg font-black text-slate-900 dark:text-white">{stat.v}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5 relative flex justify-center items-center h-[400px]">
                    <div className="absolute inset-0 bg-teal-500/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="w-full h-full relative z-10 scale-125">
                        <HealthScore3D score={85} />
                    </div>
                </div>
            </header>

            {/* Feature Grid (2x3) */}
            <section className="space-y-8">
                <div className="flex justify-between items-end px-4">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Clinical Modules</h2>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active System Protocols</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard icon={Zap} label="AI Checkup" desc="Conversational triage engine with symptom deep-dive." color="teal" view="SYMPTOM" delay={0.1} tag="AI Powered" />
                    <FeatureCard icon={Calendar} label="Book Doctor" desc="Secure clinical allocation with live slot verified." color="blue" view="APPOINTMENTS" delay={0.2} tag="Verified Slots" />
                    <FeatureCard icon={FileText} label="Health Locker" desc="Quantum-encrypted vault for medical artifacts." color="emerald" view="RECORDS" delay={0.3} tag="Encrypted" />
                    <FeatureCard icon={Shield} label="Preventive Care" desc="Risk topography & wellness trajectory prediction." color="indigo" view="PREVENTIVE" delay={0.4} tag="Proactive" />
                    <FeatureCard icon={Pill} label="Medicine" desc="Bio-interaction analysis & generic cost optimization." color="amber" view="PHARMACY" delay={0.5} tag="Smart Rx" />
                    <FeatureCard icon={Phone} label="Emergency SOS" desc="Neural SOS trigger with live proxy alerting." color="rose" view="EMERGENCY" delay={0.6} tag="24/7" />
                </div>
            </section>

            {/* Smart AI Insights Carousel (Horizontal) */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter px-4 uppercase">AI Insights Engine</h2>
                <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
                    {[
                        { t: 'Vitamin D Synthesis', d: 'Your current sleep pattern suggests a 15% increase in cortisol. Recommended morning sun exposure for 15 mins.', i: <Zap className="text-amber-500" />, b: 'from-amber-500/20 to-orange-500/20' },
                        { t: 'Hydration Recovery', d: 'Physical exertion detected. Increased hydration required by 800ml to maintain metabolic stability.', i: <Droplets className="text-blue-500" />, b: 'from-blue-500/20 to-indigo-500/20' },
                        { t: 'Posture Correction', d: 'Extended desk time detected. Micro-stretch sequence suggested for cervical decompression.', i: <Activity className="text-emerald-500" />, b: 'from-emerald-500/20 to-teal-500/20' }
                    ].map((insight, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={`min-w-[350px] md:min-w-[450px] p-10 rounded-[3rem] bg-gradient-to-br ${insight.b} border border-white/20 dark:border-slate-800 backdrop-blur-xl snap-center flex flex-col justify-between`}
                        >
                            <div className="space-y-6">
                                <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                                    {insight.i}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{insight.t}</h3>
                                <p className="font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{insight.d}</p>
                            </div>
                            <button className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                Detail Analysis <ExternalLink className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.button
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setCurrentView('PRESCRIPTIONS')}
                    className="p-10 rounded-[3rem] bg-white/40 dark:bg-[#0f2a47]/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-xl group text-left relative overflow-hidden"
                >
                    <div className="absolute top-4 right-8 px-3 py-1 bg-emerald-500/10 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest">3 Active</div>
                    <Pill className="w-12 h-12 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight uppercase leading-none">Prescription<br />Hub</h3>
                    <p className="text-slate-500 font-bold mb-6 text-sm">Automated refill protocols, dosage sync & drug-drug interaction scanning.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        SYNC DOSAGE <ArrowRight className="w-3 h-3" />
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setCurrentView('COST')}
                    className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group text-left"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="absolute top-4 right-8 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-teal-400 uppercase tracking-widest">Global Tier</div>
                    <DollarSign className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black mb-2 uppercase leading-none">Cost<br />Analytics</h3>
                    <p className="text-slate-400 font-bold mb-6 text-sm">Compare regional hospital yields, insurance coverage & out-of-pocket benchmarks.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-teal-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        OPEN PRICE HUB <ArrowRight className="w-3 h-3" />
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setCurrentView('OPINION')}
                    className="p-10 rounded-[3rem] bg-white/40 dark:bg-[#0f2a47]/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-xl group text-left relative overflow-hidden"
                >
                    <div className="absolute top-4 right-8 px-3 py-1 bg-orange-500/10 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest">50+ Experts</div>
                    <MessageSquare className="w-12 h-12 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight uppercase leading-none">Second<br />Opinion</h3>
                    <p className="text-slate-500 font-bold mb-6 text-sm">Expert diagnostic verification by verified specialists for complex neural cases.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        REQUEST REVIEW <ArrowRight className="w-3 h-3" />
                    </div>
                </motion.button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent font-sans transition-colors duration-500 relative perspective-1000">
            <Premium3DBG />

            {/* Main Surface */}
            <main className="max-w-7xl mx-auto px-8 pt-20">
                <AnimatePresence mode="wait">
                    {currentView === 'HOME' && <HomeView key="home" />}
                    {currentView === 'SYMPTOM' && <SmartSymptomChecker key="symptom" onBack={() => setCurrentView('HOME')} onConsultDoctor={() => setCurrentView('APPOINTMENTS')} />}
                    {currentView === 'APPOINTMENTS' && <AppointmentBooking key="appointments" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'RECORDS' && <DigitalHealthLocker key="records" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'PRESCRIPTIONS' && <MyPrescriptions key="prescriptions" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'PREVENTIVE' && <PreventiveCare key="preventive" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'PHARMACY' && <Pharmacy key="pharmacy" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'COST' && <TreatmentComparison key="cost" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'EMERGENCY' && <EmergencyPortal key="emergency" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'OPINION' && <SecondOpinion key="opinion" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'TRACKER' && <DailyHealthTracker key="tracker" onBack={() => setCurrentView('HOME')} />}
                    {currentView === 'PROFILE' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pb-32 text-center p-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-slate-800">
                            <User className="w-24 h-24 mx-auto text-teal-600 mb-10" />
                            <h2 className="text-5xl font-black mb-6 tracking-tighter">Bio-Profile Management</h2>
                            <p className="text-slate-500 font-black mb-12 uppercase tracking-widest text-xs italic">Encrypted patient identity verified</p>
                            <button onClick={onLogout} className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all">TERMINATE SESSION</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Floating Glassmorphism Bottom Navigation Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8">
                <nav className="bg-white/40 dark:bg-[#0f2a47]/60 backdrop-blur-[40px] border border-white/20 dark:border-white/10 px-10 py-6 rounded-[3rem] flex items-center gap-12 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
                    <NavButton icon={Home} label="Home" view="HOME" />
                    <NavButton icon={Calendar} label="Bookings" view="APPOINTMENTS" />

                    {/* Glowing 3D FAB */}
                    <motion.button
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentView('SYMPTOM')}
                        className="w-20 h-20 -mt-20 bg-gradient-to-br from-teal-400 via-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(20,184,166,0.6)] border-4 border-white dark:border-slate-900 group relative"
                    >
                        <Zap className="w-8 h-8 group-hover:animate-pulse" />
                        <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            Quick Check
                        </div>
                    </motion.button>

                    <NavButton icon={FileText} label="Records" view="RECORDS" />
                    <NavButton icon={User} label="Profile" view="PROFILE" />
                </nav>
            </div>
        </div>
    );
};

export default PatientDashboard;
