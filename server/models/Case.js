import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    chiefComplaint: {
        type: String,
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'LOW'
    },
    aiConfidenceScore: {
        type: Number,
        default: 0
    },
    alertFlags: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['PENDING', 'UNDER_REVIEW', 'SECOND_OPINION', 'TREATED', 'ESCALATED', 'CLOSED'],
        default: 'PENDING'
    },
    vitals: {
        temperature: String,
        bp: String,
        heartRate: Number,
        oxygenLevel: Number,
        recordedAt: {
            type: Date,
            default: Date.now
        }
    },
    history: [{
        event: String,
        date: Date,
        description: String
    }],
    aiAnalysis: {
        probableDiagnoses: [String],
        redFlags: [String],
        recommendedTests: [String],
        drugPrecautions: [String],
        riskScore: Number,
        hospitalizationRisk: Number
    },
    doctorNotes: String,
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
}, {
    timestamps: true
});

// Index for severity and status sorting
caseSchema.index({ riskLevel: 1, status: 1, createdAt: -1 });
caseSchema.index({ status: 1 });

const Case = mongoose.model('Case', caseSchema);
export default Case;
