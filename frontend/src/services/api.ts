/**
 * API service — thin wrapper around fetch for the PMCH backend
 * 
 * Why not Axios? Fetch is built-in, smaller bundle. For 5 endpoints, Axios is overkill.
 * 
 * All functions return typed data or throw errors.
 */

import { Department, FAQ, EmergencyContact, OPDTiming, ApiResponse } from '../types';

// In production, this would come from an env variable or config file.
// For local development with Expo on a physical device, use your computer's LAN IP.
// For emulator, use 10.0.2.2 (Android) or localhost (iOS).
const BASE_URL = 'http://10.1.6.37:3000/api';

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const json: ApiResponse<T> = await response.json();

    if (!response.ok || !json.success) {
        throw new Error(json.error || `API request failed: ${response.status}`);
    }

    return json;
}

/** Fetch all departments (paginated) */
export async function fetchDepartments(page: number = 1, pageSize: number = 20): Promise<Department[]> {
    const result = await fetchApi<Department[]>(`/departments?page=${page}&pageSize=${pageSize}`);
    return result.data;
}

/** Fetch a single department by ID */
export async function fetchDepartmentById(id: number): Promise<Department> {
    const result = await fetchApi<Department>(`/departments/${id}`);
    return result.data;
}

/** Fetch all FAQs, optionally filtered by category */
export async function fetchFAQs(category?: string): Promise<FAQ[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const result = await fetchApi<FAQ[]>(`/faqs${query}`);
    return result.data;
}

/** Fetch all emergency contacts */
export async function fetchContacts(): Promise<EmergencyContact[]> {
    const result = await fetchApi<EmergencyContact[]>('/contacts');
    return result.data;
}

/** Fetch OPD timings (slim department data) */
export async function fetchOPDTimings(): Promise<OPDTiming[]> {
    const result = await fetchApi<OPDTiming[]>('/opd-timings');
    return result.data;
}
