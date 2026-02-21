import React, { useState, useEffect } from 'react';
import DoctorPerformance from './medical/DoctorPerformance';
import { motion } from 'framer-motion';

const PerformanceView: React.FC = () => {
    const [performance, setPerformance] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerf = async () => {
            setLoading(true);
            // Simulate API
            await new Promise(r => setTimeout(r, 600));
            setPerformance({
                name: "Dr. Vikram Aditya",
                qualification: "MBBS, MD (Neurology)",
                assignedFacility: "City General Hospital - Node 04",
                casesHandled: 1284,
                escalationCount: 42,
                averageResponseTime: 12
            });
            setLoading(false);
        };
        fetchPerf();
    }, []);

    if (loading) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
        >
            <header>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Workforce Performance</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Physician Metrics & Accountability</p>
            </header>

            <DoctorPerformance data={performance} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-slate-800 space-y-6">
                    <h3 className="text-lg font-black uppercase tracking-tight">Recent Feedback</h3>
                    <div className="space-y-4">
                        {[
                            { from: "Patient P-901", comment: "Excellent consultation, very thorough.", stars: 5 },
                            { from: "Specialist S-402", comment: "Well documented case nodes.", stars: 5 }
                        ].map((f, i) => (
                            <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic mb-2">"{f.comment}"</p>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{f.from}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-indigo-600 rounded-[3rem] text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Continuing Education</h3>
                        <p className="text-indigo-100 font-bold text-sm leading-relaxed">Your clinical precision is in the top 5% of the regional health grid. Keep up the high standard of documentation.</p>
                    </div>
                    <button className="mt-10 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px]">View Detail Report</button>
                </div>
            </div>
        </motion.div>
    );
};

export default PerformanceView;
