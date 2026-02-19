
import React, { useState } from 'react';
import { Vitals, DiagnosisResult, RiskLevel } from '../types';
import { getAIdiagnosis } from '../geminiService';
import { ChevronLeft, ChevronRight, Save, Activity, Thermometer, Droplets, Heart, Scale, Mic, Loader2, AlertCircle, CheckCircle, MessageSquareShare, FileText } from 'lucide-react';

interface AssessmentFlowProps {
  onBack: () => void;
}

const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [vitals, setVitals] = useState<Vitals>({
    age: 35,
    gender: 'Male',
    bp_systolic: 120,
    bp_diastolic: 80,
    sugar: 100,
    temp: 98.6,
    spo2: 98
  });
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await getAIdiagnosis(vitals, symptoms);
      setResult(res);
      setStep(3);
    } catch (error) {
      console.error(error);
      alert("Error generating diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const VitalInput = ({ label, icon, value, onChange, unit, color }: any) => (
    <div className="p-4 bg-white rounded-3xl border border-teal-50 neo-shadow flex items-center gap-4 group transition-all hover:border-teal-200">
      {/* Fix: Adding <any> to React.ReactElement to allow custom props in cloneElement */}
      <div className={`p-3 rounded-2xl shadow-sm ${color} text-white group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
      </div>
      <div className="flex-grow">
        <label className="text-[10px] text-teal-600/60 uppercase font-black tracking-widest block mb-0.5">{label}</label>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full bg-transparent border-none text-xl font-black text-teal-950 focus:ring-0 p-0"
          />
          <span className="text-xs font-bold text-teal-600/40 uppercase">{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-slide-up pb-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl text-teal-600 neo-shadow hover:bg-teal-50 transition-colors">
          <ChevronLeft />
        </button>
        <div className="flex-grow text-center px-4">
          <h2 className="text-2xl font-black text-teal-950 leading-none">Assessment</h2>
          <span className="text-[10px] font-bold text-teal-600/60 uppercase tracking-widest">Step {step} of 3</span>
        </div>
        <div className="w-11"></div> {/* Spacer */}
      </div>

      {/* Custom Stepper */}
      <div className="flex items-center justify-between mb-10 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all border-4 ${
              step === s ? 'bg-teal-600 text-white border-teal-100 scale-110 neo-shadow' : 
              step > s ? 'bg-emerald-500 text-white border-emerald-100' : 'bg-slate-100 text-slate-400 border-transparent'
            }`}>
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`absolute top-5 left-[50%] w-full h-1 -z-10 ${step > s ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VitalInput label="Age" color="bg-blue-500" icon={<Scale />} value={vitals.age} onChange={(v:any) => setVitals({...vitals, age: v})} unit="years" />
            <div className="p-4 bg-white rounded-3xl border border-teal-50 neo-shadow flex items-center gap-4 group transition-all hover:border-teal-200">
              <div className="p-3 bg-indigo-500 text-white rounded-2xl group-hover:scale-110 transition-transform"><Activity /></div>
              <div className="flex-grow">
                <label className="text-[10px] text-teal-600/60 uppercase font-black tracking-widest block mb-0.5">Gender</label>
                <select 
                  value={vitals.gender}
                  onChange={(e) => setVitals({...vitals, gender: e.target.value as any})}
                  className="w-full bg-transparent border-none text-xl font-black text-teal-950 focus:ring-0 p-0 cursor-pointer"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <VitalInput label="Oxygen" color="bg-cyan-500" icon={<Activity />} value={vitals.spo2} onChange={(v:any) => setVitals({...vitals, spo2: v})} unit="%" />
            <VitalInput label="Temp" color="bg-orange-500" icon={<Thermometer />} value={vitals.temp} onChange={(v:any) => setVitals({...vitals, temp: v})} unit="°F" />
            <VitalInput label="Systolic BP" color="bg-red-500" icon={<Heart />} value={vitals.bp_systolic} onChange={(v:any) => setVitals({...vitals, bp_systolic: v})} unit="mmHg" />
            <VitalInput label="Sugar" color="bg-amber-500" icon={<Droplets />} value={vitals.sugar} onChange={(v:any) => setVitals({...vitals, sugar: v})} unit="mg/dL" />
          </div>
          <button 
            onClick={() => setStep(2)}
            className="w-full py-5 bg-teal-600 text-white font-black rounded-[2rem] neo-shadow hover:bg-teal-700 transition-all flex items-center justify-center gap-3 text-lg"
          >
            Symptom Entry <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] neo-shadow border border-white/50 space-y-6">
             <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-teal-950">Patient Complaints</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-2xl text-sm font-black border border-red-100 hover:bg-red-100 transition-colors">
                <Mic className="w-5 h-5" /> Voice
              </button>
            </div>
            <textarea 
              className="w-full h-48 p-6 bg-teal-50/30 border border-teal-100 rounded-3xl focus:ring-4 focus:ring-teal-100 outline-none text-teal-950 font-medium text-lg resize-none custom-scrollbar"
              placeholder="Record duration, severity, and specific symptoms..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 py-5 bg-white text-teal-600 font-black rounded-3xl border border-teal-100 neo-shadow hover:bg-teal-50"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading || !symptoms}
              className={`flex-[2] py-5 ${loading ? 'bg-teal-400' : 'bg-teal-600'} text-white font-black rounded-3xl shadow-lg flex items-center justify-center gap-3 text-lg neo-shadow transition-all`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Generate Diagnosis <Activity className="w-5 h-5" /></>}
            </button>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <div className="space-y-6 animate-slide-up">
          <div className="bg-white p-8 rounded-[3rem] neo-shadow border border-teal-50 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-teal-50 text-teal-600 rounded-3xl neo-shadow">
                    <FileText className="w-8 h-8" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-teal-950 tracking-tight">AI Assessment</h2>
                    <span className="text-[10px] font-black text-teal-600/60 uppercase tracking-[0.2em]">Medical Report</span>
                 </div>
              </div>
              <div className={`px-6 py-3 rounded-full text-xs font-black flex items-center gap-3 neo-shadow ${
                result.riskLevel === RiskLevel.HIGH ? 'bg-red-600 text-white' : 
                result.riskLevel === RiskLevel.MODERATE ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {result.riskLevel === RiskLevel.HIGH ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                {result.riskLevel} PRIORITY
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-teal-600/60 uppercase tracking-widest border-b border-teal-50 pb-2">Likely Conditions</h3>
              <div className="grid grid-cols-1 gap-4">
                {result.conditions.map((c, i) => (
                  <div key={i} className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-extrabold text-teal-950">{c.name}</span>
                      <span className="text-teal-600 font-black text-xl">{Math.round(c.probability * 100)}%</span>
                    </div>
                    <div className="h-3 w-full bg-white rounded-full overflow-hidden p-0.5 border border-teal-100 shadow-inner">
                      <div 
                        className="h-full bg-teal-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
                        style={{ width: `${c.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2rem] neo-shadow">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Recommended Protocol</h3>
              <p className="text-white text-lg font-medium leading-relaxed whitespace-pre-wrap opacity-90">{result.protocol}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full py-5 bg-teal-600 text-white font-black rounded-3xl neo-shadow hover:bg-teal-700 transition-all flex items-center justify-center gap-3">
                <Save className="w-6 h-6" /> Save Case Record
              </button>
              {result.riskLevel === RiskLevel.HIGH && (
                <button className="w-full py-5 bg-purple-600 text-white font-black rounded-3xl neo-shadow hover:bg-purple-700 transition-all flex items-center justify-center gap-3">
                  <MessageSquareShare className="w-6 h-6" /> Escalate to Specialist
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={onBack}
            className="w-full py-4 text-teal-600/50 font-black text-xs uppercase tracking-widest hover:text-teal-600 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentFlow;
