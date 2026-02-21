import React, { useState } from 'react';
import { Brain, AlertCircle, TestTube, Pill, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportData {
    diagnoses: Array<{ name: string; confidence: number; why: string }>;
    redFlags: string[];
    suggestedTests: string[];
    drugPrecautions: string[];
}

const ClinicalDecisionSupport: React.FC<{ data: SupportData }> = ({ data }) => {
    const [expandedWhy, setExpandedWhy] = useState<number | null>(null);

    return (
        <div className="bg-white dark:bg-slate-900/50 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-10">
            <header className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-2xl text-white">
                    <Brain className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Clinical Decision Support</h3>
                    <p className="text-xs text-slate-500 font-bold">Augmented Intelligence Insights</p>
                </div>
            </header>

            {/* Top Diagnoses */}
            <section className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-indigo-600 pl-4">Probable Diagnoses</h4>
                <div className="space-y-4">
                    {data.diagnoses.map((diag, i) => (
                        <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-black text-slate-800 dark:text-slate-200">{diag.name}</span>
                                <span className="text-sm font-black text-indigo-600">{diag.confidence}% Confidence</span>
                            </div>
                            <button
                                onClick={() => setExpandedWhy(expandedWhy === i ? null : i)}
                                className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase hover:text-indigo-600 transition-colors"
                            >
                                {expandedWhy === i ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                Why suggested?
                            </button>
                            <AnimatePresence>
                                {expandedWhy === i && (
                                    <motion.p
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 leading-relaxed overflow-hidden"
                                    >
                                        {diag.why}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Red Flags */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black text-rose-500 uppercase tracking-widest">
                        <AlertCircle className="w-4 h-4" /> Red Flags
                    </h4>
                    <div className="space-y-2">
                        {data.redFlags.map((flag, i) => (
                            <div key={i} className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400">
                                {flag}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Suggested Tests */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black text-sky-500 uppercase tracking-widest">
                        <TestTube className="w-4 h-4" /> Suggested Tests
                    </h4>
                    <div className="space-y-2">
                        {data.suggestedTests.map((test, i) => (
                            <div key={i} className="p-4 bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/30 rounded-xl text-xs font-bold text-sky-600 dark:text-sky-400">
                                {test}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Drug Precautions */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest">
                        <Pill className="w-4 h-4" /> Drug Precautions
                    </h4>
                    <div className="space-y-2">
                        {data.drugPrecautions.map((p, i) => (
                            <div key={i} className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400">
                                {p}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClinicalDecisionSupport;
