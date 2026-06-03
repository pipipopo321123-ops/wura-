import { lightPalette, darkPalette, typography as globalTypography } from '../globalTheme.ts';

// ============================================================================
// ТЕМА ДЛЯ ТИПОГРАФИКИ
// ============================================================================
// Определяет стили для всех текстовых компонентов: Typography, заголовки, текст
// ============================================================================

// Стили для типографики в светлой теме
export const lightTypographyTheme = {
    MuiTypography: {
        styleOverrides: {
            // Заголовок h4
            h4: {
                ...globalTypography.h4, // Используем глобальные настройки
                color: lightPalette.text.primary,
                borderLeft: `4px solid ${lightPalette.primary.main}`, // Декоративная полоска слева
                paddingLeft: 16,
            },
            
            // Заголовок h6
            h6: {
                ...globalTypography.h6,
                color: lightPalette.text.primary,
            },
            
            // Основной текст
            body1: {
                ...globalTypography.body1,
                color: lightPalette.text.primary,
            },
            
            // Второстепенный текст
            body2: {
                ...globalTypography.body2,
                color: lightPalette.text.secondary,
            },
            
            // Подписи
            caption: {
                fontSize: '0.75rem',
                color: lightPalette.text.secondary,
            },
            
            // Стили для ссылок (если используются)
            link: {
                color: lightPalette.primary.main,
                textDecoration: 'none',
                cursor: 'pointer',
                
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    },
};

// Стили для типографики в темной теме
export const darkTypographyTheme = {
    MuiTypography: {
        styleOverrides: {
            h4: {
                ...globalTypography.h4,
                color: darkPalette.text.primary,
                borderLeft: `4px solid ${darkPalette.primary.main}`,
                paddingLeft: 16,
            },
            
            h6: {
                ...globalTypography.h6,
                color: darkPalette.text.primary,
            },
            
            body1: {
                ...globalTypography.body1,
                color: darkPalette.text.primary,
            },
            
            body2: {
                ...globalTypography.body2,
                color: darkPalette.text.secondary,
            },
            
            caption: {
                fontSize: '0.75rem',
                color: darkPalette.text.secondary,
            },
            
            link: {
                color: darkPalette.primary.main,
                textDecoration: 'none',
                cursor: 'pointer',
                
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    },
};