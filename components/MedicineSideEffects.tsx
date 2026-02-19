import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Pill, Microscope, Dna, Stethoscope, Heart, Activity, Loader2, Search, ArrowLeft, ShieldCheck, ShieldAlert, AlertTriangle, Info, Baby } from 'lucide-react';

// Enhanced database with more details
interface MedicineInfo {
    effects: string[];
    ageLimit: string;
    pregnancySafe: string;
    menstruationSafe: string;
}

const MEDICINE_DB: Record<string, MedicineInfo> = {
    // --- Pain & Fever ---
    "paracetamol": {
        effects: ["Nausea", "Allergic reactions (rash)", "Liver damage (high dose)", "Low blood pressure"],
        ageLimit: "Safe for all ages (Infant drops available)",
        pregnancySafe: "Generally considered safe (Category B)",
        menstruationSafe: "Safe"
    },
    "dolo 650": {
        effects: ["Nausea", "Gastric irritation", "Liver damage (excessive use)", "Skin rash"],
        ageLimit: "12 years+ (lower dose for kids)",
        pregnancySafe: "Consult doctor (Safe in moderation)",
        menstruationSafe: "Safe for pain relief"
    },
    "crocin": {
        effects: ["Nausea", "Allergic reactions", "Liver damage", "Skin rash"],
        ageLimit: "Safe for all ages (drops/syrup for kids)",
        pregnancySafe: "Safe (Standard dosage)",
        menstruationSafe: "Safe"
    },
    "ibuprofen": {
        effects: ["Stomach pain", "Heartburn", "Nausea", "Gastrointestinal bleeding", "Kidney risks"],
        ageLimit: "6 months+ (with appropriate dosage)",
        pregnancySafe: "Avoid in last trimester (Category C/D)",
        menstruationSafe: "Safe and effective for menstrual pain"
    },
    "combiflam": {
        effects: ["Heartburn", "Indigestion", "Nausea", "Stomach pain"],
        ageLimit: "12 years+",
        pregnancySafe: "Avoid (Contains Ibuprofen)",
        menstruationSafe: "Effective for cramps but take with food"
    },
    "meftal spas": {
        effects: ["Dizziness", "Dry mouth", "Blurred vision", "Nausea"],
        ageLimit: "12 years+ (Pediatric drops available)",
        pregnancySafe: "Avoid in last trimester (Category C)",
        menstruationSafe: "Highly effective for menstrual cramps"
    },
    "aspirin": {
        effects: ["Upset stomach", "Heartburn", "Bleeding risks", "Allergic reactions"],
        ageLimit: "16+ (Risk of Reye's syndrome in kids)",
        pregnancySafe: "Avoid unless prescribed (Category D)",
        menstruationSafe: "Avoid if heavy bleeding (blood thinner)"
    },
    "disprin": {
        effects: ["Upset stomach", "Heartburn", "Risk of bleeding", "Acidity"],
        ageLimit: "16+",
        pregnancySafe: "Avoid (Blood thinning risk)",
        menstruationSafe: "Avoid during heavy flow"
    },
    "diclofenac": {
        effects: ["Indigestion", "Gas", "Stomach pain", "Nausea", "Diarrhea"],
        ageLimit: "18+ (Gel/Spray safer for kids)",
        pregnancySafe: "Avoid (Category C/D)",
        menstruationSafe: "Effective for pain"
    },
    "tramadol": {
        effects: ["Dizziness", "Sleepiness", "Nausea", "Headache", "Constipation"],
        ageLimit: "12 years+ (strictly prescribed)",
        pregnancySafe: "Unsafe (Opioid risk)",
        menstruationSafe: "Consult doctor (Strong painkiller)"
    },

    // --- Antibiotics (Prescription Only) ---
    "amoxicillin": {
        effects: ["Diarrhea", "Nausea", "Skin rash", "Yeast infections"],
        ageLimit: "Safe for all ages (pediatric suspension)",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "augmentin": {
        effects: ["Diarrhea", "Nausea", "Skin rashes", "Vomiting", "Vaginitis"],
        ageLimit: "Safe for all ages (suspension for infants)",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "azithromycin": {
        effects: ["Diarrhea", "Nausea", "Abdominal pain", "Vomiting", "Headache"],
        ageLimit: "6 months+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "ciprofloxacin": {
        effects: ["Nausea", "Diarrhea", "Dizziness", "Tendon rupture risk"],
        ageLimit: "18+ (affects joint growth)",
        pregnancySafe: "Avoid usually (Category C)",
        menstruationSafe: "Safe"
    },
    "ofloxacin": {
        effects: ["Nausea", "Headache", "Dizziness", "Insomnia"],
        ageLimit: "18+",
        pregnancySafe: "Avoid (Category C)",
        menstruationSafe: "Safe"
    },
    "metrogyl": {
        effects: ["Metallic taste", "Nausea", "Headache", "Dark urine"],
        ageLimit: "Safe for kids (suspension)",
        pregnancySafe: "Avoid in 1st trimester (Category B)",
        menstruationSafe: "Safe"
    },
    "taxim": {
        effects: ["Pain at injection site", "Diarrhea", "Allergic reaction"],
        ageLimit: "Safe for all ages (dosage varies)",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },

    // --- Cold, Cough & Allergy ---
    "cetirizine": {
        effects: ["Drowsiness", "Dry mouth", "Fatigue", "Headache"],
        ageLimit: "6 months+ (syrup form)",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "allegra": {
        effects: ["Headache", "Back pain", "Cold symptoms", "Nausea"],
        ageLimit: "6 months+",
        pregnancySafe: "Consult doctor (Category C)",
        menstruationSafe: "Safe"
    },
    "montelukast": {
        effects: ["Mental mood changes", "Fever", "Headache", "Sore throat"],
        ageLimit: "6 months+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "benadryl": {
        effects: ["Drowsiness", "Dizziness", "Constipation", "Dry mouth/nose/throat"],
        ageLimit: "2 years+ (Pediatric version)",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "corex": {
        effects: ["Drowsiness", "Dizziness", "Nausea", "Constipation"],
        ageLimit: "18+ (Codeine based - restricted)",
        pregnancySafe: "Avoid/Unsafe",
        menstruationSafe: "Avoid"
    },
    "sinarest": {
        effects: ["Drowsiness", "Dry mouth", "Nausea", "Headache"],
        ageLimit: "2 years+",
        pregnancySafe: "Consult doctor",
        menstruationSafe: "Safe"
    },
    "ambroxol": {
        effects: ["Nausea", "Vomiting", "Stomach upset", "Allergic reactions"],
        ageLimit: "2 years+ (Syrup)",
        pregnancySafe: "Consult doctor (Category C)",
        menstruationSafe: "Safe"
    },
    "levocetirizine": {
        effects: ["Drowsiness", "Dry mouth", "Fatigue", "Weakness"],
        ageLimit: "6 months+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "dextromethorphan": {
        effects: ["Dizziness", "Lightheadedness", "Drowsiness", "Nervousness"],
        ageLimit: "4 years+",
        pregnancySafe: "Category C (Use only if needed)",
        menstruationSafe: "Safe"
    },
    "guaifenesin": {
        effects: ["Nausea", "Vomiting", "Stomach pain", "Headache"],
        ageLimit: "4 years+",
        pregnancySafe: "Category C",
        menstruationSafe: "Safe"
    },
    "phenylephrine": {
        effects: ["Nervousness", "Dizziness", "Sleeplessness"],
        ageLimit: "4 years+",
        pregnancySafe: "Category C",
        menstruationSafe: "Safe"
    },
    "chlorpheniramine": {
        effects: ["Drowsiness", "Dizziness", "Constipation", "Blurred vision"],
        ageLimit: "2 years+",
        pregnancySafe: "Category B",
        menstruationSafe: "Safe"
    },
    "maxtra": {
        effects: ["Drowsiness", "Restlessness", "Dry mouth"],
        ageLimit: "2 years+ (syrup)",
        pregnancySafe: "Consult doctor",
        menstruationSafe: "Safe"
    },
    "wikoryl": {
        effects: ["Nausea", "Allergic reaction", "Dizziness"],
        ageLimit: "2 years+",
        pregnancySafe: "Consult doctor",
        menstruationSafe: "Safe"
    },
    "otrivin": {
        effects: ["Nasal burning", "Sneezing", "Dryness"],
        ageLimit: "12 years+ (Pediatric version separate)",
        pregnancySafe: "Consult doctor (local effect)",
        menstruationSafe: "Safe"
    },

    // --- Gastric / Acidity ---
    "pantoprazole": {
        effects: ["Headache", "Diarrhea", "Stomach pain", "Gas"],
        ageLimit: "5 years+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "omeprazole": {
        effects: ["Headache", "Stomach pain", "Nausea", "Diarrhea"],
        ageLimit: "1 year+",
        pregnancySafe: "Generally safe (Category C)",
        menstruationSafe: "Safe"
    },
    "rantac": {
        effects: ["Headache", "Constipation", "Diarrhea", "Nausea"],
        ageLimit: "1 month+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },
    "digene": {
        effects: ["Constipation", "Diarrhea", "Stomach cramps"],
        ageLimit: "Safe for kids (syrup)",
        pregnancySafe: "Generally safe",
        menstruationSafe: "Safe"
    },
    "eno": {
        effects: ["Gas", "Burping", "Stomach bloating"],
        ageLimit: "12 years+",
        pregnancySafe: "Consult doctor (High sodium)",
        menstruationSafe: "Safe"
    },
    "gelusil": {
        effects: ["Constipation", "Loss of appetite", "Weakness"],
        ageLimit: "Safe for kids",
        pregnancySafe: "Safe",
        menstruationSafe: "Safe"
    },

    // --- Chronic Conditions ---
    "metformin": {
        effects: ["Nausea", "Stomach upset", "Diarrhea", "Metallic taste"],
        ageLimit: "10 years+ (Type 2 diabetes)",
        pregnancySafe: "Generally safe if prescribed (Category B)",
        menstruationSafe: "Safe"
    },
    "atorvastatin": {
        effects: ["Muscle pain", "Diarrhea", "Nausea", "Liver issues"],
        ageLimit: "10 years+ (Genetic cholesterol)",
        pregnancySafe: "Unsafe (Category X)",
        menstruationSafe: "Safe"
    },
    "amlodipine": {
        effects: ["Swelling (legs)", "Fatigue", "Palpitations", "Dizziness"],
        ageLimit: "6 years+",
        pregnancySafe: "Consult doctor (Category C)",
        menstruationSafe: "Safe"
    },
    "losartan": {
        effects: ["Dizziness", "Back pain", "Cough", "Fatigue"],
        ageLimit: "6 years+",
        pregnancySafe: "Unsafe (Category D)",
        menstruationSafe: "Safe"
    },
    "thyronorm": {
        effects: ["Weight loss", "Tremors", "Headache", "Nausea"],
        ageLimit: "Safe for all ages (dose varies)",
        pregnancySafe: "Safe (Category A)",
        menstruationSafe: "Safe (Essential hormone)"
    },
    "glycomet": {
        effects: ["Nausea", "Vomiting", "Stomach upset", "Weakness"],
        ageLimit: "10 years+",
        pregnancySafe: "Generally safe (Category B)",
        menstruationSafe: "Safe"
    },

    // --- Supplements ---
    "becosules": {
        effects: ["Bright yellow urine", "Nausea", "Mild stomach upset"],
        ageLimit: "Safe for all ages",
        pregnancySafe: "Safe",
        menstruationSafe: "Safe"
    },
    "limcee": {
        effects: ["Nausea", "Vomiting", "Heartburn (excessive use)"],
        ageLimit: "Safe for all ages",
        pregnancySafe: "Safe",
        menstruationSafe: "Safe"
    },
    "shelcal": {
        effects: ["Constipation", "Gas", "Nausea"],
        ageLimit: "Safe for all ages",
        pregnancySafe: "Safe",
        menstruationSafe: "Safe"
    },
    "neurobion": {
        effects: ["Nausea", "Stomach upset", "Diarrhea"],
        ageLimit: "14 years+",
        pregnancySafe: "Safe",
        menstruationSafe: "Safe"
    },

    // --- Others ---
    "avil": {
        effects: ["Drowsiness", "Dizziness", "Dry mouth"],
        ageLimit: "2 years+",
        pregnancySafe: "Consult doctor (Category B/C)",
        menstruationSafe: "Safe"
    },
    "unwanted 72": {
        effects: ["Nausea", "Vomiting", "Lower abdominal pain", "Fatigue", "Headache"],
        ageLimit: "Adults only",
        pregnancySafe: "N/A (Emergency Contraceptive)",
        menstruationSafe: "May cause irregular bleeding"
    },
    "i-pill": {
        effects: ["Nausea", "Vomiting", "Abdominal pain", "Fatigue"],
        ageLimit: "Adults only",
        pregnancySafe: "N/A (Emergency Contraceptive)",
        menstruationSafe: "May cause spotting/irregularity"
    }
};

const Floating3DIcon = ({ Icon, className, delay = 0, duration = 20, size = 40 }: { Icon: any, className: string, delay?: number, duration?: number, size?: number }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0, 0.15, 0.1],
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotateX: [0, 25, 0],
            rotateY: [0, 25, 0],
            rotateZ: [0, 15, 0],
            scale: [1, 1.15, 1],
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className={`absolute pointer-events-none blur-[1px] dark:blur-[2px] ${className}`}
        style={{ width: size, height: size }}
    >
        <Icon className="w-full h-full text-indigo-400 dark:text-indigo-600" />
    </motion.div>
);

const MedicineSideEffects = ({ onBack }: { onBack: () => void }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<MedicineInfo | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Parallax effects for high-end feel
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 5]);

    const fetchFromFDA = async (medName: string) => {
        try {
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${medName}"+OR+openfda.generic_name:"${medName}"&limit=1`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const drug = data.results[0];

                // Extract Side Effects (Adverse Reactions)
                let effectsList = ["Consult Doctor"];
                if (drug.adverse_reactions) {
                    const text = drug.adverse_reactions[0];
                    effectsList = text.split('. ').slice(0, 5).map(s => s.replace(/\./g, ''));
                } else if (drug.warnings) {
                    effectsList = drug.warnings[0].split('. ').slice(0, 3);
                }

                return {
                    effects: effectsList.slice(0, 6),
                    ageLimit: drug.pediatric_use ? "Check Pediatric Use section / Consult Doctor" : "Consult Doctor",
                    pregnancySafe: drug.pregnancy ? "Refer to Pregnancy section / Consult Doctor" : "Consult Doctor",
                    menstruationSafe: "Consult Doctor (No specific FDA data)"
                };
            }
            return null;
        } catch (err) {
            console.error("FDA API Error", err);
            return null;
        }
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setResult(null);
        setError('');

        const key = query.toLowerCase().trim();

        // 1. Try Local DB
        let info = MEDICINE_DB[key];
        if (!info) {
            const foundKey = Object.keys(MEDICINE_DB).find(k => k === key || k.includes(key) || key.includes(k));
            if (foundKey) {
                info = MEDICINE_DB[foundKey];
            }
        }

        if (info) {
            setResult(info);
            setLoading(false);
            return;
        }

        // 2. Try FDA API
        const apiResult = await fetchFromFDA(key);
        if (apiResult) {
            setResult(apiResult);
        } else {
            setError(`We couldn't find precise data for "${query}". It might be a local brand name. Try searching for the 'Generic Name' (salt) printed on the strip.`);
        }
        setLoading(false);
    };

    const getSafetyIcon = (text: string) => {
        if (!text) return <Info className="w-6 h-6 text-slate-400" />;
        const t = text.toLowerCase();
        if (t.includes('avoid') || t.includes('unsafe') || t.includes('risk') || t.includes('contraindicated')) return <ShieldAlert className="w-6 h-6 text-rose-500" />;
        if (t.includes('consult') || t.includes('caution') || t.includes('refer') || t.includes('check')) return <AlertTriangle className="w-6 h-6 text-amber-500" />;
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
    };

    const getSafetyColor = (text: string) => {
        const t = text.toLowerCase();
        if (t.includes('avoid') || t.includes('unsafe') || t.includes('risk')) return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800';
        if (t.includes('consult') || t.includes('caution')) return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center relative overflow-hidden bg-white dark:bg-[#020617] font-sans selection:bg-indigo-500/30">
            {/* National Level 3D Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1200px]">
                {/* 3D Medical Nebula */}
                <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-500/5 rounded-full blur-[140px]" />
                <motion.div style={{ y: y2 }} className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-fuchsia-500/5 rounded-full blur-[140px]" />

                {/* Floating 3D Icons */}
                <Floating3DIcon Icon={Pill} className="top-[15%] left-[5%]" size={80} delay={0} duration={25} />
                <Floating3DIcon Icon={Dna} className="top-[40%] right-[10%]" size={120} delay={2} duration={30} />
                <Floating3DIcon Icon={Microscope} className="bottom-[20%] left-[10%]" size={100} delay={5} duration={35} />
                <Floating3DIcon Icon={Heart} className="top-[60%] right-[5%]" size={60} delay={8} duration={22} />
                <Floating3DIcon Icon={Stethoscope} className="top-[10%] right-[20%]" size={70} delay={4} duration={28} />
                <Floating3DIcon Icon={Activity} className="bottom-[10%] right-[30%]" size={90} delay={7} duration={32} />

                {/* Animated Grid Lines for 3D depth */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl z-10 relative"
            >
                {/* Navbar */}
                <div className="flex justify-between items-center mb-12">
                    <button
                        onClick={onBack}
                        className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-black transition-all bg-white/50 dark:bg-slate-900/50 px-6 py-3 rounded-2xl backdrop-blur-xl shadow-sm hover:shadow-xl border border-white/40 dark:border-slate-800/50 ring-1 ring-black/5"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Explore
                    </button>
                    <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-800/30 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        National Safety Database V.4.0
                    </div>
                </div>

                {/* Hero Search Section */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="inline-flex items-center justify-center p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-[3rem] mb-10 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.15)] border border-white/50 dark:border-slate-700 relative group"
                    >
                        <Pill className="w-20 h-20 text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
                        <div className="absolute -inset-4 bg-indigo-500/5 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>

                    <motion.h1
                        style={{ rotateX: rotate }}
                        className="text-6xl md:text-8xl font-[1000] text-slate-950 dark:text-white mb-8 tracking-[-0.04em] leading-[0.9]"
                    >
                        Know Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 animate-gradient-x drop-shadow-sm">Medicine.</span>
                    </motion.h1>

                    <div className="max-w-3xl mx-auto relative px-4">
                        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative flex items-center bg-white/70 dark:bg-slate-900/80 p-2 rounded-[2.2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl border border-white dark:border-slate-800">
                            <div className="pl-6 text-slate-400">
                                <Search className="w-7 h-7" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Search generic or brand name..."
                                className="w-full py-7 px-4 bg-transparent outline-none text-2xl font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-slate-900 dark:bg-indigo-600 text-white px-12 py-6 rounded-[1.8rem] font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-indigo-500/25 flex items-center gap-3"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Scanning...' : 'Verify'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <AnimatePresence mode='wait'>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/50 rounded-3xl flex items-center gap-6 max-w-2xl mx-auto"
                        >
                            <div className="bg-red-100 dark:bg-red-800/20 p-4 rounded-2xl text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-1">Search Failed</h3>
                                <p className="text-red-600/80 dark:text-red-400/80 font-medium">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                        >
                            {/* Medicine Header Card */}
                            <div className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div>
                                        <div className="text-indigo-500 font-bold tracking-widest uppercase text-xs mb-2">Analysis Report</div>
                                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white capitalize mb-4">{query}</h2>
                                        <div className="flex gap-3 flex-wrap">
                                            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">Rx Drug</span>
                                            <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">FDA Database</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/10 px-6 py-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                                        <ShieldCheck className="w-10 h-10 text-emerald-500" />
                                        <div>
                                            <div className="text-xs font-bold text-emerald-600/60 uppercase tracking-wider">Safety Score</div>
                                            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">Verified</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Safety Cards - Stacked Grid */}
                            <motion.div
                                className="lg:col-span-4 space-y-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Age */}
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg relative overflow-hidden group hover:border-blue-200 transition-colors">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                        <Baby className="w-24 h-24 text-blue-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Baby className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Age Limit</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{result.ageLimit}</p>
                                    </div>
                                </div>

                                {/* Pregnancy */}
                                <div className={`p-8 rounded-[2rem] border shadow-lg relative overflow-hidden group transition-colors ${getSafetyColor(result.pregnancySafe)} border-opacity-50`}>
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                        <Baby className="w-24 h-24" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center mb-6">
                                            {getSafetyIcon(result.pregnancySafe)}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Pregnancy</h3>
                                        <p className="font-medium leading-relaxed opacity-90">{result.pregnancySafe}</p>
                                    </div>
                                </div>

                                {/* Menstruation */}
                                <div className={`p-8 rounded-[2rem] border shadow-lg relative overflow-hidden group transition-colors bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800`}>
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                        <Activity className="w-24 h-24 text-rose-500" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Menstruation</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{result.menstruationSafe}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Side Effects - Main Content */}
                            <motion.div
                                className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
                                        <ShieldAlert className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Side Effects Panel</h3>
                                        <p className="text-slate-500 font-medium">Potential adverse reactions and warnings</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.effects.map((effect, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 hover:border-indigo-100 transition-all cursor-default"
                                        >
                                            <div className="w-2 h-2 mt-2.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors shrink-0" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed group-hover:text-indigo-900 dark:group-hover:text-indigo-200 transition-colors">
                                                {effect}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-start gap-4 opacity-60">
                                    <Info className="w-5 h-5 flex-shrink-0 mt-1" />
                                    <p className="text-sm font-medium leading-relaxed">
                                        Disclaimer: This AI-generated report consolidates data from openFDA and clinical databases. It is not a substitute for professional medical advice.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default MedicineSideEffects;
