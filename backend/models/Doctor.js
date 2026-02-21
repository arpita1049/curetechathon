import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: String,
    name: { type: String, required: true },
    qualification: String,
    specialty: String,
    assignedFacility: String,
    performance: {
        casesHandled: { type: Number, default: 0 },
        escalationCount: { type: Number, default: 0 },
        averageResponseTime: { type: Number, default: 0 } // in minutes
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', doctorSchema);
