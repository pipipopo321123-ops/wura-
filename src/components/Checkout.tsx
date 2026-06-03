import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Divider,
    Paper,
    Alert,
    Snackbar,
    Stepper,
    Step,
    StepLabel,
    useTheme,
    Fade,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from './context/CartContext.tsx';
import { CATEGORY_LABELS, CATEGORY_COLORS, DishCategory } from '../models/dish.ts';

// ============================================================================
// КОМПОНЕНТ ОФОРМЛЕНИЯ ЗАКАЗА
// ============================================================================
// Модальное окно с формой для оформления заказа в 2 шага
// ============================================================================

interface CheckoutProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

// Тип для данных формы
interface OrderForm {
    name: string;
    phone: string;
    address: string;
    comment: string;
    paymentMethod: 'cash' | 'card';
}

// Шаги оформления заказа
const steps = ['Данные получателя', 'Подтверждение заказа'];

export default function Checkout({ open, onClose, onSuccess }: CheckoutProps) {
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const theme = useTheme();

    // Состояние формы
    const [formData, setFormData] = useState<OrderForm>({
        name: '',
        phone: '',
        address: '',
        comment: '',
        paymentMethod: 'cash',
    });

    // Ошибки валидации
    const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});

    // Уведомление об успехе
    const [showSuccess, setShowSuccess] = useState(false);

    // Текущий шаг
    const [activeStep, setActiveStep] = useState(0);

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
     * Валидация формы
     */
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof OrderForm, string>> = {};

        // Валидация имени
        if (!formData.name.trim()) {
            newErrors.name = 'Введите имя';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
        }

        // Валидация телефона
        const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Введите телефон';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Введите корректный телефон (например, +7 999 999-99-99)';
        }

        // Валидация адреса
        if (!formData.address.trim()) {
            newErrors.address = 'Введите адрес доставки';
        } else if (formData.address.trim().length < 10) {
            newErrors.address = 'Введите полный адрес (минимум 10 символов)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Подсчет общего количества товаров
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

    /**
     * Форматирование номера телефона в процессе ввода
     */
    const formatPhoneNumber = (value: string): string => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 0) return '';
        if (numbers.length <= 1) return `+7 (${numbers}`;
        if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
        if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
        if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
        return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
    };

    // ============================================================================
    // ОБРАБОТЧИКИ
    // ============================================================================

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Специальная обработка для телефона
        if (name === 'phone') {
            const formattedValue = formatPhoneNumber(value);
            setFormData(prev => ({ ...prev, [name]: formattedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Очищаем ошибку при вводе
        if (errors[name as keyof OrderForm]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePaymentMethodChange = (method: 'cash' | 'card') => {
        setFormData(prev => ({ ...prev, paymentMethod: method }));
    };

    const handleNext = () => {
        if (activeStep === 0) {
            if (validateForm()) {
                setActiveStep(1);
            }
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {
        // Формируем заказ
        const order = {
            ...formData,
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
            })),
            total: getTotalPrice(),
            date: new Date().toISOString(),
            orderNumber: Math.floor(Math.random() * 1000).toString().padStart(4, '0'),
        };

        // Здесь обычно отправка на сервер
        console.log('Заказ оформлен:', order);

        // Очищаем корзину
        clearCart();

        // Показываем уведомление об успехе
        setShowSuccess(true);

        // Закрываем окно оформления через небольшую задержку
        setTimeout(() => {
            onClose();
            onSuccess();
            // Сбрасываем состояние
            setActiveStep(0);
            setFormData({
                name: '',
                phone: '',
                address: '',
                comment: '',
                paymentMethod: 'cash',
            });
        }, 2000);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    // ============================================================================
    // RENDER
    // ============================================================================

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                TransitionComponent={Fade}
                transitionDuration={400}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: theme.palette.background.default,
                        maxHeight: '90vh',
                    }
                }}
            >
                {/* Заголовок с кнопкой закрытия */}
                <DialogTitle sx={{
                    p: 2.5,
                    pb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}>
                    <Box>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            Оформление заказа
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            Заказ #{Math.floor(Math.random() * 1000).toString().padStart(4, '0')}
                        </Typography>
                    </Box>

                    <IconButton onClick={onClose} sx={{ color: theme.palette.text.secondary }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* Степпер */}
                <Box sx={{ px: 2.5, pt: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <DialogContent sx={{ p: 2.5 }}>
                    {activeStep === 0 ? (
                        // ==========================================================================
                        // ШАГ 1: ДАННЫЕ ПОЛУЧАТЕЛЯ
                        // ==========================================================================
                        <Box>
                            {/* Краткая сводка заказа */}
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    borderRadius: 3,
                                    bgcolor: theme.palette.background.paper,
                                    borderColor: theme.palette.divider,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <ShoppingBagIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        Ваш заказ ({totalItems} {getItemsText(totalItems)})
                                    </Typography>
                                </Box>

                                <Box sx={{ maxHeight: 200, overflow: 'auto', pr: 1 }}>
                                    {cartItems.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                py: 1,
                                                borderBottom: `1px dashed ${theme.palette.divider}`,
                                                '&:last-child': { borderBottom: 'none' },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Chip
                                                    label={item.quantity}
                                                    size="small"
                                                    sx={{
                                                        minWidth: 30,
                                                        height: 24,
                                                        bgcolor: getCategoryColor(item.category),
                                                        color: theme.palette.getContrastText(getCategoryColor(item.category)),
                                                    }}
                                                />
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                        {CATEGORY_LABELS[item.category]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {formatPrice(item.price * item.quantity)} ₽
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider sx={{ my: 1.5 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                                        Сумма заказа:
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: theme.palette.primary.dark, fontWeight: 700 }}>
                                        {formatPrice(getTotalPrice())} ₽
                                    </Typography>
                                </Box>
                            </Paper>

                            {/* Поля формы */}
                            <TextField
                                fullWidth
                                label="Имя *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                margin="normal"
                                required
                                variant="outlined"
                                placeholder="Иван Иванов"
                                InputProps={{
                                    sx: { borderRadius: 2, bgcolor: theme.palette.background.paper }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Телефон *"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                margin="normal"
                                required
                                placeholder="+7 (999) 999-99-99"
                                variant="outlined"
                                InputProps={{
                                    sx: { borderRadius: 2, bgcolor: theme.palette.background.paper }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Адрес доставки *"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                error={!!errors.address}
                                helperText={errors.address}
                                margin="normal"
                                required
                                multiline
                                rows={2}
                                variant="outlined"
                                placeholder="Город, улица, дом, квартира"
                                InputProps={{
                                    sx: { borderRadius: 2, bgcolor: theme.palette.background.paper }
                                }}
                            />

                            {/* Способ оплаты */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                    Способ оплаты:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant={formData.paymentMethod === 'cash' ? 'contained' : 'outlined'}
                                        onClick={() => handlePaymentMethodChange('cash')}
                                        sx={{
                                            flex: 1,
                                            borderRadius: 2,
                                            py: 1,
                                        }}
                                    >
                                        Наличными
                                    </Button>
                                    <Button
                                        variant={formData.paymentMethod === 'card' ? 'contained' : 'outlined'}
                                        onClick={() => handlePaymentMethodChange('card')}
                                        sx={{
                                            flex: 1,
                                            borderRadius: 2,
                                            py: 1,
                                        }}
                                    >
                                        Картой
                                    </Button>
                                </Box>
                            </Box>

                            <TextField
                                fullWidth
                                label="Комментарий к заказу"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={2}
                                variant="outlined"
                                placeholder="Пожелания по доставке, звонок в домофон и т.д."
                                InputProps={{
                                    sx: { borderRadius: 2, bgcolor: theme.palette.background.paper }
                                }}
                            />
                        </Box>
                    ) : (
                        // ==========================================================================
                        // ШАГ 2: ПОДТВЕРЖДЕНИЕ ЗАКАЗА
                        // ==========================================================================
                        <Box>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    bgcolor: theme.palette.background.paper,
                                }}
                            >
                                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                                    Проверьте данные заказа
                                </Typography>

                                {/* Данные получателя */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                        Получатель:
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, p: 1.5, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                        {formData.name}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                        Телефон:
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, p: 1.5, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                        {formData.phone}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                        Адрес доставки:
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, p: 1.5, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                        {formData.address}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                        Способ оплаты:
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, p: 1.5, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                        {formData.paymentMethod === 'cash' ? 'Наличными' : 'Картой'}
                                    </Typography>

                                    {formData.comment && (
                                        <>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                                Комментарий:
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, p: 1.5, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                                {formData.comment}
                                            </Typography>
                                        </>
                                    )}

                                    <Divider sx={{ my: 2 }} />

                                    {/* Состав заказа */}
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                        Состав заказа:
                                    </Typography>

                                    {cartItems.map((item) => (
                                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">
                                                {item.name} x{item.quantity}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {formatPrice(item.price * item.quantity)} ₽
                                            </Typography>
                                        </Box>
                                    ))}

                                    <Divider sx={{ my: 2 }} />

                                    {/* Итоговая сумма */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6">Итого:</Typography>
                                        <Typography variant="h5" sx={{ color: theme.palette.primary.dark, fontWeight: 700 }}>
                                            {formatPrice(getTotalPrice())} ₽
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </DialogContent>

                {/* Действия */}
                <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
                    {activeStep === 1 && (
                        <Button
                            onClick={handleBack}
                            variant="outlined"
                            size="large"
                            sx={{
                                borderRadius: 3,
                                px: 3,
                            }}
                        >
                            Назад
                        </Button>
                    )}

                    <Button
                        onClick={onClose}
                        variant="outlined"
                        size="large"
                        sx={{
                            borderRadius: 3,
                            px: 3,
                        }}
                    >
                        Отмена
                    </Button>

                    <Button
                        onClick={handleNext}
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: 3,
                            px: 4,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {activeStep === 0 ? 'Продолжить' : 'Подтвердить заказ'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Уведомление об успешном заказе */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    severity="success"
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: theme.shadows[8],
                        bgcolor: theme.palette.success.main,
                        color: '#FFFFFF',
                        '& .MuiAlert-icon': {
                            color: '#FFFFFF',
                        },
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Заказ успешно оформлен!
                    </Typography>
                    <Typography variant="body2">
                        Скоро с вами свяжется оператор для подтверждения
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    );
}