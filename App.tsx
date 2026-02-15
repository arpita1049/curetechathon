
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
        return <Auth key="login-view" mode="login" onBack={navigateToHome} onToggleMode={navigateToSignup} t={t.auth} />;
      case 'signup':
        return <Auth key="signup-view" mode="signup" onBack={navigateToHome} onToggleMode={navigateToLogin} t={t.auth} />;
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
          className="w-full h-full object-cover opacity-60 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-slate-950/60 dark:via-slate-950/40 dark:to-slate-950/60"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView !== 'landing' ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="w-full px-12 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 animate-bounce-down"
            onClick={navigateToHome}
          >
            <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">CURE</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-10 text-xl font-bold text-slate-700 dark:text-slate-300 mr-4">
              <button onClick={navigateToHome} className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-nav-combined [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards] ${currentView === 'landing' ? 'text-sky-600 dark:text-sky-400' : ''}`}>{t.nav.home}</button>
              <a href="#services" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-nav-combined [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.services}</a>
              <a href="#about" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-nav-combined [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.about}</a>
              <a href="#contact" onClick={(e) => { if (currentView !== 'landing') { e.preventDefault(); navigateToHome(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors animate-nav-combined [animation-delay:250ms] opacity-0 [animation-fill-mode:forwards]">{t.nav.contact}</a>
            </div>

            <div className="flex items-center gap-3">


              {userRole === UserRole.NONE ? (
                <>
                  <button
                    onClick={navigateToLogin}
                    className="text-lg font-bold text-sky-600 dark:text-sky-400 px-8 py-3 rounded-full border-2 border-sky-100 dark:border-sky-900/30 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all animate-nav-combined [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
                  >
                    {t.nav.login}
                  </button>
                  <button
                    onClick={navigateToSignup}
                    className="text-lg font-bold text-sky-600 dark:text-sky-400 px-8 py-3 rounded-full border-2 border-sky-100 dark:border-sky-900/30 hover:border-sky-200 dark:hover:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all animate-nav-combined [animation-delay:350ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
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
                  className="flex items-center gap-1.5 p-2.5 rounded-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition-all animate-nav-combined [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]"
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
                onClick={toggleTheme}
                className="p-2.5 rounded-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition-all animate-nav-combined [animation-delay:425ms] opacity-0 [animation-fill-mode:forwards]"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 animate-pulse active:scale-95 animate-nav-combined [animation-delay:450ms] opacity-0 [animation-fill-mode:forwards] btn-3d"
                onClick={navigateToEmergency}
              >
                <PhoneCall className="w-5 h-5" />
                <span className="hidden lg:inline">{t.nav.emergency}</span>
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
      <footer className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 py-16 transition-colors mt-auto">
        <div className="w-full px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 cursor-pointer" onClick={navigateToHome}>
                <div className="w-12 h-12 bg-sky-600/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-sky-600" />
                </div>
                <span className="text-3xl font-black tracking-tighter dark:text-white">CURE</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {t.footer.desc}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">{t.footer.services}</h4>
              <ul className="text-slate-500 dark:text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.landing.services.list.general.title}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.landing.services.list.cardio.title}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.landing.services.list.pedia.title}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.landing.services.list.diag.title}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">{t.footer.clinic}</h4>
              <ul className="text-slate-500 dark:text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.footer.links.doctors}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.footer.links.testimonials}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.landing.services.list.pharma.title}</a></li>
                <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t.footer.links.faq}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-white">{t.footer.newsletter}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{t.footer.newsDesc}</p>
              <div className="flex gap-2">
                <input type="email" placeholder={t.footer.email} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 dark:text-white" />
                <button className="bg-sky-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-sky-700 transition-colors">{t.footer.go}</button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 text-xs">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
