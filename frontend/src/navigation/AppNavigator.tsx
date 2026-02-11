/**
 * App Navigator — Stack-based navigation
 * 
 * Flow: Language Select → Home → (any screen)
 * If language is already saved, skips directly to Home.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLanguage } from '../context/LanguageContext';
import { RootStackParamList } from '../types';
import { COLORS, FONT_SIZES } from '../constants/theme';

// Screens
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import HomeScreen from '../screens/HomeScreen';
import DepartmentListScreen from '../screens/DepartmentListScreen';
import DepartmentDetailScreen from '../screens/DepartmentDetailScreen';
import OPDTimingsScreen from '../screens/OPDTimingsScreen';
import FAQScreen from '../screens/FAQScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { t, isLoaded } = useLanguage();

    // Wait for language to load from AsyncStorage before rendering
    if (!isLoaded) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LanguageSelect"
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTintColor: COLORS.textLight,
                    headerTitleStyle: { fontSize: FONT_SIZES.subtitle, fontWeight: '600' },
                    headerBackTitle: t('वापस', 'Back'),
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen
                    name="LanguageSelect"
                    component={LanguageSelectScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DepartmentList"
                    component={DepartmentListScreen}
                    options={{ title: t('विभाग सूची', 'Departments') }}
                />
                <Stack.Screen
                    name="DepartmentDetail"
                    component={DepartmentDetailScreen}
                    options={{ title: t('विभाग विवरण', 'Department Detail') }}
                />
                <Stack.Screen
                    name="OPDTimings"
                    component={OPDTimingsScreen}
                    options={{ title: t('OPD समय', 'OPD Timings') }}
                />
                <Stack.Screen
                    name="FAQs"
                    component={FAQScreen}
                    options={{ title: t('सवाल-जवाब', 'FAQs') }}
                />
                <Stack.Screen
                    name="Emergency"
                    component={EmergencyScreen}
                    options={{
                        title: t('आपातकालीन नंबर', 'Emergency Contacts'),
                        headerStyle: { backgroundColor: COLORS.emergency },
                    }}
                />
                <Stack.Screen
                    name="CampusMap"
                    component={CampusMapScreen}
                    options={{ title: t('कैम्पस मैप', 'Campus Map') }}
                />
                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{ title: t('जानकारी', 'About') }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
