
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Languages, UserCircle2, Stethoscope, HeartPulse, Volume2, ChevronRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (role: UserRole, language: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('English');

  const languages = [
    { name: 'English', native: 'English', code: 'EN' },
    { name: 'Hindi', native: 'हिन्दी', code: 'HI' },
    { name: 'Marathi', native: 'मराठी', code: 'MR' },
    { name: 'Tamil', native: 'தமிழ்', code: 'TA' }
  ];

  const roles = [
    { id: UserRole.PHW, label: 'I am a Worker', icon: <HeartPulse />, color: 'bg-teal-500', desc: 'Manage village health cards.' },
    { id: UserRole.PATIENT, label: 'I am a Patient', icon: <UserCircle2 />, color: 'bg-emerald-500', desc: 'Check my health score.' },
    { id: UserRole.DOCTOR, label: 'I am a Doctor', icon: <Stethoscope />, color: 'bg-indigo-500', desc: 'Expert consults.' }
  ];

  return (
    <div className="animate-slide-up max-w-md mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-3xl neo-shadow mb-4 border border-white/10">
          <Activity className="w-10 h-10 text-teal-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-teal-950 mb-2">SwasthyaSetu</h2>
        <p className="text-teal-700/60 font-medium">Your Health, Your Language, Your Life.</p>
      </div>

      <div className="glass bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl p-8 rounded-[2.5rem] neo-shadow border border-white/50 dark:border-white/10">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-teal-900">Choose Language</h3>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-full text-xs font-bold hover:bg-teal-100 transition-colors">
                <Volume2 className="w-4 h-4" /> <span>Help</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {languages.map((l) => (
                <button
                  key={l.name}
                  onClick={() => { setLang(l.name); setStep(2); }}
                  className={`p-5 flex items-center justify-between rounded-2xl border-2 transition-all group ${lang === l.name
                    ? 'border-teal-500 bg-teal-50/50 neo-shadow'
                    : 'border-slate-100 dark:border-white/10 bg-white/70 dark:bg-[#0f2a47]/60 hover:border-teal-200'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-teal-600 text-sm">
                      {l.code}
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-teal-950">{l.native}</div>
                      <div className="text-sm text-teal-600/60 font-medium">{l.name}</div>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-all ${lang === l.name ? 'bg-teal-500 text-white' : 'bg-slate-50 text-slate-300'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : step === 2 ? (
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                <UserCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">Identify Yourself</h3>
            </div>

            <div className="space-y-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    if (r.id === UserRole.DOCTOR) {
                      setStep(3);
                    } else {
                      onComplete(r.id, lang);
                    }
                  }}
                  className="w-full p-4 flex items-center gap-5 border-2 border-slate-50 dark:border-white/10 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl hover:border-teal-400 hover:bg-teal-50/30 rounded-3xl transition-all group text-left neo-shadow"
                >
                  <div className={`p-4 ${r.color} text-white rounded-2xl neo-shadow group-hover:scale-105 transition-transform`}>
                    {React.cloneElement(r.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-extrabold text-teal-950">{r.label}</div>
                    <p className="text-teal-700/50 text-xs font-semibold">{r.desc}</p>
                  </div>
                  <ChevronRight className="text-teal-200 group-hover:text-teal-500" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-4 text-teal-500 font-bold text-sm hover:text-teal-600 transition-colors bg-teal-50/50 rounded-2xl"
            >
              Change Language
            </button>
          </div>
        ) : (
          /* Step 3: Doctor Verification Form */
          <div className="space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">Doctor Verification</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <input type="text" placeholder="Dr. " className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Specialization</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200">
                    <option>Cardiology</option>
                    <option>General Medicine</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Experience</label>
                  <input type="text" placeholder="Years" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Medical Reg. Number</label>
                <input type="text" placeholder="MCI-XXXX-XXXX" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-sm mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <FileIcon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-500">Upload Medical Council Certificate</p>
                <p className="text-[10px] text-slate-400">(PDF, JPG, PNG)</p>
              </div>
            </div>

            <button
              onClick={() => onComplete(UserRole.DOCTOR, lang)}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
            >
              Verify & Submit <Check className="w-5 h-5" />
            </button>

            <button onClick={() => setStep(2)} className="w-full text-xs font-bold text-slate-400 hover:text-indigo-600">Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

const FileIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
);

// Internal Activity icon for Onboarding branding
const Activity = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

export default Onboarding;
