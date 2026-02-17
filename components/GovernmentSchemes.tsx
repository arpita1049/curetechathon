import React, { useState } from 'react';
import {
    ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Info, Landmark,
    FileText, HelpCircle, MapPin, Search, ChevronRight, UserCheck,
    Wallet, Stethoscope, Baby, Users, ExternalLink, Download,
    Lightbulb, HelpCircle as FAQIcon, CheckSquare, ArrowRight, Play, Share2, Plus,
    Building2, GraduationCap, Heart, Globe, Flag, Shield, Award, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Scheme {
    id: string;
    name: string;
    year: string;
    category: 'Insurance' | 'Maternal' | 'General' | 'Tertiary';
    objective: string;
    beneficiaries: string;
    benefits: string[];
    documents: string[];
    applicationSteps: string[];
    isCashless: boolean;
    coverage: string;
    officialUrl?: string;
}

const SCHEMES: Scheme[] = [
    {
        id: 'pmjay',
        name: 'Ayushman Bharat (PM-JAY)',
        year: '2018',
        category: 'Insurance',
        objective: 'Provides a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.',
        beneficiaries: 'Poor and vulnerable families identified by SECC 2011 data.',
        benefits: [
            'Cashless treatment at empaneled hospitals',
            'Coverage for 1,393 medical procedures',
            'No restriction on family size, age or gender',
            'Pre and post-hospitalization expenses covered',
            'Includes free medicines and diagnostics'
        ],
        documents: ['Aadhaar Card', 'Ration Card (PM-Letter)', 'Active Mobile Number', 'Income Certificate'],
        applicationSteps: [
            'Check eligibility on official portal or app',
            'Visit the nearest PMJAY empaneled hospital',
            'Meet Ayushman Mitra for identity verification',
            'Get e-card after documentation',
            'Avail cashless treatment'
        ],
        isCashless: true,
        coverage: '₹5,00,000 / family'
    },
    {
        id: 'jsy',
        name: 'Janani Suraksha Yojana (JSY)',
        year: '2005',
        category: 'Maternal',
        objective: 'Safe motherhood intervention under the National Health Mission (NHM) to reduce maternal and neonatal mortality.',
        beneficiaries: 'Pregnant women from BPL families, families with lower income status.',
        benefits: [
            'Cash assistance for institutional delivery (₹1400 in rural / ₹1000 in urban areas)',
            'Free transport via Janani Shishu Suraksha Karyakram (JSSK)',
            'Post-natal care and child immunization services',
            'Cash incentives for ASHA workers supporting the delivery'
        ],
        documents: ['Aadhaar Card', 'BPL Card', 'MCP Card Registration', 'Active Bank Account for DBT'],
        applicationSteps: [
            'Register pregnancy at nearest Sub-centre/PHC/CHC',
            'Obtain MCP card (Mother and Child Protection)',
            'Undergo at least 3 antenatal checkups',
            'Deliver in a public health facility',
            'Receive cash incentive via Direct Benefit Transfer'
        ],
        isCashless: true,
        coverage: 'Incentive + Free Delivery'
    },
    {
        id: 'rsby',
        name: 'Rashtriya Swasthya Bima Yojana',
        year: '2008',
        category: 'Insurance',
        objective: 'Health insurance scheme for the Unorganized Sector workers belonging to BPL category.',
        beneficiaries: 'BPL workers and their families (unit of five) across various sectors.',
        benefits: [
            'Hospitalization coverage up to ₹30,000',
            'Cashless service through smart card',
            'Transportation expenses (₹100/visit, max ₹1000/year)',
            'All pre-existing conditions covered from day one'
        ],
        documents: ['BPL Certificate', 'Ration Card', 'Family Head Photograph', 'Identity Proof'],
        applicationSteps: [
            'Check list of eligible families at local Panchayat/Urban body',
            'Enroll at designated centers during registration camps',
            'Pay ₹30 registration fee',
            'Get biometric smart card instantly'
        ],
        isCashless: true,
        coverage: '₹30,000 / family'
    },
    {
        id: 'pmssy',
        name: 'PM Swasthya Suraksha Yojana',
        year: '2003',
        category: 'Tertiary',
        objective: 'Correcting regional imbalances in the availability of affordable/reliable tertiary healthcare services.',
        beneficiaries: 'General public across underserved states.',
        benefits: [
            'Establishment of AIIMS-like institutions',
            'Upgradation of government medical colleges',
            'Advanced diagnostic and surgical facilities at subsidised rates',
            'Specialized treatment for chronic diseases'
        ],
        documents: ['Aadhaar Card', 'Reference from District Hospital', 'Proof of Residence'],
        applicationSteps: [
            'Visit local PHC/District hospital for primary diagnosis',
            'Get referral for tertiary care at PMSSY upgraded facility',
            'Present referral and ID at the institution',
            'Avail specialized treatment at government rates'
        ],
        isCashless: false,
        coverage: 'Subsidised Tertiary Care'
    },
    {
        id: 'nhm',
        name: 'National Health Mission (NHM)',
        year: '2013',
        category: 'General',
        objective: 'Subsumes NRHM and NUHM to provide equitable, affordable and quality health care services to the population.',
        beneficiaries: 'All citizens, focusing on rural and urban poor, women, and children.',
        benefits: [
            'Free Drugs and Free Diagnostics Service Initiatives',
            'Mobile Medical Units (MMUs) in remote areas',
            'National Quality Assurance Standards (NQAS) for clinics',
            'Support for reproductive, maternal, newborn, child and adolescent health (RMNCH+A)'
        ],
        documents: ['Aadhaar Card', 'Ration Card', 'Registration at Public Health Facility'],
        applicationSteps: [
            'Visit any public health facility (PHC/CHC/District Hospital)',
            'Register yourself at the OPD counter',
            'Consult doctor for free check-up',
            'Avail free medicines or diagnostic services as per entitlement'
        ],
        isCashless: true,
        coverage: 'Free Public Services'
    }
];

const GovernmentSchemes: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
    const [eligibilityData, setEligibilityData] = useState({
        age: '',
        income: '',
        isBPL: false,
        isRural: true,
        category: 'general'
    });
    const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
    const [searching, setSearching] = useState(false);

    const checkEligibility = () => {
        setSearching(true);
        setTimeout(() => {
            const eligible = SCHEMES.filter(s => {
                if (eligibilityData.isBPL) return true;
                if (eligibilityData.category === 'pregnant' && s.id === 'jsy') return true;
                if (eligibilityData.income && parseInt(eligibilityData.income) < 150000) return true;
                return false;
            });
            setEligibleSchemes(eligible);
            setSearching(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen pb-32 pt-24 bg-white dark:bg-slate-950 font-sans transition-colors duration-500">
            <div className="container mx-auto px-6 max-w-7xl relative">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 animate-slide-up">
                    <div className="space-y-6">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 font-black uppercase tracking-widest text-xs transition-all"
                        >
                            <div className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Back to Services
                        </button>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            National <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500">Beneficiary Hub</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl leading-relaxed">
                            A unified port of entry for all central and state healthcare schemes.
                            Transparency, dignity, and digital access for every Indian citizen.
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl flex items-center gap-6">
                            <div className="p-4 bg-amber-500 rounded-3xl shadow-xl shadow-amber-500/20">
                                <Flag className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Government of India</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">Official Portal</p>
                                <div className="flex gap-2 mt-3">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span className="w-2 h-2 bg-white border border-slate-200 rounded-full"></span>
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Side Panel: Eligibility */}
                    <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
                        <section className="bg-white dark:bg-slate-900/50 backdrop-blur-3xl p-10 rounded-[4rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full -translate-y-12 translate-x-12"></div>

                            <div className="relative z-10 space-y-10">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <UserCheck className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Smart Match</h2>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Eligibility Engine</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 group-focus-within:text-indigo-600 transition-colors">Age Identity</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={eligibilityData.age}
                                                onChange={(e) => setEligibilityData({ ...eligibilityData, age: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 rounded-3xl p-6 font-black outline-none transition-all placeholder:text-slate-300"
                                                placeholder="e.g. 28"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">Years</div>
                                        </div>
                                    </div>

                                    <div className="group space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2 group-focus-within:text-indigo-600 transition-colors">Household Income (Per Year)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={eligibilityData.income}
                                                onChange={(e) => setEligibilityData({ ...eligibilityData, income: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 rounded-3xl p-6 font-black outline-none transition-all placeholder:text-slate-300"
                                                placeholder="e.g. 80000"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-indigo-600">INR</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setEligibilityData({ ...eligibilityData, isBPL: !eligibilityData.isBPL })}
                                            className={`h-24 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${eligibilityData.isBPL ? 'bg-amber-500 border-amber-500 shadow-xl shadow-amber-500/20 text-white' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-400 hover:border-slate-200'}`}
                                        >
                                            <Landmark className={`w-6 h-6 ${eligibilityData.isBPL ? 'text-white' : 'text-slate-300'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">BPL Card</span>
                                        </button>
                                        <button
                                            onClick={() => setEligibilityData({ ...eligibilityData, isRural: !eligibilityData.isRural })}
                                            className={`h-24 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${eligibilityData.isRural ? 'bg-emerald-600 border-emerald-600 shadow-xl shadow-emerald-500/20 text-white' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-400 hover:border-slate-200'}`}
                                        >
                                            <Globe className={`w-6 h-6 ${eligibilityData.isRural ? 'text-white' : 'text-slate-300'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Rural</span>
                                        </button>
                                    </div>

                                    <div className="group space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Vulnerability Category</label>
                                        <select
                                            value={eligibilityData.category}
                                            onChange={(e) => setEligibilityData({ ...eligibilityData, category: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 rounded-3xl p-6 font-black outline-none appearance-none transition-all cursor-pointer"
                                        >
                                            <option value="general">Regular Citizen</option>
                                            <option value="pregnant">Maternal Support</option>
                                            <option value="senior">Senior Citizen</option>
                                            <option value="worker">Unorganized Worker</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={checkEligibility}
                                    disabled={searching}
                                    className="group relative w-full h-20 bg-slate-900 dark:bg-white overflow-hidden rounded-[2rem] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <div className="relative z-10 flex items-center justify-center gap-4 text-white dark:text-slate-900 group-hover:text-white font-black uppercase tracking-[0.2em] text-sm">
                                        {searching ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                <Search className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <>Find My Benefits <ArrowRight className="w-5 h-5" /></>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* Myth Buster */}
                        <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-indigo-700 to-violet-900 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <Award className="w-14 h-14 text-amber-300" />
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black tracking-tight leading-none">Zero Cost. <br />Maximum Dignity.</h3>
                                <p className="text-indigo-100 font-bold leading-relaxed opacity-80">
                                    All listed schemes are <span className="text-white">Direct-to-Citizen</span>.
                                    Do not pay any middlemen for enrollment. Report fraud to the national helpline immediately.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Official Helpline</span>
                                <span className="text-xl font-black">104 / 14555</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-16 animate-slide-up [animation-delay:200ms]">
                        {/* Results / Featured Area */}
                        <AnimatePresence mode="wait">
                            {eligibleSchemes.length > 0 ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-end justify-between px-4">
                                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                            Tailored For You <br />
                                            <span className="text-lg font-bold text-emerald-500 uppercase tracking-widest">Available Matches ({eligibleSchemes.length})</span>
                                        </h3>
                                        <button onClick={() => setEligibleSchemes([])} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Clear Search</button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {eligibleSchemes.map((s, idx) => (
                                            <SchemeCard
                                                key={s.id}
                                                scheme={s}
                                                idx={idx}
                                                isActive={selectedScheme?.id === s.id}
                                                onSelect={() => setSelectedScheme(s)}
                                                featured
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="featured"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center justify-between px-4">
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">National Portfolio</h3>
                                        <div className="flex gap-2">
                                            {['Insurance', 'Maternal', 'General'].map(cat => (
                                                <span key={cat} className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{cat}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {SCHEMES.map((s, idx) => (
                                            <SchemeCard
                                                key={s.id}
                                                scheme={s}
                                                idx={idx}
                                                isActive={selectedScheme?.id === s.id}
                                                onSelect={() => setSelectedScheme(s)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Detailed Expanded View */}
                        <AnimatePresence>
                            {selectedScheme && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98, y: 40 }}
                                    className="relative bg-white dark:bg-slate-900 rounded-[5rem] border-4 border-indigo-500/10 dark:border-white/5 p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
                                >
                                    {/* Close Button Inside */}
                                    <button
                                        onClick={() => setSelectedScheme(null)}
                                        className="absolute top-12 right-12 w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all z-20"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <div className="relative z-10 space-y-16">
                                        {/* Header Info */}
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-slate-100 dark:border-slate-800 pb-16">
                                            <div className="space-y-6 flex-1">
                                                <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
                                                    <Shield className="w-4 h-4" /> Comprehensive Protection
                                                </div>
                                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{selectedScheme.name}</h2>
                                                <p className="text-2xl text-slate-500 font-bold max-w-2xl">{selectedScheme.objective}</p>
                                            </div>
                                            <div className="group w-full md:w-80 bg-slate-900 dark:bg-white p-10 rounded-[3.5rem] text-center shadow-2xl-indigo">
                                                <Wallet className="w-12 h-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-2">Max Allotment</p>
                                                <p className="text-3xl font-black text-white dark:text-slate-900 tracking-tighter">{selectedScheme.coverage}</p>
                                            </div>
                                        </div>

                                        {/* Benefits & Documents Columns */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                            <div className="space-y-10">
                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
                                                    Coverage Benefits
                                                </h4>
                                                <div className="space-y-4">
                                                    {selectedScheme.benefits.map((b, i) => (
                                                        <div key={i} className="flex gap-5 p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-transparent hover:border-emerald-500/20 transition-all group">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-snug">{b}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-10">
                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center"><FileText className="w-6 h-6" /></div>
                                                    Verification Protocol
                                                </h4>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {selectedScheme.documents.map((d, i) => (
                                                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all group cursor-pointer">
                                                            <div>
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Standard MDM</p>
                                                                <span className="text-lg font-black text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{d}</span>
                                                            </div>
                                                            <div className="w-10 h-10 rounded-xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all">
                                                                <CheckSquare className="w-6 h-6" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Application Path */}
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-16 rounded-[4rem] space-y-12">
                                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                                <div>
                                                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Digital Application Journey</h4>
                                                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Follow these steps carefully for 100% processing rate</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div> Live Support Available
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
                                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 hidden lg:block -z-10"></div>
                                                {selectedScheme.applicationSteps.map((step, i) => (
                                                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:-translate-y-2 transition-transform h-full flex flex-col items-center text-center">
                                                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-indigo-500/20">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-8 pt-8">
                                                <button className="flex-1 h-24 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 shadow-2xl shadow-indigo-600/30 active:scale-95 transition-all">
                                                    <ExternalLink className="w-6 h-6" /> Visit Official Web Portal
                                                </button>
                                                <button className="flex-1 h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                                    <Download className="w-6 h-6" /> Download PDF Manual
                                                </button>
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="pt-16 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8">
                                            {[
                                                { t: "Enrollment Maps", i: <MapPin className="w-8 h-8" />, c: "amber" },
                                                { t: "Empaneled List", i: <Building2 className="w-8 h-8" />, c: "sky" },
                                                { t: "Grievance Portal", i: <FAQIcon className="w-8 h-8" />, c: "rose" },
                                                { t: "Share Link", i: <Share2 className="w-8 h-8" />, c: "emerald" }
                                            ].map((btn, i) => (
                                                <button key={i} className="group flex flex-col items-center gap-4">
                                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:-translate-y-3 group-hover:shadow-2xl">
                                                        {btn.i}
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.2em] group-hover:text-indigo-600 transition-colors">{btn.t}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* FAQs Section */}
                        <div className="space-y-12 bg-white dark:bg-slate-900 p-16 rounded-[5rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
                            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]"></div>

                            <div className="relative z-10 space-y-12">
                                <div className="text-center space-y-4">
                                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                                        Support & Information
                                    </h3>
                                    <div className="w-24 h-2 bg-indigo-600 rounded-full mx-auto"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { q: "Is it completely free?", a: "Most schemes like PMJAY offer 100% cashless and paperless treatment for eligible beneficiaries in empaneled hospitals." },
                                        { q: "Private hospital coverage?", a: "Yes, once a hospital (public or private) is empaneled under the scheme, you can avail services for free." },
                                        { q: "Rural area applications?", a: "Absolutely! Rural families are priority. Enrollment often happens at localized camps or CSCs." },
                                        { q: "Identity issues?", a: "While Aadhaar is preferred, alternative identity documents like Ration Card/Voter ID are accepted for initial verification." }
                                    ].map((faq, i) => (
                                        <div key={i} className="p-8 rounded-[3rem] bg-slate-50 dark:bg-slate-800/20 border-2 border-transparent hover:border-indigo-500/20 transition-all group cursor-help">
                                            <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-start gap-4 mb-4">
                                                <HelpCircle className="w-6 h-6 shrink-0 mt-0.5 opacity-30" />
                                                {faq.q}
                                            </h4>
                                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed pl-10">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Component ---
const SchemeCard = ({ scheme, idx, isActive, onSelect, featured = false }: { scheme: Scheme, idx: number, isActive: boolean, onSelect: () => void, featured?: boolean }) => {
    const isInsurance = scheme.category === 'Insurance';
    const accentType = isInsurance ? 'indigo' : scheme.category === 'Maternal' ? 'rose' : 'amber';

    const colorClasses = {
        indigo: {
            border: 'border-indigo-500',
            ring: 'ring-indigo-500/10',
            text: 'text-indigo-600',
            bg: 'bg-indigo-500',
            shadow: 'shadow-indigo-500/30'
        },
        rose: {
            border: 'border-rose-500',
            ring: 'ring-rose-500/10',
            text: 'text-rose-600',
            bg: 'bg-rose-500',
            shadow: 'shadow-rose-500/30'
        },
        amber: {
            border: 'border-amber-500',
            ring: 'ring-amber-500/10',
            text: 'text-amber-600',
            bg: 'bg-amber-500',
            shadow: 'shadow-amber-500/30'
        }
    }[accentType];

    const iconBg = isInsurance ? 'bg-indigo-600' : scheme.category === 'Maternal' ? 'bg-rose-500' : 'bg-amber-500';

    return (
        <motion.button
            key={scheme.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={`group w-full p-10 rounded-[4rem] bg-white dark:bg-slate-900 border-2 transition-all text-left overflow-hidden relative shadow-sm hover:shadow-2xl ${isActive ? `${colorClasses.border} ring-4 ${colorClasses.ring}` : 'border-slate-100 dark:border-slate-800'}`}
        >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${accentType === 'indigo' ? 'bg-indigo-500/5' : accentType === 'rose' ? 'bg-rose-500/5' : 'bg-amber-500/5'} group-hover:scale-150 transition-transform duration-700 rounded-bl-full`}></div>

            <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div className={`w-16 h-16 rounded-3xl ${iconBg} shadow-xl flex items-center justify-center text-white`}>
                        {isInsurance ? <ShieldCheck className="w-8 h-8" /> : scheme.category === 'Maternal' ? <Baby className="w-8 h-8" /> : <Landmark className="w-8 h-8" />}
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Inception</span>
                        <p className="text-xl font-black text-slate-900 dark:text-white leading-none">{scheme.year}</p>
                    </div>
                </div>

                <div className="space-y-4 mb-10 min-h-[140px]">
                    <span className={`inline-block text-[10px] font-black uppercase tracking-widest ${colorClasses.text} underline underline-offset-4 decoration-2`}>{scheme.category}</span>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white leading-tight break-words">{scheme.name}</h4>
                    <p className="text-base font-bold text-slate-500 line-clamp-2 leading-relaxed">{scheme.objective}</p>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Benefit Scale</span>
                        <span className="text-lg font-black text-emerald-600 tracking-tight">{scheme.coverage}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                        <ArrowUpRightIcon />
                    </div>
                </div>
            </div>
        </motion.button>
    );
};

const ArrowUpRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);

export default GovernmentSchemes;
