import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Search, Filter, Plus,
    MoreVertical, Phone, Video,
    Mail, MapPin, Calendar,
    ChevronRight, ArrowUpRight,
    Activity, ShieldCheck
} from 'lucide-react';

const PatientsView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const patients = [
        { id: 'P-902', name: 'Arpita Sharma', age: 28, gender: 'Female', status: 'Active', risk: 85, color: 'rose', lastVisit: '2 days ago' },
        { id: 'P-903', name: 'Rahul Verma', age: 45, gender: 'Male', status: 'Stable', risk: 62, color: 'amber', lastVisit: '1 week ago' },
        { id: 'P-904', name: 'Priya Das', age: 34, gender: 'Female', status: 'Monitoring', risk: 15, color: 'teal', lastVisit: 'Developing' },
        { id: 'P-905', name: 'Aman Gupta', age: 52, gender: 'Male', status: 'Critical', risk: 92, color: 'rose', lastVisit: '4 hours ago' },
        { id: 'P-906', name: 'Sonalika Singh', age: 31, gender: 'Female', status: 'Recovered', risk: 5, color: 'emerald', lastVisit: '1 month ago' },
    ];

    return (
        <div className="space-y-10">
            {/* Header / Search Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Clinical Registry</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Managing 1,204 Verified Patient Nodes</p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-grow lg:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search Subject ID or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-slate-800/20 backdrop-blur-xl border border-white/20 rounded-2xl outline-none font-bold text-xs"
                        />
                    </div>
                    <button className="p-4 bg-white/70 dark:bg-slate-800/20 rounded-2xl border border-white/20 shadow-xl hover:scale-110 transition-transform">
                        <Filter className="w-5 h-5 text-slate-500" />
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all">
                        <Plus className="w-4 h-4" /> Add Patient
                    </button>
                </div>
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {patients.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${p.color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-2xl p-1 shadow-2xl">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <div className="flex flex-col items-end">
                                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${p.color}-500/10 text-${p.color}-500 border border-${p.color}-500/20 mb-2`}>
                                    {p.status}
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.id}</span>
                            </div>
                        </div>

                        <div className="space-y-1 mb-8 relative z-10">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{p.name}</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{p.age} Yrs • {p.gender}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl">
                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Factor</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg font-black text-${p.color}-500`}>{p.risk}%</span>
                                    <div className={`w-1.5 h-1.5 rounded-full bg-${p.color}-500 animate-pulse`} />
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl">
                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</span>
                                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 block mt-1">{p.lastVisit}</span>
                            </div>
                        </div>

                        <div className="mt-auto flex gap-3 relative z-10">
                            <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all shadow-xl shadow-indigo-500/20">
                                View Profile
                            </button>
                            <button className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all">
                                <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-sky-500 hover:text-white transition-all">
                                <Video className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PatientsView;
