import express from 'express';
import { respondToReferral, getSpecialistReferrals } from '../controllers/specialistController.js';

const router = express.Router();

// MODULE 3 — SECOND OPINION WORKFLOW (Specialist actions)
router.get('/referrals', getSpecialistReferrals);
router.post('/respond/:caseId', respondToReferral);

export default router;
