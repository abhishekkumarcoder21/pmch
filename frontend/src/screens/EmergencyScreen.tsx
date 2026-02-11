/**
 * Emergency Contacts Screen
 * 
 * Shows emergency phone numbers with tap-to-call.
 * Large, clearly visible cards — designed for panic situations.
 */

import React, { useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useCachedData } from '../hooks/useCachedData';
import { fetchContacts } from '../services/api';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { EmergencyContact } from '../types';

// Color and icon mapping by contact type
const TYPE_CONFIG = {
    AMBULANCE: { icon: '🚑', color: COLORS.ambulance, bg: '#fdf2f2' },
    EMERGENCY: { icon: '🏥', color: COLORS.emergency, bg: '#fef3f2' },
    HELPDESK: { icon: '📞', color: COLORS.helpdesk, bg: '#eff8ff' },
};

export default function EmergencyScreen() {
    const { t } = useLanguage();

    const fetchFn = useCallback(() => fetchContacts(), []);
    const { data: contacts, loading, error } = useCachedData<EmergencyContact[]>(
        'contacts',
        fetchFn,
    );

    const handleCall = (phone: string, name: string) => {
        Alert.alert(
            t('कॉल करें?', 'Make a call?'),
            `${name}\n${phone}`,
            [
                { text: t('रद्द करें', 'Cancel'), style: 'cancel' },
                {
                    text: t('कॉल करें', 'Call'),
                    onPress: () => Linking.openURL(`tel:${phone}`),
                },
            ],
        );
    };

    if (loading && !contacts) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.emergency} />
            </View>
        );
    }

    if (error && !contacts) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{t('डेटा लोड नहीं हो पाया', 'Failed to load')}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Urgent banner */}
            <View style={styles.banner}>
                <Text style={styles.bannerText}>
                    {t(
                        '🚨 आपातकालीन स्थिति में नंबर पर टैप करके कॉल करें',
                        '🚨 Tap any number to call in an emergency'
                    )}
                </Text>
            </View>

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.HELPDESK;

                    return (
                        <TouchableOpacity
                            style={[styles.card, { backgroundColor: config.bg, borderLeftColor: config.color }]}
                            onPress={() => handleCall(item.phone, t(item.nameHi, item.name))}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cardIcon}>{config.icon}</Text>
                            <View style={styles.cardContent}>
                                <Text style={styles.contactName}>
                                    {t(item.nameHi, item.name)}
                                </Text>
                                <Text style={[styles.contactPhone, { color: config.color }]}>
                                    {item.phone}
                                </Text>
                            </View>
                            <Text style={styles.callIcon}>📱</Text>
                        </TouchableOpacity>
                    );
                }}
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
    },
    errorText: {
        fontSize: FONT_SIZES.subtitle,
        color: COLORS.error,
    },
    banner: {
        backgroundColor: COLORS.emergency,
        padding: SPACING.md,
    },
    bannerText: {
        fontSize: FONT_SIZES.body,
        color: COLORS.textLight,
        textAlign: 'center',
        fontWeight: '600',
    },
    list: {
        padding: SPACING.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderLeftWidth: 5,
        ...SHADOWS.card,
    },
    cardIcon: {
        fontSize: 36,
        marginRight: SPACING.md,
    },
    cardContent: {
        flex: 1,
    },
    contactName: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    contactPhone: {
        fontSize: FONT_SIZES.title,
        fontWeight: '800',
    },
    callIcon: {
        fontSize: 28,
    },
});
