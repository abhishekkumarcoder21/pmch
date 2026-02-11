/**
 * Global error handler middleware
 * 
 * Catches all unhandled errors and returns a consistent JSON response.
 * In production, we hide internal error details from the client.
 */

import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error('❌ Unhandled error:', err.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
    });
}
