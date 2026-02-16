import React, { useState } from 'react';
import {
  ClipboardCheck, MessageSquare, Video, Clock, AlertTriangle, ArrowRight,
  Users, Activity, TrendingUp, FileText, CheckCircle, XCircle, Pill,
  Thermometer, MoreHorizontal, Search, Bell, ShieldAlert, Brain, FileSignature, Stethoscope,
  Calendar, PieChart, ChevronRight, Settings, LogOut, Phone
} from 'lucide-react';
import MagicBento, { ParticleCard } from '../components/MagicBento';
import { useRef } from 'react';

interface DoctorDashboardProps {
  onLogout: () => void;
}

type DashboardView = 'OVERVIEW' | 'CASE_REVIEW' | 'ANALYTICS' | 'MY_CASES' | 'CONSULTS' | 'REPORTS';

interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  symptoms: string[];
  vitals: { bp: string; temp: string; spo2: string; hr: string };
  phwNotes: string;
  aiDiagnosis: {
    condition: string;
    confidence: number;
    risk: 'HIGH' | 'MODERATE' | 'LOW';
    reasoning: string[];
  };
  reports: string[];
}

const MOCK_CASE: PatientCase = {
  id: 'CASE-2024-001',
  name: 'Ramesh Kumar',
  age: 45,
  gender: 'M',
  symptoms: ['Chest pain radiating to left arm', 'Sweating', 'Shortness of breath'],
  vitals: { bp: '150/95', temp: '98.6°F', spo2: '96%', hr: '102 bpm' },
  phwNotes: 'Patient complained of sudden pain after lunch. History of smoking.',
  aiDiagnosis: {
    condition: 'Acute Coronary Syndrome',
    confidence: 88,
    risk: 'HIGH',
    reasoning: ['Radiating chest pain characteristic of cardiac origin', 'Elevated BP and Heart Rate', 'Risk factor: Smoking']
  },
  reports: ['ECG_v1.pdf', 'Lipid_Profile.pdf']
};

const MOCK_PATIENTS = [
  MOCK_CASE,
  { ...MOCK_CASE, id: '2', name: 'Anita Desai', age: 38, gender: 'F' as const, risk: 'MODERATE', condition: 'Diabetes T2', aiDiagnosis: { ...MOCK_CASE.aiDiagnosis, condition: 'Uncontrolled Diabetes', risk: 'MODERATE' as const, confidence: 92 } },
  { ...MOCK_CASE, id: '3', name: 'Suresh K.', age: 62, gender: 'M' as const, risk: 'HIGH', condition: 'Hypertension', aiDiagnosis: { ...MOCK_CASE.aiDiagnosis, condition: 'Hypertensive Crisis', risk: 'HIGH' as const, confidence: 95 } },
  { ...MOCK_CASE, id: '4', name: 'Meena R.', age: 29, gender: 'F' as const, risk: 'LOW', condition: 'Migraine', aiDiagnosis: { ...MOCK_CASE.aiDiagnosis, condition: 'Chronic Migraine', risk: 'LOW' as const, confidence: 85 } },
];

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('OVERVIEW');
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [prescription, setPrescription] = useState<string>('');
  const [showDrugAlert, setShowDrugAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCaseClick = (patientCase: PatientCase) => {
    setSelectedCase(patientCase);
    setCurrentView('CASE_REVIEW');
  };

  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setPrescription(val);
    if (val.toLowerCase().includes('aspirin') && val.toLowerCase().includes('warfarin')) {
      setShowDrugAlert(true);
    } else {
      setShowDrugAlert(false);
    }
  };

  const handleEscalate = () => {
    alert("Emergency Protocol Initiated! Ambulance dispatched and nearest hospital notified.");
  };

  const filteredPatients = MOCK_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.aiDiagnosis.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SidebarItem = ({ icon: Icon, label, active, onClick, color = 'indigo' }: any) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo-600 shadow-indigo-500/30 text-white',
      royal: 'bg-blue-700 shadow-blue-500/30 text-white',
      slate: 'bg-slate-700 shadow-slate-500/30 text-white',
      steel: 'bg-slate-800 shadow-slate-500/30 text-white',
      cyan: 'bg-cyan-600 shadow-cyan-500/30 text-white'
    };
    const hoverMap: Record<string, string> = {
      indigo: 'hover:text-indigo-400 hover:bg-indigo-500/10',
      royal: 'hover:text-blue-400 hover:bg-blue-500/10',
      slate: 'hover:text-slate-300 hover:bg-slate-100/10',
      steel: 'hover:text-slate-400 hover:bg-slate-100/10',
      cyan: 'hover:text-cyan-400 hover:bg-cyan-500/10'
    };

    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-bold group relative overflow-hidden ${active
          ? colorMap[color] + ' -translate-y-0.5 shadow-lg'
          : `text-slate-400 ${hoverMap[color]}`
          }`}
      >
        <Icon className={`w-5 h-5 transition-transform duration-500 ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`} />
        <span className="tracking-tight">{label}</span>
        {active && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white/40 rounded-l-full mr-2 blur-[1px]"></div>
        )}
      </button>
    );
  };

  const StatCard = ({ icon: Icon, label, value, trend, color, bg, glowColor = "79, 70, 229" }: any) => (
    <ParticleCard
      className="magic-bento-card group h-full"
      glowColor={glowColor}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      particleCount={8}
      style={{
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        '--glow-color': glowColor
      }}
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${bg}`}></div>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-8">
          <div className={`p-4 rounded-[1.5rem] bg-gradient-to-br ${bg} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
            <Icon className={`w-7 h-7 text-white`} />
          </div>
          {trend && (
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1 backdrop-blur-md">
              <TrendingUp className="w-3 h-3" /> {trend}
            </div>
          )}
        </div>
        <div>
          <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-[0.15em] mb-2">{label}</p>
          <h3 className="text-4xl font-black text-white tracking-tighter">{value}</h3>
        </div>
      </div>
    </ParticleCard>
  );

  const PatientList = ({ patients, title, showViewAll = false }: { patients: PatientCase[], title: string, showViewAll?: boolean }) => (
    <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in group">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" /> {title}
        </h3>
        {showViewAll && <button onClick={() => setCurrentView('MY_CASES')} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></button>}
      </div>
      {patients.length === 0 ? (
        <div className="p-8 text-center text-slate-400 dark:text-slate-500 font-medium bg-slate-50/20 dark:bg-slate-800/20">No patients found matching your search.</div>
      ) : (
        patients.map((patient, i) => (
          <div key={i} className="p-6 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors flex items-center justify-between gap-6 cursor-pointer group/item" onClick={() => handleCaseClick(patient)}>
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover/item:scale-105 transition-all ${patient.aiDiagnosis.risk === 'HIGH' ? 'bg-gradient-to-br from-red-100 to-red-200 text-red-600 shadow-red-200 dark:from-red-900/50 dark:to-red-800/50 dark:text-red-400 dark:shadow-none' : patient.aiDiagnosis.risk === 'MODERATE' ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 shadow-orange-200 dark:from-orange-900/50 dark:to-orange-800/50 dark:text-orange-400 dark:shadow-none' : 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 shadow-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 dark:text-emerald-400 dark:shadow-none'}`}>
                {patient.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-lg">{patient.name}</h4>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{patient.age} Yrs</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1"><Users className="w-3 h-3" /> Referred by PHW</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block text-right">
              <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 w-fit ml-auto border border-slate-200 dark:border-slate-700">
                {patient.aiDiagnosis.condition}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 justify-end mt-1">
                <Brain className="w-3 h-3" /> AI Diagnosis
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleCaseClick(patient); }}
              className="px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-2 transform active:scale-95"
            >
              Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );

  const Overview = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    return (
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Global Spotlight for Stats Grid */}
        <MagicBento
          enableSpotlight={true}
          enableStars={false} // We handle stars in StatCard individually
          glowColor="132, 0, 255"
        />

        {/* Stats Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 bento-section">
          <StatCard icon={Users} label="Total Patients" value="128" trend="+12%" bg="from-indigo-600 to-purple-600 shadow-indigo-500/30" glowColor="79, 70, 229" />
          <StatCard icon={MessageSquare} label="Pending Reviews" value="8" bg="from-cyan-500 to-blue-600 shadow-blue-500/30" glowColor="6, 182, 212" />
          <StatCard icon={ShieldAlert} label="High Risk Cases" value="3" trend="Urgent" bg="from-rose-600 to-red-700 shadow-red-500/30" glowColor="225, 29, 72" />
          <StatCard icon={Video} label="Consultations" value="24" bg="from-emerald-600 to-teal-700 shadow-emerald-500/30" glowColor="16, 185, 129" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Patient List (Top 2) */}
          <div className="lg:col-span-2 space-y-6">
            <PatientList patients={filteredPatients.slice(0, 2)} title="Priority Actions Needed" showViewAll />
          </div>

          {/* Sidebar: Alerts & Cost Transparency */}
          <div className="space-y-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-red-700 p-10 rounded-[3rem] text-white shadow-2xl shadow-red-600/30 group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

              <h4 className="font-black mb-8 flex items-center gap-4 relative z-10 text-xl tracking-tight">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30"><AlertTriangle className="w-7 h-7 text-white animate-bounce" /></div>
                Critical Risk Intel
              </h4>

              <div className="space-y-6 relative z-10">
                <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-xl group/alert hover:bg-white/15 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-extrabold text-lg">Suresh K.</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      <span className="text-[10px] font-black bg-white text-red-600 px-3 py-1 rounded-full uppercase tracking-widest">CRITICAL</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                    Sudden BP spike <span className="text-white font-black">(180/110)</span>. AI predicts <span className="underline decoration-white/50 underline-offset-4 font-black">72% risk</span> of cardiac origin within 24h.
                  </p>
                  <button
                    onClick={handleEscalate}
                    className="w-full py-4 bg-white text-red-600 text-sm font-black rounded-2xl hover:bg-red-50 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 group/btn"
                  >
                    <Phone className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" /> Initiate Emergency Protocol
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500/20 backdrop-blur-md rounded-2xl border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform"><Activity className="w-6 h-6" /></div>
                <h4 className="font-black text-xl tracking-tight">Rural Precision Mode</h4>
              </div>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
                Intelligence engine optimized for <span className="text-indigo-400 font-bold">low-bandwidth bandwidth synchronization</span>. Critical data retains 100% resolution.
              </p>
              <div className="flex items-center gap-3 bg-indigo-500/10 backdrop-blur-md px-5 py-2.5 rounded-full w-fit border border-indigo-500/20 shadow-inner">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Secure Sync Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MyCases = () => (
    <div className="space-y-6 animate-fade-in pb-12">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Patient Directory</h2>
      <PatientList patients={filteredPatients} title="All Cases" />
    </div>
  );

  const Consults = () => (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Consultations</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Calendar View</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700">New Appointment</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Rohan Gupta', time: '10:30 AM', type: 'Follow-up', topic: 'Post-Surgery Care', status: 'Online' },
          { name: 'Priya Sharma', time: '11:15 AM', type: 'New Consult', topic: 'Chronic Migraine', status: 'Waiting' },
          { name: 'Amit Verma', time: '02:00 PM', type: 'Urgent', topic: 'Chest Pain Review', status: 'Scheduled' },
          { name: 'Sarah Khan', time: '03:30 PM', type: 'Report Review', topic: 'Blood Work Analysis', status: 'Scheduled' }
        ].map((consult, i) => (
          <div key={i} className="bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Today</span>
                <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-lg">
                  <Clock className="w-4 h-4 text-blue-500" /> {consult.time}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${consult.status === 'Online' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30' : consult.status === 'Waiting' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'}`}>
                {consult.status}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 font-black text-lg shadow-inner">
                {consult.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">{consult.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{consult.type}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">Topic</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{consult.topic}</p>
            </div>

            <div className="flex gap-3">
              <button className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${consult.status === 'Online' || consult.status === 'Waiting' ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none hover:bg-blue-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                <Video className="w-4 h-4" /> Join Call
              </button>
              <button className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Reports = () => (
    <div className="space-y-6 animate-fade-in pb-12">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Recent Medical Reports</h2>
      <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl group-hover:scale-110 transition-transform"><FileText className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1">Blood_Work_Analysis_{i}.pdf</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">PDF</span>
                  <span>•</span>
                  <span>Uploaded by PHW</span>
                  <span>•</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">Download</button>
          </div>
        ))}
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6 animate-fade-in pb-12">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Public Health Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl"><PieChart className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Disease Prevalence</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Current Region: North Sector</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-600 dark:text-slate-400">Viral Fever</span>
                <span className="text-slate-900 dark:text-white">45%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-blue-500 w-[45%] h-full rounded-full shadow-lg shadow-blue-200 dark:shadow-none"></div></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-600 dark:text-slate-400">Dengue</span>
                <span className="text-slate-900 dark:text-white">30%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-red-500 w-[30%] h-full rounded-full shadow-lg shadow-red-200 dark:shadow-none"></div></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-600 dark:text-slate-400">Malaria</span>
                <span className="text-slate-900 dark:text-white">15%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-orange-500 w-[15%] h-full rounded-full shadow-lg shadow-orange-200 dark:shadow-none"></div></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-black text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/30 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><ShieldAlert className="w-6 h-6" /></div>
              <h3 className="font-bold text-xl">Regional Outbreak Alert</h3>
            </div>

            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              AI surveillance has detected a significant rise in vector-borne diseases in the following sector. Immediate action recommended.
            </p>

            <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center text-xl font-black bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                High
              </div>
              <div>
                <div className="text-2xl font-black text-white">Sector 4</div>
                <div className="text-sm font-bold text-red-400 uppercase tracking-widest mt-1">Requires Fogging</div>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-colors shadow-lg shadow-red-900/50">
              Notify Authorities
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CaseReview = () => {
    if (!selectedCase) return null;
    return (
      <div className="animate-fade-in space-y-6 pb-12">
        <button onClick={() => setCurrentView('OVERVIEW')} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm transition-colors group">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors"><ArrowRight className="w-4 h-4 rotate-180" /></div> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Patient Details & Reports */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-black text-slate-400 dark:text-slate-500 shadow-inner">
                  {selectedCase.name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{selectedCase.name}</h2>
                  <div className="flex flex-wrap gap-2 text-xs font-bold mt-2">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{selectedCase.age} Yrs</span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{selectedCase.gender}</span>
                    <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">{selectedCase.aiDiagnosis.risk} RISK</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Blood Pressure</div>
                  <div className="font-black text-xl text-slate-800 dark:text-white">{selectedCase.vitals.bp}</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">SpO2 Levels</div>
                  <div className="font-black text-xl text-slate-800 dark:text-white">{selectedCase.vitals.spo2}</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Heart Rate</div>
                  <div className="font-black text-xl text-slate-800 dark:text-white">{selectedCase.vitals.hr}</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Temperature</div>
                  <div className="font-black text-xl text-slate-800 dark:text-white">{selectedCase.vitals.temp}</div>
                </div>
              </div>

              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" /> Symptoms</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCase.symptoms.map(s => (
                  <span key={s} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700">{s}</span>
                ))}
              </div>

              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-orange-500" /> PHW Notes</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100/50 dark:border-amber-900/20 italic leading-relaxed">
                "{selectedCase.phwNotes}"
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Medical Reports
              </h4>
              <div className="space-y-3">
                {selectedCase.reports.map(r => (
                  <div key={r} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-xl group-hover:scale-110 transition-transform"><FileText className="w-5 h-5" /></div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{r}</span>
                    </div>
                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: AI Insight & Diagnosis */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 dark:from-purple-950 dark:to-slate-950 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                    <Brain className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Clinical Summary</h3>
                    <p className="text-purple-300 text-xs">Generated based on vitals and symptoms</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-2">Likely Diagnosis</p>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">{selectedCase.aiDiagnosis.condition}</h2>
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <p className="text-emerald-300 font-bold text-sm tracking-wide">{selectedCase.aiDiagnosis.confidence}% Match Confidence</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-purple-200 text-xs font-bold uppercase tracking-widest">Analysis Reasoning</p>
                    <ul className="space-y-2">
                      {selectedCase.aiDiagnosis.reasoning.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/90 font-medium bg-white/5 p-3 rounded-xl border border-white/5">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Bg Decor */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Workflow Actions */}
            <div className="bg-white dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 dark:bg-slate-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3 relative z-10">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl"><Stethoscope className="w-6 h-6" /></div>
                Doctor's Decision
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                {/* E-Prescription */}
                <div className="space-y-5">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-slate-400" /> Digital Prescription & Notes
                  </label>
                  <div className="relative group">
                    <textarea
                      value={prescription}
                      onChange={handlePrescriptionChange}
                      placeholder="Type diagnosis, medicine (e.g., Aspirin 75mg), or instructions..."
                      className="w-full h-48 p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl text-sm font-medium focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-300 dark:focus:border-blue-700 outline-none resize-none transition-all dark:text-white"
                    ></textarea>
                    {showDrugAlert && (
                      <div className="absolute bottom-4 right-4 left-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 shadow-lg shadow-red-100 dark:shadow-none">
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><AlertTriangle className="w-5 h-5 text-red-500 shrink-0" /></div>
                        <div>
                          <h5 className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">Drug Interaction Alert</h5>
                          <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed font-medium">Interaction detected between <span className="underline decoration-red-300">Aspirin</span> and <span className="underline decoration-red-300">Warfarin</span>. Risk of major bleeding.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPrescription(prev => prev + (prev ? '\n' : '') + 'Rx: Atorvastatin 20mg (Generic) - Once daily at night')}
                      className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors border border-emerald-100 dark:border-emerald-900/30"
                    >
                      <Pill className="w-4 h-4" /> Use Generic (Save ₹150)
                    </button>
                    <button
                      onClick={() => alert("Digital Signature Added: Dr. Adithya (Verified)")}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-900/30"
                    >
                      <FileSignature className="w-4 h-4" /> Add Digital Sign
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between space-y-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-4">Recommended Actions</label>
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => {
                          if (!prescription) {
                            alert("Please enter a prescription before approving.");
                            return;
                          }
                          alert(`Treatment Approved!\n\nPrescription sent to ${selectedCase.name}.\nPHW notified for medicine delivery.`);
                        }}
                        className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl flex items-center justify-between group hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-emerald-100 dark:shadow-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-200 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-800 dark:text-emerald-400 shadow-inner group-hover:scale-110 transition-transform"><CheckCircle className="w-6 h-6" /></div>
                          <div className="text-left">
                            <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">Approve Treatment</div>
                            <div className="text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">Send prescription to Patient</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-emerald-300 dark:text-emerald-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors" />
                      </button>

                      <button
                        onClick={() => alert("Request sent to PHW: Please record BP and temperature again in 1 hour.")}
                        className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl flex items-center justify-between group hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-amber-100 dark:shadow-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-amber-200 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-800 dark:text-amber-400 shadow-inner group-hover:scale-110 transition-transform"><MoreHorizontal className="w-6 h-6" /></div>
                          <div className="text-left">
                            <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">Request More Vitals</div>
                            <div className="text-[10px] text-amber-700 dark:text-amber-500 font-medium">Ask PHW to re-check</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-amber-300 dark:text-amber-700 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors" />
                      </button>

                      <button
                        onClick={() => alert("EMERGENCY ESCALATION TRIGGERED!\n\n- Nearest Ambulance Dispatched\n- District Hospital Notified\n- Patient location shared with emergency services.")}
                        className="p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl flex items-center justify-between group hover:bg-red-100 dark:hover:bg-red-900/20 transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-red-100 dark:shadow-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-200 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-800 dark:text-red-400 shadow-inner group-hover:scale-110 transition-transform"><ShieldAlert className="w-6 h-6" /></div>
                          <div className="text-left">
                            <div className="font-bold text-red-900 dark:text-red-300 text-sm">Escalate Emergency</div>
                            <div className="text-[10px] text-red-700 dark:text-red-500 font-medium">Notify nearest hospital</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-300 dark:text-red-700 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-50/80 dark:bg-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                      <span>Est. Treatment Cost</span>
                      <span className="text-slate-900 dark:text-white text-sm">₹800 - ₹1200</span>
                    </div>
                    <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-3"></div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span>Ins. Coverage</span>
                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/30">Ayushman Bharat Eligible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-transparent overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0f172a] dark:bg-[#020617] text-slate-300 flex flex-col hidden md:flex shadow-2xl relative z-20 border-r border-[#1e293b]">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight leading-none">CURE</h1>
              <span className="text-sm font-bold text-blue-500 tracking-widest uppercase">Doctor</span>
            </div>
          </div>

          <div className="space-y-3">
            <SidebarItem icon={Activity} label="Command Center" active={currentView === 'OVERVIEW'} onClick={() => setCurrentView('OVERVIEW')} color="indigo" />
            <SidebarItem icon={ClipboardCheck} label="Patient Registry" active={currentView === 'MY_CASES'} onClick={() => setCurrentView('MY_CASES')} color="sky" />
            <SidebarItem icon={MessageSquare} label="Digital Consults" active={currentView === 'CONSULTS'} onClick={() => setCurrentView('CONSULTS')} color="rose" />
            <SidebarItem icon={FileText} label="Clinical Insights" active={currentView === 'RECORDS'} onClick={() => setCurrentView('RECORDS')} color="fuchsia" />
            <SidebarItem icon={TrendingUp} label="Predictive Analytics" active={currentView === 'ANALYTICS'} onClick={() => setCurrentView('ANALYTICS')} color="amber" />
          </div>
        </div>

        <div className="mt-auto p-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-5 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">DA</div>
              <div>
                <div className="text-sm font-bold text-white">Dr. Adithya</div>
                <div className="text-[10px] text-slate-400 font-medium">Cardiologist • MBBS, MD</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>Status</span>
              <span className="text-emerald-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Online</span>
            </div>
          </div>

          <button onClick={onLogout} className="w-full py-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-center gap-2 group">
            <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-transparent transition-colors duration-300">
        {/* Top Header */}
        <header className="h-28 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-12 sticky top-0 z-[60] transition-all duration-500">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Clinical Control Center</p>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              {currentView === 'OVERVIEW' ? 'Command Overview' :
                currentView === 'MY_CASES' ? 'Patient Registry' :
                  currentView === 'CONSULTS' ? 'Digital Consults' :
                    currentView === 'REPORTS' ? 'Clinical Insights' :
                      currentView === 'ANALYTICS' ? 'Predictive Analytics' :
                        'Specialized Review'}
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative group">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search case numbers, patients, or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-8 py-4 bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 w-[400px] transition-all placeholder:text-slate-400 dark:text-white shadow-inner"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[1.25rem] text-slate-400 hover:text-indigo-600 hover:border-indigo-100 dark:hover:bg-indigo-900/20 relative transition-all shadow-sm group">
                <Bell className="w-6 h-6 group-hover:animate-swing transition-transform" />
                <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white dark:border-slate-900 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
              </button>

              <div className="flex items-center gap-4 pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-600 shadow-xl shadow-indigo-500/20 flex items-center justify-center p-0.5 transform hover:rotate-3 transition-transform cursor-pointer">
                  <div className="w-full h-full rounded-[1.1rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor1&backgroundColor=ffffff" alt="Doctor Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-transparent transition-colors duration-500">
          <div className="max-w-[1600px] mx-auto">
            {currentView === 'OVERVIEW' && <Overview />}
            {currentView === 'CASE_REVIEW' && <CaseReview />}
            {currentView === 'MY_CASES' && <MyCases />}
            {currentView === 'CONSULTS' && <Consults />}
            {currentView === 'REPORTS' && <Reports />}
            {currentView === 'ANALYTICS' && <Analytics />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
