/**
 * AsyncStorage cache service
 * 
 * Provides a simple cache layer for API responses.
 * Each cached item stores the data + a timestamp.
 * This enables "last updated" display and offline-first behavior.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@pmch_cache_';

interface CachedItem<T> {
    data: T;
    timestamp: number; // Unix timestamp in milliseconds
}

/** Save data to cache with a timestamp */
export async function setCache<T>(key: string, data: T): Promise<void> {
    try {
        const item: CachedItem<T> = {
            data,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (e) {
        console.warn('Cache write failed:', key, e);
    }
}

/** Read cached data. Returns null if not found or expired. */
export async function getCache<T>(key: string): Promise<{ data: T; timestamp: number } | null> {
    try {
        const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;

        const item: CachedItem<T> = JSON.parse(raw);
        return { data: item.data, timestamp: item.timestamp };
    } catch (e) {
        console.warn('Cache read failed:', key, e);
        return null;
    }
}

/** Format a timestamp into a human-readable "last updated" string */
export function formatLastUpdated(timestamp: number, isHindi: boolean): string {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (isHindi) {
        if (diffMin < 1) return 'अभी अपडेट हुआ';
        if (diffMin < 60) return `${diffMin} मिनट पहले अपडेट हुआ`;
        if (diffHour < 24) return `${diffHour} घंटे पहले अपडेट हुआ`;
        return `${diffDay} दिन पहले अपडेट हुआ`;
    }

    if (diffMin < 1) return 'Updated just now';
    if (diffMin < 60) return `Updated ${diffMin} min ago`;
    if (diffHour < 24) return `Updated ${diffHour} hr ago`;
    return `Updated ${diffDay} day(s) ago`;
}
