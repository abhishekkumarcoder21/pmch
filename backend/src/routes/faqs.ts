/**
 * FAQ routes
 * 
 * GET /api/faqs — List all FAQs, with optional category filter
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/faqs
 * 
 * Query params:
 *   category — Filter by category (e.g., "general", "opd", "admission", "emergency")
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        const where = category ? { category: category as string } : {};

        const faqs = await prisma.fAQ.findMany({
            where,
            orderBy: { id: 'asc' },
        });

        res.json({
            success: true,
            data: faqs,
            total: faqs.length,
        });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch FAQs' });
    }
});

export default router;
