
import React, { useState } from 'react';
import {
    Home, Activity, Calendar, FileText, DollarSign,
    Settings, LogOut, Bell, Search, ChevronRight,
    Plus, Download, ExternalLink, Clock, MapPin,
    TrendingUp, Heart, Shield, Zap
} from 'lucide-react';
import SmartSymptomChecker from './SmartSymptomChecker';
import TreatmentComparison from './TreatmentComparison';

interface PatientDashboardProps {
    onLogout: () => void;
    user?: any;
}

type DashboardView = 'HOME' | 'SYMPTOM' | 'APPOINTMENTS' | 'RECORDS' | 'COST';

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onLogout, user }) => {
    const [currentView, setCurrentView] = useState<DashboardView>('HOME');

    const SidebarItem = ({ icon: Icon, label, active, onClick, color = 'emerald' }: any) => {
        const colorMap: Record<string, string> = {
            emerald: 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-emerald-500/40 text-white',
            indigo: 'bg-gradient-to-r from-indigo-600 to-blue-500 shadow-indigo-500/40 text-white',
            rose: 'bg-gradient-to-r from-rose-600 to-pink-500 shadow-rose-500/40 text-white',
            amber: 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-amber-500/40 text-white',
            sky: 'bg-gradient-to-r from-sky-600 to-cyan-500 shadow-sky-500/40 text-white',
            violet: 'bg-gradient-to-r from-violet-600 to-purple-500 shadow-violet-500/40 text-white',
            fuchsia: 'bg-gradient-to-r from-fuchsia-600 to-pink-500 shadow-fuchsia-500/40 text-white'
        };
        const hoverMap: Record<string, string> = {
            emerald: 'hover:text-emerald-500 hover:bg-emerald-500/15 border-emerald-500/10',
            indigo: 'hover:text-indigo-500 hover:bg-indigo-500/15 border-indigo-500/10',
            rose: 'hover:text-rose-500 hover:bg-rose-500/15 border-rose-500/10',
            amber: 'hover:text-amber-500 hover:bg-amber-500/15 border-amber-500/10',
            sky: 'hover:text-sky-500 hover:bg-sky-500/15 border-sky-500/10',
            violet: 'hover:text-violet-500 hover:bg-violet-500/15 border-violet-500/10',
            fuchsia: 'hover:text-fuchsia-500 hover:bg-fuchsia-500/15 border-fuchsia-500/10'
        };

        return (
            <button
                onClick={onClick}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[2rem] transition-all duration-500 font-black group relative overflow-hidden border-2 ${active
                    ? colorMap[color] + ' translate-x-3 scale-[1.02] border-transparent'
                    : `text-slate-400 bg-transparent border-transparent ${hoverMap[color]} hover:border-current/20`
                    }`}
            >
                <div className={`p-2 rounded-xl transition-all duration-500 ${active ? 'bg-white/20' : 'bg-slate-800/50 group-hover:bg-current/10'}`}>
                    <Icon className={`w-5 h-5 transition-transform duration-700 ${active ? 'scale-125 rotate-[360deg]' : 'group-hover:scale-125'}`} />
                </div>
                <span className="tracking-tight">{label}</span>
                {active && (
                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full blur-md"></div>
                )}
            </button>
        );
    };

    const HomeView = () => (
        <div className="space-y-10 animate-slide-up">
            {/* Welcome & Health Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0d9488] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                    {/* Abstract Shapes for Premium Look */}
                    <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-60 h-60 bg-teal-400/10 rounded-full blur-[80px]"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Personalized Health Hub
                            </div>
                        </div>
                        <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">Namaste, <span className="text-emerald-300">{user?.displayName || 'Arun'}</span>!</h2>
                        <p className="text-emerald-50/70 text-xl mb-12 max-w-lg font-medium leading-relaxed">Your recovery journey is <span className="text-white font-bold underline decoration-emerald-400 underline-offset-4">ahead of schedule</span>. Ready for your next milestone?</p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={() => setCurrentView('SYMPTOM')}
                                className="bg-white text-emerald-900 px-10 py-4 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-950/20 active:scale-95 group/btn"
                            >
                                <Zap className="w-6 h-6 text-emerald-600 fill-emerald-600 group-hover:scale-125 transition-transform" /> Start AI Checkup
                            </button>
                            <button
                                onClick={() => setCurrentView('APPOINTMENTS')}
                                className="bg-[#ffffff10] backdrop-blur-xl border border-white/20 text-white px-10 py-4 rounded-[2rem] font-bold hover:bg-[#ffffff20] transition-all active:scale-95"
                            >
                                View Timeline
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="relative w-40 h-40 mb-6">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray={440} strokeDashoffset={440 - (440 * 78) / 100}
                                className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">78</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Score</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Good Progress! Keep it up.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Weight', value: '68 kg', trend: '-2kg', icon: Activity, gradient: 'from-blue-600 to-indigo-500', shadow: 'shadow-blue-500/20' },
                    { label: 'Heart Rate', value: '72 bpm', trend: 'Normal', icon: Heart, gradient: 'from-rose-600 to-pink-500', shadow: 'shadow-rose-500/20' },
                    { label: 'Steps', value: '8,432', trend: '+12%', icon: TrendingUp, gradient: 'from-emerald-600 to-teal-500', shadow: 'shadow-emerald-500/20' },
                    { label: 'Sleep', value: '7.5 hrs', trend: '+30m', icon: Clock, gradient: 'from-violet-600 to-purple-500', shadow: 'shadow-violet-500/20' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-gradient-to-br ${stat.gradient} p-8 rounded-[3rem] text-white shadow-2xl ${stat.shadow} hover:scale-105 transition-all duration-500 cursor-pointer group overflow-hidden relative`}>
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white/70 mb-1">{stat.label}</h4>
                            <div className="text-3xl font-black">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Next Appointments */}
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Upcoming Consults</h3>
                        <button onClick={() => setCurrentView('APPOINTMENTS')} className="text-emerald-600 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all">View Schedule</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { doc: 'Dr. Sarah Wilson', type: 'General Checkup', date: 'Tomorrow, 10:00 AM', status: 'Confirmed', color: 'emerald' },
                            { doc: 'Dr. James Miller', type: 'Cardiology Review', date: '15 Oct, 2:30 PM', status: 'Pending', color: 'rose' }
                        ].map((app, i) => (
                            <div key={i} className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all cursor-pointer group/item border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                <div className={`w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-700 flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform`}>
                                    <Calendar className={`w-7 h-7 text-${app.color}-600`} />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight mb-0.5">{app.doc}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{app.type} • {app.date}</p>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-${app.color}-100 text-${app.color}-700 dark:bg-${app.color}-900/40 dark:text-${app.color}-400`}>
                                    {app.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Insights */}
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative group">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">AI Health Intelligence</h3>
                    <div className="space-y-6">
                        <div className="p-8 rounded-[3rem] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/20 group/insight relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="flex gap-6 relative z-10">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl h-fit border border-white/30 shadow-lg">
                                    <Bell className="w-7 h-7 animate-swing text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl mb-2">Medication Reminder</h4>
                                    <p className="text-sm text-white/90 font-medium leading-relaxed">It's time for your <span className="font-black underline underline-offset-4 decoration-white/50">Vitamin D</span> supplement. Best taken with your current meal for 85% better absorption.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-blue-700 text-white shadow-xl shadow-indigo-500/20 group/insight relative overflow-hidden">
                            <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                            <div className="flex gap-6 relative z-10">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl h-fit border border-white/30 shadow-lg">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl mb-2">Heart Protection Tip</h4>
                                    <p className="text-sm text-white/90 font-medium leading-relaxed">Increasing your <span className="font-black italic">hydration</span> by only 500ml today could lower your resting heart rate by an average of 4bpm tonight.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const AppointmentsView = () => (
        <div className="space-y-8 animate-slide-up">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">My Appointments</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your consultations and checkups.</p>
                </div>
                <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-extrabold flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                    <Plus className="w-6 h-6" /> Book New
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm">Upcoming</button>
                        <button className="px-6 py-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold text-sm transition-colors">Past Visits</button>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    {[
                        { doc: 'Dr. Sarah Wilson', specialty: 'General Physician', date: 'Tomorrow', time: '10:00 AM', location: 'City Medical Center', status: 'Confirmed', img: '1' },
                        { doc: 'Dr. James Miller', specialty: 'Cardiologist', date: '15 Oct, 2024', time: '02:30 PM', location: 'Heart & Care Wing', status: 'Pending', img: '2' },
                    ].map((app, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-slate-50 dark:bg-slate-800/30 rounded-[2.5rem] group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30">
                            <div className="flex items-center gap-6 flex-grow">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Doc${app.img}`} alt="Doctor" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{app.doc}</h3>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3 uppercase tracking-wider">{app.specialty} Specialist</p>
                                    <div className="flex flex-wrap gap-4 items-center text-slate-500 dark:text-slate-400 text-sm font-semibold">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {app.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {app.time}</span>
                                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {app.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${app.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'}`}>
                                    {app.status}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 hover:border-red-200 transition-all">
                                        <ChevronRight className="w-5 h-5 rotate-90" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const RecordsView = () => (
        <div className="space-y-8 animate-slide-up">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Medical Records</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Secure access to your prescriptions, lab reports and diagnostic history.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search records..." className="pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl w-64 focus:ring-2 focus:ring-emerald-500 dark:text-white" />
                    </div>
                    <button className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-emerald-600/20 active:scale-95 transition-all">
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {[
                        { name: 'Blood Test Report', date: 'Oct 12, 2024', size: '2.4 MB', type: 'PDF' },
                        { name: 'X-Ray Scan Results', date: 'Sep 28, 2024', size: '15.8 MB', type: 'IMAGE' },
                        { name: 'General Consultation Note', date: 'Sep 15, 2024', size: '850 KB', type: 'DOC' },
                        { name: 'Vaccination Certificate', date: 'Aug 10, 2024', size: '1.2 MB', type: 'PDF' },
                        { name: 'Eye Clinic Prescription', date: 'Jun 22, 2024', size: '420 KB', type: 'PDF' }
                    ].map((file, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-md border border-slate-50 dark:border-slate-800 flex items-center gap-5 hover:border-emerald-200 dark:hover:border-emerald-600/30 transition-all cursor-pointer group">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-slate-900 dark:text-white">{file.name}</h4>
                                <div className="flex gap-4 items-center text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">
                                    <span>{file.date}</span>
                                    <span>•</span>
                                    <span>{file.size}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button title="Download" className="p-3 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button title="View Online" className="p-3 text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                        <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-emerald-400" />
                            Digital Health Locker
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">All your sensitive medical data is encrypted with 256-bit AES protection. Only you and authorized doctors can access these records.</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                <span>Storage Capacity</span>
                                <span>45% Used</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[45%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-transparent font-sans transition-colors duration-500">
            {/* Dynamic Sidebar */}
            <aside className="w-80 p-8 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden lg:flex flex-col gap-10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-950 dark:text-white">PATIENT CLUB</span>
                </div>

                <nav className="flex-grow space-y-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-6 mb-2 mt-8 opacity-60 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                        Neural Core
                    </div>
                    <SidebarItem icon={Home} label="Dashboard" active={currentView === 'HOME'} onClick={() => setCurrentView('HOME')} color="emerald" />
                    <SidebarItem icon={Zap} label="AI Checkup" active={currentView === 'SYMPTOM'} onClick={() => setCurrentView('SYMPTOM')} color="fuchsia" />
                    <SidebarItem icon={Calendar} label="Appointments" active={currentView === 'APPOINTMENTS'} onClick={() => setCurrentView('APPOINTMENTS')} color="rose" />
                    <SidebarItem icon={FileText} label="Health Records" active={currentView === 'RECORDS'} onClick={() => setCurrentView('RECORDS')} color="amber" />
                    <SidebarItem icon={DollarSign} label="Cost Analysis" active={currentView === 'COST'} onClick={() => setCurrentView('COST')} color="sky" />
                </nav>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <SidebarItem icon={Settings} label="User Settings" color="indigo" />
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-fuchsia-500 font-black hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/20 transition-all active:scale-95 group relative overflow-hidden"
                    >
                        <div className="p-2 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-xl group-hover:rotate-12 transition-transform">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span>Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-4 md:p-8 lg:p-12 h-screen overflow-y-auto custom-scrollbar">
                {/* Top Header */}
                <header className="flex justify-between items-center mb-12">
                    <div className="lg:hidden w-14 h-14 bg-white dark:bg-slate-900 rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                        <Activity className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="hidden md:flex bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 py-4 w-[450px] shadow-sm focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500/30 transition-all group">
                        <Search className="w-6 h-6 text-slate-400 mr-4 group-focus-within:text-emerald-500 transition-colors" />
                        <input type="text" placeholder="Search medicines, labs, specialists..." className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full dark:text-white placeholder:text-slate-400" />
                        <div className="flex gap-1">
                            <kbd className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-[10px] font-black text-slate-400">Ctrl</kbd>
                            <kbd className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-[10px] font-black text-slate-400">K</kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] shadow-sm hover:scale-110 active:scale-95 transition-all text-slate-500 group">
                            <Bell className="w-6 h-6 group-hover:text-emerald-600 transition-colors" />
                            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 border-4 border-white dark:border-slate-900 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                        </button>
                        <div className="flex items-center gap-5 pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                            <div className="text-right hidden sm:block">
                                <div className="text-base font-black text-slate-950 dark:text-white leading-tight flex items-center gap-2 justify-end">
                                    {user?.displayName || 'Arun Patel'}
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-amber-500/30 mt-1 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                    <Shield className="w-3 h-3 fill-amber-500" /> Prime Member
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="w-16 h-16 rounded-[1.75rem] border-4 border-emerald-50 dark:border-emerald-900/50 overflow-hidden shadow-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 cursor-pointer p-0.5 bg-gradient-to-br from-emerald-400 to-teal-600">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid || 'patient'}&backgroundColor=ffffff`}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-[1.5rem]"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800">
                                    <ChevronRight className="w-4 h-4 text-emerald-600 rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* View Switcher */}
                {currentView === 'HOME' && <HomeView />}
                {currentView === 'SYMPTOM' && <SmartSymptomChecker onBack={() => setCurrentView('HOME')} onConsultDoctor={() => setCurrentView('APPOINTMENTS')} />}
                {currentView === 'APPOINTMENTS' && <AppointmentsView />}
                {currentView === 'RECORDS' && <RecordsView />}
                {currentView === 'COST' && <TreatmentComparison onBack={() => setCurrentView('HOME')} />}
            </main>
        </div>
    );
};

export default PatientDashboard;
