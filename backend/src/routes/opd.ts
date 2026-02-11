/**
 * OPD Timings routes
 * 
 * GET /api/opd-timings — List all departments with only OPD-relevant fields
 * 
 * This is a convenience endpoint that returns a slimmer payload
 * with only department name, OPD timings, and location.
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/opd-timings
 * 
 * Returns all departments with OPD timing information only.
 * Sorted by display order.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const timings = await prisma.department.findMany({
            select: {
                id: true,
                nameHi: true,
                nameEn: true,
                opdTimings: true,
                locationText: true,
                locationTextHi: true,
            },
            orderBy: { order: 'asc' },
        });

        res.json({
            success: true,
            data: timings,
            total: timings.length,
        });
    } catch (error) {
        console.error('Error fetching OPD timings:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch OPD timings' });
    }
});

export default router;
