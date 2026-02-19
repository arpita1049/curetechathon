import express from 'express';
import {
    getDailyIntake,
    getCriticalCases,
    getLiveQueue,
    getPendingSecondOpinions,
    getMonitoring,
    getAlerts,
    getMiniAnalytics
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/daily-intake', getDailyIntake);
router.get('/critical-cases', getCriticalCases);
router.get('/live-queue', getLiveQueue);
router.get('/pending-second-opinions', getPendingSecondOpinions);
router.get('/monitoring', getMonitoring);
router.get('/alerts', getAlerts);
router.get('/mini-analytics', getMiniAnalytics);

export default router;
