import mongoose from 'mongoose';
import Case from './models/Case.js';
import Patient from './models/Patient.js';
import Doctor from './models/Doctor.js';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cure_clinic');
        console.log('Connected to MongoDB for seeding');

        // Clear existing
        await Case.deleteMany({});
        await Patient.deleteMany({});
        await Doctor.deleteMany({});

        // Create Doctor
        const doctor = await Doctor.create({
            name: 'Dr. Vikram Aditya',
            specialization: 'Senior Medical Node',
            email: 'vikram@cure.com',
            role: 'DOCTOR'
        });

        // Create Patients
        const patients = await Patient.create([
            { name: 'Arpita Sharma', age: 24, gender: 'Female' },
            { name: 'Rahul Verma', age: 45, gender: 'Male' },
            { name: 'Priya Das', age: 31, gender: 'Female' }
        ]);

        // Create Cases
        await Case.create([
            {
                patientId: patients[0]._id,
                chiefComplaint: 'Neural Scan required - severe migraine',
                riskLevel: 'CRITICAL',
                aiConfidenceScore: 92,
                alertFlags: ['HTN', 'SEIZURE_RISK'],
                status: 'PENDING',
                vitals: { temperature: '99F', bp: '140/90', heartRate: 88, oxygenLevel: 98 },
                aiAnalysis: {
                    probableDiagnoses: ['Migraine with aura', 'Incidentaloma'],
                    redFlags: ['Persistent vomiting', 'Vision blur'],
                    riskScore: 85,
                    hospitalizationRisk: 40
                },
                assignedDoctor: doctor._id
            },
            {
                patientId: patients[1]._id,
                chiefComplaint: 'Cardiac Review - Chest tightness',
                riskLevel: 'HIGH',
                aiConfidenceScore: 88,
                status: 'UNDER_REVIEW',
                vitals: { temperature: '98.4F', bp: '150/95', heartRate: 92, oxygenLevel: 96 },
                aiAnalysis: {
                    probableDiagnoses: ['Angina', 'GERD'],
                    redFlags: ['Shortness of breath'],
                    riskScore: 65,
                    hospitalizationRisk: 25
                },
                assignedDoctor: doctor._id
            }
        ]);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
