import express from 'express';
import {
    getCaseDetails,
    getDecisionSupport,
    getRiskStratification,
    escalateCase,
    specialistRespond,
    getFinalDecision,
    getDoctorPerformance,
    getCases,
    getDashboardStats,
    getPHWs,
    employPHW,
    updatePHWStatus,
    awardReward,
    upgradeTraining,
    confirmDiagnosis
} from '../controllers/doctorController.js';


const router = express.Router();

// Dashboard & Worklist
router.get('/cases', getCases);
router.get('/dashboard-stats', getDashboardStats);

// 1. Structured Case Review
router.get('/case/:caseId', getCaseDetails);

// 2. Clinical Decision Support
router.get('/decision-support/:caseId', getDecisionSupport);

// 3. Risk Stratification
router.get('/risk/:caseId', getRiskStratification);

// 4. Second Opinion Workflow
router.post('/escalate/:caseId', escalateCase);
router.post('/specialist/respond/:caseId', specialistRespond);
router.post('/confirm-diagnosis/:caseId', confirmDiagnosis);

// 5. Unified Decision Record
router.get('/final-decision/:caseId', getFinalDecision);

// 6. Workforce Performance Tracking
router.get('/performance', getDoctorPerformance);

// Employment of PHWs
router.get('/phws', getPHWs);
router.post('/phws/employ', employPHW);
router.patch('/phws/:phwId/status', updatePHWStatus);
router.post('/phws/:phwId/reward', awardReward);
router.post('/phws/:phwId/train', upgradeTraining);

export default router;


