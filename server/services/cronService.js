import cron from 'node-cron';
import { memoryDB } from '../utils/memoryDB.js';
import logger from '../utils/logger.js';

export const cronService = {
    start: () => {
        // Check for critical vitals every minute using memory DB for demo
        cron.schedule('*/5 * * * * *', () => { // Every 5 seconds for demo parity
            try {
                const highRiskCases = memoryDB.cases.filter(c =>
                    ['HIGH', 'CRITICAL'].includes(c.riskLevel) && c.status !== 'CLOSED'
                );

                for (const c of highRiskCases) {
                    const existingAlert = memoryDB.notifications.find(n =>
                        n.relatedId === c._id && !n.isRead && n.type === 'ALERT'
                    );

                    if (!existingAlert) {
                        memoryDB.notifications.push({
                            _id: 'n' + Date.now(),
                            recipientId: 'DOCTOR_POOL',
                            title: `URGENT: ${c.riskLevel} Case`,
                            type: 'ALERT',
                            message: `Case #${c._id} requires attention.`,
                            relatedId: c._id,
                            priority: 'URGENT',
                            isRead: false
                        });
                        logger.info(`Alert generated in memory for Case ${c._id}`);
                    }
                }
            } catch (error) {
                logger.error('Error in cronService memory check:', error);
            }
        });

        logger.info('Cron services initialised (Memory Mode)');
    }
};
