/**
 * FAQ Screen
 * 
 * Expandable accordion-style FAQs grouped by category.
 * Category tabs at the top for quick filtering.
 */

import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useCachedData } from '../hooks/useCachedData';
import { fetchFAQs } from '../services/api';
import { formatLastUpdated } from '../services/cache';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { FAQ } from '../types';

// Category labels (bilingual)
const CATEGORIES: { key: string; hi: string; en: string }[] = [
    { key: 'all', hi: 'सभी', en: 'All' },
    { key: 'general', hi: 'सामान्य', en: 'General' },
    { key: 'opd', hi: 'OPD', en: 'OPD' },
    { key: 'admission', hi: 'भर्ती', en: 'Admission' },
    { key: 'emergency', hi: 'आपातकालीन', en: 'Emergency' },
];

export default function FAQScreen() {
    const { t, isHindi } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const fetchFn = useCallback(() => fetchFAQs(), []);
    const { data: faqs, loading, error, lastUpdated } = useCachedData<FAQ[]>(
        'faqs',
        fetchFn,
    );

    const filtered = faqs?.filter((faq) =>
        selectedCategory === 'all' ? true : faq.category === selectedCategory
    );

    if (loading && !faqs) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>{t('लोड हो रहा है...', 'Loading...')}</Text>
            </View>
        );
    }

    if (error && !faqs) {
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

            {/* Category Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat.key}
                        style={[
                            styles.tab,
                            selectedCategory === cat.key && styles.tabActive,
                        ]}
                        onPress={() => setSelectedCategory(cat.key)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedCategory === cat.key && styles.tabTextActive,
                            ]}
                        >
                            {t(cat.hi, cat.en)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* FAQ Accordion */}
            <ScrollView contentContainerStyle={styles.list}>
                {filtered?.map((faq) => (
                    <TouchableOpacity
                        key={faq.id}
                        style={styles.faqCard}
                        onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>
                                {t(faq.questionHi, faq.questionEn)}
                            </Text>
                            <Text style={styles.expandIcon}>
                                {expandedId === faq.id ? '▲' : '▼'}
                            </Text>
                        </View>

                        {expandedId === faq.id && (
                            <Text style={styles.answerText}>
                                {t(faq.answerHi, faq.answerEn)}
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}

                {filtered?.length === 0 && (
                    <Text style={styles.emptyText}>
                        {t('कोई सवाल नहीं मिला', 'No questions found')}
                    </Text>
                )}
            </ScrollView>
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
    tabs: {
        flexGrow: 0,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.surface,
    },
    tab: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.round,
        marginRight: SPACING.sm,
        backgroundColor: COLORS.divider,
    },
    tabActive: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    tabTextActive: {
        color: COLORS.textLight,
        fontWeight: '600',
    },
    list: {
        padding: SPACING.md,
    },
    faqCard: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        ...SHADOWS.card,
    },
    questionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    questionText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '600',
        color: COLORS.textPrimary,
        flex: 1,
        marginRight: SPACING.sm,
        lineHeight: 24,
    },
    expandIcon: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    answerText: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
        marginTop: SPACING.md,
        lineHeight: 26,
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
        paddingTop: SPACING.md,
    },
    emptyText: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
});
