import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Shield, CheckCircle2, AlertCircle, Syringe, Heart, Activity,
    Baby, Brain, CloudRain, Zap, Calculator, Mic2, TrendingUp, Calendar,
    ChevronRight, Info, Play, Volume2, Search, User, Download, Share2,
    Check, X, Plus, Bell, Award, ClipboardCheck, ArrowRight, Users,
    Thermometer, GlassWater, Dumbbell, Coffee, Moon, Eye, Droplet, Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type PreventiveStep = 'dashboard' | 'profile' | 'module-view' | 'reports';
type ModuleKey = 'vaccination' | 'screening' | 'lifestyle' | 'maternal' | 'mental' | 'alerts';

interface UserProfile {
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    diseases: string[];
    lifestyle: {
        smoking: boolean;
        alcohol: boolean;
        exercise: string;
    };
    familyHistory: string[];
}

// --- Icons Mapping ---
const moduleIcons: Record<ModuleKey, React.ReactNode> = {
    vaccination: <Syringe />,
    screening: <Activity />,
    lifestyle: <Heart />,
    maternal: <Baby />,
    mental: <Brain />,
    alerts: <CloudRain />
};

const moduleColors: Record<ModuleKey, string> = {
    vaccination: "from-rose-500 to-red-600",
    screening: "from-sky-500 to-indigo-600",
    lifestyle: "from-emerald-500 to-teal-600",
    maternal: "from-pink-500 to-rose-600",
    mental: "from-violet-500 to-indigo-600",
    alerts: "from-amber-500 to-orange-600"
};

const PreventiveCare: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    // --- State ---
    const [step, setStep] = useState<PreventiveStep>('dashboard');
    const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);
    const [voiceActive, setVoiceActive] = useState(false);
    const [healthScore, setHealthScore] = useState(65);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [completion, setCompletion] = useState<Record<ModuleKey, number>>({
        vaccination: 20,
        screening: 10,
        lifestyle: 45,
        maternal: 0,
        mental: 30,
        alerts: 100
    });

    const [vaccineAgeGroup, setVaccineAgeGroup] = useState<'child' | 'adult' | 'pregnancy' | 'travel'>('child');

    // --- Helpers ---
    const bmi = profile ? (profile.weight / (profile.height / 100) ** 2).toFixed(1) : "22.4";
    const riskLevel = healthScore > 80 ? "Low" : healthScore > 40 ? "Medium" : "High";

    const navigateToModule = (m: ModuleKey) => {
        setActiveModule(m);
        setStep('module-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Sub-Components ---

    const Header = () => (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <button
                    onClick={() => step === 'dashboard' ? onBack() : setStep('dashboard')}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-4 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {step === 'dashboard' ? "Back to Services" : "Back to Dashboard"}
                </button>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {step === 'dashboard' ? "Preventive Care" : step === 'profile' ? "Health Profile" : activeModule?.toUpperCase().replace('-', ' ')}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <select
                    className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 font-bold text-sm outline-none focus:border-indigo-500 transition-all text-slate-900 dark:text-white"
                >
                    <option>English Voice</option>
                    <option>हिन्दी आवाज़</option>
                    <option>मराठी आवाज</option>
                </select>
                <button
                    onClick={() => setVoiceActive(!voiceActive)}
                    className={`p-4 rounded-2xl transition-all ${voiceActive ? 'bg-indigo-600 text-white animate-pulse shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 border-2 border-transparent'}`}
                >
                    <Volume2 className="w-6 h-6" />
                </button>
            </div>
        </div>
    );

    const VaccinationView = () => {
        const vaccines = {
            child: [
                { n: "BCG", t: "At Birth", d: "Tuberculosis protection", s: "Completed" },
                { n: "OPV 0", t: "At Birth", d: "Oral Polio Vaccine", s: "Completed" },
                { n: "Hepatitis B", t: "At Birth", d: "Liver protection", s: "Completed" },
                { n: "Pentavalent 1", t: "6 Weeks", d: "DPT, HepB, Hib", s: "Completed" },
                { n: "MR 1", t: "9 Months", d: "Measles & Rubella", s: "Due Soon" }
            ],
            adult: [
                { n: "Tdap Booster", t: "Every 10 years", d: "Tetanus, Diphtheria, Pertussis", s: "Pending" },
                { n: "Flu Vaccine", t: "Annually", d: "Seasonal Influenza", s: "Due Now" },
                { n: "Hepatitis B", t: "3 Doses", d: "If not taken in childhood", s: "Check Records" }
            ],
            pregnancy: [
                { n: "Td 1", t: "Early in pregnancy", d: "Tetanus & Diphtheria", s: "N/A" },
                { n: "Td 2", t: "4 weeks after Td 1", d: "Follow-up dose", s: "N/A" }
            ],
            travel: [
                { n: "Yellow Fever", t: "10 days before travel", d: "For specific regions", s: "Optional" },
                { n: "Typhoid", t: "2 weeks before travel", d: "Water-borne protection", s: "Optional" }
            ]
        };

        return (
            <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(['child', 'adult', 'pregnancy', 'travel'] as const).map(g => (
                        <button
                            key={g}
                            onClick={() => setVaccineAgeGroup(g)}
                            className={`p-6 rounded-3xl border-2 transition-all font-black uppercase tracking-widest text-xs ${vaccineAgeGroup === g ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white capitalize">{vaccineAgeGroup} Schedule</h3>
                            <p className="text-sm font-bold text-slate-500">Universal Immunization Programme India Reference</p>
                        </div>
                        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                            Download Certificate
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {vaccines[vaccineAgeGroup].map((v, i) => (
                            <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${v.s === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                        {v.s === 'Completed' ? <CheckCircle2 className="w-7 h-7" /> : <Syringe className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{v.n}</h4>
                                        <p className="text-sm font-bold text-slate-500">{v.t} • {v.d}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-black uppercase tracking-widest block mb-2 ${v.s === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{v.s}</span>
                                    <button className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                        Mark Done <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-100 dark:border-rose-900/30 flex items-center gap-8">
                    <AlertCircle className="w-12 h-12 text-rose-500 flex-shrink-0 animate-pulse" />
                    <div>
                        <h4 className="text-xl font-black text-rose-600">Smart Alert: Missed Booster</h4>
                        <p className="text-slate-600 dark:text-slate-400 font-bold">You are 3 months late for Tdap. Delaying increases vulnerability to Tetanus and Pertussis outbreaks in your area.</p>
                    </div>
                    <button className="ml-auto px-8 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
                        Schedule Center Visit
                    </button>
                </div>
            </div>
        );
    };

    const ScreeningView = () => (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { n: "Blood Pressure", v: "118/78", s: "Normal", i: <Activity />, c: "emerald" },
                    { n: "Blood Sugar", v: "92 mg/dL", s: "Fasting", i: <Droplet />, c: "sky" },
                    { n: "Hemoglobin", v: "14.2 g/dL", s: "Optimal", i: <Droplet />, c: "rose" },
                    { n: "BMI Index", v: bmi, s: "Healthy", i: <Calculator />, c: "indigo" }
                ].map((stat, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4">
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.c}-500/10 text-${stat.c}-500 mx-auto flex items-center justify-center`}>
                            {React.isValidElement(stat.i) ? React.cloneElement(stat.i as React.ReactElement<any>, { className: 'w-7 h-7' }) : stat.i}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{stat.n}</p>
                            <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.v}</h4>
                            <span className={`text-[10px] font-black uppercase tracking-widest text-${stat.c}-500 px-3 py-1 bg-${stat.c}-500/10 rounded-full`}>{stat.s}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white px-2">National Screening Protocols</h3>
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                        {[
                            { n: "Cervical Cancer (HPV/Pap)", t: "Women 30-65", r: "Every 3-5 Years", s: "Not Scheduled" },
                            { n: "Breast Self-Exam", t: "Women 20+", r: "Monthly", s: "Reminder Set" },
                            { n: "Oral Cancer Screening", t: "All Adults", r: "Yearly", s: "Due This Month" },
                            { n: "Vision Checkup", t: "All Ages", r: "Yearly", s: "Up to date" }
                        ].map((s, i) => (
                            <div key={i} className="p-8 flex items-center justify-between px-10 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-all">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-slate-900 dark:text-white">{s.n}</h4>
                                    <p className="text-sm font-bold text-slate-500">{s.t} • Recommended: {s.r}</p>
                                </div>
                                <div className="text-right flex items-center gap-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600">{s.s}</span>
                                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                                        Action
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white px-2">Risk Engine</h3>
                    <div className="p-10 rounded-[3rem] bg-indigo-600 text-white space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
                        <h4 className="text-2xl font-black tracking-tight">AI Screening Suggestions</h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                                <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">Insight</p>
                                <p className="text-sm font-bold leading-relaxed">Based on your family history of diabetes, we recommend an HbA1c test every 6 months instead of yearly.</p>
                            </div>
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                                <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">Regional Alert</p>
                                <p className="text-sm font-bold leading-relaxed">Dental fluoride check recommended for your sector (High ground water fluoride levels detected).</p>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-transform hover:scale-105">
                            Update Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const LifestyleView = () => (
        <div className="space-y-10">
            <div className="p-12 rounded-[4rem] bg-emerald-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest">
                            <Shield className="w-4 h-4" /> WHO National Guidelines
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none">Optimal Health Lifestyle Matrix</h2>
                        <p className="text-xl font-bold opacity-80 leading-relaxed">Systematic prevention through 4 core pillars: Nutrition, Physical Activity, Habit Control, and Hydration.</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10 text-center space-y-2">
                                <h4 className="text-3xl font-black">2.5L</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Daily Water</p>
                            </div>
                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10 text-center space-y-2">
                                <h4 className="text-3xl font-black">150m</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Weekly Exercise</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 space-y-8">
                        <h4 className="text-2xl font-black">The Balanced Indian Plate</h4>
                        <div className="flex gap-4 h-8 w-full rounded-2xl overflow-hidden">
                            <div className="h-full bg-emerald-400 w-1/2" title="Vegetables/Fruits"></div>
                            <div className="h-full bg-amber-400 w-1/4" title="Whole Grains/Carbs"></div>
                            <div className="h-full bg-indigo-400 w-1/4" title="Proteins/Dal"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 text-sm font-bold opacity-90">
                            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Veg & Fruits (50%)</span> <span>Fiber & Vitamins</span></div>
                            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Whole Grains (25%)</span> <span>Energy Source</span></div>
                            <div className="flex justify-between items-center"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Proteins & Dal (25%)</span> <span>Cell Repair</span></div>
                        </div>
                        <p className="text-xs font-bold text-emerald-100 opacity-60">* Salt &lt; 5g/day • Sugar &lt; 25g/day</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                    { t: "Tobacco Cessation", d: "Zero tolerance. 80% risk reduction for oral cancer.", i: <X className="text-rose-500" />, c: "rose" },
                    { t: "Alcohol Awareness", d: "Liver & NCD risk alert. Maintain abstinence.", i: <AlertCircle className="text-amber-500" />, c: "amber" },
                    { t: "Sleep Hygiene", d: "7-8 hours deep sleep. Vital for hormonal balance.", i: <Moon className="text-indigo-500" />, c: "indigo" },
                    { t: "Salt Reduction", d: "Prevents Hypertension and Kidney issues.", i: <Droplet className="text-sky-500" />, c: "sky" },
                    { t: "Sugar Control", d: "Key to preventing Type-2 Diabetes.", i: <Coffee className="text-violet-500" />, c: "violet" },
                    { t: "Daily HIIT/Yoga", d: "15 min of cardio or Surya Namaskar.", i: <Dumbbell className="text-emerald-500" />, c: "emerald" }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
                        <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            {item.i}
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">{item.t}</h4>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">{item.d}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const MaternalView = () => (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-12 rounded-[4rem] bg-gradient-to-br from-pink-500 to-rose-600 text-white space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter">Maternal Preventive Plan</h2>
                        <p className="text-lg font-bold opacity-80">Synchronized with NHM / Anganwadi schedules for ensuring healthy outcomes.</p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xl font-black uppercase tracking-widest text-pink-200">Antenatal Care (ANC) Visits</h4>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(v => (
                                <div key={v} className="text-center space-y-2">
                                    <div className="w-full aspect-square rounded-2xl bg-white/20 border-2 border-white/20 flex items-center justify-center font-black text-2xl">
                                        {v <= 2 ? <Check /> : v}
                                    </div>
                                    <p className="text-[10px] font-black uppercase">Visit {v}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold italic opacity-70">* Minimum 4 visits required for optimal monitoring.</p>
                    </div>
                    <button className="w-full py-5 bg-white text-rose-600 rounded-2xl font-black text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl">
                        Identify Local ANM / Asha Worker
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3.5rem] p-10 space-y-8 overflow-hidden relative">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">Nutrition & Supplementation</h3>
                    <div className="space-y-6">
                        {[
                            { n: "Iron & Folic Acid", d: "100 Tablets plan", s: "In Progress", c: "rose" },
                            { n: "Calcium Supplement", d: "From 2nd Trimester", s: "Not Started", c: "amber" },
                            { n: "Deworming (Albendazole)", d: "Single dose after 1st Tri", s: "Next Week", c: "sky" }
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-${s.c}-500/10 text-${s.c}-500 flex items-center justify-center shadow-sm`}>
                                        <Droplet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white">{s.n}</h4>
                                        <p className="text-xs font-bold text-slate-500">{s.d}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest text-${s.c}-500`}>{s.s}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 rounded-3xl bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 flex items-center gap-4">
                        <Info className="w-8 h-8 text-pink-500 flex-shrink-0" />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Exclusive breastfeeding for first 6 months is recommended for child immunity.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3.5rem] p-10 space-y-10">
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">Child Growth Monitoring</h3>
                    <div className="flex gap-4">
                        <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest">W/A Chart</button>
                        <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest">H/A Chart</button>
                    </div>
                </div>
                <div className="h-64 flex items-end gap-2 md:gap-4">
                    {[35, 42, 58, 62, 75, 85, 92, 110, 125, 140, 155, 170].map((h, i) => (
                        <div key={i} className="flex-1 space-y-2">
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg relative" style={{ height: `${h / 1.5}%` }}>
                                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500/50 rounded-full translate-y-[-200%]"></div>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 text-center">{i + 1}M</p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-slate-500">Green Zone: Your child's growth follows the 85th percentile (Healthy).</p>
                </div>
            </div>
        </div>
    );

    const MentalView = () => (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-10 rounded-[3rem] bg-violet-600 text-white space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-8 translate-x-8 blur-2xl"></div>
                        <h4 className="text-2xl font-black tracking-tight">Stress Pulse</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-60">
                                <span>Current Level</span>
                                <span>Low-Moderate</span>
                            </div>
                            <div className="h-4 bg-white/20 rounded-full overflow-hidden p-1">
                                <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} className="h-full bg-emerald-400 rounded-full" />
                            </div>
                        </div>
                        <p className="text-sm font-bold opacity-80 leading-relaxed">Early identification of burn-out markers detected. We suggest a 5-minute deep breathing session.</p>
                        <button className="w-full py-4 bg-white text-violet-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" /> Start Exercise
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 space-y-6">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">Sleep Efficiency</h4>
                        <div className="flex items-end justify-between h-32 gap-2">
                            {[6.5, 7.2, 5.8, 8, 7.5, 6.2, 7].map((s, i) => (
                                <div key={i} className="flex-1 space-y-2 group">
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg group-hover:bg-indigo-500/30 transition-all" style={{ height: `${s * 10}%` }}></div>
                                    <p className="text-[10px] font-black text-slate-400 text-center">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest">
                            <span>AVG: 6.9 HR</span>
                            <span className="text-amber-500">+10% Goal</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="p-12 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[4rem] relative overflow-hidden">
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Systematic Mind Care</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="text-2xl font-black text-indigo-600">Early Signs Checklist</h4>
                                <div className="space-y-3">
                                    {[
                                        "Persistent low mood for 2+ weeks",
                                        "Sudden loss of interest in hobbies",
                                        "Drastic change in appetite/weight",
                                        "Chronic fatigue regardless of sleep",
                                        "Feelings of overwhelming guilt"
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                            <div className="w-5 h-5 border-2 border-indigo-200 dark:border-indigo-900 rounded-md flex-shrink-0"></div>
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-2xl font-black text-rose-600">Emergency & Support</h4>
                                <div className="p-6 bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-100 dark:border-rose-900/30 rounded-[2rem] space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-xs font-black uppercase tracking-widest text-rose-800 dark:text-rose-400">National Mental Health Helpline</p>
                                        <h5 className="text-3xl font-black text-rose-600 tracking-tight">1800-599-0019</h5>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-black uppercase tracking-widest text-rose-800 dark:text-rose-400">Tele-Manas (Govt of India)</p>
                                        <h5 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">14416</h5>
                                    </div>
                                    <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
                                        Identify Counselor Nearby
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                <Info className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white">Mental Health Policy 2017</h4>
                                <p className="text-slate-500 font-bold">Know your right to healthcare. Mental health is covered in regular insurance plans by law.</p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            Read Your Rights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const AlertsView = () => (
        <div className="space-y-10">
            <div className="p-12 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-600 rounded-full text-sm font-black uppercase tracking-[0.2em] animate-pulse">
                            <Droplet className="w-5 h-5" /> Live High-Risk Zone Alert
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Protect Your <br />Community.</h2>
                        <p className="text-xl font-bold text-slate-400 max-w-xl leading-relaxed">Precision epidemiology combined with local PHW (Anganwadi) data allows us to predict disease outbreaks 14 days in advance.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 space-y-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-2xl font-black">Region: Nagpur Metro</h4>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div> Live Monitoring</span>
                        </div>
                        <div className="space-y-6">
                            {[
                                { t: "Dengue Probability", p: "84%", c: "rose" },
                                { t: "Water Contamination", p: "42%", c: "amber" },
                                { t: "Heatwave Intensity", p: "15%", c: "emerald" }
                            ].map((a, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-60">
                                        <span>{a.t}</span>
                                        <span>{a.p}</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: a.p }} className={`h-full bg-${a.c}-500`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                            Set Precise Geolocation
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                    { t: "Monsoon Dengue Guide", d: "Remove stagnant water. Wear full sleeves. Use nets.", r: "Immediate Action Required", c: "rose" },
                    { t: "Heatstroke Response", d: "Limit 12pm-4pm. Drink ORS. Seek shade.", r: "Summer Advisory", c: "amber" },
                    { t: "Flu / Influenza", d: "Avoid crowds. Wear mask. Get annual flu shot.", r: "Seasonal Protocol", c: "indigo" },
                    { t: "Water-borne Diseases", d: "Boil water. Avoid street food. Check hygiene.", r: "Ongoing Prevention", c: "sky" },
                    { t: "Air Quality Alert", d: "AQI &gt; 250. Avoid morning runs. Wear N95.", r: "Health Hazard Alert", c: "rose" },
                    { t: "Polio NID Sync", d: "National Immunization Day coming up. Set alert.", r: "Immunization Event", c: "emerald" }
                ].map((a, i) => (
                    <div key={i} className="group p-8 rounded-[3rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${a.c}-500 to-${a.c}-600 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-full`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${a.c}-500 mb-4 block`}>{a.r}</span>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{a.t}</h4>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8">{a.d}</p>
                        <button className="w-full py-4 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            Mark as Aware
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const ProgressView = () => (
        <div className="space-y-12">
            <div className="p-12 rounded-[4rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/3 text-center space-y-6">
                        <div className="w-56 h-56 mx-auto relative group">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                <motion.circle
                                    cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="20" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 100}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 100 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - 0.78) }}
                                    className="text-indigo-600"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-7xl font-black tracking-tighter">78</span>
                                <span className="text-xs font-black uppercase tracking-widest opacity-50">Score Index</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Gold Guard Tier</h3>
                            <p className="text-sm font-black uppercase tracking-widest text-amber-500">Ranked Top 15% Locally</p>
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-8">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white capitalize">Preventive Pillar Metrics</h3>
                        {[
                            { l: "Vaccination Plan", p: "85%", c: "bg-rose-500" },
                            { l: "Screening Schedule", p: "40%", c: "bg-sky-500" },
                            { l: "Lifestyle Optimization", p: "95%", c: "bg-emerald-500" },
                            { l: "Mental Wellness", p: "60%", c: "bg-violet-500" }
                        ].map((m, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                                    <span className="text-slate-700 dark:text-slate-300">{m.l}</span>
                                    <span className="text-slate-500">{m.p} Managed</span>
                                </div>
                                <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: m.p }} className={`h-full ${m.c} rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-12 border-t-2 border-dashed border-slate-100 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { t: "Share Report", i: <Share2 />, c: "indigo" },
                        { t: "Sync Doctor", i: <Plus />, c: "emerald" },
                        { t: "ABHA Sync", i: <Activity />, c: "sky" },
                        { t: "Export PDF", i: <Download />, c: "rose" }
                    ].map((btn, i) => (
                        <div key={i} className="text-center group cursor-pointer">
                            <div className={`w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${btn.c}-600 group-hover:text-white transition-all shadow-lg transform group-hover:-translate-y-2`}>
                                {React.isValidElement(btn.i) ? React.cloneElement(btn.i as React.ReactElement<any>, { className: 'w-8 h-8' }) : btn.i}
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">{btn.t}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[3rem] bg-indigo-600 text-white flex items-center gap-10 shadow-2xl">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Bell className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black">Calendar Sync Active</h4>
                        <p className="text-indigo-100 font-bold text-sm">Automated reminders for MR vaccine and Oral Cancer screening added to Google/iCal.</p>
                    </div>
                </div>
                <div className="p-10 rounded-[3rem] bg-slate-900 border-2 border-white/5 text-white flex items-center gap-10 shadow-2xl">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-12 h-12 text-sky-400" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black">PHW Buddy Enabled</h4>
                        <p className="text-slate-400 font-bold text-sm">Your health Index is shared with Anganwadi #402. They will visit if your score drops &lt; 40.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const DashboardMain = () => (
        <div className="space-y-12">
            {/* 1. Health Score Board */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 p-10 rounded-[3.5rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-800 text-white shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="relative">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/10" />
                                <motion.circle
                                    cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - healthScore / 100) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="text-emerald-400"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-6xl font-black">{healthScore}</span>
                                <span className="text-xs font-black uppercase tracking-widest opacity-60">Health Index</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-3xl font-black mb-2">Preventive Health Score</h3>
                                <p className="text-indigo-100 font-bold opacity-80 leading-relaxed">
                                    Your preventive measures are {healthScore}% effective. Boost your score by completing the tasks below.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 bg-white/10 rounded-xl flex items-center gap-2 border border-white/10">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm font-black tracking-widest uppercase">Risk: {riskLevel}</span>
                                </div>
                                <div className="px-4 py-2 bg-white/10 rounded-xl flex items-center gap-2 border border-white/10">
                                    <TrendingUp className="w-4 h-4 text-sky-400" />
                                    <span className="text-sm font-black tracking-widest uppercase">Vitals: Normal</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep('profile')}
                                className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
                            >
                                {profile ? "Update Health Profile" : "Complete Your Health Profile"}
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="p-8 rounded-[3rem] bg-slate-900 border-2 border-white/5 text-white flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-amber-400 uppercase font-black text-xs tracking-widest">
                            <Zap className="w-4 h-4" />
                            AI Recommendation
                        </div>
                        <h4 className="text-2xl font-black leading-tight">Screening Due: Oral Cancer</h4>
                        <p className="text-slate-400 font-bold text-sm">Based on your age and habits, we recommend a non-invasive screening this month.</p>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                        Set Reminder <Bell className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 2. Grid of Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(['vaccination', 'screening', 'lifestyle', 'maternal', 'mental', 'alerts'] as ModuleKey[]).map((m, i) => {
                    if (m === 'maternal' && profile && profile.gender !== 'female') return null;

                    return (
                        <motion.button
                            key={m}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigateToModule(m)}
                            className="group relative p-8 rounded-[3rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/50 hover:border-indigo-500/30 hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${moduleColors[m]} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-full`}></div>
                            <div className="flex justify-between items-start mb-10">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${moduleColors[m]} text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                    {React.isValidElement(moduleIcons[m]) ? React.cloneElement(moduleIcons[m] as React.ReactElement<any>, { className: 'w-6 h-6' }) : moduleIcons[m]}
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{completion[m]}%</span>
                                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Complete</p>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white capitalize mb-2">{m.replace('-', ' ')}</h3>
                            <p className="text-slate-500 font-bold text-sm line-clamp-2">Protect your future with systematic {m} strategies.</p>
                            <div className="mt-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">
                                Explore Module <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* 3. Gamification Section */}
            <div className="p-10 rounded-[3.5rem] bg-slate-50 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10">
                <div className="w-32 h-32 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 animate-bounce">
                    <Award className="w-16 h-16 text-amber-500" />
                </div>
                <div className="flex-1 space-y-4">
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white">Health Warrior Milestone</h4>
                    <p className="text-slate-500 font-bold leading-relaxed">You've completed 4 out of 6 preventive modules. Finish the last two to earn your "Pre-emptive Shield" badge and sync data with local health workers.</p>
                </div>
                <button
                    onClick={() => setStep('reports')}
                    className="whitespace-nowrap px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black flex items-center gap-3 active:scale-95 transition-all"
                >
                    <Download className="w-5 h-5" />
                    Download Health Report
                </button>
            </div>
        </div>
    );

    const ProfileForm = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3.5rem] p-12 shadow-2xl space-y-10"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] pl-2">Age</label>
                    <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-5 font-black outline-none transition-all text-slate-900 dark:text-white" placeholder="28" />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] pl-2">Gender</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-5 font-black outline-none transition-all text-slate-900 dark:text-white">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] pl-2">Height (cm)</label>
                    <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-5 font-black outline-none transition-all text-slate-900 dark:text-white" placeholder="165" />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] pl-2">Weight (kg)</label>
                    <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl p-5 font-black outline-none transition-all text-slate-900 dark:text-white" placeholder="61" />
                </div>
            </div>

            <div className="p-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-500/10">
                        <Calculator className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">Live BMI Tracker</h4>
                        <p className="text-sm text-slate-500 font-bold tracking-widest uppercase">Proprietary Health Algorithm</p>
                    </div>
                </div>
                <div className="text-center group">
                    <div className="text-6xl font-black text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform">22.4</div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Normal Range</p>
                </div>
            </div>

            <div className="space-y-8 pt-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 text-center">National Risk Profile markers</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Smoking', 'Alcohol', 'Diabetes', 'PCOD', 'Hypertension', 'Thyroid', 'Allergies', 'Migraine'].map(h => (
                        <button key={h} className="p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-black text-[10px] uppercase tracking-widest flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                            {h} <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white text-slate-400"><Plus className="w-4 h-4" /></div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-10">
                <button
                    onClick={() => { setProfile({ age: 28, gender: 'female', height: 165, weight: 61, diseases: [], lifestyle: { smoking: false, alcohol: false, exercise: 'active' }, familyHistory: [] }); setStep('dashboard'); }}
                    className="flex-1 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-indigo-600/30"
                >
                    Sync & Recalculate Score
                </button>
                <button
                    onClick={() => setStep('dashboard')}
                    className="px-12 py-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-[2rem] font-black text-xl"
                >
                    Discard Changes
                </button>
            </div>
        </motion.div>
    );

    const ModuleView = () => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {activeModule === 'vaccination' && <VaccinationView />}
            {activeModule === 'screening' && <ScreeningView />}
            {activeModule === 'lifestyle' && <LifestyleView />}
            {activeModule === 'maternal' && <MaternalView />}
            {activeModule === 'mental' && <MentalView />}
            {activeModule === 'alerts' && <AlertsView />}
        </motion.div>
    );

    // --- Main Render ---
    return (
        <div className="min-h-screen pb-32 pt-24 bg-white dark:bg-slate-950 font-sans transition-colors duration-500 overflow-x-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <Header />
                <AnimatePresence mode="wait">
                    {step === 'dashboard' && <DashboardMain key="dashboard" />}
                    {step === 'profile' && <ProfileForm key="profile" />}
                    {step === 'module-view' && <ModuleView key="module-view" />}
                    {step === 'reports' && <ProgressView key="reports" />}
                </AnimatePresence>
            </div>

            {/* AI Assistant FAB / Progress Tracker */}
            <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-end gap-6">
                <div className="hidden md:block">
                    <motion.button
                        layoutId="progress-tab"
                        onClick={() => setStep('reports')}
                        className="group flex items-center bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-2 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:scale-105 transition-all"
                    >
                        <div className="flex flex-col items-end px-5">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-2">My Wellness Progress</span>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                                    <motion.div animate={{ width: "78%" }} className="h-full bg-indigo-600 rounded-full shadow-lg" />
                                </div>
                                <span className="text-xl font-black text-indigo-600">78%</span>
                            </div>
                        </div>
                        <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
                            <ClipboardCheck className="w-8 h-8" />
                        </div>
                    </motion.button>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setVoiceActive(!voiceActive)}
                        className="w-20 h-20 bg-indigo-700 text-white rounded-[2rem] flex items-center justify-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 transition-all relative group"
                    >
                        <div className={`absolute inset-[-6px] border-4 border-indigo-600 rounded-[2.2rem] ${voiceActive ? 'animate-ping' : 'opacity-0'}`}></div>
                        <Mic2 className={`w-9 h-9 ${voiceActive ? 'animate-pulse' : ''}`} />
                        <span className="absolute right-full mr-8 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                            Multilingual Voice Guide
                        </span>
                    </button>
                    {step !== 'dashboard' && (
                        <button
                            onClick={() => setStep('dashboard')}
                            className="p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl active:scale-95 transition-all"
                        >
                            <ArrowRight className="w-8 h-8" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreventiveCare;
