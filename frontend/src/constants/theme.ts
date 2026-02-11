/**
 * Design theme for PMCH Hospital App
 * 
 * Uses a sober, government-appropriate color palette.
 * Large text sizes for low-literacy users on small phones.
 */

export const COLORS = {
    // Primary — deep government blue
    primary: '#1a5276',
    primaryLight: '#2980b9',
    primaryDark: '#0e3d5a',

    // Accent — saffron (Indian government feel)
    accent: '#e67e22',
    accentLight: '#f39c12',

    // Backgrounds
    background: '#f5f6fa',
    surface: '#ffffff',
    card: '#ffffff',

    // Text
    textPrimary: '#2c3e50',
    textSecondary: '#7f8c8d',
    textLight: '#ffffff',
    textOnPrimary: '#ffffff',

    // Status
    success: '#27ae60',
    error: '#e74c3c',
    warning: '#f39c12',

    // Emergency red
    emergency: '#c0392b',
    ambulance: '#e74c3c',
    helpdesk: '#2980b9',

    // Borders & dividers
    border: '#dcdde1',
    divider: '#ecf0f1',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const FONT_SIZES = {
    // Large sizes for readability on low-end phones
    small: 14,
    body: 17,
    subtitle: 19,
    title: 22,
    header: 26,
    hero: 32,
};

export const BORDER_RADIUS = {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 20,
    round: 999,
};

export const SHADOWS = {
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
};
