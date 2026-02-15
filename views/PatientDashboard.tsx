
import React, { useState } from 'react';
import { Search, Heart, Shield, DollarSign, Star, MapPin, Calendar, Activity, ChevronRight, Stethoscope, Trophy, Bell } from 'lucide-react';
import TreatmentComparison from './TreatmentComparison';

interface PatientDashboardProps {
  onLogout: () => void;
  user?: any;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onLogout, user }) => {
  const [view, setView] = useState<'HOME' | 'COST'>('HOME');

  if (view === 'COST') return <TreatmentComparison onBack={() => setView('HOME')} />;

  const healthScore = 78;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Patient Profile Header */}
      <div className="flex justify-between items-center p-6 glass rounded-[2.5rem] neo-shadow border border-white/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-3xl neo-shadow flex items-center justify-center text-white font-black text-2xl border-4 border-white">
              {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'RK'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-teal-950">Namaste, {user?.displayName ? user.displayName.split(' ')[0] : 'Rajesh'}</h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-teal-600/60 uppercase tracking-widest">
              <MapPin className="w-3 h-3" /> Rampur Village
            </div>
          </div>
        </div>
        <button className="p-3 bg-white text-teal-600 rounded-2xl neo-shadow border border-teal-50 hover:bg-teal-50 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
      </div>

      {/* Main Health Score Card */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-[3rem] p-8 text-white neo-shadow relative overflow-hidden group">
        <div className="relative z-10 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Community Leaderboard</span>
          </div>

          <h3 className="text-xl font-bold opacity-80 mb-2">My Health Vitality</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-7xl font-black tracking-tighter transition-transform group-hover:scale-105 duration-500">{healthScore}</span>
            <span className="text-2xl font-bold opacity-40">/ 100</span>
          </div>

          <p className="text-sm font-medium leading-relaxed max-w-xs mb-8 opacity-80 text-center md:text-left">
            You are doing amazing! Your health index is higher than <span className="text-emerald-300 font-bold">75%</span> of your neighbors.
          </p>

          <button className="w-full md:w-auto px-10 py-4 bg-white text-teal-800 rounded-2xl font-black text-sm neo-shadow hover:scale-105 transition-all shadow-xl">
            Get Rewards
          </button>
        </div>

        {/* Background Decorative Element */}
        <Activity className="absolute right-[-20%] bottom-[-20%] w-80 h-80 opacity-[0.05] -rotate-12 transition-transform group-hover:rotate-0 duration-1000" />
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button
          onClick={() => { }}
          className="flex flex-col items-start p-8 bg-white rounded-[2.5rem] neo-shadow border border-teal-50 hover:border-teal-200 transition-all group text-left relative overflow-hidden"
        >
          <div className="p-4 bg-blue-500 text-white rounded-2xl neo-shadow mb-6 group-hover:scale-110 transition-transform">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <div className="text-2xl font-black text-teal-950 mb-1 leading-tight">Symptom Checker</div>
            <p className="text-xs font-bold text-teal-600/50 uppercase tracking-widest">Free AI Diagnosis</p>
          </div>
          <div className="absolute top-8 right-8 text-teal-100 group-hover:text-teal-500 transition-colors">
            <ChevronRight className="w-8 h-8" />
          </div>
        </button>

        <button
          onClick={() => setView('COST')}
          className="flex flex-col items-start p-8 bg-white rounded-[2.5rem] neo-shadow border border-teal-50 hover:border-teal-200 transition-all group text-left relative overflow-hidden"
        >
          <div className="p-4 bg-orange-500 text-white rounded-2xl neo-shadow mb-6 group-hover:scale-110 transition-transform">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <div className="text-2xl font-black text-teal-950 mb-1 leading-tight">Compare Costs</div>
            <p className="text-xs font-bold text-teal-600/50 uppercase tracking-widest">Find Best Pricing</p>
          </div>
          <div className="absolute top-8 right-8 text-teal-100 group-hover:text-teal-500 transition-colors">
            <ChevronRight className="w-8 h-8" />
          </div>
        </button>
      </div>

      {/* Modern List Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-black text-teal-950">Next Steps</h3>
          <button className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline">Full History</button>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white rounded-3xl neo-shadow border border-teal-50 flex items-center gap-6 group hover:border-teal-200 transition-all">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-red-50 rounded-2xl text-red-600 neo-shadow">
              <span className="text-xs font-black uppercase">May</span>
              <span className="text-2xl font-black">12</span>
            </div>
            <div className="flex-grow">
              <div className="text-lg font-black text-teal-950">Hospital Visit</div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-teal-600/60 uppercase tracking-widest">
                <MapPin className="w-3 h-3" /> City Center • 10:30 AM
              </div>
            </div>
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl neo-shadow border border-teal-50 flex items-center gap-6 opacity-60 grayscale group">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-50 rounded-2xl text-slate-500 border border-slate-100">
              <span className="text-xs font-black uppercase">May</span>
              <span className="text-2xl font-black">08</span>
            </div>
            <div className="flex-grow">
              <div className="text-lg font-black text-teal-950">Pills Refill</div>
              <div className="text-[10px] font-bold text-teal-600/60 uppercase tracking-widest">
                Metformin 500mg
              </div>
            </div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Banner */}
      <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white neo-shadow relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
          <Heart className="w-10 h-10 text-pink-400" />
        </div>
        <div className="text-center md:text-left flex-grow">
          <h3 className="text-xl font-bold mb-1">Health Tip of the Day</h3>
          <p className="text-sm font-medium opacity-70 leading-relaxed">
            Walking 30 minutes daily reduces diabetes risk by <span className="text-emerald-300 font-black">40%</span>. Take the first step today!
          </p>
        </div>
        <button className="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform neo-shadow">
          Track Steps
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
