import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Clock, Heart, ArrowRight, Star, Stethoscope, Microscope, Baby, Pill, Activity, PhoneCall, Zap, Quote, Search, CheckCircle2 } from 'lucide-react';
import CardSwap, { Card } from '../components/CardSwap';
import BlurText from '../components/BlurText';
import TrueFocus from '../components/TrueFocus';
import ChromaCards from '../components/ChromaCards';

// A lightweight reveal wrapper that doesn't use 'key' as a prop
const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string, key?: any }) => {
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

            <div>
              <TrueFocus
                sentence="Expert Care"
                separator=" "
                manualMode={false}
                blurAmount={5}
                borderColor="#0ea5e9"
                glowColor="rgba(14, 165, 233, 0.6)"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
                className="text-7xl lg:text-[8rem] font-bold text-slate-900 dark:text-white leading-tight tracking-normal font-sans"
                wordStyles={{
                  'Care': 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500'
                }}
              />
              <BlurText
                text="for YOUR healthy future."
                delay={200}
                animateBy="words"
                direction="top"
                className="text-7xl lg:text-[8rem] font-bold text-slate-900 dark:text-white leading-tight tracking-normal font-sans"
                wordStyles={{
                  'for': 'text-slate-900 dark:text-white',
                  'YOUR': 'text-white',
                  'healthy': 'text-white',
                  'future.': 'text-white'
                }}
              />
            </div>

            <BlurText
              text={t.hero.desc}
              delay={100}
              animateBy="words"
              direction="top"
              align="left"
              className="text-2xl text-slate-500 dark:text-slate-400 max-w-xl font-bold leading-relaxed"
            />

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
          {/* Right column: Dynamic Card Swap */}
          <div className="hidden lg:flex justify-center items-center min-h-[600px] relative animate-slide-up [animation-delay:400ms]">
            <CardSwap
              width={450}
              height={550}
              cardDistance={40}
              verticalDistance={50}
              delay={5000}
              pauseOnHover={true}
              skewAmount={4}
            >
              <Card>
                <img src="/card-1.jpg" alt="Specialized Care" />
                <div className="card-overlay">
                  <h3 className="card-title">Expert Consultation</h3>
                  <p className="card-desc">Personalized care from world-class specialists.</p>
                </div>
              </Card>
              <Card>
                <img src="/card-2.jpg" alt="Modern Facilities" />
                <div className="card-overlay">
                  <h3 className="card-title">Advanced Tech</h3>
                  <p className="card-desc">State-of-the-art diagnostic and treatment facilities.</p>
                </div>
              </Card>
              <Card>
                <img src="/card-3.jpg" alt="Medical Team" />
                <div className="card-overlay">
                  <h3 className="card-title">Patient First</h3>
                  <p className="card-desc">Every recovery is a milestone for our team.</p>
                </div>
              </Card>
              <Card>
                <img src="/card-4.jpg" alt="Supportive Care" />
                <div className="card-overlay">
                  <h3 className="card-title">Future of Health</h3>
                  <p className="card-desc">Embracing innovation for better outcomes.</p>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-transparent transition-colors relative overflow-hidden">
        <div className="w-full px-12">
          <div className="max-w-6xl mx-auto text-center mb-32">
            <ScrollReveal delay={100}>
              <BlurText
                text={t.services.title}
                delay={150}
                animateBy="words"
                direction="top"
                align="center"
                className="text-5xl lg:text-8xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-12 font-sans"
              />
              <div className="w-48 h-3 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-full mb-12 mx-auto"></div>
              <BlurText
                text={t.services.desc}
                delay={100}
                animateBy="words"
                direction="top"
                align="center"
                className="text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto"
              />
            </ScrollReveal>
          </div>

          <div style={{ minHeight: '800px', height: 'auto', position: 'relative' }} className="w-full">
            <ChromaCards
              items={[
                {
                  image: "https://images.unsplash.com/photo-1579684385180-164e742e870e?auto=format&fit=crop&w=800&q=80",
                  title: "Predictive Wellness",
                  subtitle: "Stay healthy with regular check-ups and early detection screenings.",
                  borderColor: "#10B981",
                  gradient: "linear-gradient(145deg, #10B981, #000)",
                },
                {
                  image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
                  title: "Public Health Assets",
                  subtitle: "Access affordable healthcare benefits and Ayushman Bharat programs.",
                  borderColor: "#F59E0B",
                  gradient: "linear-gradient(145deg, #F59E0B, #000)",
                },
                {
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
                  title: "Insurance Vault (HQ)",
                  subtitle: "Cashless hospitalization support and insurance claim assistance.",
                  borderColor: "#3B82F6",
                  gradient: "linear-gradient(145deg, #3B82F6, #000)",
                },
                {
                  image: "https://images.unsplash.com/photo-1516574187841-69301976e499?auto=format&fit=crop&w=800&q=80",
                  title: "Neural SOS Protocols",
                  subtitle: "24/7 rapid response ambulance and critical care support.",
                  borderColor: "#EF4444",
                  gradient: "linear-gradient(145deg, #EF4444, #450a0a)",
                },
                {
                  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
                  title: "Bio-Interaction Scan",
                  subtitle: "Check potential side effects and interactions before use.",
                  borderColor: "#8B5CF6",
                  gradient: "linear-gradient(145deg, #8B5CF6, #000)",
                },
                {
                  image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
                  title: "Neural Pharmacy",
                  subtitle: "Buy genuine medicines online with quick home delivery.",
                  borderColor: "#06B6D4",
                  gradient: "linear-gradient(145deg, #06B6D4, #000)",
                }
              ]}
              radius={300}
              columns={3}
              damping={0.45}
              fadeOut={0.6}
              onItemClick={(item, index) => {
                let Icon = Heart;
                if (item.title === "Diagnostics") Icon = Microscope;
                if (item.title === "Pharmacy") Icon = Pill;
                if (item.title === "Emergency Services") Icon = PhoneCall;
                if (item.title === "Medicines Side Effect Finder") Icon = Search;
                if (item.title === "Preventive Care") Icon = Shield;
                if (item.title === "Government Health Schemes") Icon = Activity;
                if (item.title === "Mediclaim") Icon = CheckCircle2;

                onServiceClick({
                  title: item.title,
                  desc: item.subtitle,
                  icon: <Icon />,
                  color: item.borderColor // Optional, might need mapping to color name string for styling if used
                });
              }}
            />
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
                accent: "sky",
                gradient: "from-sky-400 to-blue-500",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
              },
              {
                name: "Rahul Mehta",
                role: "Cardiology Patient",
                feedback: "Dr. Mitchell and her team provided exceptional care. The technology they use for diagnosis is world-class.",
                accent: "indigo",
                gradient: "from-indigo-400 to-violet-500",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
              },
              {
                name: "Anita Desai",
                role: "Parent",
                feedback: "The pediatric section is so welcoming for kids. My daughter actually looks forward to her checkups now!",
                accent: "rose",
                gradient: "from-rose-400 to-pink-500",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="group relative h-full"
              >
                {/* Background Glow Effect */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-[4rem]`} />

                <div className="relative h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-700/50 rounded-[3.5rem] p-10 flex flex-col transition-all duration-500 group-hover:border-transparent group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">

                  {/* Quote & Stars */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-4 h-4 fill-current text-${f.accent}-500`} />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-slate-100 dark:text-slate-800 rotate-180 mb-4" />
                  </div>

                  {/* Feedback Text */}
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed italic mb-10 tracking-tight">
                      "{f.feedback}"
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-5 pt-8 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="relative shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="relative w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-lg ring-2 ring-white dark:ring-slate-900"
                      >
                        <CheckCircle2 className="w-3 h-3 fill-current" />
                      </motion.div>
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-400 transition-all">
                        {f.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${f.accent}-500 border border-${f.accent}-500/30 px-2 py-0.5 rounded-full`}>
                          {f.role}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          Verified Patient
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
};

export default LandingPage;
