/**
 * PMCH Hospital Utility App — Entry Point
 * 
 * Wraps the app in LanguageProvider for bilingual support
 * and initializes the stack navigator.
 */

import React from 'react';
import { LanguageProvider } from './src/context/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}
