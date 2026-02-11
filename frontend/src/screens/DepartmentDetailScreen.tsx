/**
 * Department Detail Screen
 * 
 * Full information about a single department:
 * name, description, OPD timings, location.
 */

import React, { useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useCachedData } from '../hooks/useCachedData';
import { fetchDepartmentById } from '../services/api';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Department } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DepartmentDetail'>;

export default function DepartmentDetailScreen({ route }: Props) {
    const { departmentId } = route.params;
    const { t, isHindi } = useLanguage();

    const fetchFn = useCallback(() => fetchDepartmentById(departmentId), [departmentId]);
    const { data: dept, loading, error } = useCachedData<Department>(
        `department_${departmentId}`,
        fetchFn,
    );

    if (loading && !dept) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error && !dept) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{t('डेटा लोड नहीं हो पाया', 'Failed to load')}</Text>
            </View>
        );
    }

    if (!dept) return null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Department Name */}
            <Text style={styles.name}>{t(dept.nameHi, dept.nameEn)}</Text>

            {/* Description */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>{t('विवरण', 'Description')}</Text>
                <Text style={styles.cardBody}>{t(dept.descriptionHi, dept.descriptionEn)}</Text>
            </View>

            {/* OPD Timings */}
            <View style={[styles.infoCard, styles.opdCard]}>
                <Text style={styles.cardTitle}>🕐 {t('OPD समय', 'OPD Timings')}</Text>
                <Text style={styles.opdText}>{dept.opdTimings}</Text>
            </View>

            {/* Location */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>📍 {t('स्थान', 'Location')}</Text>
                <Text style={styles.cardBody}>{t(dept.locationTextHi, dept.locationText)}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.lg,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: FONT_SIZES.subtitle,
        color: COLORS.error,
    },
    name: {
        fontSize: FONT_SIZES.hero,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: SPACING.lg,
    },
    infoCard: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.card,
    },
    opdCard: {
        borderLeftWidth: 4,
        borderLeftColor: COLORS.success,
    },
    cardTitle: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    cardBody: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
        lineHeight: 26,
    },
    opdText: {
        fontSize: FONT_SIZES.title,
        fontWeight: '600',
        color: COLORS.success,
    },
});
