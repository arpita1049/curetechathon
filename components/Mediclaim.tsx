import React, { useState, useEffect } from 'react';
import {
    Shield, CheckCircle2, AlertCircle, Info, Landmark,
    FileText, HelpCircle, MapPin, Search, ChevronRight,
    Wallet, Stethoscope, Baby, Users, ExternalLink, Download,
    Plus, Building2, Heart, ShieldAlert, BadgeCheck,
    CreditCard, Receipt, ClipboardList, TrendingUp, ArrowRight, ArrowLeft, X,
    Sparkles, Zap, ShieldCheck, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Mediclaim: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [estimator, setEstimator] = useState({
        age: '25',
        members: '1',
        city: 'metro',
        diseases: [] as string[]
    });
    const [showResult, setShowResult] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

    const toggleDoc = (doc: string) => {
        setUploadedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
    };

    const calculatePremium = () => {
        setShowResult(true);
    };

    // Stagger container for animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    return (
        <div className="min-h-screen pb-32 pt-24 bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-500 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative">
                {/* Modern Navigation Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between mb-16"
                >
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-4 text-slate-500 hover:text-sky-600 font-bold uppercase tracking-widest text-[10px] transition-all bg-white dark:bg-slate-900 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </button>
                    <div className="flex items-center gap-2 px-6 py-3 bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20 rounded-full">
                        <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-300">Verified Advisory</span>
                    </div>
                </motion.div>

                {/* Main Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <h1 className="text-7xl lg:text-[8.5rem] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] mb-8">
                                Secure <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-500">Your Future</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl leading-relaxed">
                                Experience the next generation of healthcare protection. We've simplified mediclaim to be as intuitive as your health should be.
                            </p>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 flex items-end justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative w-full p-8 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-colors"></div>
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Adoption</span>
                                </div>
                                <div className="text-4xl font-black text-slate-900 dark:text-white leading-none">12.4K+</div>
                                <div className="text-xs font-bold text-slate-500">Policies generated today across Pan-India network.</div>
                                <div className="flex -space-x-3 mt-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden shadow-lg">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">+8k</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Education & Processes */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-8 space-y-20"
                    >
                        {/* Interactive What is Mediclaim Section */}
                        <motion.section variants={itemVariants} className="relative">
                            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 rounded-full blur-[60px] translate-x-12 -translate-y-12"></div>
                                <div className="relative space-y-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-sky-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                            <Shield className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Mediclaim Unveiled</h2>
                                            <p className="text-sm font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">Essential Financial Guardian</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-sky-500 pl-8">
                                        "Mediclaim isn't just a policy; it's a commitment to your family's peace of mind when life takes an unexpected turn."
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { t: "Individual Plan", d: "Hyper-personalized for singular excellence in health management.", i: <Users />, c: "sky" },
                                            { t: "Family Floater", d: "Unified umbrella protection for your entire core circle.", i: <Heart />, c: "rose" },
                                            { t: "Govt. Schemes", i: <Landmark />, d: "Universal access via National Digital Health ecosystem.", c: "amber" },
                                            { t: "Private Excellence", i: <Sparkles />, d: "Tier-1 access with Zero-Day waiting period options.", c: "indigo" }
                                        ].map((plan, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -8, scale: 1.02 }}
                                                className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[3rem] border border-transparent hover:border-sky-500/20 transition-all flex flex-col gap-6 group/card"
                                            >
                                                <div className={`w-14 h-14 bg-sky-50 dark:bg-sky-900/30 text-sky-600 rounded-2xl flex items-center justify-center group-hover/card:scale-110 transition-transform`}>
                                                    {React.cloneElement(plan.i as React.ReactElement, { className: 'w-7 h-7' })}
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-black text-lg text-slate-900 dark:text-white">{plan.t}</h3>
                                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{plan.d}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Prime Benefits Section */}
                        <motion.section variants={itemVariants} className="space-y-10">
                            <div className="flex items-end justify-between px-6">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Prime Benefits</h3>
                                <button className="text-[10px] font-black uppercase tracking-widest text-sky-600 border-b-2 border-sky-500/20 pb-1">Detailed Analysis</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { t: "Billing Shield", d: "85% reduction in out-of-pocket costs", i: Wallet, c: "sky" },
                                    { t: "Instant Payout", i: CreditCard, d: "Cashless approval in < 90 mins", c: "indigo" },
                                    { t: "Holistic Care", i: Receipt, d: "From OPD to Critical post-care", c: "emerald" },
                                    { t: "24/7 Support", i: ShieldAlert, d: "Global emergency assistance desk", c: "rose" }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="p-10 rounded-[3.5rem] bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl group text-center space-y-6 relative overflow-hidden transition-colors"
                                    >
                                        <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 relative z-10 shadow-lg">
                                            <item.i className="w-10 h-10" />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3 group-hover:text-sky-500 transition-colors">{item.t}</h4>
                                            <p className="text-sm font-black text-slate-900 dark:text-white leading-snug">{item.d}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Interactive Settlement Flow */}
                        <motion.section variants={itemVariants} className="bg-slate-900 dark:bg-black rounded-[5rem] p-16 shadow-3xl relative overflow-hidden border border-white/5">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
                            <div className="relative z-10 flex flex-col items-center gap-16">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sky-400 mb-4">
                                        <Zap className="w-4 h-4 fill-current" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Optimized Settlement</span>
                                    </div>
                                    <h3 className="text-5xl font-black text-white tracking-tight">The Modern Claims Loop</h3>
                                    <p className="text-slate-400 font-bold max-w-xl mx-auto text-lg leading-relaxed">Choose the path that fits your current medical journey. Both engineered for speed.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
                                    <div className="p-10 bg-white/5 rounded-[4rem] border border-white/10 hover:bg-white/[0.07] transition-all group/box shadow-inner">
                                        <div className="w-16 h-16 bg-sky-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-sky-500/20 group-hover/box:rotate-6 transition-transform">
                                            <ShieldCheck className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-3xl font-black text-white mb-4">Elite Cashless</h4>
                                        <p className="text-slate-400 font-bold leading-relaxed mb-6">Zero-paperwork experience at 15,000+ top-tier hospitals across India.</p>
                                        <div className="space-y-6 pt-8 border-t border-white/10">
                                            {["Smart Admission", "Real-time Verification", "Automated Approval"].map((step, idx) => (
                                                <div key={idx} className="flex items-center gap-6 group/item">
                                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-500 font-black text-xs transition-colors group-hover/item:bg-sky-500 group-hover/item:text-white">0{idx + 1}</div>
                                                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest group-hover/item:text-white transition-colors">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-10 bg-white/5 rounded-[4rem] border border-white/10 hover:bg-white/[0.07] transition-all group/box shadow-inner">
                                        <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20 group-hover/box:rotate-6 transition-transform">
                                            <Wallet className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-3xl font-black text-white mb-4">Quick Refund</h4>
                                        <p className="text-slate-400 font-bold leading-relaxed mb-6">Freedom to choose any hospital. Get reimbursed within 48-72 hours.</p>
                                        <div className="space-y-6 pt-8 border-t border-white/10">
                                            {["Scan & Upload Bills", "AI Document Audit", "Direct Bank Transfer"].map((step, idx) => (
                                                <div key={idx} className="flex items-center gap-6 group/item">
                                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-black text-xs transition-colors group-hover/item:bg-emerald-500 group-hover/item:text-white">0{idx + 1}</div>
                                                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest group-hover/item:text-white transition-colors">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Interactive Document Checklist */}
                        <motion.section variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500"></div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
                                        <ClipboardList className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Pre-Claim Audit</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Smart Document Checklist</h3>
                                    <p className="text-slate-500 font-bold mt-2">Ensure 100% claim success rate by verifying these essentials.</p>
                                </div>
                                <div className="text-right hidden md:block">
                                    <div className="text-5xl font-black text-slate-900 dark:text-white">
                                        {Object.values(uploadedDocs).filter(Boolean).length}<span className="text-slate-300 text-3xl">/6</span>
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Ready for Submisson</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'id_proof', label: 'Govt. ID Proof', sub: 'Aadhar / PAN Card / Passport', i: ShieldCheck },
                                    { id: 'doc_report', label: 'Consultation Papers', sub: 'Doctor\'s initial diagnosis report', i: Stethoscope },
                                    { id: 'bills', label: 'Original Bills', sub: 'Pharmacy & Lab (GST Invoice)', i: Receipt },
                                    { id: 'discharge', label: 'Discharge Summary', sub: 'Hospital admission details', i: FileText },
                                    { id: 'policy', label: 'Policy Document', sub: 'Digital or Physical Copy', i: Shield },
                                    { id: 'bank', label: 'Cancelled Cheque', sub: 'For claim reimbursement', i: Landmark }
                                ].map((doc) => (
                                    <motion.button
                                        key={doc.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleDoc(doc.id)}
                                        className={`group p-6 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden ${uploadedDocs[doc.id]
                                            ? 'bg-slate-900 dark:bg-white border-transparent shadow-lg'
                                            : 'bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${uploadedDocs[doc.id]
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-white dark:bg-slate-700 text-slate-400'
                                                    }`}>
                                                    {uploadedDocs[doc.id] ? <CheckCircle2 className="w-6 h-6" /> : <doc.i className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-lg font-black ${uploadedDocs[doc.id] ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'
                                                        }`}>{doc.label}</h4>
                                                    <p className={`text-xs font-bold ${uploadedDocs[doc.id] ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'
                                                        }`}>{doc.sub}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.section>
                    </motion.div>

                    {/* Right Column: Premium Tools */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.section
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="sticky top-32 space-y-12"
                        >
                            {/* AI Premium Estimator Widget */}
                            <div className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-3xl relative overflow-hidden group/est">
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-sky-500/[0.02] to-transparent pointer-events-none"></div>
                                <div className="relative space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-slate-900 dark:bg-sky-600 text-white rounded-[2rem] flex items-center justify-center shadow-xl">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">AI Estimator</h3>
                                            <p className="text-[10px] font-black uppercase text-sky-600 tracking-widest">Real-time Data Visualization</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex justify-between">
                                                Primary User Age
                                                <span className="text-sky-600 font-black bg-sky-500/10 px-3 py-1 rounded-full">{estimator.age}</span>
                                            </label>
                                            <input
                                                type="range"
                                                min="18"
                                                max="80"
                                                value={estimator.age}
                                                onChange={(e) => setEstimator({ ...estimator, age: e.target.value })}
                                                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-600"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Coverage Scope</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['1', '2', '3', '4'].map(val => (
                                                    <button
                                                        key={val}
                                                        onClick={() => setEstimator({ ...estimator, members: val })}
                                                        className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all ${estimator.members === val ? 'bg-sky-500/10 border-sky-600 text-sky-600' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400'}`}
                                                    >
                                                        <Users className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase">{val === '1' ? 'Just Me' : val === '2' ? 'Couple' : 'Family'}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={calculatePremium}
                                            className="w-full h-20 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(14,165,233,0.3)] group/btn relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                                            Generate AI Estimate <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {showResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, y: 10 }}
                                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                className="pt-6 relative z-10"
                                            >
                                                <div className="p-8 bg-sky-600 text-white rounded-[3rem] shadow-2xl space-y-6 overflow-hidden relative">
                                                    <div className="absolute -right-8 -bottom-8 opacity-10">
                                                        <Sparkles className="w-40 h-40" />
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Calculated Premium</p>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-black tracking-tighter">₹{((parseInt(estimator.age) || 20) * 180 * (parseInt(estimator.members) || 1)).toLocaleString()}</span>
                                                        <span className="text-lg font-bold opacity-60">/yr</span>
                                                    </div>
                                                    <div className="pt-4 border-t border-white/20">
                                                        <p className="text-[10px] font-black uppercase opacity-60 mb-1">Suggested Coverage</p>
                                                        <p className="text-xl font-black">₹{estimator.city === 'metro' ? '10' : '5'} Lakhs Protection</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* National Spotlight Spotlight */}
                            <div className="bg-gradient-to-br from-indigo-900 to-violet-950 p-10 rounded-[4rem] text-white space-y-8 shadow-3xl relative overflow-hidden border border-white/10 group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -translate-y-12 translate-x-12 group-hover:bg-sky-500/20 transition-colors"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center mb-4">
                                        <Landmark className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tight underline decoration-sky-500/40 decoration-4 underline-offset-8">Ayushman Bharat</h4>
                                    <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.3em]">National Health Authority</p>
                                    <div className="space-y-4">
                                        <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-300">Family Limit</span>
                                            <span className="text-lg font-black tracking-tight">₹5,00,000 /yr</span>
                                        </div>
                                        <button className="w-full py-6 bg-white text-indigo-900 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-transform shadow-xl">
                                            Enroll Now <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mediclaim;
