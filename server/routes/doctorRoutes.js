import express from 'express';
import {
    getDashboard,
    getPatients,
    getLiveCases,
    getCaseReview,
    getRiskStratification,
    getNotifications,
    createNotification,
    markNotificationAsRead,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    createPrescription,
    getPrescription,
    getPrescriptions,
    getClinicalHub,
    getClinicalHubDetail
} from '../controllers/doctorController.js';
import { requestSecondOpinion, getSecondOpinion } from '../controllers/specialistController.js';

const router = express.Router();

// MODULE 1 — DOCTOR DASHBOARD
router.get('/dashboard', getDashboard);
router.get('/patients', getPatients);
router.get('/cases', getLiveCases);

// MODULE 2 — AI CASE REVIEW
router.get('/case/:caseId', getCaseReview);

// MODULE 3 — SECOND OPINION WORKFLOW
router.post('/second-opinion/:caseId', requestSecondOpinion);
router.get('/second-opinion/:caseId', getSecondOpinion);

// MODULE 4 — RISK STRATIFICATION
router.get('/risk/:caseId', getRiskStratification);

// MODULE 5 — PATIENT NOTIFICATIONS
router.get('/notifications', getNotifications);
router.post('/notify/:patientId', createNotification);
router.patch('/notifications/:id', markNotificationAsRead);

// MODULE 6 — APPOINTMENTS
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);
router.patch('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

// MODULE 7 — PRESCRIPTIONS
router.post('/prescription/:caseId', createPrescription);
router.get('/prescription/:caseId', getPrescription);
router.get('/prescriptions', getPrescriptions);

// MODULE 8 — CLINICAL HUB
router.get('/clinical-hub', getClinicalHub);
router.get('/clinical-hub/:caseId', getClinicalHubDetail);

export default router;
