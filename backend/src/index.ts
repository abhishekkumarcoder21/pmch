/**
 * PMCH Hospital Utility App — Backend Entry Point
 * 
 * Express server with REST API endpoints for:
 * - Departments (list + detail)
 * - FAQs (list + category filter)
 * - Emergency contacts (list + type filter)
 * - OPD timings (slim department view)
 * 
 * All responses follow: { success: boolean, data?: any, error?: string }
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load .env before anything else
dotenv.config();

import departmentRoutes from './routes/departments';
import faqRoutes from './routes/faqs';
import contactRoutes from './routes/contacts';
import opdRoutes from './routes/opd';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors()); // Allow all origins (fine for a public read-only API)
app.use(express.json());

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'PMCH API is running', timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api/departments', departmentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/opd-timings', opdRoutes);

// ─── 404 handler for unknown routes ──────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// ─── Global error handler ────────────────────────────────────
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🏥 PMCH API server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
});

export default app;
