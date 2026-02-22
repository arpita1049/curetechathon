import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, FileText,
  MessageSquare, Activity, Bell,
  Search, Plus, ChevronRight, Zap, AlertTriangle,
  Stethoscope, Pill, Share2,
  MessageCircle, ExternalLink,
  Brain, CheckCircle2,
  Lock, ShieldCheck, ArrowUpRight,
  AlertOctagon, Award, Briefcase
} from 'lucide-react';
import Premium3DBG from '../components/Premium3DBG';
import RiskMeter from '../components/RiskMeter';
import SecondOpinionFlow from '../components/SecondOpinionFlow';
import EmergencyMode from '../components/EmergencyMode';
import PracticeAnalytics from '../components/PracticeAnalytics';
import ConsultationPortal from '../components/ConsultationPortal';
import PatientsView from '../components/PatientsView';
import AppointmentsView from '../components/AppointmentsView';
import PrescriptionsView from '../components/PrescriptionsView';
import OpinionView from '../components/OpinionView';
import HubView from '../components/HubView';
import EmploymentView from '../components/EmploymentView';
import SecondOpinion from './SecondOpinion';

import PatientProfileView from '../components/PatientProfileView';


import CaseInsights from '../components/CaseInsights';
import PerformanceView from '../components/PerformanceView';

interface DoctorDashboardProps {
  onLogout: () => void;
  doctor?: any;
}

type DoctorView = 'DASHBOARD' | 'APPOINTMENTS' | 'PATIENTS' | 'PRESCRIPTIONS' | 'OPINION' | 'ANALYTICS' | 'HUB' | 'SETTINGS' | 'INSIGHTS' | 'CASE_INSIGHTS' | 'PERFORMANCE' | 'EMPLOYMENT' | 'SECOND_OPINION';

const colors = {
  primary: '#0F2A47',
  teal: '#008C8C',
  red: '#EF4444',
  amber: '#F59E0B',
  emerald: '#10B981',
  indigo: '#6366F1'
};

const API_BASE = 'http://localhost:5000/api/doctor';

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onLogout, doctor }) => {
  const [currentView, setCurrentView] = useState<DoctorView>('DASHBOARD');
  const [scrolled, setScrolled] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showOpinionFlow, setShowOpinionFlow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Real Data State
  const [cases, setCases] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockCases = [
    { name: "Arpita Sharma", id: "P-902", type: "Neural Scan", risk: 85, color: "rose" },
    { name: "Rahul Verma", id: "P-903", type: "Cardiac Review", risk: 62, color: "amber" },
    { name: "Priya Das", id: "P-904", type: "Post-Op", risk: 15, color: "teal" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [casesRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/cases`),
          fetch(`${API_BASE}/dashboard-stats`)
        ]);

        if (casesRes.ok && statsRes.ok) {
          const casesData = await casesRes.json();
          const statsData = await statsRes.json();

          setCases(casesData.data.cases.map((c: any) => ({
            ...c,
            name: c.patientName || "Unknown",
            id: c._id,
            type: c.chiefComplaint,
            risk: c.riskLevel === 'Critical' ? 95 : c.riskLevel === 'High' ? 75 : c.riskLevel === 'Moderate' ? 45 : 15,
            color: (c.riskLevel === 'Critical' || c.riskLevel === 'High') ? 'rose' : c.riskLevel === 'Moderate' ? 'amber' : 'teal'
          })));
          setStats(statsData.data);
          setIsOnline(true);
        } else {
          throw new Error('Backend unreachable');
        }
      } catch (error) {
        console.warn('Backend unavailable, using mock data');
        setCases(mockCases);
        setIsOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ icon: Icon, label, subtitle, view, isEmergency = false }: any) => (
    <button
      onClick={() => {
        if (isEmergency) setIsEmergencyMode(true);
        else setCurrentView(view);
      }}
      className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-500 group relative ${isEmergency ? 'bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white' : (currentView === view ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50')}`}
    >
      <Icon className={`w-5 h-5 ${currentView === view || isEmergency ? 'animate-pulse' : 'group-hover:scale-110 transition-transform duration-300'}`} />
      <div className="text-left">
        <span className="font-black uppercase tracking-widest text-[10px] block leading-none mb-1">{label}</span>
        <span className={`text-[8px] font-bold uppercase tracking-widest opacity-60 block leading-none ${currentView === view ? 'text-indigo-200' : 'text-slate-500'}`}>{subtitle}</span>
      </div>
    </button>
  );

  const MetricCard = ({ stat, i }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-2xl group hover:scale-105 transition-all"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className={`p-4 bg-${stat.color}-500/10 text-${stat.color}-500 rounded-2xl`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${stat.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500 animate-pulse'}`}>
            {stat.trend}
          </div>
        </div>
        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1426] text-slate-900 dark:text-white font-['Outfit'] selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Premium3DBG />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border-r border-white/20 z-50 p-10 flex flex-col">
        <div className="flex items-center gap-5 mb-16">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl transform -rotate-6">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none mb-1">CURE DASH</h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">System Secured</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          <NavItem icon={LayoutDashboard} label="Worklist" subtitle="Daily Operations" view="DASHBOARD" />
          <NavItem icon={Users} label="Patients" subtitle="Medical Registry" view="PATIENTS" />
          <NavItem icon={Calendar} label="Appointments" subtitle="Clinical Schedule" view="APPOINTMENTS" />
          <NavItem icon={Pill} label="Prescriptions" subtitle="Medicine Orders" view="PRESCRIPTIONS" />
          <NavItem icon={MessageSquare} label="Peer Review" subtitle="Collaboration" view="OPINION" />
          <NavItem icon={Stethoscope} label="Second Opinion" subtitle="Expert Analysis" view="SECOND_OPINION" />
          <NavItem icon={Briefcase} label="Employment" subtitle="Workforce" view="EMPLOYMENT" />
          <NavItem icon={Activity} label="Performance" subtitle="Quality Metrics" view="PERFORMANCE" />

          <div className="pt-8 space-y-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 mb-2">Urgent Protocol</p>
            <NavItem icon={AlertOctagon} label="Emergency" subtitle="Critical Res." view="DASHBOARD" isEmergency />
          </div>
        </nav>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-slate-500 hover:bg-rose-500 hover:text-white transition-all">
            <Lock className="w-4 h-4" />
            <span className="font-black uppercase tracking-widest text-[9px]">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-80 min-h-screen relative z-10">
        <header className={`px-12 py-8 flex justify-between items-center fixed top-0 right-0 left-80 z-40 transition-all ${scrolled ? 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/10' : ''}`}>
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Biometric IDs..."
              className="w-full pl-14 pr-6 py-4 bg-white/40 dark:bg-slate-800/20 backdrop-blur-xl border border-white/10 rounded-2xl outline-none font-bold text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-4 bg-white/70 dark:bg-slate-800/40 rounded-2xl border border-white/10 shadow-xl">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="text-right">
                <span className="block font-black uppercase text-sm tracking-tighter leading-none mb-1">Dr. Vikram Aditya</span>
                <span className="block text-[8px] font-black text-indigo-500 uppercase tracking-widest leading-none">Senior Medical Officer</span>
              </div>
              <div className="w-12 h-12 bg-indigo-600 rounded-xl p-0.5 shadow-2xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {currentView === 'DASHBOARD' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-12 pt-32 pb-20 space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Patient Intake", value: stats?.totalToday || "24", trend: "+12%", icon: Users, color: "indigo" },
                  { label: "High Risk Cases", value: stats?.criticalCases || "03", trend: "Review Required", icon: AlertTriangle, color: "rose" },
                  { label: "Clinical Success", value: "98%", trend: "Optimal", icon: ShieldCheck, color: "teal" },
                  { label: "Peer Consults", value: stats?.pendingAlerts || "05", trend: "+2 Pending", icon: MessageCircle, color: "amber" }
                ].map((stat, i) => <MetricCard key={i} stat={stat} i={i} />)}
              </div>

              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12 lg:col-span-8 p-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter">Hospital Intake Queue</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Clinical Triage Management</p>
                    </div>
                    {isLoading && <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />}
                  </div>
                  <div className="space-y-6">
                    {cases.length > 0 ? cases.map((p, i) => (
                      <div key={i} onClick={() => setSelectedPatient(p)} className="p-8 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-indigo-500/20 transition-all flex items-center gap-8 cursor-pointer group shadow-sm hover:shadow-xl">
                        <div className={`w-16 h-16 rounded-2xl bg-${p.color}-500/10 flex items-center justify-center text-${p.color}-500 font-black text-lg border border-${p.color}-500/10`}>{p.risk}%</div>
                        <div className="flex-1">
                          <h4 className="font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">{p.name}</h4>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.type} • ID: {p.id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-1.5 rounded-full bg-${p.color}-500/10 text-${p.color}-500 text-[9px] font-black uppercase tracking-widest`}>{p.risk > 80 ? 'Urgent' : 'Routine'}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCaseId(p.id);
                              setCurrentView('CASE_INSIGHTS');
                            }}
                            className="p-4 bg-white dark:bg-slate-800 rounded-2xl text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-500/5 shadow-lg flex items-center justify-center transition-all"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="p-32 text-center text-slate-400 font-black uppercase tracking-widest flex flex-col items-center gap-6">
                        <Activity className="w-16 h-16 opacity-20" />
                        Awaiting Global Mesh Stream...
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-12">
                  <div className="p-10 bg-indigo-600 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <Award className="w-10 h-10 text-white mb-8" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">Physician <br />Quality Summary</h4>
                    <p className="text-indigo-100 font-bold mb-8 uppercase text-[10px] tracking-widest leading-relaxed">Top 5% regional performance. All clinical protocols currently synchronized with NABH standards.</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span>Case Resolution Rate</span>
                        <span>92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-12 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-10">Regional Alerts</h4>
                    <div className="space-y-8">
                      {[
                        { t: "Medicine Shortage Grid-4", d: "2h ago", c: "amber" },
                        { t: "Critical Outbreak Warning", d: "4h ago", c: "rose" }
                      ].map((alert, i) => (
                        <div key={i} className="flex gap-6 items-start">
                          <div className={`w-3 h-3 rounded-full bg-${alert.c}-500 mt-1.5 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                          <div>
                            <p className="font-black text-sm uppercase tracking-tight text-slate-800 dark:text-slate-200">{alert.t}</p>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="px-12 pt-32 pb-20">
            {currentView === 'PATIENTS' && <PatientsView />}
            {currentView === 'APPOINTMENTS' && <AppointmentsView />}
            {currentView === 'PRESCRIPTIONS' && <PrescriptionsView />}
            {currentView === 'HUB' && <HubView />}
            {currentView === 'OPINION' && <OpinionView />}
            {currentView === 'SECOND_OPINION' && <SecondOpinion onBack={() => setCurrentView('DASHBOARD')} />}
            {currentView === 'EMPLOYMENT' && <EmploymentView />}
            {currentView === 'ANALYTICS' && <PracticeAnalytics />}
            {currentView === 'PERFORMANCE' && <PerformanceView />}
            {currentView === 'CASE_INSIGHTS' && selectedCaseId && (
              <CaseInsights
                caseId={selectedCaseId}
                onBack={() => setCurrentView('DASHBOARD')}
              />
            )}
          </div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedPatient && !isConsulting && (
          <PatientProfileView
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
            onStartConsult={() => setIsConsulting(true)}
            onRequestOpinion={() => setShowOpinionFlow(true)}
          />
        )}

        {isConsulting && selectedPatient && (
          <div className="fixed inset-0 z-[200] bg-slate-50 dark:bg-slate-950 overflow-y-auto px-12 pt-12">
            <CaseInsights
              caseId={selectedPatient.id}
              onBack={() => setIsConsulting(false)}
            />
          </div>
        )}
        {isEmergencyMode && <EmergencyMode onExit={() => setIsEmergencyMode(false)} />}
        {showOpinionFlow && (
          <SecondOpinionFlow
            patient={selectedPatient}
            onCancel={() => setShowOpinionFlow(false)}
            onComplete={() => setShowOpinionFlow(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDashboard;
