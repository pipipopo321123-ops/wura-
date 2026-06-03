import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../../themes/index.ts';

// ============================================================================
// КОНТЕКСТ ТЕМЫ
// ============================================================================
// Этот компонент управляет состоянием темы (светлая/темная) и предоставляет
// функции для переключения темы всем дочерним компонентам
// ============================================================================

interface ThemeContextType {
    mode: 'light' | 'dark'; // Текущий режим темы
    toggleTheme: () => void; // Функция для переключения темы
}

// Создаем контекст с начальным значением undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Хук для использования темы в компонентах
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider'); // Защита от неправильного использования
    }
    return context;
};

// Провайдер темы - оборачивает приложение и предоставляет тему всем компонентам
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Инициализируем состояние из localStorage или используем 'light' по умолчанию
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const savedMode = localStorage.getItem('themeMode');
        return (savedMode as 'light' | 'dark') || 'light';
    });

    // Сохраняем выбранную тему в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
        // Также меняем цвет фона body для надежности (дублируем CssBaseline)
        document.body.style.backgroundColor = mode === 'light' 
            ? lightTheme.palette.background.default 
            : darkTheme.palette.background.default;
    }, [mode]);

    // Функция переключения темы
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Выбираем тему в зависимости от режима
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {/* MuiThemeProvider передает тему всем компонентам MUI */}
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline сбрасывает CSS и применяет базовые стили темы */}
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};