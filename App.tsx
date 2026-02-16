
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
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { translations } from './translations';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);



  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.NONE);
  const [currentView, setCurrentView] = useState<'landing' | 'booking' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'service' | 'emergency'>('landing');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'marathi'>('english');
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setUserRole(UserRole.PATIENT);
        setCurrentView('dashboard');
      } else {
        setUserRole(UserRole.NONE);
        // Using a functional update or checking current view state indirectly
        // is safer if we want to avoid depending on currentView directly.
        // However, for simplicity and correct behavior, we only redirect if 
        // the user was previously in a protected view.
        setCurrentView(prev => {
          if (prev === 'dashboard' || prev === 'onboarding') {
            return 'landing';
          }
          return prev;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };



  const handleLogout = async () => {
    try {
      await auth.signOut();
      // State updates handled by onAuthStateChanged
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleOnboardingComplete = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const navigateToBooking = () => {
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLogin = () => {
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSignup = () => {
    setCurrentView('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOnboarding = () => {
    setCurrentView('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setCurrentView('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEmergency = () => {
    setCurrentView('emergency');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[language];

  const handleAuthSuccess = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      case 'booking':
        return <BookingInfo onBack={navigateToHome} />;
      case 'login':
        return <Auth key="login-view" mode="login" onBack={navigateToHome} onToggleMode={navigateToSignup} t={t.auth} onAuthSuccess={handleAuthSuccess} />;
      case 'signup':
        return <Auth key="signup-view" mode="signup" onBack={navigateToHome} onToggleMode={navigateToLogin} t={t.auth} onAuthSuccess={handleAuthSuccess} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'service':
        return <ServiceDetail service={selectedService} onBack={navigateToHome} />;
      case 'emergency':
        return <Emergency onBack={navigateToHome} t={t.emergency} />;
      default:
        return <LandingPage onBookClick={navigateToBooking} onServiceClick={handleServiceClick} t={t.landing} />;
    }
  };

  const isAuthOrDashboard = currentView === 'login' || currentView === 'signup' || currentView === 'dashboard' || currentView === 'onboarding';

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <img
          src="/bg-ai.jpg"
          alt="Healthcare Background"
          className="w-full h-full object-cover opacity-80 transition-opacity duration-700 brightness-[0.7] dark:brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30 dark:from-slate-950/50 dark:via-transparent dark:to-slate-950/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView !== 'landing' ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="w-full px-12 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 animate-bounce-down"
            onClick={navigateToHome}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">CURE</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-10 text-xl font-bold text-slate-700 dark:text-slate-300 mr-4">
              <button onClick={navigateToHome} className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-bounce-down [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards] ${currentView === 'landing' ? 'text-sky-600 dark:text-sky-400' : ''}`}>{t.nav.home}</button>
              <a href="#services" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-bounce-down [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.services}</a>
              <a href="#about" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-bounce-down [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.about}</a>
              <a href="#contact" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-bounce-down [animation-delay:250ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.contact}</a>
            </div>

            <div className="flex items-center gap-3">


              {userRole === UserRole.NONE ? (
                <>
                  <button
                    onClick={navigateToLogin}
                    className="text-lg font-bold text-sky-600 dark:text-sky-400 px-8 py-3 rounded-full border-2 border-sky-100 dark:border-sky-900/30 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all animate-bounce-down [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
                  >
                    {t.nav.login}
                  </button>
                  <button
                    onClick={navigateToSignup}
                    className="text-lg font-bold text-sky-600 dark:text-sky-400 px-8 py-3 rounded-full border-2 border-sky-100 dark:border-sky-900/30 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all animate-bounce-down [animation-delay:350ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
                  >
                    {t.nav.signup}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-500 px-5 py-2.5 rounded-full border-2 border-red-50 hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> {t.nav.logout}
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 p-2.5 rounded-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition-all animate-bounce-down [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]"
                  title="Change Language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-lg font-bold uppercase hidden lg:inline">{language.substring(0, 3)}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-[60] py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {[
                      { id: 'english', label: 'English' },
                      { id: 'hindi', label: 'Hindi' },
                      { id: 'marathi', label: 'Marathi' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setLanguage(lang.id as any);
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${language === lang.id ? 'text-sky-600 bg-sky-50 dark:bg-sky-900/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>



              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 animate-pulse active:scale-95 animate-bounce-down [animation-delay:450ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
                onClick={navigateToEmergency}
              >
                <span className="hidden lg:inline">Emergency SOS</span>
              </button>


            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">


          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`transition-all duration-500 ${currentView !== 'landing' ? 'pt-24 min-h-[80vh]' : ''}`}>
        <div className={isAuthOrDashboard ? 'w-full px-12 pb-20' : ''}>
          {renderContent()}
        </div>
      </main>

      {/* AI Assistant Floating Component */}
      <AIAssistant />

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-black border-t-2 border-slate-800 py-24 relative overflow-hidden transition-colors mt-auto">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px]"></div>
        <div className="w-full px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4 cursor-pointer group" onClick={navigateToHome}>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <span className="text-4xl font-black tracking-tighter text-white">CURE</span>
              </div>
              <p className="text-slate-400 text-base font-bold leading-relaxed max-w-xs">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                {['fb', 'tw', 'ln', 'ig'].map(s => (
                  <div key={s} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-lg">
                    <div className="text-[10px] font-black uppercase tracking-tighter">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.services}</h4>
              <ul className="text-slate-500 dark:text-slate-400 text-base space-y-4 font-bold">
                <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div> {t.landing.services.list.general.title}</a></li>
                <li><a href="#" className="hover:text-rose-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div> {t.landing.services.list.cardio.title}</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div> {t.landing.services.list.pedia.title}</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div> {t.landing.services.list.diag.title}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.clinic}</h4>
              <ul className="text-slate-500 dark:text-slate-400 text-base space-y-4 font-bold">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t.footer.links.doctors}</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t.footer.links.testimonials}</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t.landing.services.list.pharma.title}</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t.footer.links.faq}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-black mb-8 text-white uppercase tracking-widest">{t.footer.newsletter}</h4>
              <p className="text-slate-400 text-sm mb-6 font-bold">{t.footer.newsDesc}</p>
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[1.5rem] blur opacity-25 group-focus-within:opacity-75 transition duration-500"></div>
                  <input type="email" placeholder={t.footer.email} className="relative bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-[1.5rem] text-base w-full outline-none focus:border-indigo-500 text-white font-bold" />
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.5rem] py-4 font-black text-lg hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-all active:scale-95 shadow-xl">
                  {t.footer.go.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 text-sm font-black tracking-widest uppercase">
            {t.rights || t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
