
import React, { useState } from 'react';
import { Hospital } from '../types';
import { ChevronLeft, Search, Star, MapPin, TrendingUp, Info } from 'lucide-react';

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
    <div className="pb-10 animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Treatment Cost Comparison</h2>
        <p className="text-gray-500 dark:text-slate-400 font-medium">Transparent pricing for informed decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase px-1">Condition</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/30 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all font-bold text-slate-700 dark:text-white"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase px-1">City</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/30 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all font-bold text-slate-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4 mb-6">
        <div className="p-3 bg-white dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm self-start">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-300">Market Insight</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">The average cost for {condition} in {city} is <span className="font-bold">₹42,000</span>. Public hospitals offer subsidized rates.</p>
        </div>
      </div>

      <div className="space-y-4">
        {hospitals.sort((a, b) => b.rating - a.rating).map((hospital, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-100 dark:hover:border-teal-900/30 transition-all relative group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{hospital.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  <MapPin className="w-3 h-3" /> {hospital.distance} away
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-100 dark:border-amber-900/30">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {hospital.rating}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Estimated Cost</div>
                <div className="text-lg font-black text-teal-600 dark:text-teal-400">{hospital.costRange}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Success Rate</div>
                <div className="text-lg font-black text-slate-800 dark:text-white">{hospital.successRate}</div>
              </div>
            </div>

            <button className="mt-4 w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Read Patient Reviews
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentComparison;
