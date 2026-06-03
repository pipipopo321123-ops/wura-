import { lightPalette, darkPalette } from '../globalTheme.ts';

// ============================================================================
// ТЕМА ДЛЯ БЕЙДЖЕЙ (ЗНАЧКОВ-СЧЕТЧИКОВ)
// ============================================================================
// Стили для компонента Badge, который показывает счетчики на иконках
// ============================================================================

// Стили для Badge в светлой теме
export const lightBadgeTheme = {
    MuiBadge: {
        styleOverrides: {
            badge: {
                fontSize: '0.75rem', // Размер шрифта
                minWidth: 20, // Минимальная ширина
                height: 20, // Высота
                padding: '0 4px', // Внутренние отступы
                
                // Стандартный бейдж (красный)
                '&.MuiBadge-standard': {
                    backgroundColor: lightPalette.error.main,
                    color: '#111010',
                },
                
                // Бейдж с основным цветом
                '&.MuiBadge-primary': {
                    backgroundColor: lightPalette.primary.main,
                    color: lightPalette.primary.contrastText,
                },
                
                // Бейдж с второстепенным цветом
                '&.MuiBadge-secondary': {
                    backgroundColor: lightPalette.secondary.main,
                    color: lightPalette.secondary.contrastText,
                },
            },
        },
    },
};

// Стили для Badge в темной теме
export const darkBadgeTheme = {
    MuiBadge: {
        styleOverrides: {
            badge: {
                fontSize: '0.75rem',
                minWidth: 20,
                height: 20,
                padding: '0 4px',
                color: '#FFFFFF', // Белый текст для всех бейджей в темной теме
                
                '&.MuiBadge-standard': {
                    backgroundColor: darkPalette.error.main,
                },
                
                '&.MuiBadge-primary': {
                    backgroundColor: darkPalette.primary.main,
                },
                
                '&.MuiBadge-secondary': {
                    backgroundColor: darkPalette.secondary.main,
                },
            },
        },
    },
};