import React, { useState, useEffect } from 'react';
import LandingPage from './views/LandingPage';
import BookingInfo from './views/BookingInfo';
import Auth from './views/Auth';
import Onboarding from './views/Onboarding';
import PHWDashboard from './views/PHWDashboard';
import PatientDashboard from './views/PatientDashboard';
import DoctorDashboard from './views/DoctorDashboard';
import ServiceDetail from './views/ServiceDetail';
import Emergency from './views/Emergency';
import AIAssistant from './components/AIAssistant';
import { UserRole } from './types';
import { Activity, LogOut, Globe, ChevronDown, PhoneCall, Sun, Moon } from 'lucide-react';
import MedicineSideEffects from './components/MedicineSideEffects';
import PreventiveCare from './components/PreventiveCare';
import GovernmentSchemes from './components/GovernmentSchemes';
import Mediclaim from './components/Mediclaim';
import Pharmacy from './components/Pharmacy';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { translations } from './translations';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.NONE);
  const [currentView, setCurrentView] = useState<'landing' | 'booking' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'service' | 'emergency' | 'medicine-finder' | 'preventive-care' | 'government-schemes' | 'mediclaim' | 'pharmacy'>('landing');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'marathi'>('english');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setUserRole(UserRole.PATIENT);
        setCurrentView('dashboard');
      } else {
        setUserRole(UserRole.NONE);
        setCurrentView(prev => {
          if (prev === 'dashboard' || prev === 'onboarding') return 'landing';
          return prev;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navigateToHome = () => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToBooking = () => { setCurrentView('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToLogin = () => { setCurrentView('login'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToSignup = () => { setCurrentView('signup'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToEmergency = () => { setCurrentView('emergency'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleServiceClick = (service: any) => {
    if (service.title === "Bio-Interaction Scan") {
      setCurrentView('medicine-finder');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (service.title === "Neural SOS Protocols") {
      setCurrentView('emergency');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (service.title === "Predictive Wellness") {
      setCurrentView('preventive-care');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (service.title === "Public Health Assets") {
      setCurrentView('government-schemes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (service.title === "Insurance Vault (HQ)") {
      setCurrentView('mediclaim');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (service.title === "Neural Pharmacy") {
      setCurrentView('pharmacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedService(service);
    setCurrentView('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[language];

  const renderContent = () => {
    if (currentView === 'dashboard') {
      switch (userRole) {
        case UserRole.PHW: return <PHWDashboard onLogout={handleLogout} />;
        case UserRole.PATIENT: return <PatientDashboard user={user} onLogout={handleLogout} />;
        case UserRole.DOCTOR: return <DoctorDashboard onLogout={handleLogout} />;
        default: return <LandingPage onBookClick={navigateToBooking} onServiceClick={handleServiceClick} t={t.landing} />;
      }
    }
    switch (currentView) {
      case 'booking': return <BookingInfo onBack={navigateToHome} />;
      case 'login': return <Auth mode="login" onBack={navigateToHome} onToggleMode={navigateToSignup} t={t.auth} onAuthSuccess={role => { setUserRole(role); setCurrentView('dashboard'); }} />;
      case 'signup': return <Auth mode="signup" onBack={navigateToHome} onToggleMode={navigateToLogin} t={t.auth} onAuthSuccess={role => { setUserRole(role); setCurrentView('dashboard'); }} />;
      case 'onboarding': return <Onboarding onComplete={role => { setUserRole(role); setCurrentView('dashboard'); }} />;
      case 'service': return <ServiceDetail service={selectedService} onBack={navigateToHome} />;
      case 'emergency': return <Emergency onBack={navigateToHome} t={t.emergency} />;
      case 'medicine-finder': return <MedicineSideEffects onBack={navigateToHome} />;
      case 'preventive-care': return <PreventiveCare onBack={navigateToHome} />;
      case 'government-schemes': return <GovernmentSchemes onBack={navigateToHome} />;
      case 'mediclaim': return <Mediclaim onBack={navigateToHome} />;
      case 'pharmacy': return <Pharmacy onBack={navigateToHome} />;
      default: return <LandingPage onBookClick={navigateToBooking} onServiceClick={handleServiceClick} t={t.landing} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-300">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* AI Healthcare image — lightly visible behind dark blue */}
        <img
          src="/ai.jpeg.jpg"
          alt="AI Healthcare Background"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.65) saturate(1.3) blur(5px)' }}
        />
        {/* Deep dark navy blue overlay */}
        <div className="absolute inset-0 bg-[#061120]/85" />
        {/* Faint cyan core glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_50%,_rgba(56,189,248,0.07)_0%,_transparent_70%)]" />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView !== 'landing' ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="w-full px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105" onClick={navigateToHome}>
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">CURE</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4">
              <button
                onClick={navigateToHome}
                className={`relative px-6 py-3 text-lg font-black uppercase tracking-wide rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${currentView === 'landing'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-lg'
                  }`}
              >
                {t.nav.home}
              </button>
              <a
                href="#services"
                onClick={(e) => {
                  if (currentView !== 'landing') {
                    e.preventDefault();
                    navigateToHome();
                    setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className={`px-6 py-3 text-lg font-black uppercase tracking-wide rounded-2xl transition-all duration-300 hover:scale-105 ${currentView === 'preventive-care' || currentView === 'service'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg'
                  }`}
              >
                {t.nav.services}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  if (currentView !== 'landing') {
                    e.preventDefault();
                    navigateToHome();
                    setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="px-6 py-3 text-lg font-black uppercase tracking-wide rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-lg transition-all duration-300"
              >
                {t.nav.about}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  if (currentView !== 'landing') {
                    e.preventDefault();
                    navigateToHome();
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="px-6 py-3 text-lg font-black uppercase tracking-wide rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all duration-300"
              >
                {t.nav.contact}
              </a>

              {/* Hackathon Demo Role Switcher */}
              <div className="flex bg-slate-200 dark:bg-slate-800/80 p-1.5 rounded-2xl border-2 border-white/20 shadow-inner">
                <button
                  onClick={() => { setUserRole(UserRole.PATIENT); setCurrentView('dashboard'); }}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === UserRole.PATIENT ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Patient View
                </button>
                <button
                  onClick={() => { setUserRole(UserRole.DOCTOR); setCurrentView('dashboard'); }}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === UserRole.DOCTOR ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Doctor View
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userRole === UserRole.NONE ? (
                <>
                  <button
                    onClick={navigateToLogin}
                    className={`relative overflow-hidden group px-8 py-3.5 text-lg font-black uppercase tracking-wide rounded-2xl transition-all duration-300 ${currentView === 'login'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-700'
                      }`}
                  >
                    <span>{t.nav.login}</span>
                  </button>
                  <button
                    onClick={navigateToSignup}
                    className={`relative overflow-hidden group px-8 py-3.5 text-lg font-black uppercase tracking-wide rounded-2xl transition-all duration-300 ${currentView === 'signup'
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 border-2 border-transparent hover:border-teal-200 dark:hover:border-teal-700'
                      }`}
                  >
                    <span>{t.nav.signup}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="relative overflow-hidden group px-7 py-3.5 text-lg font-black uppercase tracking-wide rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 border-2 border-transparent hover:border-rose-200 dark:hover:border-rose-700 transition-all duration-300 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t.nav.logout}</span>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-5 py-3.5 text-lg font-black uppercase tracking-wide rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-white/10 transition-all duration-300"
                  title="Change Language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="hidden lg:inline">{language.substring(0, 3)}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-black border-2 border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-[60] py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {['english', 'hindi', 'marathi'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang as any);
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-base font-black uppercase tracking-wide transition-all duration-200 ${language === lang
                          ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-amber-400 transition-all hover:scale-110 active:scale-95"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Deep Black Mode"}
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              <button
                className={`relative overflow-hidden group flex items-center gap-3 px-8 py-3.5 text-lg font-black uppercase tracking-wide rounded-2xl transition-all duration-300 ${currentView === 'emergency'
                  ? 'bg-red-700 text-white scale-105 shadow-2xl shadow-red-600/50'
                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-2xl shadow-red-600/40 hover:scale-110'
                  } active:scale-95 animate-pulse`}
                onClick={navigateToEmergency}
              >
                <PhoneCall className="w-6 h-6 animate-bounce" />
                <span className="hidden lg:inline">Emergency SOS</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={`transition-all duration-500 ${currentView !== 'landing' ? 'pt-24 min-h-[80vh]' : ''}`}>
        <div className={`bg-transparent ${currentView === 'login' || currentView === 'signup' || currentView === 'dashboard' || currentView === 'onboarding' ? 'w-full px-12 pb-20' : ''}`}>
          {renderContent()}
        </div>
      </main>

      <AIAssistant />

      <footer className="bg-gradient-to-b from-slate-900 to-black border-t-2 border-slate-800 py-24 relative overflow-hidden mt-auto">
        <div className="w-full px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4 cursor-pointer" onClick={navigateToHome}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <span className="text-4xl font-black text-white tracking-tighter">CURE</span>
              </div>
              <p className="text-slate-400 text-base font-bold leading-relaxed">{t.footer.desc}</p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.services}</h4>
              <ul className="text-slate-500 text-base space-y-4 font-bold">
                <li>{t.landing.services.list.general.title}</li>
                <li>{t.landing.services.list.cardio.title}</li>
                <li>{t.landing.services.list.pedia.title}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.clinic}</h4>
              <ul className="text-slate-500 text-base space-y-4 font-bold">
                <li>{t.footer.links.doctors}</li>
                <li>{t.footer.links.faq}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.newsletter}</h4>
              <div className="space-y-4">
                <input type="email" placeholder={t.footer.email} className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-xl text-white w-full outline-none" />
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-4 font-black transition-all">SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 text-sm font-black tracking-widest uppercase">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
