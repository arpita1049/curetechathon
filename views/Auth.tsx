import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { ChevronLeft, Shield, User, Mail, Lock, EyeOff, Eye, ArrowRight, Chrome, Github, Stethoscope, HeartPulse } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  mode: 'login' | 'signup';
  onBack: () => void;
  onToggleMode: () => void;
  t: any;
  onAuthSuccess: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onBack, onToggleMode, t, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const speakMessage = () => {
      window.speechSynthesis.cancel();
      const text = mode === 'login' ? "Welcome back to CURE Clinic." : "Join CURE Clinic Today.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.2;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Zira') || voice.name.includes('Female'));
      if (femaleVoice) utterance.voice = femaleVoice;

      window.speechSynthesis.speak(utterance);
    };

    const timer = setTimeout(speakMessage, 600);
    return () => { clearTimeout(timer); window.speechSynthesis.cancel(); };
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (mode === 'signup' && !name.trim()) {
      alert("Please enter your full name");
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name }); // Store role in profile if needed
        alert(`Account created successfully as ${role}!`);
        onAuthSuccess(role);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess(role);
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthSuccess(role); // Use selected role for Google Sign-In
    } catch (error: any) {
      alert(error.message);
    }
  };

  const isDoctor = role === UserRole.DOCTOR;
  const themeColor = isDoctor ? 'indigo' : 'teal';

  return (
    <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[70vh] animate-bounce-down transition-colors perspective-1000">
      <div className={`w-full max-w-5xl flex flex-col md:flex-row bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10 transition-all duration-500 ${isDoctor ? 'shadow-indigo-500/20' : 'shadow-teal-500/20'}`}>

        {/* Visual Panel */}
        <div className={`hidden md:flex md:w-1/2 ${isDoctor ? 'bg-indigo-900' : 'bg-teal-900'} p-12 text-white flex-col justify-between relative overflow-hidden transition-colors duration-500`}>
          <div className="relative z-10">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors font-bold text-sm">
              <ChevronLeft className="w-4 h-4" /> {t.back}
            </button>
            <h2 className="text-4xl font-extrabold leading-tight mb-6 animate-slide-left">{mode === 'login' ? t.welcome : t.signupWelcome}</h2>
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm animate-slide-left [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">{t.desc}</p>
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md animate-slide-left [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 ${isDoctor ? 'bg-indigo-500' : 'bg-teal-500'} rounded-xl`}>
                <Shield className="w-6 h-6" />
              </div>
              <p className="font-bold">{t.privacy}</p>
            </div>
            <p className="text-sm text-white/40 font-medium">{t.privacyDesc}</p>
          </div>

          <div className={`absolute top-[-100px] right-[-100px] w-80 h-80 ${isDoctor ? 'bg-indigo-500/20' : 'bg-teal-500/20'} rounded-full blur-[100px]`}></div>
          <div className={`absolute bottom-[-100px] left-[-100px] w-80 h-80 ${isDoctor ? 'bg-purple-500/20' : 'bg-emerald-500/20'} rounded-full blur-[100px]`}></div>
        </div>

        {/* Form Panel */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex p-1 bg-slate-100 dark:bg-[#0a192f]/60 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setRole(UserRole.PATIENT)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${!isDoctor ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <HeartPulse className="w-4 h-4" /> Patient
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.DOCTOR)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${isDoctor ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Stethoscope className="w-4 h-4" /> Doctor
              </button>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{mode === 'login' ? t.login : t.signup}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {mode === 'login' ? t.noAccount : t.hasAccount} {' '}
              <button onClick={onToggleMode} className={`${isDoctor ? 'text-indigo-600' : 'text-teal-600'} font-bold hover:underline`}>
                {mode === 'login' ? t.createNow : t.loginNow}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input required type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-medium" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input required type="email" placeholder={t.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase">{t.password}</label>
                {mode === 'login' && <button type="button" className={`text-[10px] font-bold ${isDoctor ? 'text-indigo-600' : 'text-teal-600'} uppercase hover:underline`}>{t.forgot}</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-slate-100 font-medium" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-5 text-white font-black text-lg rounded-[2rem] shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 ${isDoctor ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? 'Processing...' : <>{mode === 'login' ? t.continue : t.signup} <ArrowRight className="w-5 h-5" /></>}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-full h-[1px] bg-slate-100"></div>
              <span className="absolute bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.social}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"><Chrome className="w-4 h-4" /> {t.google}</button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"><Github className="w-4 h-4" /> {t.github}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
