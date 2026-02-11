/**
 * Home Screen — Main dashboard
 * 
 * Grid of large, icon-labeled cards.
 * Designed for low-literacy users: big icons, simple labels.
 */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface MenuCard {
    icon: string;
    labelHi: string;
    labelEn: string;
    screen: keyof RootStackParamList;
    color: string;
}

const MENU_ITEMS: MenuCard[] = [
    { icon: '🏥', labelHi: 'विभाग', labelEn: 'Departments', screen: 'DepartmentList', color: '#3498db' },
    { icon: '🕐', labelHi: 'OPD समय', labelEn: 'OPD Timings', screen: 'OPDTimings', color: '#2ecc71' },
    { icon: '🗺️', labelHi: 'कैम्पस मैप', labelEn: 'Campus Map', screen: 'CampusMap', color: '#9b59b6' },
    { icon: '❓', labelHi: 'सवाल-जवाब', labelEn: 'FAQs', screen: 'FAQs', color: '#f39c12' },
    { icon: '🚑', labelHi: 'आपातकालीन', labelEn: 'Emergency', screen: 'Emergency', color: '#e74c3c' },
    { icon: 'ℹ️', labelHi: 'जानकारी', labelEn: 'About', screen: 'About', color: '#7f8c8d' },
];

export default function HomeScreen({ navigation }: Props) {
    const { t, language, setLanguage } = useLanguage();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerEmoji}>🏥</Text>
                    <View>
                        <Text style={styles.headerTitle}>
                            {t('पटना मेडिकल कॉलेज', 'Patna Medical College')}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {t('अस्पताल गाइड', 'Hospital Guide')}
                        </Text>
                    </View>
                </View>

                {/* Language toggle */}
                <TouchableOpacity
                    style={styles.langToggle}
                    onPress={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                >
                    <Text style={styles.langToggleText}>
                        {language === 'hi' ? 'EN' : 'हि'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Menu Grid */}
            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.screen}
                        style={[styles.card, { borderLeftColor: item.color }]}
                        onPress={() => navigation.navigate(item.screen as any)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.cardIcon}>{item.icon}</Text>
                        <Text style={styles.cardLabel}>{t(item.labelHi, item.labelEn)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Disclaimer footer */}
            <Text style={styles.footer}>
                {t(
                    '⚠️ यह सरकारी ऐप नहीं है। केवल सूचना हेतु।',
                    '⚠️ Not an official govt app. For info only.'
                )}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: SPACING.xxl,
        paddingBottom: SPACING.lg,
        paddingHorizontal: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerEmoji: {
        fontSize: 36,
        marginRight: SPACING.md,
    },
    headerTitle: {
        fontSize: FONT_SIZES.title,
        fontWeight: '700',
        color: COLORS.textLight,
    },
    headerSubtitle: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        opacity: 0.8,
    },
    langToggle: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.round,
    },
    langToggleText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '700',
        color: COLORS.textLight,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    card: {
        width: '47%',
        backgroundColor: COLORS.card,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        alignItems: 'center',
        borderLeftWidth: 5,
        ...SHADOWS.card,
    },
    cardIcon: {
        fontSize: 42,
        marginBottom: SPACING.sm,
    },
    cardLabel: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '600',
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    footer: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },
});
