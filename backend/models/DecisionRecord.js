import mongoose from 'mongoose';

const decisionRecordSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    primaryDecision: {
        plan: String,
        doctorName: String,
        timestamp: { type: Date, default: Date.now }
    },
    specialistResponse: {
        plan: String,
        specialistName: String,
        specialistId: String,
        status: { type: String, enum: ['Pending', 'Reviewing', 'Responded', 'Overridden', 'Hospital_Escalation'], default: 'Pending' },
        timestamp: Date,
        clinicalNotes: String,
        overriddenTreatment: Boolean
    },
    blockchainHash: String,
    finalPlan: String,
    auditLog: [{
        action: String,
        by: String,
        timestamp: { type: Date, default: Date.now },
        details: String
    }],
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('DecisionRecord', decisionRecordSchema);
