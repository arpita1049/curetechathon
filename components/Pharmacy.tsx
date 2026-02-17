
import React, { useState } from 'react';
import { ArrowLeft, Search, Pill, AlertTriangle, Clock, MapPin, Upload, Bell, Info, Shield, DollarSign, CheckCircle, XCircle, Calendar, Phone, Loader2, ShoppingBag, ExternalLink } from 'lucide-react';
import { getMedicineInfo } from '../geminiService';

interface PharmacyProps {
    onBack: () => void;
}

interface Medicine {
    name: string;
    genericName: string;
    uses: string[];
    dosage: string;
    warnings: string[];
    contraindications: string[];
    price: { branded: number; generic: number };
}

interface Pharmacy {
    name: string;
    distance: string;
    status: 'open' | 'closed';
    phone: string;
    address: string;
}

const Pharmacy: React.FC<PharmacyProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'search' | 'generic' | 'interaction' | 'prescription' | 'reminder' | 'locator' | 'essential' | 'online'>('search');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [userConditions, setUserConditions] = useState<string[]>([]);
    const [reminders, setReminders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Medicine Database
    const medicineDatabase: Record<string, Medicine> = {
        paracetamol: {
            name: 'Paracetamol',
            genericName: 'Acetaminophen',
            uses: ['Pain relief', 'Fever reduction', 'Headache', 'Muscle aches'],
            dosage: 'Adults: 500-1000mg every 4-6 hours (max 4000mg/day)',
            warnings: ['Do not exceed recommended dose', 'Avoid alcohol', 'Consult doctor if pregnant'],
            contraindications: ['Severe liver disease', 'Alcohol dependency'],
            price: { branded: 50, generic: 15 }
        },
        amoxicillin: {
            name: 'Amoxicillin',
            genericName: 'Amoxicillin',
            uses: ['Bacterial infections', 'Respiratory infections', 'Ear infections', 'Urinary tract infections'],
            dosage: 'Adults: 250-500mg every 8 hours or 500-875mg every 12 hours',
            warnings: ['Complete full course', 'Take with food to reduce stomach upset', 'Inform doctor of allergies'],
            contraindications: ['Penicillin allergy', 'Severe kidney disease'],
            price: { branded: 120, generic: 45 }
        },
        metformin: {
            name: 'Metformin',
            genericName: 'Metformin Hydrochloride',
            uses: ['Type 2 diabetes', 'Blood sugar control', 'PCOS management'],
            dosage: 'Adults: Start 500mg twice daily, max 2000-2500mg/day',
            warnings: ['Take with meals', 'Monitor kidney function', 'Avoid excessive alcohol', 'Risk of lactic acidosis'],
            contraindications: ['Severe kidney disease', 'Liver disease', 'Heart failure', 'Diabetes'],
            price: { branded: 180, generic: 60 }
        },
        aspirin: {
            name: 'Aspirin',
            genericName: 'Acetylsalicylic Acid',
            uses: ['Pain relief', 'Fever reduction', 'Anti-inflammatory', 'Heart attack prevention'],
            dosage: 'Adults: 325-650mg every 4 hours for pain (max 4000mg/day)',
            warnings: ['Take with food', 'Avoid if bleeding disorder', 'Not for children with viral infections'],
            contraindications: ['Bleeding disorders', 'Stomach ulcers', 'Severe kidney disease', 'Diabetes'],
            price: { branded: 40, generic: 12 }
        },
        ibuprofen: {
            name: 'Ibuprofen',
            genericName: 'Ibuprofen',
            uses: ['Pain relief', 'Fever reduction', 'Inflammation', 'Arthritis'],
            dosage: 'Adults: 200-400mg every 4-6 hours (max 1200mg/day OTC)',
            warnings: ['Take with food', 'Avoid if heart disease', 'May increase blood pressure'],
            contraindications: ['Stomach ulcers', 'Heart disease', 'High blood pressure', 'Kidney disease', 'Diabetes'],
            price: { branded: 65, generic: 25 }
        }
    };

    const nearbyPharmacies: Pharmacy[] = [
        { name: 'Apollo Pharmacy', distance: '0.5 km', status: 'open', phone: '+91-1234567890', address: 'Shop 12, Main Road, Sector 5' },
        { name: 'MedPlus', distance: '1.2 km', status: 'open', phone: '+91-9876543210', address: 'Near City Hospital, Market Area' },
        { name: 'Jan Aushadhi Kendra', distance: '1.8 km', status: 'open', phone: '+91-5555666677', address: 'Government Health Center, Block A' },
        { name: 'Wellness Forever', distance: '2.3 km', status: 'closed', phone: '+91-4444333322', address: 'Mall Road, Shopping Complex' },
        { name: 'NetMeds Store', distance: '3.1 km', status: 'open', phone: '+91-7777888899', address: 'Station Road, Near Railway Station' }
    ];

    const essentialMedicines = [
        { category: 'Pain & Fever', medicines: ['Paracetamol', 'Ibuprofen', 'Aspirin'] },
        { category: 'Antibiotics', medicines: ['Amoxicillin', 'Azithromycin', 'Ciprofloxacin'] },
        { category: 'Diabetes', medicines: ['Metformin', 'Glimepiride', 'Insulin'] },
        { category: 'Cardiovascular', medicines: ['Atenolol', 'Amlodipine', 'Atorvastatin'] },
        { category: 'Respiratory', medicines: ['Salbutamol', 'Cetirizine', 'Montelukast'] }
    ];

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setSelectedMedicine(null);

        const query = searchQuery.toLowerCase().trim();

        // precise local check
        if (medicineDatabase[query]) {
            setSelectedMedicine(medicineDatabase[query]);
            setLoading(false);
            return;
        }

        try {
            // AI Fallback for any medicine
            const aiMedicine = await getMedicineInfo(searchQuery);
            setSelectedMedicine(aiMedicine);
        } catch (error) {
            console.error("Medicine search error:", error);
            alert('Could not find information for this medicine. Please check the spelling or try another name.');
        } finally {
            setLoading(false);
        }
    };

    const checkInteraction = (medicine: Medicine) => {
        const warnings: string[] = [];

        if (userConditions.includes('diabetes') && medicine.contraindications.includes('Diabetes')) {
            warnings.push('⚠️ WARNING: This medicine may affect blood sugar levels. Consult your doctor.');
        }
        if (userConditions.includes('bp') && medicine.contraindications.includes('High blood pressure')) {
            warnings.push('⚠️ WARNING: This medicine may increase blood pressure. Consult your doctor.');
        }
        if (userConditions.includes('kidney') && medicine.contraindications.includes('Kidney disease')) {
            warnings.push('⚠️ WARNING: This medicine is not recommended for kidney disease. Consult your doctor.');
        }
        if (userConditions.includes('allergy') && medicine.name.toLowerCase().includes('cillin')) {
            warnings.push('🚫 DANGER: You may be allergic to this medicine. DO NOT TAKE without doctor approval.');
        }

        return warnings;
    };

    const addReminder = (medicineName: string, time: string, frequency: string) => {
        setReminders([...reminders, { id: Date.now(), medicine: medicineName, time, frequency, taken: false }]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-bold">Back</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            💊 Pharmacy Hub
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 font-semibold">Your Complete Medicine Information Center</p>
                    </div>

                    <div className="w-32"></div>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {[
                        { id: 'search', label: 'Medicine Search', icon: Search },
                        { id: 'generic', label: 'Generic vs Branded', icon: DollarSign },
                        { id: 'interaction', label: 'Drug Interaction', icon: AlertTriangle },
                        { id: 'prescription', label: 'Prescription Upload', icon: Upload },
                        { id: 'reminder', label: 'Dosage Reminder', icon: Bell },
                        { id: 'locator', label: 'Pharmacy Locator', icon: MapPin },
                        { id: 'essential', label: 'Essential Medicines', icon: Info },
                        { id: 'online', label: 'Online Medicines', icon: ShoppingBag }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-lg border-2 border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border-2 border-slate-200 dark:border-slate-700">

                    {/* Medicine Search Tab */}
                    {activeTab === 'search' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">🔍 Search Medicine Information</h2>

                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="Enter medicine name (e.g., Paracetamol, Amoxicillin, Metformin)"
                                    className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-all"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>

                            {loading && (
                                <div className="flex flex-col items-center justify-center py-12 text-slate-500 animate-pulse">
                                    <Loader2 className="w-12 h-12 mb-4 animate-spin text-blue-500" />
                                    <p className="text-xl font-bold">Consulting Medical Database...</p>
                                    <p className="text-sm">Fetching detailed information for "{searchQuery}"</p>
                                </div>
                            )}

                            {selectedMedicine && (
                                <div className="mt-8 space-y-6 animate-in fade-in duration-500">
                                    {/* Medicine Header */}
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                                        <h3 className="text-3xl font-black mb-2">{selectedMedicine.name}</h3>
                                        <p className="text-lg font-semibold opacity-90">Generic: {selectedMedicine.genericName}</p>
                                    </div>

                                    {/* Interaction Warnings */}
                                    {userConditions.length > 0 && checkInteraction(selectedMedicine).length > 0 && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-6">
                                            <h4 className="text-xl font-black text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                                <AlertTriangle className="w-6 h-6" />
                                                IMPORTANT WARNINGS FOR YOUR CONDITIONS
                                            </h4>
                                            {checkInteraction(selectedMedicine).map((warning, idx) => (
                                                <p key={idx} className="text-red-600 dark:text-red-300 font-bold mb-2">{warning}</p>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Uses */}
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
                                            <h4 className="text-xl font-black text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                                                <CheckCircle className="w-6 h-6" />
                                                Uses
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedMedicine.uses.map((use, idx) => (
                                                    <li key={idx} className="text-slate-700 dark:text-slate-300 font-semibold flex items-start gap-2">
                                                        <span className="text-green-600 dark:text-green-400">•</span>
                                                        {use}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Dosage */}
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                                            <h4 className="text-xl font-black text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                                                <Pill className="w-6 h-6" />
                                                Dosage Information
                                            </h4>
                                            <p className="text-slate-700 dark:text-slate-300 font-semibold">{selectedMedicine.dosage}</p>
                                        </div>

                                        {/* Warnings */}
                                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800">
                                            <h4 className="text-xl font-black text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                                                <Shield className="w-6 h-6" />
                                                Important Warnings
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedMedicine.warnings.map((warning, idx) => (
                                                    <li key={idx} className="text-slate-700 dark:text-slate-300 font-semibold flex items-start gap-2">
                                                        <span className="text-orange-600 dark:text-orange-400">•</span>
                                                        {warning}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Price Comparison */}
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-800">
                                        <h4 className="text-xl font-black text-emerald-700 dark:text-emerald-400 mb-4">💰 Price Comparison</h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white dark:bg-slate-700 rounded-xl p-4">
                                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Branded</p>
                                                <p className="text-3xl font-black text-slate-800 dark:text-white">₹{selectedMedicine.price.branded}</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-700 rounded-xl p-4">
                                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Generic</p>
                                                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{selectedMedicine.price.generic}</p>
                                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                                    Save {Math.round((1 - selectedMedicine.price.generic / selectedMedicine.price.branded) * 100)}%!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-xl p-6">
                                        <p className="text-red-700 dark:text-red-300 font-bold text-lg">
                                            ⚠️ DISCLAIMER: This information is for educational purposes only. Always consult a qualified healthcare professional before taking any medication.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Generic vs Branded Tab */}
                    {activeTab === 'generic' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">💊 Generic vs Branded Medicines</h2>

                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">What are Generic Medicines?</h3>
                                <p className="text-lg font-semibold leading-relaxed">
                                    Generic medicines contain the same active ingredients as branded medicines and work exactly the same way.
                                    They are approved by regulatory authorities and meet the same quality standards.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-800">
                                    <h4 className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mb-4">✅ Why Generic is Cheaper</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">No marketing and advertising costs</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">No research and development expenses</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Patent expiration allows competition</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Lower packaging and branding costs</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                                    <h4 className="text-2xl font-black text-blue-700 dark:text-blue-400 mb-4">🔬 Same Composition</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Identical active ingredients</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Same strength and dosage form</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Equivalent safety and effectiveness</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                            <span className="text-slate-700 dark:text-slate-300 font-semibold">Meets quality standards</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800">
                                <h4 className="text-2xl font-black text-amber-700 dark:text-amber-400 mb-4">💰 Cost Transparency Examples</h4>
                                <div className="space-y-4">
                                    {Object.values(medicineDatabase).map((med, idx) => (
                                        <div key={idx} className="bg-white dark:bg-slate-700 rounded-xl p-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white text-lg">{med.name}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Generic: {med.genericName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold line-through">₹{med.price.branded}</p>
                                                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{med.price.generic}</p>
                                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                    Save {Math.round((1 - med.price.generic / med.price.branded) * 100)}%
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Drug Interaction Tab */}
                    {activeTab === 'interaction' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">⚠️ Drug Interaction & Allergy Warning</h2>

                            <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">Select Your Health Conditions</h3>
                                <p className="text-lg font-semibold">
                                    This intelligent system will warn you if a medicine is unsafe for your conditions.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                {['diabetes', 'bp', 'kidney', 'allergy'].map((condition) => (
                                    <button
                                        key={condition}
                                        onClick={() => {
                                            if (userConditions.includes(condition)) {
                                                setUserConditions(userConditions.filter(c => c !== condition));
                                            } else {
                                                setUserConditions([...userConditions, condition]);
                                            }
                                        }}
                                        className={`p-6 rounded-2xl font-bold text-lg transition-all duration-300 ${userConditions.includes(condition)
                                            ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-105'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600'
                                            }`}
                                    >
                                        {condition === 'diabetes' && '🩸 Diabetes'}
                                        {condition === 'bp' && '💓 High Blood Pressure'}
                                        {condition === 'kidney' && '🫘 Kidney Disease'}
                                        {condition === 'allergy' && '🤧 Penicillin Allergy'}
                                    </button>
                                ))}
                            </div>

                            {userConditions.length > 0 && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-6">
                                    <h4 className="text-xl font-black text-blue-700 dark:text-blue-400 mb-4">Your Selected Conditions:</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {userConditions.map((condition) => (
                                            <span key={condition} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                                                {condition.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-slate-700 dark:text-slate-300 font-semibold">
                                        ✅ Now search for medicines in the "Medicine Search" tab to see personalized warnings!
                                    </p>
                                </div>
                            )}

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-xl p-6">
                                <h4 className="text-xl font-black text-yellow-700 dark:text-yellow-400 mb-3">💡 How It Works</h4>
                                <ul className="space-y-2 text-slate-700 dark:text-slate-300 font-semibold">
                                    <li>• Select your health conditions above</li>
                                    <li>• Go to "Medicine Search" tab and search for any medicine</li>
                                    <li>• System will automatically show warnings if the medicine is unsafe for you</li>
                                    <li>• Red warnings mean "Avoid this medicine" - consult your doctor immediately</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Prescription Upload Tab */}
                    {activeTab === 'prescription' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">📄 Prescription Upload & Analysis</h2>

                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">Upload Your Prescription</h3>
                                <p className="text-lg font-semibold">
                                    Our AI will extract medicine names, suggest reminders, and provide detailed information.
                                </p>
                            </div>

                            <div className="border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center bg-slate-50 dark:bg-slate-700/50 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 cursor-pointer">
                                <Upload className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                                <h4 className="text-xl font-black text-slate-700 dark:text-slate-300 mb-2">Drop your prescription here</h4>
                                <p className="text-slate-600 dark:text-slate-400 font-semibold mb-4">or click to browse</p>
                                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300">
                                    Choose File
                                </button>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-6">
                                <h4 className="text-xl font-black text-blue-700 dark:text-blue-400 mb-4">🤖 AI Features (Coming Soon)</h4>
                                <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-semibold">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                        <span>Automatic medicine name extraction from prescription images</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                        <span>Dosage and timing information extraction</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                        <span>Automatic reminder schedule creation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                                        <span>Medicine information and side effects display</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Dosage Reminder Tab */}
                    {activeTab === 'reminder' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">⏰ Dosage Reminder System</h2>

                            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">Never Miss Your Medicine</h3>
                                <p className="text-lg font-semibold">
                                    Set reminders for your medications and track your adherence.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600">
                                <h4 className="text-xl font-black text-slate-800 dark:text-white mb-4">Add New Reminder</h4>
                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Medicine name"
                                        className="px-4 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold outline-none focus:border-teal-500"
                                        id="reminder-medicine"
                                    />
                                    <input
                                        type="time"
                                        className="px-4 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold outline-none focus:border-teal-500"
                                        id="reminder-time"
                                    />
                                    <select
                                        className="px-4 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold outline-none focus:border-teal-500"
                                        id="reminder-frequency"
                                    >
                                        <option>Once daily</option>
                                        <option>Twice daily</option>
                                        <option>Three times daily</option>
                                        <option>Every 6 hours</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => {
                                        const medicine = (document.getElementById('reminder-medicine') as HTMLInputElement).value;
                                        const time = (document.getElementById('reminder-time') as HTMLInputElement).value;
                                        const frequency = (document.getElementById('reminder-frequency') as HTMLSelectElement).value;
                                        if (medicine && time) {
                                            addReminder(medicine, time, frequency);
                                        }
                                    }}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Bell className="w-5 h-5" />
                                    Add Reminder
                                </button>
                            </div>

                            {reminders.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-xl font-black text-slate-800 dark:text-white">Your Reminders</h4>
                                    {reminders.map((reminder) => (
                                        <div key={reminder.id} className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${reminder.taken ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                                    {reminder.taken ? <CheckCircle className="w-6 h-6 text-white" /> : <Clock className="w-6 h-6 text-slate-600 dark:text-slate-400" />}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 dark:text-white text-lg">{reminder.medicine}</p>
                                                    <p className="text-slate-600 dark:text-slate-400 font-semibold">{reminder.time} • {reminder.frequency}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setReminders(reminders.map(r => r.id === reminder.id ? { ...r, taken: !r.taken } : r));
                                                }}
                                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${reminder.taken
                                                    ? 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                            >
                                                {reminder.taken ? 'Undo' : 'Mark as Taken'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pharmacy Locator Tab */}
                    {activeTab === 'locator' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">📍 Nearby Pharmacy Locator</h2>

                            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">Find Pharmacies Near You</h3>
                                <p className="text-lg font-semibold">
                                    Locate the nearest pharmacies with contact information and operating status.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {nearbyPharmacies.map((pharmacy, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-xl font-black text-slate-800 dark:text-white mb-2">{pharmacy.name}</h4>
                                                <p className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {pharmacy.distance} away
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-xl font-bold ${pharmacy.status === 'open'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                }`}>
                                                {pharmacy.status === 'open' ? '🟢 Open' : '🔴 Closed'}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 dark:text-slate-300 font-semibold mb-3">{pharmacy.address}</p>
                                        <div className="flex gap-3">
                                            <a
                                                href={`tel:${pharmacy.phone}`}
                                                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-5 h-5" />
                                                Call Now
                                            </a>
                                            <button className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2">
                                                <MapPin className="w-5 h-5" />
                                                Get Directions
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-xl p-6">
                                <p className="text-amber-700 dark:text-amber-300 font-bold">
                                    💡 TIP: Jan Aushadhi Kendras offer generic medicines at highly affordable prices. Perfect for rural and budget-conscious patients!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Essential Medicines Tab */}
                    {activeTab === 'essential' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">📋 Essential Medicines List</h2>

                            <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">WHO Essential Medicines</h3>
                                <p className="text-lg font-semibold">
                                    These are the most important medicines needed for a basic healthcare system, as defined by the World Health Organization.
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-6 mb-6">
                                <h4 className="text-xl font-black text-blue-700 dark:text-blue-400 mb-3">What are Essential Medicines?</h4>
                                <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                                    Essential medicines are those that satisfy the priority healthcare needs of a population. They are selected with due regard to disease prevalence,
                                    evidence of efficacy and safety, and comparative cost-effectiveness. Essential medicines are intended to be available within functioning health systems
                                    at all times in adequate amounts, in appropriate dosage forms, with assured quality, and at affordable prices.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {essentialMedicines.map((category, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600">
                                        <h4 className="text-xl font-black text-slate-800 dark:text-white mb-4">{category.category}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {category.medicines.map((medicine, midx) => (
                                                <span key={midx} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold">
                                                    {medicine}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-6">
                                <h4 className="text-xl font-black text-emerald-700 dark:text-emerald-400 mb-4">🌍 Why Essential Medicines Matter</h4>
                                <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-semibold">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                        <span>Ensures access to life-saving treatments for all populations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                        <span>Promotes rational use of medicines and cost-effectiveness</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                        <span>Guides procurement and supply decisions in healthcare systems</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                                        <span>Particularly important for rural and underserved communities</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Online Medicines Tab */}
                    {activeTab === 'online' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">🛍️ Order Medicines Online</h2>

                            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white mb-6">
                                <h3 className="text-2xl font-black mb-4">Fast & Secure Home Delivery</h3>
                                <p className="text-lg font-semibold">
                                    Compare prices and order from top trusted online pharmacies with express delivery options.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { name: 'Tata 1mg', desc: 'India\'s Leading Digital Healthcare Platform', offer: 'Flat 15% OFF + 5% Cashback', color: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800', btn: 'bg-rose-500 hover:bg-rose-600', url: 'https://www.1mg.com/' },
                                    { name: 'PharmEasy', desc: 'Healthcare App for Medicines & Tests', offer: 'Up to 25% OFF on First Order', color: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', btn: 'bg-emerald-500 hover:bg-emerald-600', url: 'https://pharmeasy.in/' },
                                    { name: 'Netmeds', desc: 'India Ki Pharmacy', offer: '20% OFF + 100% NMS SuperCash', color: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', btn: 'bg-blue-500 hover:bg-blue-600', url: 'https://www.netmeds.com/' },
                                    { name: 'Apollo 24|7', desc: 'Online Doctor & Pharmacy', offer: 'Delivery in 2 Hours', color: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', btn: 'bg-orange-500 hover:bg-orange-600', url: 'https://www.apollo247.com/' }
                                ].map((provider, idx) => (
                                    <div key={idx} className={`rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${provider.color} ${provider.border}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-2xl font-black text-slate-800 dark:text-white">{provider.name}</h4>
                                            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-500 border border-slate-200 dark:border-slate-700">Verified</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-bold mb-4">{provider.desc}</p>
                                        <div className="flex items-center gap-2 mb-6 text-slate-700 dark:text-slate-300 font-bold">
                                            <span className="text-xl">🔥</span> {provider.offer}
                                        </div>
                                        <button
                                            onClick={() => window.open(provider.url, '_blank')}
                                            className={`w-full py-4 text-white rounded-xl font-black flex items-center justify-center gap-2 shadow-lg transition-all ${provider.btn}`}
                                        >
                                            Order Now <ExternalLink className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-600 text-center">
                                <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Need Urgent Delivery?</h4>
                                <p className="text-slate-600 dark:text-slate-400 font-bold mb-6">
                                    Our local pharmacy partners offer instant delivery within 30-45 minutes for emergency requirements.
                                </p>
                                <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black hover:scale-105 transition-all shadow-xl">
                                    Find Local Stores
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
