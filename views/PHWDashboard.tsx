
import React, { useState } from 'react';
import { PlusCircle, Users, Bell, MessageSquareShare, ArrowRight, Activity, TrendingUp, Calendar, Search } from 'lucide-react';
import AssessmentFlow from './AssessmentFlow';
import RiskPrediction from './RiskPrediction';

interface PHWDashboardProps {
  onLogout: () => void;
}

const PHWDashboard: React.FC<PHWDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'ASSESSMENT' | 'RISK'>('HOME');

  if (activeTab === 'ASSESSMENT') return <AssessmentFlow onBack={() => setActiveTab('HOME')} />;
  if (activeTab === 'RISK') return <RiskPrediction onBack={() => setActiveTab('HOME')} />;

  const menuItems = [
    { title: 'Scan Patient', icon: <PlusCircle />, color: 'from-blue-500 to-blue-600', tab: 'ASSESSMENT', desc: 'New health check' },
    { title: 'My Community', icon: <Users />, color: 'from-teal-500 to-teal-600', tab: 'HOME', desc: 'Registered patients' },
    { title: 'Disease Risk', icon: <Activity />, color: 'from-orange-500 to-orange-600', tab: 'RISK', desc: 'AI predictions' },
    { title: 'Expert Advice', icon: <MessageSquareShare />, color: 'from-purple-500 to-purple-600', tab: 'HOME', desc: 'Dr. Consults' }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* User Greeting Section */}
      <div className="flex justify-between items-center p-6 glass rounded-[2rem] neo-shadow">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 neo-shadow">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Meera" className="w-12 h-12 rounded-xl" alt="Worker" />
          </div>
          <div>
            <span className="text-teal-600/60 text-xs font-bold uppercase tracking-widest">Village Sector A</span>
            <h2 className="text-2xl font-extrabold text-teal-950">Namaste, Meera</h2>
          </div>
        </div>
        <div className="relative group">
          <div className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-100 transition-colors cursor-pointer border border-red-100">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-2 border-white rounded-full text-[10px] text-white flex items-center justify-center font-bold">2</span>
          </div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-2 gap-5">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(item.tab as any)}
            className="flex flex-col items-start p-6 bg-white rounded-[2rem] neo-shadow border border-teal-50 hover:border-teal-200 transition-all group relative overflow-hidden text-left"
          >
            <div className={`p-4 bg-gradient-to-br ${item.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform neo-shadow`}>
              {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
            </div>
            <span className="text-lg font-extrabold text-teal-950 leading-tight">{item.title}</span>
            <span className="text-[10px] text-teal-600/50 font-bold uppercase mt-1 tracking-wider">{item.desc}</span>
            
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-teal-50/50 rounded-tl-[3rem] -mb-4 -mr-4 group-hover:bg-teal-100 transition-colors"></div>
          </button>
        ))}
      </div>

      {/* Critical Alerts Section */}
      <div className="bg-white p-6 rounded-[2.5rem] neo-shadow border border-teal-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-teal-950 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            Priority Referrals
          </h3>
          <button className="text-teal-600 text-xs font-extrabold uppercase tracking-widest hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          <div className="group flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-white rounded-3xl border border-red-100/50 hover:border-red-200 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center font-bold text-red-600 neo-shadow">RK</div>
              <div>
                <div className="font-extrabold text-teal-950">Ravi Kumar</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-red-500 uppercase">
                  <Activity className="w-3 h-3" /> Hypertension Risk
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-bold mb-1 uppercase">2h ago</span>
              <div className="p-2 bg-red-600 text-white rounded-lg group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="group flex items-center justify-between p-5 bg-gradient-to-r from-orange-50 to-white rounded-3xl border border-orange-100/50 hover:border-orange-200 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-orange-100 flex items-center justify-center font-bold text-orange-600 neo-shadow">SD</div>
              <div>
                <div className="font-extrabold text-teal-950">Sita Devi</div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-orange-500 uppercase">
                  <TrendingUp className="w-3 h-3" /> Follow-up Needed
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-bold mb-1 uppercase">Today</span>
              <div className="p-2 bg-orange-500 text-white rounded-lg group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Mini Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-teal-600 p-5 rounded-3xl neo-shadow text-white flex flex-col items-center justify-center">
          <span className="text-3xl font-black">42</span>
          <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Checkups</span>
        </div>
        <div className="bg-white p-5 rounded-3xl neo-shadow border border-teal-50 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-teal-600">08</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-teal-600/40">Visits</span>
        </div>
        <div className="bg-white p-5 rounded-3xl neo-shadow border border-teal-50 flex flex-col items-center justify-center">
          <Calendar className="w-6 h-6 text-teal-400 mb-1" />
          <span className="text-[9px] font-black uppercase tracking-widest text-teal-600/40">Schedule</span>
        </div>
      </div>
    </div>
  );
};

export default PHWDashboard;
