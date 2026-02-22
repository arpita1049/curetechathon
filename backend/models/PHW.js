import mongoose from 'mongoose';

const phwSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    sector: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['ACTIVE', 'ON_LEAVE', 'INACTIVE'], default: 'ACTIVE' },
    performance: {
        patientsScreened: { type: Number, default: 0 },
        highRiskReferrals: { type: Number, default: 0 },
        accuracyScore: { type: Number, default: 0 }
    },
    rewards: [{
        title: String,
        icon: String,
        date: { type: Date, default: Date.now }
    }],
    trainingLevels: {
        basic: { type: Number, default: 100 },
        neural: { type: Number, default: 0 },
        emergency: { type: Number, default: 0 }
    },
    contact: String,
    employedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});


export default mongoose.model('PHW', phwSchema);
