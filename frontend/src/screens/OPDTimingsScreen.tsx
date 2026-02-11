/**
 * OPD Timings Screen
 * 
 * All departments' OPD timings in a single, scannable view.
 * Users don't need to tap into each department to check timings.
 */

import React, { useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useCachedData } from '../hooks/useCachedData';
import { fetchOPDTimings } from '../services/api';
import { formatLastUpdated } from '../services/cache';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { OPDTiming } from '../types';

export default function OPDTimingsScreen() {
    const { t, isHindi } = useLanguage();

    const fetchFn = useCallback(() => fetchOPDTimings(), []);
    const { data: timings, loading, error, lastUpdated } = useCachedData<OPDTiming[]>(
        'opd_timings',
        fetchFn,
    );

    if (loading && !timings) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>{t('लोड हो रहा है...', 'Loading...')}</Text>
            </View>
        );
    }

    if (error && !timings) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{t('डेटा लोड नहीं हो पाया', 'Failed to load data')}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {lastUpdated && (
                <Text style={styles.lastUpdated}>
                    {formatLastUpdated(lastUpdated, isHindi)}
                </Text>
            )}

            <FlatList
                data={timings}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.deptName}>{t(item.nameHi, item.nameEn)}</Text>
                        <View style={styles.row}>
                            <Text style={styles.timingIcon}>🕐</Text>
                            <Text style={styles.timingText}>{item.opdTimings}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.timingIcon}>📍</Text>
                            <Text style={styles.locationText}>
                                {t(item.locationTextHi, item.locationText)}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    loadingText: {
        marginTop: SPACING.md,
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
    },
    errorText: {
        fontSize: FONT_SIZES.subtitle,
        color: COLORS.error,
    },
    lastUpdated: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingVertical: SPACING.xs,
        backgroundColor: COLORS.divider,
    },
    list: {
        padding: SPACING.md,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.success,
        ...SHADOWS.card,
    },
    deptName: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    timingIcon: {
        fontSize: 16,
        marginRight: SPACING.sm,
    },
    timingText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '600',
        color: COLORS.success,
    },
    locationText: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
    },
});
