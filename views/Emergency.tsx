
import React from 'react';
import { Phone, MapPin, Navigation, Clock, ShieldAlert, Heart, ChevronRight, Share2, Ambulance } from 'lucide-react';

interface EmergencyProps {
    onBack: () => void;
    t: any;
}

const Emergency: React.FC<EmergencyProps> = ({ onBack, t }) => {
    const contacts = [
        { title: t.ambulance, number: '102', color: 'bg-red-600', icon: <Ambulance /> },
        { title: t.mgmt, number: '108', color: 'bg-orange-600', icon: <ShieldAlert /> },
        { title: t.clinic, number: '+91 98765 43210', color: 'bg-indigo-600', icon: <Phone /> },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-3xl animate-pulse">
                        <ShieldAlert className="w-10 h-10" />
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">{t.desc}</p>
                </div>

                {/* Rapid Dial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contacts.map((contact, i) => (
                        <button
                            key={i}
                            className="group p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-left relative overflow-hidden"
                            onClick={() => window.open(`tel:${contact.number}`)}
                        >
                            <div className={`${contact.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                {React.cloneElement(contact.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{contact.title}</h3>
                            <p className="text-3xl font-black text-slate-400 dark:text-slate-500 tracking-tighter mt-2 group-hover:text-red-500 transition-colors">{contact.number}</p>
                            <div className="absolute top-[-20px] right-[-20px] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                                {React.cloneElement(contact.icon as React.ReactElement<any>, { className: 'w-32 h-32' })}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Live Location & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3.5rem] space-y-8 border border-white/40 dark:border-slate-800/50">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <MapPin className="text-red-600" /> {t.location}
                        </h2>
                        <div className="bg-slate-100 dark:bg-slate-800 h-64 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop"
                                alt="Map"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="relative z-10 text-center">
                                <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center animate-bounce shadow-2xl mx-auto mb-4">
                                    <Navigation className="w-6 h-6" />
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white drop-shadow-md">7th Floor, Silicon Valley II, Pune</p>
                            </div>
                        </div>
                        <button className="w-full py-5 bg-sky-600 text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-sky-700 transition-colors shadow-xl">
                            <Share2 className="w-6 h-6" /> {t.share}
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-[3rem] border border-emerald-100 dark:border-emerald-800/30 flex gap-6">
                            <div className="w-16 h-16 shrink-0 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                <Heart className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-400 mb-2">First Aid Guides</h3>
                                <p className="text-emerald-700/70 dark:text-emerald-500/70 font-medium">Quick steps for CPR, wounds, and choking while you wait for help.</p>
                                <button className="mt-4 font-black text-emerald-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    View Guides <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black">CURE Nearest Hubs</h3>
                                <span className="px-4 py-1.5 bg-sky-500/20 text-sky-400 rounded-full text-xs font-black uppercase tracking-widest">Live Status</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'CURE City Center', dist: '1.2 km', time: '5 mins', hms: 'Open' },
                                    { name: 'CURE North Wing', dist: '4.8 km', time: '12 mins', hms: 'High Traffic' },
                                ].map((h, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                                        <div>
                                            <p className="font-black text-sm">{h.name}</p>
                                            <p className="text-[10px] uppercase font-bold text-white/40">{h.dist} • {h.time}</p>
                                        </div>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${h.hms === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                            {h.hms}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action */}
                <div className="text-center pt-8">
                    <button
                        onClick={onBack}
                        className="text-lg font-black text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Emergency;
