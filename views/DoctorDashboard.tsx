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
  AlertOctagon
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
import CaseReviewView from '../components/CaseReviewView';
import RiskAnalysisView from '../components/RiskAnalysisView';
import MonitoringView from '../components/MonitoringView';
import DashboardHub from '../components/DashboardHub';

import PatientProfileView from '../components/PatientProfileView';

interface DoctorDashboardProps {
  onLogout: () => void;
  doctor?: any;
}

type DoctorView =
  | 'DASHBOARD'
  | 'CASE_REVIEW'
  | 'OPINION'
  | 'RISK_STRATIFICATION'
  | 'MONITORING'
  | 'EMERGENCY'
  | 'TREATMENT_PLAN'
  | 'PATIENTS'
  | 'APPOINTMENTS'
  | 'PRESCRIPTIONS'
  | 'HUB'
  | 'SETTINGS';

const colors = {
  primary: '#0F2A47',
  teal: '#008C8C',
  red: '#EF4444',
  amber: '#F59E0B',
  emerald: '#10B981',
  indigo: '#6366F1'
};

const API_BASE = 'http://localhost:5000/doctor';

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onLogout, doctor }) => {
  const [currentView, setCurrentView] = useState<DoctorView>('DASHBOARD');
  const [scrolled, setScrolled] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showOpinionFlow, setShowOpinionFlow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  // Real Data State
  const [cases, setCases] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
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
        const [casesRes, statsRes, alertsRes] = await Promise.all([
          fetch(`${API_BASE}/cases`),
          fetch(`${API_BASE}/dashboard`),
          fetch(`${API_BASE}/notifications`)
        ]);

        if (casesRes.ok && statsRes.ok) {
          const casesData = await casesRes.json();
          const statsData = await statsRes.json();
          const alertsData = alertsRes.ok ? await alertsRes.json() : { data: [] };

          setCases(casesData.data.cases.map((c: any) => ({
            ...c,
            name: c.patientId?.name || "Unknown",
            id: c._id,
            type: c.chiefComplaint,
            risk: c.riskLevel === 'CRITICAL' ? 95 : c.riskLevel === 'HIGH' ? 75 : c.riskLevel === 'MEDIUM' ? 45 : 15,
            color: c.riskLevel === 'CRITICAL' || c.riskLevel === 'HIGH' ? 'rose' : c.riskLevel === 'MEDIUM' ? 'amber' : 'teal'
          })));
          setStats(statsData.data);
          setAlerts(alertsData.data.slice(0, 5));
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
      className="p-10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl group hover:scale-105 transition-all"
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
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white font-['Outfit'] selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Premium3DBG />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white/70 dark:bg-[#0f2a47]/80 backdrop-blur-3xl border-r border-white/20 z-50 p-10 flex flex-col">
        <div className="flex items-center gap-5 mb-16">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl transform -rotate-6">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none mb-1">CURE DASH</h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Node Active</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          <NavItem icon={LayoutDashboard} label="Dashboard Hub" subtitle="Case Inbox" view="DASHBOARD" />
          <NavItem icon={Brain} label="AI Case Review" subtitle="Neural Triage" view="CASE_REVIEW" />
          <NavItem icon={Share2} label="Second Opinion" subtitle="Peer Network" view="OPINION" />
          <NavItem icon={Activity} label="Risk Stratification" subtitle="Predictive Nodes" view="RISK_STRATIFICATION" />
          <NavItem icon={Bell} label="Patient Monitoring" subtitle="Real-time Alerts" view="MONITORING" />

          <div className="my-6 h-px bg-slate-100 dark:bg-slate-800/50" />

          <NavItem icon={Users} label="Patients" subtitle="Registry" view="PATIENTS" />
          <NavItem icon={Calendar} label="Appointments" subtitle="Ledger" view="APPOINTMENTS" />
          <NavItem icon={Pill} label="Prescriptions" subtitle="Rx Manager" view="PRESCRIPTIONS" />
          <NavItem icon={FileText} label="Clinical Hub" subtitle="Protocols" view="HUB" />

          <div className="pt-8 space-y-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 mb-2">High Acuity</p>
            <NavItem icon={AlertOctagon} label="Emergency Assist" subtitle="STAT Protocol" view="DASHBOARD" isEmergency />
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
        <header className={`px-12 py-8 flex justify-between items-center fixed top-0 right-0 left-80 z-40 transition-all ${scrolled ? 'bg-white/70 dark:bg-[#0f2a47]/90 backdrop-blur-2xl border-b border-white/10' : ''}`}>
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
                <span className="block text-[8px] font-black text-indigo-500 uppercase tracking-widest leading-none">Senior Medical Node</span>
              </div>
              <div className="w-12 h-12 bg-indigo-500 rounded-xl p-0.5 shadow-2xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-12 pt-32 pb-20"
          >
            {currentView === 'DASHBOARD' && <DashboardHub />}
            {currentView === 'CASE_REVIEW' && <CaseReviewView />}
            {currentView === 'OPINION' && <OpinionView />}
            {currentView === 'RISK_STRATIFICATION' && <RiskAnalysisView />}
            {currentView === 'MONITORING' && <MonitoringView />}
            {currentView === 'PATIENTS' && <PatientsView />}
            {currentView === 'APPOINTMENTS' && <AppointmentsView />}
            {currentView === 'PRESCRIPTIONS' && <PrescriptionsView />}
            {currentView === 'HUB' && <HubView />}
          </motion.div>
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
          <ConsultationPortal
            patient={selectedPatient}
            onClose={() => setIsConsulting(false)}
          />
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
