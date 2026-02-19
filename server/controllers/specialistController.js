import Referral from '../models/Referral.js';
import Case from '../models/Case.js';
import logger from '../utils/logger.js';

/**
 * MODULE 3 — SECOND OPINION WORKFLOW
 */

export const requestSecondOpinion = async (req, res) => {
    try {
        const { specialistId, notes, urgency } = req.body;
        const referral = await Referral.create({
            caseId: req.params.caseId,
            doctorId: req.user?._id || '65f1234567890abcd1234567', // Mock fallback
            specialistId,
            doctorNotes: notes,
            urgencyLevel: urgency || 'ROUTINE',
            status: 'PENDING'
        });

        // Audit Logging
        logger.info(`Referral created for case ${req.params.caseId}`);

        res.status(201).json({ status: 'success', data: referral });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSecondOpinion = async (req, res) => {
    try {
        const referral = await Referral.findOne({ caseId: req.params.caseId })
            .populate('doctorId', 'name specialization')
            .populate('specialistId', 'name specialization');

        res.status(200).json({ status: 'success', data: referral });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const respondToReferral = async (req, res) => {
    try {
        const { specialistOpinion, finalDecision } = req.body;
        const referral = await Referral.findOneAndUpdate(
            { caseId: req.params.caseId },
            {
                specialistOpinion,
                finalDecision,
                status: 'RESPONDED'
            },
            { new: true }
        );

        if (!referral) return res.status(404).json({ status: 'error', message: 'Referral not found' });

        res.status(200).json({ status: 'success', data: referral });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSpecialistReferrals = async (req, res) => {
    try {
        const referrals = await Referral.find({ status: 'PENDING' }).populate('caseId');
        res.status(200).json({ status: 'success', data: referrals });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
