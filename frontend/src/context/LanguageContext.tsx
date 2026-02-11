/**
 * Language context for Hindi/English toggle
 * 
 * Persists language preference in AsyncStorage.
 * Defaults to Hindi (target users are Hindi-first).
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../types';

const LANGUAGE_KEY = '@pmch_language';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => Promise<void>;
    isHindi: boolean;
    /** Helper: returns Hindi or English text based on current language */
    t: (hi: string, en: string) => string;
    /** Whether language has been loaded from storage */
    isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('hi');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved language on mount
    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
                if (saved === 'en' || saved === 'hi') {
                    setLanguageState(saved);
                }
            } catch (e) {
                // Silently fall back to Hindi
            }
            setIsLoaded(true);
        })();
    }, []);

    const setLanguage = async (lang: Language) => {
        setLanguageState(lang);
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, lang);
        } catch (e) {
            console.warn('Failed to save language preference');
        }
    };

    const t = (hi: string, en: string): string => {
        return language === 'hi' ? hi : en;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                isHindi: language === 'hi',
                t,
                isLoaded,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
