import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
    useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useCart } from './context/CartContext.tsx';
import ThemeToggle from './ThemeToggle.tsx';

// ============================================================================
// КОМПОНЕНТ НАВИГАЦИОННОЙ ПАНЕЛИ
// ============================================================================
// Верхняя панель с названием ресторана, счетчиком корзины и переключателем темы
// ============================================================================

interface NavbarProps {
    onCartClick: () => void; // Функция открытия корзины
}

export default function Navbar({ onCartClick }: NavbarProps) {
    const { getTotalItems } = useCart(); // Получаем количество товаров из контекста
    const theme = useTheme(); // Получаем текущую тему MUI

    const totalItems = getTotalItems(); // Общее количество товаров

    // Функция для склонения слова "товар"
    const getItemsText = (count: number): string => {
        if (count === 0) return 'товаров';
        if (count === 1) return 'товар';
        if (count >= 2 && count <= 4) return 'товара';
        return 'товаров';
    };

    return (
        <AppBar position="sticky"> {/* sticky - прилипает к верху при скролле */}
            <Toolbar>
                {/* Логотип и название */}
                <RestaurantMenuIcon
                    sx={{
                        mr: 2,
                        animation: 'spin 20s linear infinite', // Анимация вращения
                        '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                        }
                    }}
                />

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 500,
                        letterSpacing: 1, // Межбуквенный интервал
                    }}
                >
                    Меню ресторана у Саши
                </Typography>

                {/* Правая часть с элементами управления */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Счетчик товаров (скрывается на мобильных) */}
                    <Typography
                        variant="body1"
                        sx={{
                            display: { xs: 'none', sm: 'block' }, // Скрыто на xs, видно на sm и выше
                            color: 'inherit',
                            opacity: 0.9,
                        }}
                    >
                        {totalItems} {getItemsText(totalItems)}
                    </Typography>

                    {/* Переключатель темы */}
                    <ThemeToggle />

                    {/* Иконка корзины */}
                    <IconButton
                        color="inherit"
                        onClick={onCartClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'light'
                                    ? 'rgba(94, 75, 75, 0.1)'
                                    : 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <Badge
                            badgeContent={totalItems}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.75rem',
                                    minWidth: 20,
                                    height: 20,
                                }
                            }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}