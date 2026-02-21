import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MedicalCaseReview from './medical/MedicalCaseReview';
import ClinicalDecisionSupport from './medical/ClinicalDecisionSupport';
import UnifiedDecisionRecord from './medical/UnifiedDecisionRecord';
import RiskBadge from './medical/RiskBadge';
import { ChevronLeft, Share2, Printer, CheckCircle } from 'lucide-react';

interface CaseInsightsProps {
    caseId: string;
    onBack: () => void;
}

const CaseInsights: React.FC<CaseInsightsProps> = ({ caseId, onBack }) => {
    const [activeTab, setActiveTab] = useState<'review' | 'support' | 'record'>('review');
    const [caseData, setCaseData] = useState<any>(null);
    const [supportData, setSupportData] = useState<any>(null);
    const [recordData, setRecordData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from the backend endpoints implemented
        // Here we'll use mock data that matches the backend structure for demonstration
        const fetchAll = async () => {
            setLoading(true);
            // Simulate API latency
            await new Promise(r => setTimeout(r, 800));

            setCaseData({
                patientName: "Arpita Sharma",
                patientAge: 28,
                patientGender: "Female",
                chiefComplaint: "Persistent severe headache with intermittent visual aura and nausea.",
                duration: "4 days",
                vitals: {
                    temp: "98.6°F",
                    bp: "135/85 mmHg",
                    pulse: "78 bpm",
                    spO2: "98%"
                },
                medicalHistory: ["Migraine history", "Mild hypertension"],
                uploadedReports: [
                    { name: "MRI Brain (Contrast).pdf", date: "Feb 20, 2026" },
                    { name: "CBC_Blood_Panel.pdf", date: "Feb 19, 2026" }
                ],
                riskLevel: "High",
                riskScore: 75,
                recommendedAction: "Escalate to Neurology for specialist review"
            });

            setSupportData({
                diagnoses: [
                    {
                        name: "Atypical Migraine with Aura",
                        confidence: 85,
                        why: "Patient history of migraines combined with current symptoms of photophobia and nausea. BP is slightly elevated but consistent with stress/pain response."
                    },
                    {
                        name: "Tension-type Headache",
                        confidence: 45,
                        why: "Bilateral presentation and duration criteria met, though intensity is higher than typical tension headaches."
                    }
                ],
                redFlags: ["Sudden onset intensity", "Visual disturbances"],
                suggestedTests: ["Fundoscopic Exam", "Repeat BP check in 4h"],
                drugPrecautions: ["Avoid Sumatriptan if BP exceeds 140/90", "Monitor for serotonin syndrome if combined with existing SSRIs"]
            });

            setRecordData({
                primaryDecision: {
                    plan: "Prescribed Sumatriptan 50mg and advised bed rest in a dark room. Requested MRI to rule out secondary causes.",
                    doctorName: "Dr. Vikram Aditya",
                    timestamp: "Feb 21, 2026 10:30 AM"
                },
                specialistResponse: {
                    plan: "MRI reviewed. No acute intracranial pathology noted. Recommend switching to Topiramate for prophylaxis given frequency of episodes.",
                    specialistName: "Dr. Sarah Chen (Neurology)",
                    timestamp: "Feb 21, 2026 02:45 PM"
                },
                finalPlan: "Continue current acute treatment. Start Topiramate 25mg daily. Follow up in 2 weeks with headache diary.",
                auditLog: [
                    { action: "Case Created", by: "Dr. Vikram Aditya", timestamp: "Feb 21, 2026 10:00 AM", details: "Initial presentation recorded" },
                    { action: "Second Opinion Requested", by: "Dr. Vikram Aditya", timestamp: "Feb 21, 2026 11:15 AM", details: "Escalated to Neurology" },
                    { action: "Specialist Responded", by: "Dr. Sarah Chen", timestamp: "Feb 21, 2026 02:45 PM", details: "Plan updated with prophylaxis" }
                ]
            });

            setLoading(false);
        };

        fetchAll();
    }, [caseId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Compiling Clinical Data...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-20"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-4 mb-1">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Case Insights</h2>
                            <RiskBadge level={caseData.riskLevel} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case ID: {caseId.toUpperCase()} • Last Sync: Jul 21, 2026</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                        <Printer className="w-4 h-4" /> Print Record
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                        <Share2 className="w-4 h-4" /> Export
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-colors">
                        <CheckCircle className="w-4 h-4" /> Close Case
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit">
                {[
                    { id: 'review', label: 'Case Review' },
                    { id: 'support', label: 'Decision Support' },
                    { id: 'record', label: 'Unified Record' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'review' && <MedicalCaseReview data={caseData} />}
                    {activeTab === 'support' && <ClinicalDecisionSupport data={supportData} />}
                    {activeTab === 'record' && <UnifiedDecisionRecord data={recordData} />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default CaseInsights;
