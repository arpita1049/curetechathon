import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Clock, Heart, ArrowRight, Star, Stethoscope, Microscope, Baby, Pill, Activity, PhoneCall, Zap, Quote } from 'lucide-react';

// A lightweight reveal wrapper that doesn't use 'key' as a prop
const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${isVisible
        ? 'opacity-100 translate-y-0 scale-100 blur-0'
        : 'opacity-0 translate-y-12 scale-95 blur-sm'
        }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

interface LandingPageProps {
  onBookClick: () => void;
  onServiceClick: (service: any) => void;
  t: any;
}

const ServiceCard = ({ s, idx, onServiceClick, getButtonClasses, getColorClasses, getBorderClasses, t }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 backdrop-blur-xl border-2 border-slate-100 dark:border-slate-800/50 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'
        } hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.1)] card-hover ${getBorderClasses(s.color)}`}
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 mb-10 ${getColorClasses(s.color)} shadow-xl group-hover:rotate-12 group-hover:scale-110`}>
        {React.cloneElement(s.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
      </div>
      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{s.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed mb-10 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors uppercase text-xs tracking-widest">{s.desc}</p>
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={() => onServiceClick(s)}
          className={getButtonClasses(s.color)}
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
          <span className="relative z-10 flex items-center gap-3 text-sm">
            {t.explore}
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onBookClick, onServiceClick, t }) => {
  const services = [
    { title: t.services.list.cardio.title, desc: t.services.list.cardio.desc, icon: <Heart />, color: 'rose' },
    { title: t.services.list.general.title, desc: t.services.list.general.desc, icon: <Stethoscope />, color: 'sky' },
    { title: t.services.list.pedia.title, desc: t.services.list.pedia.desc, icon: <Baby />, color: 'emerald' },
    { title: t.services.list.diag.title, desc: t.services.list.diag.desc, icon: <Microscope />, color: 'violet' },
    { title: t.services.list.pharma.title, desc: t.services.list.pharma.desc, icon: <Pill />, color: 'amber' },
    { title: t.services.list.emergency.title, desc: t.services.list.emergency.desc, icon: <PhoneCall />, color: 'indigo' }
  ];

  const getColorClasses = (color: string) => {
    const classes: { [key: string]: string } = {
      rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    };
    return classes[color] || classes.sky;
  };

  const getBorderClasses = (color: string) => {
    const classes: { [key: string]: string } = {
      rose: 'hover:border-rose-500/50',
      sky: 'hover:border-sky-500/50',
      emerald: 'hover:border-emerald-500/50',
      violet: 'hover:border-violet-500/50',
      amber: 'hover:border-amber-500/50',
      indigo: 'hover:border-indigo-500/50'
    };
    return classes[color] || classes.sky;
  };

  const getButtonClasses = (color: string) => {
    const base = "relative overflow-hidden group/btn px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 text-white shadow-lg ";
    const classes: { [key: string]: string } = {
      rose: base + "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-rose-500/40",
      sky: base + "bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 shadow-sky-500/40",
      emerald: base + "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-emerald-500/40",
      violet: base + "bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 shadow-violet-500/40",
      amber: base + "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-amber-500/40",
      indigo: base + "bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 shadow-indigo-500/40"
    };
    return classes[color] || classes.sky;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden bg-transparent transition-colors">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>

        <div className="w-full px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 shadow-2xl rounded-full border border-slate-200 dark:border-slate-800">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{t.hero.badge}</span>
            </div>

            <h1 className="text-7xl lg:text-[8rem] font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight font-sans">
              {t.hero.title.split('your')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">YOUR</span> <br />
              {t.hero.title.split('your')[1]}
            </h1>

            <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-xl font-bold leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap gap-8">
              <button
                onClick={onBookClick}
                className="group relative px-10 py-6 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white rounded-[2rem] font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center gap-4 overflow-hidden border-2 border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                <span className="relative z-10">{t.hero.book}</span>
                <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[2rem] font-black text-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border-4 border-slate-900/5 dark:border-white/5 flex items-center gap-4"
              >
                <Zap className="w-6 h-6 text-amber-500" />
                {t.hero.vitals}
              </button>
            </div>
          </div>
          {/* Right column: Dr. Sarah Mitchell Profile */}
          <div className="hidden lg:flex justify-center items-center animate-slide-up [animation-delay:400ms]">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              <div className="relative w-80 h-80 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800"
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent backdrop-blur-[2px]">
                  <h4 className="text-white text-lg font-black tracking-tight leading-none mb-1">Dr. Sarah Mitchell</h4>
                  <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Chief Cardiologist</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center border-2 border-indigo-500/20 z-10">
                <Shield className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-transparent transition-colors">
        <div className="w-full px-12">
          <div className="max-w-6xl mx-auto text-center mb-32">
            <ScrollReveal delay={100}>
              <h2 className="text-5xl lg:text-8xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-12 font-sans">
                {t.services.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">{t.services.title.split(' ')[1]}</span>
              </h2>
              <div className="w-48 h-3 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-full mb-12 mx-auto"></div>
              <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto">
                {t.services.desc}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((s, idx) => (
              <ServiceCard
                key={idx}
                s={s}
                idx={idx}
                onServiceClick={onServiceClick}
                getButtonClasses={getButtonClasses}
                getColorClasses={getColorClasses}
                getBorderClasses={getBorderClasses}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust/About Section */}
      <section id="about" className="py-32 bg-transparent relative transition-colors overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 animate-blob"></div>

        <div className="w-full px-12 flex flex-col xl:flex-row items-center gap-24">
          <div className="flex-1 space-y-10">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight sm:text-6xl text-uppercase">
              WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">CHOOSE</span> CURE?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { title: t.about.item1.title, desc: t.about.item1.desc, icon: <Users />, color: 'from-indigo-600 to-blue-500', shadow: 'shadow-indigo-500/30' },
                { title: t.about.item2.title, desc: t.about.item2.desc, icon: <Microscope />, color: 'from-emerald-600 to-teal-500', shadow: 'shadow-emerald-500/30' },
                { title: t.about.item3.title, desc: t.about.item3.desc, icon: <Heart />, color: 'from-rose-600 to-pink-500', shadow: 'shadow-rose-500/30' },
                { title: t.about.item4.title, desc: t.about.item4.desc, icon: <Clock />, color: 'from-sky-600 to-blue-500', shadow: 'shadow-sky-500/30' },
                { title: t.about.item5.title, desc: t.about.item5.desc, icon: <Shield />, color: 'from-violet-600 to-purple-500', shadow: 'shadow-violet-500/30' },
                { title: t.about.item6.title, desc: t.about.item6.desc, icon: <Pill />, color: 'from-amber-600 to-orange-500', shadow: 'shadow-amber-500/30' }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="flex gap-6 group">
                    <div className={`w-16 h-16 shrink-0 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center shadow-xl ${item.shadow} group-hover:scale-110 transition-transform duration-500`}>
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={200} className="flex-1 w-full">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>

              <div className="flex gap-2 text-amber-400 mb-10">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-current animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />)}
              </div>

              <p className="text-2xl font-black text-white leading-relaxed italic mb-12 relative z-10 tracking-tight">
                {t.about.testimonial}
              </p>

              <div className="flex items-center gap-6 relative z-10 border-t border-white/10 pt-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-2xl ring-4 ring-indigo-500/10">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Patient5" alt="Reviewer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="text-xl font-black text-white">{t.about.patient}</h5>
                  <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.2em]">{t.about.since}</p>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 text-rose-500/10 group-hover:text-rose-500/20 transition-all duration-1000 rotate-12 group-hover:rotate-0">
                <Heart className="w-64 h-64 fill-current" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Patient Feedbacks Section */}
      <section id="feedback" className="py-40 bg-transparent transition-colors relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse animation-delay-2000"></div>

        <div className="w-full px-12">
          <div className="text-center mb-24">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <h2 className="text-5xl lg:text-8xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-12 font-sans">
                  REAL STORIES FROM <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">OUR PATIENTS</span>
                </h2>
                <div className="w-48 h-3 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-full mb-12 mx-auto"></div>
                <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto">
                  Every recovery is a milestone. Here's what some of our 10,000+ happy families have to say.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                name: "Sneha Kapoor",
                role: "Regular Patient",
                feedback: "The ease of booking and the clarity of digital reports is what makes CURE stand out. Truly a modern experience.",
                color: "blue",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
              },
              {
                name: "Rahul Mehta",
                role: "Cardiology Patient",
                feedback: "Dr. Mitchell and her team provided exceptional care. The technology they use for diagnosis is world-class.",
                color: "indigo",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
              },
              {
                name: "Anita Desai",
                role: "Parent",
                feedback: "The pediatric section is so welcoming for kids. My daughter actually looks forward to her checkups now!",
                color: "purple",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita"
              }
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className={`group relative p-12 rounded-[4rem] bg-white dark:bg-slate-900/40 backdrop-blur-xl border-2 border-slate-100 dark:border-slate-800/50 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4`}>

                  {/* Decorative Quote Icon */}
                  <div className={`absolute top-10 right-12 opacity-10 group-hover:opacity-20 transition-opacity duration-700`}>
                    <Quote className={`w-20 h-20 fill-current text-${f.color}-500`} />
                  </div>

                  <div className="flex gap-1 text-amber-400 mb-10">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed mb-12 relative z-10">
                    "{f.feedback}"
                  </p>

                  <div className="flex items-center gap-6 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                    <div className={`w-16 h-16 rounded-[1.5rem] overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-${f.color}-500/20 transition-all duration-700 shadow-lg`}>
                      <img src={f.avatar} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">{f.name}</h4>
                      <p className={`text-xs font-black uppercase tracking-[0.2em] text-${f.color}-500`}>{f.role}</p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-${f.color}-500/5 rounded-br-[4rem] -z-10 group-hover:to-${f.color}-500/10 transition-colors duration-700`}></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
