/**
 * useCachedData — Custom hook for offline-first data fetching
 * 
 * Strategy:
 * 1. On mount, immediately show cached data (if any)
 * 2. Fetch fresh data from API in background
 * 3. If API succeeds: update state + cache
 * 4. If API fails: keep showing cached data with "last updated" time
 * 5. If no cache and no API: show error state
 * 
 * This ensures the app always feels fast and works offline.
 */

import { useState, useEffect, useCallback } from 'react';
import { getCache, setCache } from '../services/cache';

interface UseCachedDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    lastUpdated: number | null;  // Unix timestamp
    refresh: () => void;
}

export function useCachedData<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>,
): UseCachedDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        // Step 1: Try to load from cache first (instant)
        const cached = await getCache<T>(cacheKey);
        if (cached) {
            setData(cached.data);
            setLastUpdated(cached.timestamp);
        }

        // Step 2: Fetch fresh data from API
        try {
            const fresh = await fetchFn();
            setData(fresh);
            setLastUpdated(Date.now());
            await setCache(cacheKey, fresh);
        } catch (e: any) {
            // If we have cached data, just show it (offline mode)
            if (!cached) {
                setError(e.message || 'Failed to load data');
            }
        } finally {
            setLoading(false);
        }
    }, [cacheKey, fetchFn]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, loading, error, lastUpdated, refresh: loadData };
}
