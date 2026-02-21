import express from 'express';
import {
    getCaseDetails,
    getDecisionSupport,
    getRiskStratification,
    escalateCase,
    specialistRespond,
    getFinalDecision,
    getDoctorPerformance
} from '../controllers/doctorController.js';

const router = express.Router();

// 1. Structured Case Review
router.get('/case/:caseId', getCaseDetails);

// 2. Clinical Decision Support
router.get('/decision-support/:caseId', getDecisionSupport);

// 3. Risk Stratification
router.get('/risk/:caseId', getRiskStratification);

// 4. Second Opinion Workflow
router.post('/escalate/:caseId', escalateCase);
router.post('/specialist/respond/:caseId', specialistRespond);

// 5. Unified Decision Record
router.get('/final-decision/:caseId', getFinalDecision);

// 6. Workforce Performance Tracking
router.get('/performance', getDoctorPerformance);

export default router;
