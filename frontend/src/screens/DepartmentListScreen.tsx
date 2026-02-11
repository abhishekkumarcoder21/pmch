/**
 * Department List Screen
 * 
 * Scrollable list of all hospital departments.
 * Shows name + OPD timing summary. Tap to see full details.
 */

import React, { useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useCachedData } from '../hooks/useCachedData';
import { fetchDepartments } from '../services/api';
import { formatLastUpdated } from '../services/cache';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Department } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DepartmentList'>;

export default function DepartmentListScreen({ navigation }: Props) {
    const { t, isHindi } = useLanguage();

    const fetchFn = useCallback(() => fetchDepartments(), []);
    const { data: departments, loading, error, lastUpdated } = useCachedData<Department[]>(
        'departments',
        fetchFn,
    );

    if (loading && !departments) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>{t('लोड हो रहा है...', 'Loading...')}</Text>
            </View>
        );
    }

    if (error && !departments) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{t('डेटा लोड नहीं हो पाया', 'Failed to load data')}</Text>
                <Text style={styles.errorDetail}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Last updated indicator */}
            {lastUpdated && (
                <Text style={styles.lastUpdated}>
                    {formatLastUpdated(lastUpdated, isHindi)}
                </Text>
            )}

            <FlatList
                data={departments}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('DepartmentDetail', { departmentId: item.id })}
                        activeOpacity={0.7}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.deptName}>
                                {t(item.nameHi, item.nameEn)}
                            </Text>
                            <Text style={styles.deptTiming}>
                                🕐 {item.opdTimings}
                            </Text>
                            <Text style={styles.deptLocation}>
                                📍 {t(item.locationTextHi, item.locationText)}
                            </Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
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
    errorIcon: {
        fontSize: 48,
        marginBottom: SPACING.md,
    },
    errorText: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '600',
        color: COLORS.error,
    },
    errorDetail: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
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
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.card,
    },
    cardContent: {
        flex: 1,
    },
    deptName: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    deptTiming: {
        fontSize: FONT_SIZES.small,
        color: COLORS.primaryLight,
        marginBottom: 2,
    },
    deptLocation: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
    },
    chevron: {
        fontSize: 28,
        color: COLORS.textSecondary,
        marginLeft: SPACING.sm,
    },
});
