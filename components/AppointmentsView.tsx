import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Clock, User, ChevronRight,
    MoreVertical, CheckCircle2, XCircle,
    AlertCircle, MapPin, Video,
    ChevronLeft, Plus
} from 'lucide-react';

const AppointmentsView: React.FC = () => {
    const timeSlots = [
        { time: '09:00 AM', status: 'PAST', patient: 'Rahul Verma', type: 'Annual Physical', duration: '30m', mode: 'IN-PERSON' },
        { time: '10:00 AM', status: 'ACTIVE', patient: 'Arpita Sharma', type: 'Headache Consult', duration: '45m', mode: 'TELEHEALTH', active: true },
        { time: '11:30 AM', status: 'PENDING', patient: 'Priya Das', type: 'Follow-up', duration: '20m', mode: 'IN-PERSON' },
        { time: '01:00 PM', status: 'LUNCH', type: 'Lunch Break', duration: '60m' },
        { time: '02:30 PM', status: 'PENDING', patient: 'Aman Gupta', type: 'Cardiac Screening', duration: '45m', mode: 'TELEHEALTH' },
        { time: '04:00 PM', status: 'PENDING', patient: 'Sonalika Singh', type: 'Routine Wellness', duration: '30m', mode: 'IN-PERSON' },
    ];

    return (
        <div className="space-y-12">
            {/* Header / Calendar Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex items-center gap-6">
                    <div className="p-5 bg-indigo-600 rounded-[1.5rem] text-white shadow-2xl">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Appointment Schedule</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">February 21, 2026</span>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">12 Patients Scheduled</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl p-2 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
                    <button className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                        <ChevronLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <div className="px-6 flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Thursday</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">19 FEB ‘26</span>
                    </div>
                    <button className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                    </button>
                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2" />
                    <button className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Timeline View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-6">
                    {timeSlots.map((slot, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`p-8 rounded-[2.5rem] border transition-all group relative overflow-hidden flex items-center gap-8 ${slot.active ? 'bg-indigo-600 border-indigo-600 text-white shadow-3xl shadow-indigo-500/40' : (slot.status === 'LUNCH' ? 'bg-slate-50 dark:bg-slate-800/20 border-transparent opacity-60' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 shadow-sm')}`}
                        >
                            <div className="w-24 flex flex-col items-start shrink-0">
                                <span className={`text-sm font-black tracking-widest uppercase ${slot.active ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{slot.time}</span>
                                <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${slot.active ? 'text-indigo-200' : 'text-slate-400'}`}>{slot.duration}</span>
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                                {slot.status === 'LUNCH' ? (
                                    <h4 className="text-lg font-black uppercase tracking-widest text-slate-400">Lunch Break</h4>
                                ) : (
                                    <>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className={`text-xl font-black uppercase tracking-tight ${slot.active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{slot.patient}</h4>
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${slot.mode === 'TELEHEALTH' ? 'bg-indigo-500/20 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                    {slot.mode}
                                                </span>
                                            </div>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${slot.active ? 'text-indigo-100' : 'text-slate-500'}`}>{slot.type}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {slot.active ? (
                                                <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg flex items-center gap-2">
                                                    <Video className="w-4 h-4" /> Join Call
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    {slot.status === 'PAST' ? (
                                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                                    ) : (
                                                        <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-slate-400">
                                                            <ChevronRight className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="p-10 bg-slate-100 dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700">
                        <Clock className="w-8 h-8 text-indigo-600 mb-6" />
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Schedule Overview</h3>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 uppercase text-[10px] tracking-widest">Currently at 85% capacity for today's clinical sessions.</p>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span>Occupancy</span>
                                <span className="text-indigo-600">High</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl">
                        <h4 className="text-xl font-black uppercase tracking-tight mb-8">Clinical Actions</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Reschedule Buffer', icon: Calendar, color: 'indigo' },
                                { label: 'Send Announcement', icon: Video, color: 'sky' },
                                { label: 'Cancel All Pending', icon: XCircle, color: 'rose' }
                            ].map((action, i) => (
                                <button key={i} className="w-full flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 transition-all group">
                                    <div className={`p-3 bg-white dark:bg-slate-700 text-${action.color}-500 rounded-xl shadow-sm`}>
                                        <action.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsView;
