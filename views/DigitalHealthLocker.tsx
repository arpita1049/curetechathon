import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Upload, Search, Filter, Download, Trash2,
    Eye, Shield, Plus, Clock, File, Image as ImageIcon,
    Share2, ExternalLink, ArrowLeft, MoreVertical, CheckCircle2,
    Calendar, User, Activity, AlertCircle
} from 'lucide-react';

interface HealthRecord {
    id: string;
    name: string;
    type: 'Lab Report' | 'X-Ray' | 'Prescription' | 'ECG' | 'Discharge Summary';
    doctor: string;
    date: string;
    size: string;
    status: 'Verified' | 'Pending';
    category: 'Diagnostic' | 'Surgical' | 'Outpatient';
}

const DigitalHealthLocker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [isUploading, setIsUploading] = useState(false);

    const records: HealthRecord[] = [
        {
            id: '1',
            name: 'Blood Test Results - CBC',
            type: 'Lab Report',
            doctor: 'Dr. Sarah Mitchell',
            date: 'Oct 15, 2025',
            size: '1.2 MB',
            status: 'Verified',
            category: 'Diagnostic'
        },
        {
            id: '2',
            name: 'Chest X-Ray PA View',
            type: 'X-Ray',
            doctor: 'Dr. Rajesh Khanna',
            date: 'Sep 22, 2025',
            size: '4.5 MB',
            status: 'Verified',
            category: 'Diagnostic'
        },
        {
            id: '3',
            name: 'Knee MRI Scan',
            type: 'Lab Report',
            doctor: 'Dr. Vivek Anand',
            date: 'Aug 10, 2025',
            size: '12.8 MB',
            status: 'Verified',
            category: 'Surgical'
        },
        {
            id: '4',
            name: 'Post-Op Discharge Summary',
            type: 'Discharge Summary',
            doctor: 'Apollo Hospital',
            date: 'Jul 05, 2025',
            size: '2.1 MB',
            status: 'Verified',
            category: 'Outpatient'
        }
    ];

    const recordTypes = ['All', 'Lab Report', 'X-Ray', 'Prescription', 'ECG', 'Discharge Summary'];

    const filteredRecords = records.filter(rec =>
        (selectedType === 'All' || rec.type === selectedType) &&
        (rec.name.toLowerCase().includes(searchQuery.toLowerCase()) || rec.doctor.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Health Locker (HQ)
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsUploading(true)}
                        className="px-8 py-4 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Upload className="w-5 h-5" />
                        Upload Record
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-slate-900 dark:text-white">24</h4>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Total Records</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Shield className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-slate-900 dark:text-white">Verified</h4>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Data Integrity</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-slate-900 dark:text-white">Oct '25</h4>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Last Upload</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find by report name or doctor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-lg outline-none focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {recordTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${selectedType === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-slate-900 text-slate-500 border-2 border-slate-100 dark:border-slate-800'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Records List/Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredRecords.map((rec, idx) => (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all group flex flex-col md:flex-row gap-6 items-center shadow-sm"
                        >
                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${rec.type === 'X-Ray' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                                {rec.type === 'X-Ray' ? <ImageIcon className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                            </div>

                            <div className="flex-1 space-y-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight">{rec.name}</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center text-slate-500 font-bold text-sm">
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {rec.date}</span>
                                    <span className="w-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {rec.doctor}</span>
                                    <span className="w-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                    <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest">{rec.type}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                                    <Eye className="w-6 h-6" />
                                </button>
                                <button className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                                    <Download className="w-6 h-6" />
                                </button>
                                <button className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all">
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Upload Modal (Placeholder for UI) */}
                <AnimatePresence>
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl space-y-8"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Secure Upload</h2>
                                    <button onClick={() => setIsUploading(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] p-16 text-center space-y-4 hover:border-blue-500/50 transition-all cursor-pointer group">
                                    <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                        <Upload className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">Drag & drop files here</p>
                                        <p className="text-slate-500 font-bold">PDF, JPEG or PNG up to 20MB</p>
                                    </div>
                                    <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs">
                                        Browse Folders
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30 rounded-2xl">
                                        <Shield className="w-6 h-6 text-emerald-600" />
                                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">End-to-end encrypted storage active. Only you and authorized doctors can view these files.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsUploading(false)}
                                        className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest"
                                    >
                                        Start Intelligence Scan
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DigitalHealthLocker;
