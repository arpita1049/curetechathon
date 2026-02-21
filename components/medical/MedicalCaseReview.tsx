import React from 'react';
import { FileText, Activity, Clock, FileWarning, ClipboardList } from 'lucide-react';

interface CaseData {
    patientName: string;
    patientAge: number;
    patientGender: string;
    chiefComplaint: string;
    duration: string;
    vitals: {
        temp: string;
        bp: string;
        pulse: string;
        spO2: string;
    };
    medicalHistory: string[];
    uploadedReports: Array<{ name: string; date: string }>;
}

const MedicalCaseReview: React.FC<{ data: CaseData }> = ({ data }) => {
    return (
        <div className="space-y-8 bg-white dark:bg-slate-900/50 p-10 rounded-3xl border border-slate-200 dark:border-slate-800">
            <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                    <ClipboardList className="w-6 h-6 text-indigo-600" />
                    Structured Case Review
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-2">
                    Patient: {data.patientName} | {data.patientAge}Y | {data.patientGender}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chief Complaint */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                        <FileWarning className="w-4 h-4" /> Chief Complaint
                    </h4>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{data.chiefComplaint}</p>
                        <p className="text-xs text-slate-500 font-bold mt-1">Duration: {data.duration}</p>
                    </div>
                </section>

                {/* Vitals */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                        <Activity className="w-4 h-4" /> Objective Vitals
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(data.vitals).map(([key, val]) => (
                            <div key={key} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                                <span className="text-base font-black text-slate-800 dark:text-slate-200">{val}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Medical History */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                        <Clock className="w-4 h-4" /> Medical History
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {data.medicalHistory.map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Clinical Reports */}
                <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                        <FileText className="w-4 h-4" /> Uploaded Reports
                    </h4>
                    <div className="space-y-2">
                        {data.uploadedReports.map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{report.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-400">{report.date}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MedicalCaseReview;
