import React from 'react';
import { Award, Target, Zap, Clock, ShieldCheck } from 'lucide-react';

interface PerformanceData {
    name: string;
    qualification: string;
    assignedFacility: string;
    casesHandled: number;
    escalationCount: number;
    averageResponseTime: number; // in mins
}

const DoctorPerformance: React.FC<{ data: PerformanceData }> = ({ data }) => {
    return (
        <div className="bg-white dark:bg-slate-900/50 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-10">
            <header className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl">
                    <Award className="w-10 h-10" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{data.name}</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{data.qualification}</span>
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.assignedFacility}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Clinical Throughput', value: data.casesHandled, sub: 'Total Cases', icon: Target, color: 'indigo' },
                    { label: 'Escalation Rate', value: `${((data.escalationCount / data.casesHandled) * 100).toFixed(1)}%`, sub: `${data.escalationCount} Escalations`, icon: Zap, color: 'emerald' },
                    { label: 'Responsiveness', value: `${data.averageResponseTime}m`, sub: 'Avg Service Time', icon: Clock, color: 'sky' },
                    { label: 'Validation Sync', value: '100%', sub: 'Trust Index', icon: ShieldCheck, color: 'amber' }
                ].map((stat, i) => (
                    <div key={i} className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div className={`p-3 bg-${stat.color}-500/10 text-${stat.color}-600 rounded-xl w-fit mb-6`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tighter">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorPerformance;
