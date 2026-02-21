import React from 'react';
import { History, CheckCircle2, UserCheck, LayoutList } from 'lucide-react';

interface DecisionData {
    primaryDecision: { plan: string; doctorName: string; timestamp: string };
    specialistResponse?: { plan: string; specialistName: string; timestamp: string };
    finalPlan?: string;
    auditLog: Array<{ action: string; by: string; timestamp: string; details: string }>;
}

const UnifiedDecisionRecord: React.FC<{ data: DecisionData }> = ({ data }) => {
    return (
        <div className="bg-white dark:bg-slate-900/50 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-12">
            <header className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-2xl text-white">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Unified Decision Record</h3>
                    <p className="text-xs text-slate-500 font-bold">Consolidated Clinical Consensus</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Primary Decision */}
                <section className="space-y-6">
                    <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <UserCheck className="w-4 h-4 text-indigo-500" /> Primary Decision
                    </h4>
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                            {data.primaryDecision.plan}
                        </p>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                            <span className="text-[9px] font-black uppercase text-slate-400">{data.primaryDecision.doctorName}</span>
                            <span className="text-[9px] font-black uppercase text-slate-400">{data.primaryDecision.timestamp}</span>
                        </div>
                    </div>
                </section>

                {/* Specialist Response */}
                <section className="space-y-6">
                    <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <History className="w-4 h-4 text-sky-500" /> Specialist Response
                    </h4>
                    {data.specialistResponse ? (
                        <div className="p-8 bg-sky-50/50 dark:bg-sky-900/10 rounded-3xl border border-sky-100 dark:border-sky-900/20">
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                {data.specialistResponse.plan}
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-sky-200 dark:border-sky-900/30">
                                <span className="text-[9px] font-black uppercase text-sky-600">{data.specialistResponse.specialistName}</span>
                                <span className="text-[9px] font-black uppercase text-sky-400">{data.specialistResponse.timestamp}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Awaiting Specialist Validation...</span>
                        </div>
                    )}
                </section>
            </div>

            {/* Final Merged Plan */}
            {data.finalPlan && (
                <section className="space-y-6">
                    <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <LayoutList className="w-4 h-4 text-emerald-500" /> Final Integrated Protocol
                    </h4>
                    <div className="p-10 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[3rem]">
                        <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed italic">
                            "{data.finalPlan}"
                        </p>
                    </div>
                </section>
            )}

            {/* Audit Log */}
            <section className="space-y-6 pt-10 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Audit Log (Blockchain Verified)</h4>
                <div className="space-y-4">
                    {data.auditLog.map((log, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5" />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white">{log.action}</span>
                                    <span className="text-[10px] font-black text-slate-400">{log.timestamp}</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{log.details} • By {log.by}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UnifiedDecisionRecord;
