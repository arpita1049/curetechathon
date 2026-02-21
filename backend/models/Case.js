import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientAge: Number,
    patientGender: String,
    chiefComplaint: { type: String, required: true },
    duration: String,
    vitals: {
        temp: String,
        bp: String,
        pulse: String,
        spO2: String
    },
    medicalHistory: [String],
    uploadedReports: [{
        name: String,
        url: String,
        type: String,
        date: Date
    }],
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Low' },
    riskScore: { type: Number, min: 0, max: 100 },
    recommendedAction: String,
    status: { type: String, enum: ['Active', 'Escalated', 'Resolved'], default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Case', caseSchema);
