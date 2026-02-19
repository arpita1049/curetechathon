
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Calendar, User, Phone, Mail, FileText, CheckCircle2, Clock, MapPin, ShieldCheck, Activity, Stethoscope, Sparkles } from 'lucide-react';

interface BookingInfoProps {
  onBack: () => void;
}

const BookingInfo: React.FC<BookingInfoProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: 'Family Physician',
    date: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 50 }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-white dark:bg-slate-950 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-16 h-16" />
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Confirmed!</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Your appointment request has been successfully registered. Our team will reach out to you shortly.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all"
          >
            Return Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-slate-950 font-sans transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-sky-600 font-black uppercase tracking-widest text-xs mb-12"
        >
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-sky-600 group-hover:bg-sky-50 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Services
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-12"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                Book Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Appointment</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Experience world-class healthcare with zero wait times. Fill in your details below.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="space-y-3 group">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 placeholder:text-slate-300"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3 group">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      required
                      type="tel"
                      className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 placeholder:text-slate-300"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    required
                    type="email"
                    className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 placeholder:text-slate-300"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="space-y-3 group">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Specialty</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 cursor-pointer appearance-none"
                    >
                      <optgroup label="Consult a Doctor" className="dark:bg-slate-900 font-bold text-sky-600 dark:text-sky-400">
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Family Physician</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Pediatrician</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Gynecologist</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Dermatologist</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Neurologist</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Cardiologist</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Anesthesiologist</option>
                      </optgroup>
                      <optgroup label="Diagnostics" className="dark:bg-slate-900 font-bold text-sky-600 dark:text-sky-400">
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Sonography</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">MRI</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">X-ray</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">Blood test</option>
                        <option className="dark:bg-slate-900 text-slate-700 dark:text-slate-200">ECG</option>
                      </optgroup>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3 group">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Preferred Date</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <input
                      required
                      type="date"
                      className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 cursor-pointer"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-3 group">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-sky-600 transition-colors ml-2">Reason (Optional)</label>
                <div className="relative">
                  <div className="absolute left-5 top-6 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-focus-within:bg-sky-50 group-focus-within:text-sky-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <textarea
                    rows={4}
                    className="w-full pl-20 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all shadow-sm focus:shadow-xl focus:shadow-sky-500/10 placeholder:text-slate-300 resize-none"
                    placeholder="Briefly describe your symptoms..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm rounded-[2rem] shadow-2xl hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-4 relative overflow-hidden group"
              >
                <span className="relative z-10">Confirm Appointment</span>
                <div className="absolute inset-0 bg-sky-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Hours Card */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/20 rounded-full blur-[80px] group-hover:bg-sky-600/30 transition-colors" />
              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
                  <Clock className="w-8 h-8 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-2">Clinic Hours</h3>
                  <p className="text-slate-400 font-medium">We are here when you need us.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { day: "Mon - Fri", time: "08:00 - 20:00" },
                    { day: "Saturday", time: "09:00 - 18:00" },
                    { day: "Sunday", time: "Emergency Only", highlight: true }
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                      <span className="font-bold text-slate-400 text-sm">{s.day}</span>
                      <span className={`font-black ${s.highlight ? 'text-sky-400' : 'text-white'}`}>{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Book Online */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Why book online?</h3>
                <p className="text-slate-500 font-bold text-sm">Skip the queue and manage your health efficiently.</p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Clock, text: "Zero waiting time guaranteed" },
                  { icon: ShieldCheck, text: "256-bit encrypted health data" },
                  { icon: MapPin, text: "3 Premium centers across city" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-sky-50 dark:bg-sky-900/20 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
