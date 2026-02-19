import logger from '../utils/logger.js';

// In-memory data store for hackathon/demo purposes when MongoDB is unavailable
export const memoryDB = {
    patients: [
        { _id: 'p1', name: 'Arpita Sharma', age: 24, gender: 'Female' },
        { _id: 'p2', name: 'Rahul Verma', age: 45, gender: 'Male' },
        { _id: 'p3', name: 'Priya Das', age: 31, gender: 'Female' }
    ],
    cases: [
        {
            _id: 'c1',
            patientId: { _id: 'p1', name: 'Arpita Sharma', gender: 'Female', age: 24 },
            chiefComplaint: 'Neural Scan - Severe Migraine',
            riskLevel: 'CRITICAL',
            aiConfidenceScore: 92,
            alertFlags: ['SEIZURE_RISK'],
            status: 'PENDING',
            vitals: { temperature: '99F', bp: '140/90', heartRate: 88, oxygenLevel: 98 },
            aiAnalysis: {
                probableDiagnoses: ['Migraine with aura'],
                redFlags: ['Persistent vomiting'],
                riskScore: 85,
                hospitalizationRisk: 40
            },
            createdAt: new Date()
        },
        {
            _id: 'c2',
            patientId: { _id: 'p2', name: 'Rahul Verma', gender: 'Male', age: 45 },
            chiefComplaint: 'Cardiac Review - Chest tightness',
            riskLevel: 'HIGH',
            aiConfidenceScore: 88,
            status: 'UNDER_REVIEW',
            vitals: { temperature: '98.4F', bp: '150/95', heartRate: 92, oxygenLevel: 96 },
            aiAnalysis: {
                probableDiagnoses: ['Angina'],
                redFlags: ['Shortness of breath'],
                riskScore: 65,
                hospitalizationRisk: 25
            },
            createdAt: new Date()
        }
    ],
    notifications: [
        { _id: 'n1', title: 'Critical Alert: Case #c1', type: 'ALERT', isRead: false, priority: 'URGENT' }
    ],
    treatments: [],
    referrals: []
};

logger.info('Memory DB Initialized for Demo');
