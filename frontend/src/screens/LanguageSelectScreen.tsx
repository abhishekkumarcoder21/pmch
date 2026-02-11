/**
 * Language Selection Screen
 * 
 * First screen shown to new users.
 * Two large, clearly labeled buttons: Hindi / English.
 * Persists choice and navigates to Home.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelect'>;

export default function LanguageSelectScreen({ navigation }: Props) {
    const { setLanguage } = useLanguage();

    const handleSelect = async (lang: 'hi' | 'en') => {
        await setLanguage(lang);
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

            {/* Hospital name header */}
            <View style={styles.header}>
                <Text style={styles.hospitalIcon}>🏥</Text>
                <Text style={styles.hospitalName}>PMCH</Text>
                <Text style={styles.hospitalSubtitle}>पटना मेडिकल कॉलेज अस्पताल</Text>
                <Text style={styles.hospitalSubtitleEn}>Patna Medical College Hospital</Text>
            </View>

            {/* Language selection */}
            <View style={styles.selectSection}>
                <Text style={styles.selectTitle}>भाषा चुनें / Choose Language</Text>

                <TouchableOpacity
                    style={[styles.langButton, styles.hindiButton]}
                    onPress={() => handleSelect('hi')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.langButtonTextLarge}>हिन्दी</Text>
                    <Text style={styles.langButtonTextSmall}>Hindi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.langButton, styles.englishButton]}
                    onPress={() => handleSelect('en')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.langButtonTextLarge}>English</Text>
                    <Text style={styles.langButtonTextSmall}>अंग्रेज़ी</Text>
                </TouchableOpacity>
            </View>

            {/* Disclaimer */}
            <Text style={styles.disclaimer}>
                यह कोई सरकारी ऐप नहीं है। केवल सूचना हेतु।{'\n'}
                This is not an official government app. For information only.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xxl,
    },
    hospitalIcon: {
        fontSize: 64,
        marginBottom: SPACING.sm,
    },
    hospitalName: {
        fontSize: 40,
        fontWeight: '800',
        color: COLORS.textLight,
        letterSpacing: 3,
    },
    hospitalSubtitle: {
        fontSize: FONT_SIZES.subtitle,
        color: COLORS.textLight,
        opacity: 0.9,
        marginTop: SPACING.xs,
    },
    hospitalSubtitleEn: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        opacity: 0.7,
        marginTop: 2,
    },
    selectSection: {
        width: '100%',
        alignItems: 'center',
    },
    selectTitle: {
        fontSize: FONT_SIZES.title,
        color: COLORS.textLight,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    langButton: {
        width: '80%',
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        marginBottom: SPACING.md,
        ...SHADOWS.elevated,
    },
    hindiButton: {
        backgroundColor: COLORS.accent,
    },
    englishButton: {
        backgroundColor: COLORS.surface,
    },
    langButtonTextLarge: {
        fontSize: FONT_SIZES.header,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    langButtonTextSmall: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    disclaimer: {
        fontSize: 12,
        color: COLORS.textLight,
        opacity: 0.6,
        textAlign: 'center',
        marginTop: SPACING.xxl,
        lineHeight: 18,
    },
});
