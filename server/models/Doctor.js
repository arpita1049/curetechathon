import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    email: String,
    role: {
        type: String,
        enum: ['DOCTOR', 'SPECIALIST', 'PHW'],
        default: 'DOCTOR'
    }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
