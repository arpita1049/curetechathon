import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import specialistRoutes from './routes/specialistRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { cronService } from './services/cronService.js';
import logger from './utils/logger.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/doctor', doctorRoutes);
app.use('/doctor/dashboard', dashboardRoutes);
app.use('/specialist', specialistRoutes);

// Start Cron Jobs
cronService.start();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});
