import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, MapPin, Search, ChevronRight, Star,
    Stethoscope, Shield, Video, Zap, ArrowLeft, Filter,
    CheckCircle2, AlertCircle, Phone, MessageSquare, Download
} from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    experience: string;
    location: string;
    availability: string[];
    fees: number;
    image: string;
    type: 'In-Clinic' | 'Video Cons';
}

const AppointmentBooking: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [bookingStep, setBookingStep] = useState<'list' | 'details' | 'confirm'>('list');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const doctors: Doctor[] = [
        {
            id: '1',
            name: 'Dr. Sarah Mitchell',
            specialty: 'Cardiologist',
            rating: 4.9,
            reviews: 124,
            experience: '12 Years',
            location: 'City Heart Center, Nagpur',
            availability: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
            fees: 800,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            type: 'In-Clinic'
        },
        {
            id: '2',
            name: 'Dr. Rajesh Khanna',
            specialty: 'Dermatologist',
            rating: 4.7,
            reviews: 89,
            experience: '15 Years',
            location: 'Skin Care Plus, Pune',
            availability: ['11:00 AM', '12:00 PM', '03:30 PM', '05:00 PM'],
            fees: 600,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
            type: 'Video Cons'
        },
        {
            id: '3',
            name: 'Dr. Anjali Deshmukh',
            specialty: 'Pediatrician',
            rating: 4.9,
            reviews: 210,
            experience: '8 Years',
            location: 'Kidz Care Clinic, Nagpur',
            availability: ['10:00 AM', '11:15 AM', '01:00 PM', '03:45 PM'],
            fees: 500,
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
            type: 'In-Clinic'
        }
    ];

    const specialties = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Orthopedic'];

    const filteredDoctors = doctors.filter(doc =>
        (selectedSpecialty === 'All' || doc.specialty === selectedSpecialty) &&
        (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold mb-4 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Book Appointment
                        </h1>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {bookingStep === 'list' && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Search & Filter */}
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, specialty or clinic..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 rounded-[2rem] font-bold text-lg outline-none focus:border-teal-500 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {specialties.map(spec => (
                                        <button
                                            key={spec}
                                            onClick={() => setSelectedSpecialty(spec)}
                                            className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${selectedSpecialty === spec ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl text-slate-500 border-2 border-slate-100 dark:border-white/10'}`}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Doctor Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredDoctors.map((doc, idx) => (
                                    <motion.div
                                        key={doc.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] p-8 border-2 border-slate-100 dark:border-white/10 hover:border-teal-500/30 transition-all group relative overflow-hidden"
                                    >
                                        <div className="flex items-start gap-6 mb-8">
                                            <div className="relative">
                                                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl bg-teal-50 dark:bg-teal-900/30" />
                                                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white ${doc.type === 'In-Clinic' ? 'bg-teal-600' : 'bg-blue-600'}`}>
                                                    {doc.type}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">{doc.name}</h3>
                                                <p className="text-teal-600 font-bold text-sm mb-2">{doc.specialty}</p>
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-sm font-black">{doc.rating}</span>
                                                    <span className="text-slate-400 font-bold text-xs ml-1">({doc.reviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                                <Zap className="w-4 h-4 text-teal-600" />
                                                <span>{doc.experience} Experience</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                                <MapPin className="w-4 h-4 text-teal-600" />
                                                <span className="line-clamp-1">{doc.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                                <Calendar className="w-4 h-4 text-teal-600" />
                                                <span>Next Available: Tomorrow</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consultation Fee</p>
                                                <p className="text-2xl font-black text-slate-900 dark:text-white">₹{doc.fees}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedDoctor(doc);
                                                    setBookingStep('details');
                                                }}
                                                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                                            >
                                                Reserve Slot
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {bookingStep === 'details' && selectedDoctor && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-4xl mx-auto bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[4rem] p-10 border-2 border-slate-100 dark:border-white/10 shadow-2xl space-y-10"
                        >
                            <div className="flex flex-col md:flex-row gap-10 items-start">
                                <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-32 h-32 rounded-3xl bg-teal-50 dark:bg-teal-900/30" />
                                <div className="space-y-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{selectedDoctor.name}</h2>
                                            <p className="text-xl text-teal-600 font-bold">{selectedDoctor.specialty}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-slate-900 dark:text-white">₹{selectedDoctor.fees}</div>
                                            <p className="text-xs font-black uppercase text-slate-400">Per Session</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 font-bold text-sm">
                                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                                            {selectedDoctor.rating} Rating
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 font-bold text-sm">
                                            <Shield className="w-4 h-4 text-teal-600" />
                                            {selectedDoctor.experience} Exp
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-teal-600" />
                                    Select Date
                                </h3>
                                <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(`${day} 1${i + 8}`)}
                                            className={`p-4 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 ${selectedDate?.includes(day) ? 'bg-teal-600 text-white border-teal-600 shadow-xl shadow-teal-500/20' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500'}`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest">{day}</span>
                                            <span className="text-xl font-black">1{i + 8}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-teal-600" />
                                    Select Slot
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {selectedDoctor.availability.map(slot => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-5 rounded-2xl font-black text-center transition-all border-2 ${selectedSlot === slot ? 'bg-teal-600 text-white border-teal-600 shadow-xl shadow-teal-500/20' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500'}`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={() => setBookingStep('list')}
                                    className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[2rem] font-black uppercase tracking-widest text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!selectedDate || !selectedSlot}
                                    onClick={() => setBookingStep('confirm')}
                                    className="flex-[2] py-5 bg-teal-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-teal-500/30 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {bookingStep === 'confirm' && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto text-center space-y-10 py-12"
                        >
                            <div className="w-32 h-32 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto relative">
                                <CheckCircle2 className="w-16 h-16 text-teal-600" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 border-4 border-teal-500/20 rounded-full"
                                />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Booking Confirmed!</h2>
                                <p className="text-slate-500 font-bold text-lg">Your appointment with {selectedDoctor?.name} has been successfully scheduled.</p>
                            </div>
                            <div className="bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl rounded-[3rem] p-8 border-2 border-slate-100 dark:border-white/10 space-y-6 text-left">
                                <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest text-slate-400">
                                    <span>Token Number</span>
                                    <span className="text-teal-600 text-lg">#CURE-0248</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Time</p>
                                            <p className="font-black text-slate-900 dark:text-white">{selectedDate} • {selectedSlot}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</p>
                                            <p className="font-black text-slate-900 dark:text-white">{selectedDoctor?.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={onBack}
                                    className="py-5 bg-teal-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-teal-500/20"
                                >
                                    Home Dashboard
                                </button>
                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-white/70 dark:bg-[#0f2a47]/60 backdrop-blur-3xl border-2 border-slate-100 dark:border-white/10 rounded-2xl font-black flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                        <Download className="w-4 h-4" /> Receipt
                                    </button>
                                    <button className="flex-1 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                        <Calendar className="w-4 h-4" /> Add to Cal
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AppointmentBooking;
