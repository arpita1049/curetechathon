import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Filter, Plus, Phone, Video, MoreVertical
} from 'lucide-react';
import RiskBadge from './medical/RiskBadge';

const PatientsView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const patients = [
        { id: 'P-902', name: 'Arpita Sharma', age: 28, gender: 'Female', status: 'Active', risk: 85, lastVisit: 'Feb 21, 2026' },
        { id: 'P-903', name: 'Rahul Verma', age: 45, gender: 'Male', status: 'Follow-up', risk: 62, lastVisit: 'Feb 15, 2026' },
        { id: 'P-904', name: 'Priya Das', age: 34, gender: 'Female', status: 'Monitoring', risk: 15, lastVisit: 'Feb 20, 2026' },
        { id: 'P-905', name: 'Aman Gupta', age: 52, gender: 'Male', status: 'Critical', risk: 92, lastVisit: 'Feb 21, 2026' },
        { id: 'P-906', name: 'Sonalika Singh', age: 31, gender: 'Female', status: 'Stable', risk: 5, lastVisit: 'Jan 15, 2026' },
    ];

    const getRiskLevel = (score: number): 'Low' | 'Moderate' | 'High' | 'Critical' => {
        if (score < 30) return 'Low';
        if (score < 60) return 'Moderate';
        if (score < 85) return 'High';
        return 'Critical';
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Medical Registry</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">1,204 Registered Clinical Records</p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-grow lg:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by Patient Name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none font-bold text-xs"
                        />
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-500/20">
                        <Plus className="w-4 h-4" /> Add Record
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Triage Class</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Consult</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {patients.map((p, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">{p.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{p.id} • {p.age}Y • {p.gender}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <RiskBadge level={getRiskLevel(p.risk)} />
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{p.status}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{p.lastVisit}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientsView;
