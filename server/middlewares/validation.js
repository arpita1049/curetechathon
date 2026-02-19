import { body, validationResult } from 'express-validator';

export const validateTreatment = [
    body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
    body('medications').isArray().withMessage('Medications must be an array'),
    body('followUpDays').isNumeric().withMessage('Follow up days must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateReferral = [
    body('specialistType').notEmpty().withMessage('Specialist type is required'),
    body('urgencyLevel').isIn(['ROUTINE', 'URGENT', 'STAT']).withMessage('Invalid urgency level'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
