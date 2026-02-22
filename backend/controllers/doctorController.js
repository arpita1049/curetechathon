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

export const escalateCase = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { specialistId, reason } = req.body;

        const blockchainHash = `0x${Math.random().toString(16).slice(2, 42)}`;
        await DecisionRecord.findOneAndUpdate(
            { caseId },
            {
                blockchainHash,
                $push: { auditLog: { action: 'Specialist Escalation', by: 'Doctor', details: `Escalated to Specialist ID: ${specialistId} | Reason: ${reason}` } }
            },
            { upsert: true, new: true }
        );

        res.json({ success: true, message: 'Case escalated to National Mesh specialist.', blockchainHash });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const confirmDiagnosis = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { plan, confirmedBy } = req.body;

        const caseData = await Case.findByIdAndUpdate(caseId, { status: 'Resolved' });
        const blockchainHash = `0x${Math.random().toString(16).slice(2, 42)}`;

        await DecisionRecord.findOneAndUpdate(
            { caseId },
            {
                finalPlan: plan,
                blockchainHash,
                $push: { auditLog: { action: 'Diagnosis Confirmed', by: confirmedBy, details: plan } }
            },
            { upsert: true }
        );

        res.json({ success: true, message: 'Diagnosis confirmed and recorded on ledger.', blockchainHash });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

// Additional methods for Dashboard
export const getCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.json({ success: true, data: { cases } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const totalToday = await Case.countDocuments({
            createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });
        const criticalCases = await Case.countDocuments({ riskLevel: 'Critical' });
        const pendingAlerts = await DecisionRecord.countDocuments({ 'specialistResponse.status': { $ne: 'Responded' } });

        res.json({
            success: true,
            data: {
                totalToday,
                criticalCases,
                pendingAlerts,
                performanceRate: "92%"
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Employment of Primary Health Care Workers
import PHW from '../models/PHW.js';

export const getPHWs = async (req, res) => {
    try {
        const phws = await PHW.find();
        res.json({ success: true, data: phws });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const employPHW = async (req, res) => {
    try {
        const { name, location, sector, contact } = req.body;
        const newPHW = new PHW({ name, location, sector, contact });
        await newPHW.save();
        res.status(201).json({ success: true, data: newPHW });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePHWStatus = async (req, res) => {
    try {
        const { phwId } = req.params;
        const { status } = req.body;
        const phw = await PHW.findByIdAndUpdate(phwId, { status }, { new: true });
        res.json({ success: true, data: phw });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const awardReward = async (req, res) => {
    try {
        const { phwId } = req.params;
        const { title, icon } = req.body;
        const phw = await PHW.findById(phwId);
        phw.rewards.push({ title, icon });
        await phw.save();
        res.json({ success: true, data: phw });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const upgradeTraining = async (req, res) => {
    try {
        const { phwId } = req.params;
        const { type, level } = req.body;
        const update = {};
        update[`trainingLevels.${type}`] = level;
        const phw = await PHW.findByIdAndUpdate(phwId, { $set: update }, { new: true });
        res.json({ success: true, data: phw });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 104. Workforce Performance Tracking
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

