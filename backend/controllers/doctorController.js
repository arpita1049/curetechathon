import Case from '../models/Case.js';
import DecisionSupport from '../models/DecisionSupport.js';
import DecisionRecord from '../models/DecisionRecord.js';
import Doctor from '../models/Doctor.js';

// 1. Structured Case Review
export const getCaseDetails = async (req, res) => {
    try {
        const { caseId } = req.params;
        const caseData = await Case.findById(caseId);
        if (!caseData) return res.status(404).json({ message: 'Case not found' });
        res.json(caseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Clinical Decision Support
export const getDecisionSupport = async (req, res) => {
    try {
        const { caseId } = req.params;
        const support = await DecisionSupport.findOne({ caseId });
        if (!support) return res.status(404).json({ message: 'Decision support data not found' });
        res.json(support);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Risk Stratification
export const getRiskStratification = async (req, res) => {
    try {
        const { caseId } = req.params;
        const caseData = await Case.findById(caseId, 'riskLevel riskScore recommendedAction');
        if (!caseData) return res.status(404).json({ message: 'Case not found' });
        res.json(caseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Second Opinion Workflow - Escalate
export const escalateCase = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { specialistId, reason } = req.body;

        const caseData = await Case.findByIdAndUpdate(caseId, { status: 'Escalated' });

        let record = await DecisionRecord.findOne({ caseId });
        if (!record) {
            record = new DecisionRecord({
                caseId,
                primaryDecision: { plan: reason, doctorName: 'Current Doctor' },
                auditLog: [{ action: 'Escalated', by: 'Doctor', details: `Reason: ${reason}` }]
            });
        } else {
            record.auditLog.push({ action: 'Escalated', by: 'Doctor', details: `Reason: ${reason}` });
        }

        await record.save();
        res.json({ message: 'Case escalated successfully', record });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Second Opinion Workflow - Respond
export const specialistRespond = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { plan, specialistName } = req.body;

        const record = await DecisionRecord.findOne({ caseId });
        if (!record) return res.status(404).json({ message: 'Decision record not found' });

        record.specialistResponse = {
            plan,
            specialistName,
            timestamp: new Date(),
            status: 'Responded'
        };
        record.auditLog.push({ action: 'Responded', by: specialistName, details: plan });

        await record.save();
        res.json({ message: 'Specialist response recorded', record });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Unified Decision Record
export const getFinalDecision = async (req, res) => {
    try {
        const { caseId } = req.params;
        const record = await DecisionRecord.findOne({ caseId });
        if (!record) return res.status(404).json({ message: 'Decision record not found' });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Workforce Performance Tracking
export const getDoctorPerformance = async (req, res) => {
    try {
        // In a real app, we'd get the doctor ID from the request user (JWT)
        const doctor = await Doctor.findOne(); // Placeholder: getting the first doctor
        if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
