import { lightPalette, darkPalette, shadows } from '../globalTheme.ts';

// ============================================================================
// ТЕМА ДЛЯ КОМПОНЕНТОВ НАВИГАЦИИ
// ============================================================================
// Содержит стили для AppBar, Toolbar, и связанных компонентов
// ============================================================================

// Стили для навигации в светлой теме
export const lightAppBarTheme = {
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: lightPalette.primary.dark, // Лавандовый фон
                color: '#0d0c0c',// Белый текст
                boxShadow: shadows.light.appBar, // Легкая тень

                // Стили для липкой позиции
                '&.MuiAppBar-positionSticky': {
                    backdropFilter: 'blur(8px)', // Эффект размытия фона
                },
            },
        },
    },

    MuiToolbar: {
        styleOverrides: {
            root: {
                minHeight: 64, // Высота тулбара
                paddingLeft: 24, // Отступы слева
                paddingRight: 24,

                // Адаптивность для мобильных
                '@media (min-width: 600px)': {
                    minHeight: 64,
                    paddingLeft: 32,
                    paddingRight: 32,
                },
            },
        },
    },
};

// Стили для навигации в темной теме
export const darkAppBarTheme = {
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#2A2A2A', // Темно-серый фон
                color: darkPalette.text.primary, // Белый текст
                boxShadow: shadows.dark.appBar, // Темная тень

                '&.MuiAppBar-positionSticky': {
                    backdropFilter: 'blur(8px)',
                },
            },
        },
    },

    MuiToolbar: {
        styleOverrides: {
            root: {
                minHeight: 64,
                paddingLeft: 24,
                paddingRight: 24,

                '@media (min-width: 600px)': {
                    minHeight: 64,
                    paddingLeft: 32,
                    paddingRight: 32,
                },
            },
        },
    },
};