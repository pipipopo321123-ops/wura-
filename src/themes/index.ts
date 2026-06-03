// ============================================================================
// ГЛАВНЫЙ ФАЙЛ ТЕМЫ
// ============================================================================
// Этот файл объединяет все темы компонентов и создает готовые темы
// для светлого и темного режимов
// ============================================================================

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette, typography, shape } from './globalTheme.ts';

// Импортируем темы компонентов для светлой темы
import { lightCardTheme } from './components/CardTheme.ts';
import { lightButtonTheme } from './components/ButtonTheme.ts';
import { lightAppBarTheme } from './components/AppBarTheme.ts';
import { lightTypographyTheme } from './components/TypographyTheme.ts';
import { lightBadgeTheme } from './components/BadgeTheme.ts';

// Импортируем темы компонентов для темной темы
import { darkCardTheme } from './components/CardTheme.ts';
import { darkButtonTheme } from './components/ButtonTheme.ts';
import { darkAppBarTheme } from './components/AppBarTheme.ts';
import { darkTypographyTheme } from './components/TypographyTheme.ts';
import { darkBadgeTheme } from './components/BadgeTheme.ts';

// ============================================================================
// СБОРКА СВЕТЛОЙ ТЕМЫ
// ============================================================================
// Объединяем палитру, типографику, форму и все компоненты в один объект
// ============================================================================

export const lightThemeOptions: ThemeOptions = {
    palette: lightPalette, // Цветовая палитра
    typography: typography, // Типографика
    shape: shape, // Скругления
    
    components: {
        // Объединяем все темы компонентов с помощью spread оператора (...)
        ...lightCardTheme,
        ...lightButtonTheme,
        ...lightAppBarTheme,
        ...lightTypographyTheme,
        ...lightBadgeTheme,
        
        // Добавляем глобальные стили для body
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: lightPalette.background.default,
                    margin: 0,
                    padding: 0,
                    transition: 'background-color 0.3s ease', // Плавная смена фона
                },
            },
        },
        
        // Стили для Paper (общий контейнер)
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: shape.borderRadius,
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                },
            },
        },
    },
};

// ============================================================================
// СБОРКА ТЕМНОЙ ТЕМЫ
// ============================================================================

export const darkThemeOptions: ThemeOptions = {
    palette: darkPalette,
    typography: typography,
    shape: shape,
    
    components: {
        ...darkCardTheme,
        ...darkButtonTheme,
        ...darkAppBarTheme,
        ...darkTypographyTheme,
        ...darkBadgeTheme,
        
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: darkPalette.background.default,
                    margin: 0,
                    padding: 0,
                    transition: 'background-color 0.3s ease',
                },
            },
        },
        
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: shape.borderRadius,
                    backgroundColor: darkPalette.background.paper,
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                },
            },
        },
    },
};

// Создаем готовые темы с помощью createTheme
export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Экспортируем также отдельные части для возможного использования в компонентах
export { lightPalette, darkPalette, typography, shape };
