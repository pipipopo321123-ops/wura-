import React, { useState } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Chip,
    Snackbar,
    Alert,
    useTheme,
    Zoom // Импортируем анимацию
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from './context/CartContext.tsx';
import { Dish, CATEGORY_LABELS, CATEGORY_COLORS,DishCategory } from '../models/dish.ts';

// ============================================================================
// КОМПОНЕНТ КАРТОЧКИ БЛЮДА
// ============================================================================
// Отображает информацию о блюде: изображение, название, описание, цену, категорию
// Позволяет добавить блюдо в корзину с анимированным уведомлением
// ============================================================================

interface CardDishProps {
    dish: Dish; // Объект с данными о блюде
}

export default function CardDish({ dish }: CardDishProps) {
    // ============================================================================
    // ХУКИ
    // ============================================================================

    const { addToCart } = useCart(); // Получаем функцию добавления в корзину из контекста
    const theme = useTheme(); // Получаем текущую тему MUI для адаптивных цветов

    // Деструктуризация объекта dish для удобства
    const { name, description, price, category, image } = dish;

    // Состояние для управления уведомлением о добавлении в корзину
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Состояние для анимации появления карточки
    const [hovered, setHovered] = useState(false);

    // ============================================================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ============================================================================

    /**
     * Получает цвет для чипа категории в зависимости от текущей темы
     * В светлой теме используем базовые цвета из CATEGORY_COLORS
     * В темной теме используем адаптивные цвета из палитры темы
     */
    const getChipColor = (): string => {
        if (theme.palette.mode === 'light') {
            // В светлой теме используем пастельные цвета из констант
            return CATEGORY_COLORS[category];
        } else {
            // В темной теме используем адаптивные цвета из темы
            const darkColors: Record<DishCategory, string> = {
                snack: theme.palette.secondary.main, // Персиковый
                first: theme.palette.primary.main,   // Лавандовый
                second: theme.palette.info.main,      // Голубой
                drink: theme.palette.success.main     // Зеленый
            };
            return darkColors[category];
        }
    };

    /**
     * Получает цвет текста для чипа (автоматический контраст)
     */
    const getChipTextColor = (backgroundColor: string): string => {
        return theme.palette.getContrastText(backgroundColor);
    };

    /**
     * Форматирует цену с разделителями тысяч
     */
    const formatPrice = (price: number): string => {
        return price.toLocaleString('ru-RU');
    };

    // ============================================================================
    // ОБРАБОТЧИКИ
    // ============================================================================

    /**
     * Обработчик добавления в корзину
     */
    const handleAddToCart = () => {
        addToCart(dish);
        setSnackbarOpen(true); // Показываем уведомление
    };

    /**
     * Обработчик закрытия уведомления
     */
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // ============================================================================
    // RENDER
    // ============================================================================

    const chipColor = getChipColor();
    const chipTextColor = getChipTextColor(chipColor);

    return (
        <>
            {/* Карточка с анимацией появления */}
            <Zoom in={true} timeout={500} style={{ transitionDelay: '100ms' }}>
                <Card
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{
                        height: '100%', // Растягиваем на всю высоту Grid
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'visible', // Чтобы чип не обрезался
                        transition: theme.transitions.create(
                            ['transform',  'border-color'],
                            { duration: theme.transitions.duration.shorter }
                        ),
                        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                        border: hovered ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    }}
                >
                    {/* Изображение блюда */}
                    <CardMedia
                        component="img"
                        height="200"
                        image={image || `https://via.placeholder.com/345x200/${CATEGORY_COLORS[category].slice(1)}/5E4B4B?text=${encodeURIComponent(name)}`}
                        sx={{
                            objectFit: 'cover', // Растягиваем изображение без искажений
                            borderTopLeftRadius: 14, // Немного меньше, чем у карточки (16 - 2)
                            borderTopRightRadius: 14,
                        }}
                    />

                    {/* Чип с категорией (поверх изображения) */}
                    <Chip
                        label={CATEGORY_LABELS[category]}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: chipColor,
                            color: chipTextColor,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            zIndex: 1, // Поверх изображения
                            transition: theme.transitions.create('transform', {
                                duration: theme.transitions.duration.shorter,
                            }),
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            '& .MuiChip-label': {
                                px: 1.5,
                            },
                        }}
                    />

                    {/* Контент карточки */}
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            p: 2,
                            pb: 1,
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        {/* Название блюда */}
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                lineHeight: 1.3,
                                height: '2.6em', // Фиксированная высота для 2 строк
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                color: theme.palette.text.primary,
                            }}
                        >
                            {name}
                        </Typography>

                        {/* Описание блюда */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                minHeight: '3em', // Минимальная высота для 2 строк
                                height: '3em',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                            }}
                        >
                            {description}
                        </Typography>

                        {/* Цена */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.primary.dark,
                                mt: 'auto',
                                fontSize: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                            }}
                        >
                            {formatPrice(price)} ₽
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                    ml: 'auto',
                                }}
                            >
                                за шт.
                            </Typography>
                        </Typography>
                    </CardContent>

                    {/* Действия карточки */}
                    <CardActions
                        sx={{
                            p: 2,
                            pt: 0,
                            backgroundColor: theme.palette.background.paper,
                            borderBottomLeftRadius: 14,
                            borderBottomRightRadius: 14,
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                            fullWidth
                            size="medium"
                            sx={{
                                py: 1,
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: theme.transitions.create(['transform',  'background-color'], {
                                    duration: theme.transitions.duration.shorter,
                                }),
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                },
                            }}
                        >
                            В корзину
                        </Button>
                    </CardActions>
                </Card>
            </Zoom>

            {/* Уведомление об успешном добавлении в корзину */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Zoom}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        backgroundColor: theme.palette.success.main,
                        color: '#FFFFFF',
                        '& .MuiAlert-icon': {
                            color: '#FFFFFF',
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        ✓ {name} добавлен(а) в корзину!
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    );
}