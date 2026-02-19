
import React from 'react';
import { ArrowLeft, Heart, Stethoscope, Baby, Microscope, Pill, Shield, Clock, CheckCircle2 } from 'lucide-react';

interface ServiceDetailProps {
    service: {
        title: string;
        icon: React.ReactNode;
        desc: string;
        color: string;
    };
    onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
    const getFullContent = (title: string) => {
        const contents: Record<string, any> = {
            'Cardiology': {
                longDesc: 'Our cardiology department offers comprehensive heart care from prevention and diagnosis to treatment and rehabilitation. We use state-of-the-art diagnostic tools to ensure the best possible outcomes for our patients.',
                features: ['Advanced ECG and Stress Testing', 'Echocardiography', 'Cardiac Catheterization', 'Heart Failure Management'],
                image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800'
            },
            'General Medicine': {
                longDesc: 'Our General Medicine department provides primary healthcare services for individuals of all ages. We focus on physical exams, chronic disease management, and preventative health screenings.',
                features: ['Annual Physical Exams', 'Chronic Disease Management', 'Vaccinations and Immunizations', 'Common Illness Treatment'],
                image: 'https://images.unsplash.com/photo-1576091160550-217359f49f4c?auto=format&fit=crop&q=80&w=800'
            },
            'Preventive Care': {
                longDesc: 'Stay ahead of health issues with our comprehensive preventive care services. Regular check-ups and screenings are vital for early detection and maintaining long-term wellness.',
                features: ['Full Body Checkups', 'Cancer Screenings', 'Lifestyle Counseling', 'Vaccination Programs'],
                image: 'https://images.unsplash.com/photo-1579684385180-164e742e870e?auto=format&fit=crop&q=80&w=800'
            },
            'Government Health Schemes': {
                longDesc: 'We assist patients in accessing various government health schemes like Ayushman Bharat to ensure affordable and high-quality treatment for everyone.',
                features: ['Ayushman Bharat PM-JAY', 'Documentation Assistance', 'Eligibility Check', 'Cashless Treatment Support'],
                image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
            },
            'Mediclaim': {
                longDesc: 'Our dedicated insurance desk simplifies the claims process. We partner with major insurance providers to offer hassle-free cashless hospitalization.',
                features: ['Cashless Hospitalization', 'Claim Filing Assistance', 'Network Hospital Benefits', 'Policy Guidance'],
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
            },
            'Emergency Services': {
                longDesc: 'Our 24/7 Emergency department is prepared to handle any urgent medical situation with speed and professionalism. We are equipped with advanced life-support systems.',
                features: ['24/7 Trauma Care', 'Rapid Response Team', 'Critical Care Support', 'Emergency Surgery Facility'],
                image: 'https://images.unsplash.com/photo-1516574187841-69301976e499?auto=format&fit=crop&q=80&w=800'
            },
            'Pharmacy': {
                longDesc: 'Buy genuine medicines online with quick home delivery. We ensure authentic pharmaceutical products delivered right to your doorstep.',
                features: [], // Hidden as requested
                hideCTA: true, // Hidden as requested
                image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800'
            }
        };
        return contents[title] || contents['General Medicine'];
    };

    const content = getFullContent(service.title);

    return (
        <div className="container mx-auto px-6 max-w-7xl animate-fade mt-10 mb-20">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold mb-10 transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </button>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/2 space-y-8">
                    <div className={`w-20 h-20 rounded-3xl bg-sky-50 dark:bg-sky-900/30 text-sky-600 flex items-center justify-center p-4 shadow-sm`}>
                        {React.cloneElement(service.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                        {service.title}
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {content.longDesc}
                    </p>

                    {content.features && content.features.length > 0 && (
                        <div className="space-y-4 pt-4">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Specialties</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.features.map((feature: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                        <span className="font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!content.hideCTA && (
                        <div className="pt-8">
                            <div className="flex items-center gap-8 p-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] shadow-xl">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Available 24/7</p>
                                    <p className="text-xl font-black italic tracking-tight">Need Urgent Consultation?</p>
                                </div>
                                <button className="bg-sky-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 active:scale-95 ml-auto">
                                    Call Now
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:w-1/2 w-full">
                    <div className="relative">
                        <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                            <img
                                src={content.image}
                                alt={service.title}
                                className="w-full h-[600px] object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-6 max-w-xs animate-fade delay-300">
                            <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/40 rounded-full flex items-center justify-center text-sky-600">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">Fast Care</p>
                                <p className="text-sm font-bold text-slate-500">Wait time: &lt; 15 mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
