import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case',
        required: true
    },
    primaryDoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    specialistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    specialistType: {
        type: String,
        required: true
    },
    notes: String,
    urgencyLevel: {
        type: String,
        enum: ['ROUTINE', 'URGENT', 'STAT'],
        default: 'ROUTINE'
    },
    attachments: [String],
    autoSummary: String,
    primaryDoctorDecision: String,
    specialistDecision: String,
    finalMergedDecision: String,
    status: {
        type: String,
        enum: ['PENDING', 'RESPONDED', 'COMPLETED'],
        default: 'PENDING'
    },
    auditLog: [{
        action: String,
        by: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const Referral = mongoose.model('Referral', referralSchema);
export default Referral;
