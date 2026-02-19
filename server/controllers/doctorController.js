import Case from '../models/Case.js';
import Appointment from '../models/Appointment.js';
import Notification from '../models/Notification.js';
import Referral from '../models/Referral.js';
import Treatment from '../models/Treatment.js';
import logger from '../utils/logger.js';

/**
 * MODULE 1 — DOCTOR DASHBOARD
 * GET /doctor/dashboard
 */
export const getDashboard = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [todayPatients, criticalCases, pendingSecondOpinions, appointmentsToday, recentNotifications] = await Promise.all([
            Case.countDocuments({ createdAt: { $gte: today } }),
            Case.countDocuments({ riskLevel: 'CRITICAL' }),
            Referral.countDocuments({ status: 'PENDING' }),
            Appointment.countDocuments({ date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } }),
            Notification.find().sort({ createdAt: -1 }).limit(5)
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                todayPatients,
                criticalCases,
                pendingSecondOpinions,
                appointmentsToday,
                recentNotifications
            }
        });
    } catch (error) {
        logger.error(`Dashboard Error: ${error.message}`);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const getPatients = async (req, res) => {
    try {
        const Patient = (await import('../models/Patient.js')).default;
        const patients = await Patient.find();
        res.status(200).json({ status: 'success', data: patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLiveCases = async (req, res) => {
    try {
        const cases = await Case.find().populate('patientId').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            data: {
                cases,
                totalPages: 1,
                currentPage: 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 2 — AI CASE REVIEW
 * GET /doctor/case/:caseId
 */
export const getCaseReview = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.caseId).populate('patientId');
        if (!caseData) return res.status(404).json({ status: 'error', message: 'Case not found' });

        // Mock AI Insight Logic
        const aiInsights = {
            probableConditions: ['Viral Infection', 'Bacterial Pharyngitis'],
            severityScore: caseData.riskLevel === 'CRITICAL' ? 85 : 45,
            redFlags: caseData.vitals?.temp > 102 ? ['High Fever'] : [],
            recommendedTests: ['CBC', 'CRP', 'Swab Test'],
            precautions: ['Isolation', 'Hydration']
        };

        res.status(200).json({
            status: 'success',
            data: {
                patientSummary: caseData.patientId,
                symptoms: caseData.symptoms,
                vitals: caseData.vitals,
                history: caseData.history,
                aiInsights
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 4 — RISK STRATIFICATION
 * GET /doctor/risk/:caseId
 */
export const getRiskStratification = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.caseId);
        if (!caseData) return res.status(404).json({ status: 'error', message: 'Case not found' });

        // Mock Risk Calculation
        const riskScore = caseData.vitals?.temp > 101 ? 75 : 30;
        const riskLevel = riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MODERATE' : 'LOW';

        res.status(200).json({
            status: 'success',
            data: {
                riskLevel,
                riskScore,
                recommendedAction: riskLevel === 'HIGH' ? 'Immediate Specialist Referral' : 'Routine Follow-up'
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 5 — PATIENT NOTIFICATIONS
 */
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNotification = async (req, res) => {
    try {
        const { title, message, type } = req.body;
        const notification = await Notification.create({
            patientId: req.params.patientId,
            title,
            message,
            type
        });
        logger.info(`Notification sent to patient ${req.params.patientId}`);
        res.status(201).json({ status: 'success', data: notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 6 — APPOINTMENTS
 */
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patientId').sort({ date: 1 });
        res.status(200).json({ status: 'success', data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ status: 'success', data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 7 — PRESCRIPTIONS
 */
export const createPrescription = async (req, res) => {
    try {
        const { diagnosis, medications, advice } = req.body;
        const treatment = await Treatment.create({
            caseId: req.params.caseId,
            diagnosis,
            medications,
            advice
        });
        logger.info(`Prescription created for case ${req.params.caseId}`);
        res.status(201).json({ status: 'success', data: treatment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrescription = async (req, res) => {
    try {
        const treatment = await Treatment.findOne({ caseId: req.params.caseId });
        res.status(200).json({ status: 'success', data: treatment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Treatment.find().populate('caseId');
        res.status(200).json({ status: 'success', data: prescriptions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * MODULE 8 — CLINICAL HUB
 */
export const getClinicalHub = async (req, res) => {
    try {
        const cases = await Case.find({ status: 'RESOLVED' }).limit(20);
        res.status(200).json({ status: 'success', data: cases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClinicalHubDetail = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.caseId).populate('patientId');
        res.status(200).json({ status: 'success', data: caseData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
