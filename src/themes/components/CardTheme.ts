import { lightPalette, darkPalette, shadows } from '../globalTheme.ts';

// ============================================================================
// ТЕМА ДЛЯ КОМПОНЕНТА CARD
// ============================================================================
// Этот файл содержит стили для компонента Card в светлой и темной темах
// Стили разделены по темам для лучшей читаемости и поддержки
// ============================================================================

// Стили для Card в светлой теме
export const lightCardTheme = {
    MuiCard: { // Ключ должен точно соответствовать имени компонента MUI
        styleOverrides: {
            root: { // Стили для корневого элемента Card
                borderRadius: 16, // Скругление углов (переопределяем глобальное)
                backgroundColor: lightPalette.background.paper, // Используем цвет paper из палитры
                boxShadow: shadows.light.card, // Тень из глобальных настроек
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Плавная анимация

                // Стили при наведении (псевдокласс hover)
                '&:hover': {
                    transform: 'translateY(-4px)', // Поднимаем карточку вверх
                    boxShadow: shadows.light.cardHover, // Увеличиваем тень
                },
            },
        },
    },

    // Также можно стилизовать связанные компоненты
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: 16, // Внутренние отступы
                '&:last-child': { // Для последнего дочернего элемента
                    paddingBottom: 16, // Убираем лишний отступ снизу
                },
            },
        },
    },

    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: 16, // Отступы для блока с действиями
                paddingTop: 0, // Убираем верхний отступ (он уже есть в CardContent)
            },
        },
    },

    MuiCardMedia: {
        styleOverrides: {
            root: {
                borderTopLeftRadius: 16, // Скругление верхних углов
                borderTopRightRadius: 16,
            },
        },
    },
};

// Стили для Card в темной теме
export const darkCardTheme = {
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                backgroundColor: darkPalette.background.paper, // Темный фон для карточек
                boxShadow: shadows.dark.card, // Темная тень
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: shadows.dark.cardHover, // Более темная тень при наведении
                },
            },
        },
    },

    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: 16,
                '&:last-child': {
                    paddingBottom: 16,
                },
            },
        },
    },

    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: 16,
                paddingTop: 0,
            },
        },
    },

    MuiCardMedia: {
        styleOverrides: {
            root: {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
            },
        },
    },
};