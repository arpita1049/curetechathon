
import React, { useState } from 'react';
import { getHealthRiskPrediction } from '../geminiService';
import { RiskPredictionResult, RiskLevel } from '../types';
import { ChevronLeft, Loader2, Heart, Activity, ClipboardList, Info } from 'lucide-react';

interface RiskPredictionProps {
  onBack: () => void;
}

const RiskPrediction: React.FC<RiskPredictionProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [lifestyle, setLifestyle] = useState('');
  const [risks, setRisks] = useState<RiskPredictionResult[] | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Mock vitals for this demo
      const res = await getHealthRiskPrediction({
        age: 45, gender: 'Male', bp_systolic: 145, bp_diastolic: 95, sugar: 210, temp: 98, spo2: 97
      }, lifestyle);
      setRisks(res);
    } catch (e) {
      alert("Error calculating risk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-10 animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center text-teal-600 font-bold">
        <ChevronLeft /> Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Long-term Health Risk Prediction</h2>
      <p className="text-gray-500 mb-8">Identify chronic disease risks before they become serious.</p>

      {!risks ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Lifestyle Factors</label>
            <textarea 
              className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Mention habits like smoking, alcohol, exercise frequency, family history of diabetes/heart disease..."
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
            />
          </div>
          <button 
            onClick={handlePredict}
            disabled={loading || !lifestyle}
            className={`w-full py-4 ${loading ? 'bg-orange-400' : 'bg-orange-500'} text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2`}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Predict My Risks'}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-scale-in">
          {risks.map((risk, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="text-teal-500" /> {risk.disease}
                </h3>
                <div className={`px-4 py-1 rounded-full text-xs font-bold ${
                  risk.meterLevel === RiskLevel.HIGH ? 'bg-red-100 text-red-600' : 
                  risk.meterLevel === RiskLevel.MODERATE ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {risk.meterLevel}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Risk Percentage</span>
                  <span className="text-teal-600">{risk.riskPercentage}%</span>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      risk.riskPercentage > 70 ? 'bg-red-500' : risk.riskPercentage > 40 ? 'bg-orange-400' : 'bg-green-500'
                    }`}
                    style={{ width: `${risk.riskPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                  <span>LOW</span>
                  <span>MODERATE</span>
                  <span>HIGH</span>
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-2xl">
                <h4 className="font-bold text-teal-800 text-sm mb-3 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" /> Preventive Action Plan
                </h4>
                <ul className="space-y-2">
                  {risk.preventivePlan.map((step, i) => (
                    <li key={i} className="text-sm text-teal-700 flex items-start gap-2">
                      <div className="min-w-[18px] h-[18px] bg-teal-200 text-teal-800 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setRisks(null)}
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
          >
            Start New Prediction
          </button>
        </div>
      )}
    </div>
  );
};

export default RiskPrediction;
