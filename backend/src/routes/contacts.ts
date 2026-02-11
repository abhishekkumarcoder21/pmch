/**
 * Emergency contacts routes
 * 
 * GET /api/contacts — List all emergency contacts, optionally filtered by type
 */

import { Router, Request, Response } from 'express';
import { PrismaClient, ContactType } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/contacts
 * 
 * Query params:
 *   type — Filter by contact type: "AMBULANCE", "EMERGENCY", "HELPDESK"
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type } = req.query;

        // Validate type if provided
        const validTypes: string[] = Object.values(ContactType);
        const where = type && validTypes.includes(type as string)
            ? { type: type as ContactType }
            : {};

        const contacts = await prisma.emergencyContact.findMany({
            where,
            orderBy: { id: 'asc' },
        });

        res.json({
            success: true,
            data: contacts,
            total: contacts.length,
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

export default router;
