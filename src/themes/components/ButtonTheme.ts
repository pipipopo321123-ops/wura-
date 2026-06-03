import { lightPalette, darkPalette, shadows,} from '../globalTheme.ts';

// ============================================================================
// ТЕМА ДЛЯ КОМПОНЕНТА BUTTON
// ============================================================================
// Содержит стили для всех вариантов кнопок: contained, outlined, text
// А также для различных цветовых вариаций: primary, secondary, error и т.д.
// ============================================================================

// Стили для Button в светлой теме
export const lightButtonTheme = {
    MuiButton: {
        styleOverrides: {
            // Базовые стили для всех кнопок
            root: {
                borderRadius: 30, // Сильное скругление (овальные кнопки)
                textTransform: 'none', // Отключаем автоматический uppercase
                fontWeight: 500, // Полужирный текст
                padding: '8px 20px', // Внутренние отступы
                fontSize: '0.875rem', // Размер шрифта
                transition: 'all 0.2s ease-in-out', // Плавная анимация всех свойств
            },
            
            // Стили для contained кнопок (с заливкой)
            contained: {
                boxShadow: shadows.light.button, // Тень
                
                '&:hover': {
                    boxShadow: shadows.light.cardHover, // Увеличенная тень при наведении
                    transform: 'translateY(-2px)', // Легкий подъем
                },
                
                '&:active': {
                    transform: 'translateY(0)', // Возврат при нажатии
                },
            },
            
            // Стили для containedPrimary (основной цвет)
            containedPrimary: {
                backgroundColor: lightPalette.primary.main,
                color: lightPalette.primary.contrastText,
                
                '&:hover': {
                    backgroundColor: lightPalette.primary.dark, // Темнее при наведении
                },
            },
            
            // Стили для containedSecondary (второстепенный цвет)
            containedSecondary: {
                backgroundColor: lightPalette.secondary.main,
                color: lightPalette.secondary.contrastText,
                
                '&:hover': {
                    backgroundColor: lightPalette.secondary.dark,
                },
            },
            
            // Стили для outlined кнопок (с обводкой)
            outlined: {
                borderWidth: 2, // Толщина обводки
                
                '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                },
            },
            
            // Стили для outlinedPrimary
            outlinedPrimary: {
                borderColor: lightPalette.primary.main,
                color: lightPalette.primary.main,
                
                '&:hover': {
                    borderColor: lightPalette.primary.dark,
                    backgroundColor: 'rgba(181, 168, 213, 0.1)', // Полупрозрачный фон
                },
            },
            
            // Стили для text кнопок (без фона и обводки)
            text: {
                '&:hover': {
                    backgroundColor: 'rgba(181, 168, 213, 0.1)',
                    transform: 'translateY(-2px)',
                },
            },
            
            // Стили для кнопок с иконками
            startIcon: {
                marginRight: 8, // Отступ между иконкой и текстом
            },
            
            endIcon: {
                marginLeft: 8,
            },
        },
    },
    
    // Стили для IconButton (кнопка-иконка)
    MuiIconButton: {
        styleOverrides: {
            root: {
                padding: 8, // Внутренний отступ
                transition: 'all 0.2s ease-in-out',
                
                '&:hover': {
                    transform: 'scale(1.1)', // Увеличение при наведении
                    backgroundColor: 'rgba(11, 22, 236, 0.1)',
                },
            },
        },
    },
};

// Стили для Button в темной теме
export const darkButtonTheme = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 20,
                textTransform: 'none',
                fontWeight: 500,
                padding: '8px 20px',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease-in-out',
            },
            
            contained: {
                boxShadow: shadows.dark.button,
                
                '&:hover': {
                    boxShadow: shadows.dark.cardHover,
                    transform: 'translateY(-2px)',
                },
                
                '&:active': {
                    transform: 'translateY(0)',
                },
            },
            
            containedPrimary: {
                backgroundColor: darkPalette.primary.main,
                color: darkPalette.primary.contrastText,
                
                '&:hover': {
                    backgroundColor: darkPalette.primary.dark,
                },
            },
            
            containedSecondary: {
                backgroundColor: darkPalette.secondary.main,
                color: darkPalette.secondary.contrastText,
                
                '&:hover': {
                    backgroundColor: darkPalette.secondary.dark,
                },
            },
            
            outlined: {
                borderWidth: 2,
                
                '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                },
            },
            
            outlinedPrimary: {
                borderColor: darkPalette.primary.main,
                color: darkPalette.primary.main,
                
                '&:hover': {
                    borderColor: darkPalette.primary.light,
                    backgroundColor: 'rgba(25, 7, 233, 0.15)',
                },
            },
            
            text: {
                '&:hover': {
                    backgroundColor: 'rgba(32, 8, 215, 0.15)',
                    transform: 'translateY(-2px)',
                },
            },
            
            startIcon: {
                marginRight: 8,
            },
            
            endIcon: {
                marginLeft: 8,
            },
        },
    },
    
    MuiIconButton: {
        styleOverrides: {
            root: {
                padding: 8,
                transition: 'all 0.2s ease-in-out',
                color: darkPalette.text.primary,
                
                '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
};