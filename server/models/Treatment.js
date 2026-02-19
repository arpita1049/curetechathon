import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String
    }],
    advice: String,
    followUpDays: Number,
    prescribedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Treatment = mongoose.model('Treatment', treatmentSchema);
export default Treatment;
