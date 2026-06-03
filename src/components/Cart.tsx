import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    TextField,
    Paper,
    useTheme,
    Zoom,
    Fade,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from './context/CartContext.tsx';
import { CATEGORY_LABELS, CATEGORY_COLORS, DishCategory } from '../models/dish.ts';

// ============================================================================
// КОМПОНЕНТ КОРЗИНЫ
// ============================================================================
// Боковая панель с товарами, добавленными в корзину
// ============================================================================

interface CartProps {
    open: boolean;        // Открыта ли корзина
    onClose: () => void;  // Функция закрытия
    onCheckout: () => void; // Функция перехода к оформлению
}

export default function Cart({ open, onClose, onCheckout }: CartProps) {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const theme = useTheme();

    // ============================================================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ============================================================================

    /**
     * Форматирование цены с разделителями тысяч
     */
    const formatPrice = (price: number): string => {
        return price.toLocaleString('ru-RU');
    };

    /**
     * Получение цвета для категории в зависимости от темы
     */
    const getCategoryColor = (category: DishCategory): string => {
        if (theme.palette.mode === 'light') {
            return CATEGORY_COLORS[category];
        } else {
            const darkColors: Record<DishCategory, string> = {
                snack: theme.palette.secondary.main,
                first: theme.palette.primary.main,
                second: theme.palette.info.main,
                drink: theme.palette.success.main
            };
            return darkColors[category];
        }
    };

    /**
     * Получение контрастного текста для цвета категории
     */
    const getContrastText = (category: DishCategory): string => {
        const color = getCategoryColor(category);
        return theme.palette.getContrastText(color);
    };

    /**
     * Подсчет количества уникальных товаров
     */
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    /**
     * Склонение слова "товар"
     */
    const getItemsText = (count: number): string => {
        if (count === 0) return 'товаров';
        if (count === 1) return 'товар';
        if (count >= 2 && count <= 4) return 'товара';
        return 'товаров';
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            transitionDuration={300}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 480 },
                    maxWidth: '100%',
                    borderTopLeftRadius: { xs: 0, sm: 20 },
                    borderBottomLeftRadius: { xs: 0, sm: 20 },
                    bgcolor: theme.palette.background.default,
                }
            }}
        >
            {/* ==========================================================================
          ЗАГОЛОВОК КОРЗИНЫ
      ========================================================================== */}
            <Box sx={{
                p: 2.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                borderTopLeftRadius: { xs: 0, sm: 20 },
                borderTopRightRadius: 0,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ShoppingBagIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                    <Box>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                            Корзина
                        </Typography>
                        {cartItems.length > 0 && (
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                {totalItems} {getItemsText(totalItems)} • {formatPrice(getTotalPrice())} ₽
                            </Typography>
                        )}
                    </Box>
                </Box>

                <IconButton
                    onClick={onClose}
                    sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: theme.palette.action.hover,
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* ==========================================================================
          КОНТЕНТ КОРЗИНЫ
      ========================================================================== */}
            {cartItems.length === 0 ? (
                // Пустая корзина
                <Fade in={true} timeout={500}>
                    <Box sx={{
                        p: 4,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: '100%',
                        minHeight: 400,
                    }}>
                        <ShoppingBagIcon sx={{ fontSize: 100, color: theme.palette.primary.light, opacity: 0.5 }} />
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                            Корзина пуста
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, maxWidth: 250, mb: 2 }}>
                            Добавьте блюда из меню, чтобы оформить заказ
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            size="large"
                            sx={{
                                borderRadius: 10,
                                px: 4,
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Продолжить покупки
                        </Button>
                    </Box>
                </Fade>
            ) : (
                // Корзина с товарами
                <>
                    {/* Список товаров */}
                    <List sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                        {cartItems.map((item, index) => (
                            <Zoom
                                in={true}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                key={item.id}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 1.5,
                                        bgcolor: theme.palette.background.paper,
                                        borderRadius: 3,
                                        border: `1px solid ${theme.palette.divider}`,
                                        transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
                                            duration: theme.transitions.duration.shorter,
                                        }),
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: theme.shadows[4],
                                            borderColor: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                onClick={() => removeFromCart(item.id)}
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    mt: 1,
                                                    transition: theme.transitions.create('transform', {
                                                        duration: theme.transitions.duration.shorter,
                                                    }),
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        bgcolor: 'rgba(244, 162, 162, 0.1)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        sx={{ pr: 8 }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                variant="rounded"
                                                src={item.image}
                                                alt={item.name}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    mr: 2,
                                                    borderRadius: 2,
                                                    boxShadow: theme.shadows[2],
                                                }}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={
                                                <Box sx={{ mb: 1 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: theme.palette.text.primary,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>

                                                    {/* Чип с категорией */}
                                                    <Chip
                                                        label={CATEGORY_LABELS[item.category]}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getCategoryColor(item.category),
                                                            color: getContrastText(item.category),
                                                            fontSize: '0.7rem',
                                                            height: 20,
                                                            '& .MuiChip-label': {
                                                                px: 1,
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box sx={{ mt: 1.5 }}>
                                                    {/* Цена за единицу */}
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontWeight: 600,
                                                            display: 'block',
                                                            mb: 1.5,
                                                        }}
                                                    >
                                                        {formatPrice(item.price)} ₽ / шт.
                                                    </Typography>

                                                    {/* Контролы количества */}
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        bgcolor: theme.palette.mode === 'light'
                                                            ? 'rgba(181, 168, 213, 0.08)'
                                                            : 'rgba(255, 255, 255, 0.05)',
                                                        borderRadius: 3,
                                                        p: 0.5,
                                                        width: 'fit-content',
                                                    }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            sx={{
                                                                color: theme.palette.text.primary,
                                                                '&:hover': {
                                                                    bgcolor: theme.palette.primary.light,
                                                                },
                                                            }}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>

                                                        <TextField
                                                            size="small"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (!isNaN(value) && value > 0) {
                                                                    updateQuantity(item.id, value);
                                                                }
                                                            }}
                                                            inputProps={{
                                                                min: 1,
                                                                style: {
                                                                    width: 45,
                                                                    textAlign: 'center',
                                                                    padding: '4px 0',
                                                                    color: theme.palette.text.primary,
                                                                    fontWeight: 600,
                                                                }
                                                            }}
                                                            sx={{
                                                                mx: 0.5,
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: 2,
                                                                    bgcolor: 'transparent',
                                                                    '& fieldset': {
                                                                        borderColor: 'transparent',
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: theme.palette.primary.main,
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: theme.palette.primary.main,
                                                                    },
                                                                },
                                                            }}
                                                        />

                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            sx={{
                                                                color: theme.palette.text.primary,
                                                                '&:hover': {
                                                                    bgcolor: theme.palette.primary.light,
                                                                },
                                                            }}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>

                                                    {/* Сумма по позиции */}
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: theme.palette.text.primary,
                                                            fontWeight: 600,
                                                            mt: 1.5,
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        = {formatPrice(item.price * item.quantity)} ₽
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                </Paper>
                            </Zoom>
                        ))}
                    </List>

                    {/* ==========================================================================
              ИТОГО И КНОПКИ ДЕЙСТВИЙ
          ========================================================================== */}
                    <Box sx={{
                        p: 2.5,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                        borderBottomLeftRadius: { xs: 0, sm: 20 },
                        borderBottomRightRadius: 0,
                    }}>
                        {/* Детализация */}
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    Товары ({totalItems} шт.):
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                    {formatPrice(getTotalPrice())} ₽
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    Доставка:
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.success.main }}>
                                    бесплатно
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 1.5 }} />

                            {/* Итоговая сумма */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                                    Итого:
                                </Typography>
                                <Typography variant="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 700 }}>
                                    {formatPrice(getTotalPrice())} ₽
                                </Typography>
                            </Box>
                        </Box>

                        {/* Кнопки действий */}
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Button
                                variant="outlined"
                                onClick={clearCart}
                                fullWidth
                                size="large"
                                sx={{
                                    borderRadius: 3,
                                    borderColor: theme.palette.error.main,
                                    color: theme.palette.error.main,
                                    fontWeight: 600,
                                    py: 1.2,
                                    '&:hover': {
                                        borderColor: theme.palette.error.dark,
                                        bgcolor: theme.palette.mode === 'light'
                                            ? 'rgba(244, 162, 162, 0.1)'
                                            : 'rgba(207, 102, 121, 0.15)',
                                    },
                                }}
                            >
                                Очистить
                            </Button>

                            <Button
                                variant="contained"
                                onClick={onCheckout}
                                fullWidth
                                size="large"
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 600,
                                    py: 1.2,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Оформить заказ
                            </Button>
                        </Box>

                        {/* Информация о доставке */}
                        {getTotalPrice() >= 1500 && (
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    mt: 2,
                                    color: theme.palette.success.main,
                                }}
                            >
                                ✓ Бесплатная доставка уже применена
                            </Typography>
                        )}
                    </Box>
                </>
            )}
        </Drawer>
    );
}