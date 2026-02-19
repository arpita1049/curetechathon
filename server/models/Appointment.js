import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'],
        default: 'SCHEDULED'
    },
    reason: String,
    notes: String
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
