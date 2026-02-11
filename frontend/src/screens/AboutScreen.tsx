/**
 * About / Disclaimer Screen
 * 
 * Shows app purpose, disclaimer, and version info.
 */

import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

export default function AboutScreen() {
    const { t } = useLanguage();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* App Info */}
            <View style={styles.card}>
                <Text style={styles.appIcon}>🏥</Text>
                <Text style={styles.appName}>PMCH Guide</Text>
                <Text style={styles.version}>v1.0.0</Text>
            </View>

            {/* Purpose */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {t('📋 ऐप के बारे में', '📋 About This App')}
                </Text>
                <Text style={styles.sectionBody}>
                    {t(
                        'यह ऐप पटना मेडिकल कॉलेज अस्पताल (PMCH) के मरीज़ों और उनके परिजनों के लिए बनाई गई है। इसका उद्देश्य अस्पताल के विभागों, OPD समय, कैम्पस दिशा-निर्देश, और आपातकालीन नंबरों की जानकारी प्रदान करना है।',
                        'This app is designed for patients and attendants at Patna Medical College Hospital (PMCH). It provides information about hospital departments, OPD timings, campus directions, and emergency contacts.'
                    )}
                </Text>
            </View>

            {/* Disclaimer */}
            <View style={[styles.section, styles.disclaimerSection]}>
                <Text style={styles.sectionTitle}>
                    {t('⚠️ अस्वीकरण', '⚠️ Disclaimer')}
                </Text>
                <Text style={styles.disclaimerBody}>
                    {t(
                        '• यह कोई आधिकारिक सरकारी ऐप नहीं है।\n• यह केवल सूचना और मार्गदर्शन के लिए है।\n• इस ऐप में दी गई जानकारी बदल सकती है।\n• किसी भी चिकित्सा निर्णय के लिए कृपया डॉक्टर से सलाह लें।\n• ऐप में कोई भी चिकित्सीय निदान या उपचार सुझाव नहीं दिया जाता।',
                        '• This is NOT an official government app.\n• It is for informational and guidance purposes only.\n• Information provided may be subject to change.\n• Please consult a doctor for any medical decisions.\n• No medical diagnosis or treatment suggestions are provided.'
                    )}
                </Text>
            </View>

            {/* Contact */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {t('📧 संपर्क', '📧 Contact')}
                </Text>
                <Text style={styles.sectionBody}>
                    {t(
                        'सुझाव या शिकायत के लिए ईमेल करें:\npmchguide@example.com',
                        'For suggestions or complaints, email:\npmchguide@example.com'
                    )}
                </Text>
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
    card: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
        ...SHADOWS.elevated,
    },
    appIcon: {
        fontSize: 56,
        marginBottom: SPACING.sm,
    },
    appName: {
        fontSize: FONT_SIZES.hero,
        fontWeight: '800',
        color: COLORS.textLight,
    },
    version: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        opacity: 0.7,
        marginTop: SPACING.xs,
    },
    section: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.card,
    },
    disclaimerSection: {
        borderLeftWidth: 4,
        borderLeftColor: COLORS.warning,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    sectionBody: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textSecondary,
        lineHeight: 26,
    },
    disclaimerBody: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        lineHeight: 28,
    },
});
