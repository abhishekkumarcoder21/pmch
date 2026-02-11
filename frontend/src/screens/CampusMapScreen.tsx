/**
 * Campus Map Screen
 * 
 * Displays a static, zoomable campus map image.
 * 
 * Why static? Interactive maps need Google Maps API + campus GIS data.
 * A well-annotated static image works offline and ships in MVP.
 * 
 * For now, shows a placeholder with text-based directions.
 * Replace the placeholder with an actual campus map image in assets/.
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

// Text-based directions until a real campus map image is added
const BLOCKS = [
    { block: 'A', hi: 'ब्लॉक A — सामान्य चिकित्सा, हड्डी रोग, ब्लड बैंक (तहखाना)', en: 'Block A — General Medicine, Orthopaedics, Blood Bank (Basement)' },
    { block: 'B', hi: 'ब्लॉक B — हृदय रोग (पहली मंज़िल), नेत्र रोग (भूतल)', en: 'Block B — Cardiology (1st Floor), Ophthalmology (Ground Floor)' },
    { block: 'C', hi: 'ब्लॉक C — सर्जरी (भूतल), त्वचा रोग (पहली मंज़िल)', en: 'Block C — Surgery (Ground Floor), Dermatology (1st Floor)' },
    { block: 'D', hi: 'ब्लॉक D — बाल रोग (भूतल), प्रसूति एवं स्त्री रोग (दूसरी मंज़िल)', en: 'Block D — Paediatrics (Ground Floor), Obs & Gynae (2nd Floor)' },
];

export default function CampusMapScreen() {
    const { t } = useLanguage();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Map placeholder */}
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapEmoji}>🗺️</Text>
                <Text style={styles.mapText}>
                    {t('कैम्पस का नक्शा जल्द आएगा', 'Campus map coming soon')}
                </Text>
                <Text style={styles.mapSubtext}>
                    {t(
                        'अभी के लिए नीचे दिशा-निर्देश देखें',
                        'See text-based directions below for now'
                    )}
                </Text>
            </View>

            {/* Text-based directions */}
            <Text style={styles.sectionTitle}>
                {t('📍 विभाग कहाँ है?', '📍 Where is each department?')}
            </Text>

            {BLOCKS.map((item) => (
                <View key={item.block} style={styles.blockCard}>
                    <View style={styles.blockBadge}>
                        <Text style={styles.blockBadgeText}>{item.block}</Text>
                    </View>
                    <Text style={styles.blockText}>{t(item.hi, item.en)}</Text>
                </View>
            ))}

            {/* Important landmarks */}
            <Text style={styles.sectionTitle}>
                {t('🏁 ज़रूरी जगहें', '🏁 Important Landmarks')}
            </Text>

            <View style={styles.landmarkCard}>
                <Text style={styles.landmarkRow}>🚑 {t('इमरजेंसी — मुख्य गेट से बाईं तरफ', 'Emergency — Left of main gate')}</Text>
                <Text style={styles.landmarkRow}>🅿️ {t('पार्किंग — मुख्य गेट के सामने', 'Parking — In front of main gate')}</Text>
                <Text style={styles.landmarkRow}>💊 {t('फार्मेसी — OPD बिल्डिंग के बगल में', 'Pharmacy — Next to OPD building')}</Text>
                <Text style={styles.landmarkRow}>🩸 {t('ब्लड बैंक — ब्लॉक A, तहखाना', 'Blood Bank — Block A, Basement')}</Text>
                <Text style={styles.landmarkRow}>📋 {t('OPD रजिस्ट्रेशन — मुख्य गेट से सीधे', 'OPD Registration — Straight from main gate')}</Text>
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
        padding: SPACING.md,
    },
    mapPlaceholder: {
        backgroundColor: COLORS.divider,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xxl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    mapEmoji: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    mapText: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    mapSubtext: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: FONT_SIZES.title,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
        marginTop: SPACING.sm,
    },
    blockCard: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.card,
    },
    blockBadge: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.round,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    blockBadgeText: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '800',
        color: COLORS.textLight,
    },
    blockText: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        flex: 1,
        lineHeight: 24,
    },
    landmarkCard: {
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        ...SHADOWS.card,
    },
    landmarkRow: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        lineHeight: 30,
    },
});
