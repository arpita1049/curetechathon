
import React, { useState } from 'react';
import { Hospital } from '../types';
import { ChevronLeft, Search, Star, MapPin, TrendingUp, Info, Activity, ArrowRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const TreatmentComparison: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [condition, setCondition] = useState('Appendicitis');
  const [city, setCity] = useState('Nagpur');

  const hospitals: Hospital[] = [
    { name: 'City General Hospital', city: 'Nagpur', costRange: '₹35k - ₹50k', successRate: '98%', rating: 4.5, distance: '4.2 km' },
    { name: 'Health Care Trust', city: 'Nagpur', costRange: '₹28k - ₹35k', successRate: '92%', rating: 4.1, distance: '12.0 km' },
    { name: 'Apollo Speciality', city: 'Nagpur', costRange: '₹60k - ₹85k', successRate: '99%', rating: 4.8, distance: '8.5 km' },
    { name: 'Govt Medical College', city: 'Nagpur', costRange: 'Free - ₹5k', successRate: '85%', rating: 3.5, distance: '2.1 km' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-20"
    >
      <button
        onClick={onBack}
        className="mb-10 group flex items-center gap-3 text-slate-500 font-bold hover:text-emerald-500 transition-all px-4 py-2 rounded-2xl bg-white/30 dark:bg-[#0f2a47]/60 backdrop-blur-md border border-slate-200/50 dark:border-white/10"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-black uppercase tracking-widest">Return to Lobby</span>
      </button>

      <div className="mb-12">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Wallet Analytics</h2>
        <p className="text-slate-500 font-bold text-lg max-w-2xl leading-relaxed uppercase tracking-[0.1em] text-sm italic">Transparent Clinical Economics for the Sovereign Patient.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-6">Target Condition</label>
          <div className="relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full pl-20 pr-8 py-7 bg-white/40 dark:bg-[#0f2a47]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 outline-none transition-all font-black text-xl text-slate-800 dark:text-white"
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-6">Geo-Location Scan</label>
          <div className="relative group">
            <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-20 pr-8 py-7 bg-white/40 dark:bg-[#0f2a47]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500/30 outline-none transition-all font-black text-xl text-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-sky-500/5 dark:bg-sky-400/5 backdrop-blur-sm p-10 rounded-[3rem] border border-sky-500/10 flex flex-col md:flex-row gap-8 mb-12 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-sky-500/20 transition-all duration-700" />
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl text-sky-500 shadow-xl shadow-sky-500/10 self-start z-10">
          <TrendingUp className="w-10 h-10" />
        </div>
        <div className="z-10">
          <h4 className="text-2xl font-black text-slate-900 dark:text-sky-100 mb-2 tracking-tight">Market Intelligence</h4>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Economic analysis for <span className="text-sky-600 font-black px-2 py-0.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg">{condition}</span> in <span className="text-sky-600 font-black px-2 py-0.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg">{city}</span> reveals a median cost of <span className="text-emerald-600 font-black">₹42,000</span>. Government facilities provide high-value subsidies.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hospitals.sort((a, b) => b.rating - a.rating).map((hospital, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/30 dark:bg-[#0f2a47]/60 backdrop-blur-md p-10 rounded-[3.5rem] border border-slate-200/50 dark:border-white/10 shadow-sm hover:shadow-2xl hover:bg-white dark:hover:bg-[#0f2a47] transition-all relative group overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors tracking-tight">{hospital.name}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 font-black uppercase tracking-widest mt-3">
                  <MapPin className="w-4 h-4 text-sky-500" /> {hospital.distance} from core
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 px-5 py-2 rounded-2xl text-sm font-black border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {hospital.rating}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-slate-200/50 dark:border-slate-800/50 pt-8 relative z-10">
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Clinical Cost</div>
                <div className="text-3xl font-black text-emerald-600 flex items-baseline gap-1">
                  <span className="text-lg opacity-50"></span>{hospital.costRange}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Success Rating</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{hospital.successRate}</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'var(--emerald-600)', color: '#fff' }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 w-full py-6 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-black text-sm rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              Analyze Patient Feedback <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TreatmentComparison;
