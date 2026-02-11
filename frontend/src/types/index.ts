/**
 * Shared TypeScript types for the PMCH Hospital App
 * These mirror the Prisma models from the backend.
 */

// ─── API Response wrapper ──────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    pagination?: {
        page: number;
        pageSize: number;
        total: number;
    };
    total?: number;
}

// ─── Department ────────────────────────────────────────────────
export interface Department {
    id: number;
    nameHi: string;
    nameEn: string;
    descriptionHi: string;
    descriptionEn: string;
    opdTimings: string;
    locationText: string;
    locationTextHi: string;
    order: number;
}

// ─── OPD Timing (slim department view) ─────────────────────────
export interface OPDTiming {
    id: number;
    nameHi: string;
    nameEn: string;
    opdTimings: string;
    locationText: string;
    locationTextHi: string;
}

// ─── FAQ ───────────────────────────────────────────────────────
export interface FAQ {
    id: number;
    questionHi: string;
    questionEn: string;
    answerHi: string;
    answerEn: string;
    category: string;
}

// ─── Emergency Contact ─────────────────────────────────────────
export type ContactType = 'AMBULANCE' | 'EMERGENCY' | 'HELPDESK';

export interface EmergencyContact {
    id: number;
    name: string;
    nameHi: string;
    phone: string;
    type: ContactType;
}

// ─── Language ──────────────────────────────────────────────────
export type Language = 'hi' | 'en';

// ─── Navigation ────────────────────────────────────────────────
export type RootStackParamList = {
    LanguageSelect: undefined;
    Home: undefined;
    DepartmentList: undefined;
    DepartmentDetail: { departmentId: number };
    OPDTimings: undefined;
    FAQs: undefined;
    Emergency: undefined;
    CampusMap: undefined;
    About: undefined;
};
