import mongoose from 'mongoose';

const decisionSupportSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    diagnoses: [{
        name: String,
        confidence: Number,
        why: String
    }],
    redFlags: [String],
    suggestedTests: [String],
    drugPrecautions: [String],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('DecisionSupport', decisionSupportSchema);
