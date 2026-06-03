import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './context/ThemeContext.tsx';

// ============================================================================
// КОМПОНЕНТ ПЕРЕКЛЮЧЕНИЯ ТЕМЫ
// ============================================================================
// Маленькая иконка в шапке для переключения между светлой и темной темой
// ============================================================================

export default function ThemeToggle() {
    // useTheme из нашего контекста для получения режима и функции переключения
    const { mode, toggleTheme } = useTheme();

    // useMuiTheme для доступа к цветам текущей темы (опционально)
    const muiTheme = useMuiTheme();

    return (
        <Tooltip title={mode === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    // Добавляем небольшую анимацию при наведении
                    transition: muiTheme.transitions.create(['transform', 'background-color'], {
                        duration: muiTheme.transitions.duration.shorter,
                    }),
                    '&:hover': {
                        transform: 'rotate(180deg)', // Поворот иконки при наведении
                    },
                }}
            >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    );
}