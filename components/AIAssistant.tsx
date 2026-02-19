
import { useState, useRef, useEffect, Suspense, FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles, Activity, Plus, Mic, History, Info } from 'lucide-react';
import { chatWithAI } from '../geminiService';
import AICore from './AICore';

const AIAssistant: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string, timestamp: string }[]>([
    {
      role: 'assistant',
      text: 'Hello! I am CURE AI, your advanced health companion. How can I facilitate your wellness journey today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (customText?: string) => {
    const userText = customText || input.trim();
    if (!userText || isLoading) return;

    if (!customText) setInput('');

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp }]);
    setIsLoading(true);

    try {
      const responseText = await chatWithAI(userText);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error: any) {
      console.error(error);
      const errorMsg = "Connectivity issues detected with the neural core. Please retry shortly.";
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: errorMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "Symptom Check",
    "Find Specialists",
    "Emergency Tips",
    "Diet Advice"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="fab"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 text-white rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(14,165,233,0.5)] flex items-center justify-center group relative overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform relative z-10" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl w-[420px] h-[700px] rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border border-white/20 dark:border-slate-800/50 flex flex-col overflow-hidden relative"
          >
            {/* Glossy Header */}
            <div className="h-64 relative shrink-0">
              <Suspense fallback={<div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                <AICore />
              </Suspense>

              <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start pointer-events-none">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20"
                  >
                    <Activity className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight">CURE NEURAL AI</h4>
                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                      Core Active
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all flex items-center justify-center pointer-events-auto active:scale-90"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-grow flex flex-col -mt-12 bg-white dark:bg-slate-900 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] relative z-10 border-t border-slate-100 dark:border-slate-800">
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-[15px] font-semibold leading-relaxed shadow-sm transition-all hover:shadow-md ${m.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-sky-600 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-705'
                      }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold mt-2 mx-2 uppercase tracking-widest">{m.timestamp}</span>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-[2rem] rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                      <div className="flex gap-1">
                        <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                        <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                        <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Neural Processing</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="px-8 pb-4 flex gap-3 overflow-x-auto no-scrollbar mask-fade-right">
                {quickActions.map(action => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="shrink-0 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 transition-all active:scale-95"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Advanced Input */}
              <div className="p-8 pt-4 bg-white dark:bg-slate-900">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-[2rem] blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
                  <div className="relative flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-[2rem] border border-slate-200 dark:border-slate-700 transition-colors focus-within:bg-white dark:focus-within:bg-slate-800">
                    <button className="p-3 text-slate-400 hover:text-sky-500 transition-colors rounded-xl">
                      <Plus className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask your neural health assistant..."
                      className="flex-grow bg-transparent border-none focus:ring-0 text-[15px] font-semibold px-2 outline-none dark:text-white placeholder:text-slate-400"
                    />
                    <div className="flex gap-2">
                      <button className="p-3 text-slate-400 hover:text-sky-500 transition-colors rounded-xl">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-sky-600 text-white rounded-2xl hover:scale-105 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-sky-500/20 active:scale-95"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 px-2">
                  <div className="flex gap-4">
                    <button className="text-[10px] font-black text-slate-300 hover:text-slate-500 transition-colors flex items-center gap-1 uppercase tracking-tighter">
                      <History className="w-3 h-3" /> History
                    </button>
                    <button className="text-[10px] font-black text-slate-300 hover:text-slate-500 transition-colors flex items-center gap-1 uppercase tracking-tighter">
                      <Info className="w-3 h-3" /> Info
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 dark:text-slate-600 uppercase font-black tracking-widest text-right">
                    Neural Safety Shield Active
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
