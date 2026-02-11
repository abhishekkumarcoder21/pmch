/**
 * Department routes
 * 
 * GET /api/departments       — List all departments (paginated, sorted by display order)
 * GET /api/departments/:id   — Get a single department by ID
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/departments
 * 
 * Query params:
 *   page     — Page number (default: 1)
 *   pageSize — Items per page (default: 20, max: 50)
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 20));
        const skip = (page - 1) * pageSize;

        const [departments, total] = await Promise.all([
            prisma.department.findMany({
                orderBy: { order: 'asc' },
                skip,
                take: pageSize,
            }),
            prisma.department.count(),
        ]);

        res.json({
            success: true,
            data: departments,
            pagination: { page, pageSize, total },
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch departments' });
    }
});

/**
 * GET /api/departments/:id
 * 
 * Returns a single department by its numeric ID.
 * Returns 404 if not found.
 */
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);

        if (isNaN(id)) {
            res.status(400).json({ success: false, error: 'Invalid department ID' });
            return;
        }

        const department = await prisma.department.findUnique({ where: { id } });

        if (!department) {
            res.status(404).json({ success: false, error: 'Department not found' });
            return;
        }

        res.json({ success: true, data: department });
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch department' });
    }
});

export default router;
