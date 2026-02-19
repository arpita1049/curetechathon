
import React, { useState, useEffect, useRef } from 'react';
import {
    Send, Mic, Activity, Thermometer, Info,
    MapPin, Phone, FileText, Share2, Shield,
    AlertCircle, CheckCircle, ChevronRight, Menu,
    DollarSign, Stethoscope, Image as ImageIcon,
    Heart, Zap, User, X
} from 'lucide-react';

interface SmartSymptomCheckerProps {
    onBack: () => void;
    onConsultDoctor?: () => void;
}

type Message = {
    id: number;
    type: 'bot' | 'user';
    text: string;
    buttons?: string[];
};

type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export default function SmartSymptomChecker({ onBack, onConsultDoctor }: SmartSymptomCheckerProps) {
    const [stage, setStage] = useState<'CHAT' | 'ANALYSING' | 'RESULT'>('CHAT');
    const [inputText, setInputText] = useState('');
    const [showRemedies, setShowRemedies] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'bot',
            text: "Namaste! I'm your AI Health Assistant. What are you feeling today?",
            buttons: [
                'Fever 🤒', 'Headache 🤕', 'Stomach Pain 🤢',
                'Cold & Cough 🤧', 'Chest Pain 🫀',
                'Sore Throat 😫', 'Rashes 🦠', 'Fatigue 😴',
                'Back Pain 🚶', 'Nausea 🤮'
            ]
        }
    ]);
    const [isListening, setIsListening] = useState(false);
    const scrollEndRef = useRef<HTMLDivElement>(null);

    const getButtonColor = (symptom: string) => {
        const colors = [
            'bg-rose-500 shadow-rose-500/30',
            'bg-amber-500 shadow-amber-500/30',
            'bg-violet-500 shadow-violet-500/30',
            'bg-cyan-500 shadow-cyan-500/30',
            'bg-emerald-500 shadow-emerald-500/30',
            'bg-indigo-500 shadow-indigo-500/30',
            'bg-fuchsia-500 shadow-fuchsia-500/30'
        ];
        const hash = symptom.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    useEffect(() => {
        scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance("Namaste! I'm your AI Health Assistant. What are you feeling today?");
        synth.speak(utterance);
    }, []);

    // Mock Analysis State
    const [analysisResult, setAnalysisResult] = useState<{
        riskScore: number;
        riskLevel: RiskLevel;
        condition: string;
        confidence: number;
        triageColor: 'green' | 'yellow' | 'red';
    } | null>(null);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        // Add User Message
        const newUserMsg: Message = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Simulate AI Response/Analysis Logic
        setTimeout(() => {
            // Simple heuristic for demo purposes
            const lowerText = text.toLowerCase();

            if (lowerText.includes('chest') || lowerText.includes('heart') || lowerText.includes('severe')) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "This sounds serious. Can you tell me if you have any shortness of breath or sweating?"
                }]);
                // Trigger result after a short delay for demo
                setTimeout(() => startAnalysis('HIGH'), 2000);
            } else if (lowerText.includes('fever') || lowerText.includes('cold')) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "I understand. How long have you had this fever? Is it high?",
                    buttons: ['1 Day', '2-3 Days', '> 1 Week', 'High Fever (>102°F)']
                }]);
                // Auto-analyze after another interaction (mocking user clicking a button next)
            } else {
                // Default catch-all
                startAnalysis('MODERATE');
            }
        }, 1000);
    };

    const startAnalysis = (forcedLevel?: RiskLevel) => {
        setStage('ANALYSING');
        setTimeout(() => {
            // Mock Result
            setAnalysisResult({
                riskScore: forcedLevel === 'HIGH' ? 89 : 42,
                riskLevel: forcedLevel || 'MODERATE',
                condition: forcedLevel === 'HIGH' ? 'Cardiac Stress / Angina' : 'Viral Flu / Infection',
                confidence: 92,
                triageColor: forcedLevel === 'HIGH' ? 'red' : 'yellow'
            });
            setStage('RESULT');
        }, 2500);
    };

    const QuickButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-white border border-teal-100 rounded-full text-teal-700 text-sm font-bold shadow-sm hover:bg-teal-50 transition-colors animate-fade-in"
        >
            {label}
        </button>
    );

    // Render Chat Interface
    if (stage === 'CHAT') {
        return (
            <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] overflow-hidden neo-shadow border border-white dark:border-slate-800 relative shadow-2xl">
                {/* Header */}
                <div className="bg-white/90 dark:bg-slate-900/90 p-6 flex justify-between items-center backdrop-blur-md border-b border-teal-50 dark:border-slate-800 z-10 sticky top-0 shadow-sm">
                    <button onClick={onBack} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400">
                        <ChevronRight className="w-8 h-8 rotate-180" />
                    </button>
                    <h2 className="text-3xl font-black text-teal-950 dark:text-white flex items-center gap-3 tracking-tight">
                        <Activity className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                        AI Symptom Checker
                    </h2>
                    <div className="w-10"></div>
                </div>

                {/* Chat Area */}
                <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white dark:bg-slate-950 relative">
                    {/* Background Glows for Color Density */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px]"></div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                            {msg.type === 'bot' && (
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-purple-200 dark:from-fuchsia-900/50 dark:to-purple-900/50 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg border border-fuchsia-200/50">
                                    <Zap className="w-7 h-7 text-fuchsia-600 dark:text-fuchsia-400" />
                                </div>
                            )}
                            <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-lg font-bold leading-relaxed shadow-xl ${msg.type === 'user'
                                ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-br-none shadow-indigo-500/20'
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-bl-none border-2 border-fuchsia-100 dark:border-fuchsia-900/30'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Contextual Buttons (from last bot message) */}
                    {messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].buttons && (
                        <div className="flex flex-wrap gap-4 pl-16">
                            {messages[messages.length - 1].buttons?.map((btn, i) => (
                                <button
                                    key={`${i}-${btn}`}
                                    onClick={() => handleSend(btn)}
                                    className={`px-8 py-4 ${getButtonColor(btn)} text-white rounded-full text-base font-black shadow-xl hover:scale-110 active:scale-95 transition-all animate-slide-up flex items-center gap-2`}
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={scrollEndRef}></div>
                </div>

                {/* Input Area */}
                <div className="p-8 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-3 focus-within:ring-8 focus-within:ring-fuchsia-500/10 focus-within:border-fuchsia-500/40 transition-all border-2 border-transparent shadow-inner group">
                        <button
                            onClick={() => {
                                if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                                    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                                    const recognition = new SpeechRecognition();
                                    recognition.lang = 'en-US';
                                    recognition.start();
                                    setIsListening(true);

                                    recognition.onresult = (event: any) => {
                                        const transcript = event.results[0][0].transcript;
                                        setInputText(transcript);
                                        handleSend(transcript);
                                        setIsListening(false);
                                    };

                                    recognition.onerror = () => setIsListening(false);
                                    recognition.onend = () => setIsListening(false);
                                } else {
                                    alert('Voice input is not supported in this browser.');
                                }
                            }}
                            className={`p-5 bg-white dark:bg-slate-700 rounded-[1.5rem] text-fuchsia-600 dark:text-fuchsia-400 shadow-lg hover:scale-110 transition-transform ${isListening ? 'animate-pulse ring-4 ring-fuchsia-500' : ''}`}
                        >
                            <Mic className="w-6 h-6" />
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                            placeholder={isListening ? "Listening..." : "Tell me where it hurts..."}
                            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-black px-6 text-xl placeholder:text-slate-400"
                        />
                        <button
                            onClick={() => handleSend(inputText)}
                            className="p-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-[1.5rem] shadow-xl shadow-fuchsia-500/30 hover:scale-110 active:scale-95 transition-all group/send"
                        >
                            <Send className="w-6 h-6 group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                    <div className="flex justify-center mt-4 gap-6 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors"><ImageIcon className="w-4 h-4" /> Upload Report</span>
                        <span className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors"><User className="w-4 h-4" /> Body Map</span>
                    </div>
                </div>
            </div>
        );
    }

    // Analyzing State
    if (stage === 'ANALYSING') {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] text-center p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] neo-shadow border border-teal-50 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/50 to-indigo-50/50 dark:from-teal-950/30 dark:to-indigo-950/30 animate-pulse"></div>
                <div className="relative z-10 scale-125">
                    <div className="w-32 h-32 mb-8 mx-auto relative">
                        <div className="absolute inset-0 rounded-full border-4 border-teal-100 dark:border-teal-900 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 dark:border-t-teal-400 animate-spin"></div>
                        <Activity className="absolute inset-0 m-auto text-teal-500 dark:text-teal-400 w-12 h-12 animate-pulse" />
                    </div>
                    <h3 className="text-4xl font-black text-teal-950 dark:text-white mb-4">Analyzing Symptoms...</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Checking 500+ conditions & local health trends</p>
                </div>
            </div>
        );
    }

    // Result State
    return (
        <div className="animate-slide-up space-y-8 pb-24">
            {/* 1. Triage & Risk Header */}
            <div className={`
         relative p-10 rounded-[3rem] overflow-hidden text-white transition-colors duration-500
         ${analysisResult?.triageColor === 'red' ? 'bg-gradient-to-br from-red-600 to-rose-800 shadow-red-500/30' :
                    analysisResult?.triageColor === 'yellow' ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/30' :
                        'bg-gradient-to-br from-emerald-500 to-teal-700 shadow-teal-500/30'}
         shadow-2xl
       `}>
                <button onClick={() => setStage('CHAT')} className="absolute top-8 left-8 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors">
                    <ChevronRight className="w-8 h-8 rotate-180 text-white" />
                </button>

                <div className="flex flex-col items-center mt-6">
                    {/* Risk Meter */}
                    <div className="relative w-48 h-48 mb-8 group cursor-pointer">
                        <svg className="w-full h-full -rotate-90 transform hover:scale-105 transition-transform duration-500">
                            <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-black/20" />
                            <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray={527}
                                strokeDashoffset={527 - (527 * (analysisResult?.riskScore || 0)) / 100}
                                className="text-white drop-shadow-lg transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black">{analysisResult?.riskScore}%</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Risk Level</span>
                        </div>
                    </div>

                    <div className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md border border-white/30 mb-6 shadow-lg animate-bounce-down`}>
                        {analysisResult?.riskLevel} PRIORITY
                    </div>

                    <h2 className="text-4xl font-black text-center mb-3 leading-tight">{analysisResult?.condition}</h2>
                    <p className="text-white/90 font-bold text-lg">Confidence: {analysisResult?.confidence}%</p>
                </div>

                {/* Emergency Alert Overlay if RED */}
                {analysisResult?.triageColor === 'red' && (
                    <div className="mt-10 p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 flex items-center gap-6 animate-pulse">
                        <div className="p-4 bg-white rounded-full text-red-600 shadow-lg">
                            <Phone className="w-8 h-8 animate-tada" />
                        </div>
                        <div>
                            <div className="font-black text-2xl">Emergency Detected</div>
                            <div className="text-sm font-semibold opacity-90">Nearest Ambulance: 5 mins away</div>
                        </div>
                        <button className="ml-auto px-6 py-3 bg-white text-red-600 font-black rounded-2xl text-sm uppercase hover:bg-red-50 transition-colors shadow-lg">
                            Call Now
                        </button>
                    </div>
                )}
            </div>

            {/* 2. Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] neo-shadow border border-teal-50 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-teal-950 dark:text-white mb-2">Consult Doctor</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">Get a second opinion from verified specialists.</p>
                    <button
                        onClick={onConsultDoctor}
                        className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold text-base shadow-indigo-200 dark:shadow-indigo-900/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Find Doctors
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] neo-shadow border border-teal-50 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-700 transition-colors group shadow-lg">
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-teal-950 dark:text-white mb-2">Home Remedies</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">Safe self-care tips approved by doctors.</p>
                    <button
                        onClick={() => setShowRemedies(true)}
                        className="w-full py-4 bg-emerald-600 dark:bg-emerald-500 text-white rounded-2xl font-bold text-base shadow-emerald-200 dark:shadow-emerald-900/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        View Guide
                    </button>
                </div>
            </div>

            {/* Remedies Modal */}
            {showRemedies && analysisResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 border border-teal-50 dark:border-slate-800">
                        <button
                            onClick={() => setShowRemedies(false)}
                            className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <h3 className="text-2xl font-black text-center text-teal-950 dark:text-white mb-2">Home Remedies</h3>
                        <p className="text-center text-slate-500 dark:text-slate-400 font-medium mb-8">
                            For <span className="text-emerald-600 dark:text-emerald-400 font-bold">{analysisResult.condition}</span>
                        </p>

                        <div className="space-y-4">
                            {(analysisResult.condition.includes('Flu') || analysisResult.condition.includes('Infection')) ? (
                                <>
                                    <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <div className="mt-1 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-black">1</div>
                                        <div>
                                            <h5 className="font-bold text-slate-900 dark:text-white">Hydration is Key</h5>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Drink widely fluids like warm water, herbal teas, and soups to prevent dehydration.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <div className="mt-1 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-black">2</div>
                                        <div>
                                            <h5 className="font-bold text-slate-900 dark:text-white">Salt Water Gargle</h5>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Mix 1/2 tsp salt in warm water and gargle to flush out bacteria and soothe throat.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                        <div className="mt-1 w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-black">3</div>
                                        <div>
                                            <h5 className="font-bold text-slate-900 dark:text-white">Rest & Sleep</h5>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Your body needs energy to fight the virus. Ensure 8-10 hours of sleep.</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-center">
                                    <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                                    <h5 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Consultation Recommended</h5>
                                    <p className="text-sm text-amber-800 dark:text-amber-200/80">
                                        For this condition, please consult a doctor for specific medical advice before trying home remedies.
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowRemedies(false)}
                            className="w-full mt-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                        >
                            Close Guide
                        </button>
                    </div>
                </div>
            )}

            {/* 3. Cost & Info Section */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] neo-shadow border border-teal-50 dark:border-slate-800 shadow-lg">
                    <h4 className="text-xl font-black text-teal-950 dark:text-white flex items-center gap-3 mb-6">
                        <DollarSign className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                        Estimated Treatment Cost
                    </h4>
                    <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl mb-3">
                        <span className="text-base font-bold text-slate-600 dark:text-slate-300">Govt Hospital</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg">₹0 - ₹500</span>
                    </div>
                    <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-sm">
                        <span className="text-base font-bold text-slate-600 dark:text-slate-300">Private Care</span>
                        <span className="text-slate-900 dark:text-white font-black text-lg">₹2,000 - ₹5,000</span>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/40 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/50">
                    <h4 className="text-xl font-black text-blue-900 dark:text-blue-300 flex items-center gap-3 mb-3">
                        <Info className="w-6 h-6" />
                        Government Schemes
                    </h4>
                    <p className="text-blue-700/80 dark:text-blue-300/80 text-base font-medium mb-6 leading-relaxed">
                        You may be eligible for <span className="font-bold">Ayushman Bharat</span> coverage for this condition.
                    </p>
                    <button className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-2">
                        Check Eligibility <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 4. Early Prediction Teaser */}
            <div className="p-8 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] text-white overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all border border-slate-800 shadow-xl">
                <div className="absolute right-0 top-0 w-48 h-48 bg-purple-500 dark:bg-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="text-xs font-bold text-purple-300 dark:text-purple-400 uppercase tracking-widest mb-2">Preventive Health</div>
                            <h3 className="text-3xl font-black">Check Future Risks</h3>
                        </div>
                        <div className="p-3 bg-white/10 dark:bg-white/5 rounded-2xl">
                            <Zap className="w-8 h-8 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-lg mb-8 leading-relaxed max-w-md">
                        Analyze your lifestyle to predict Diabetes, Heart issues & Anemia risks early.
                    </p>
                    <div className="w-full py-4 bg-purple-600 dark:bg-purple-500 rounded-2xl text-center font-bold text-base group-hover:bg-purple-500 dark:group-hover:bg-purple-400 transition-colors shadow-lg shadow-purple-900/50">
                        Start Risk Analysis
                    </div>
                </div>
            </div>
        </div>
    );
}
