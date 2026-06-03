import { useState } from 'react';
import {StyledEngineProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';

// Импорт компонентов
import CardDish from './components/CardDish.tsx';
import Navbar from './components/Navbar.tsx';
import Cart from './components/Cart.tsx';
import Checkout from './components/Checkout.tsx';

// Импорт контекстов
import { CartProvider } from './components/context/CartContext.tsx';
import { ThemeProvider as CustomThemeProvider } from './components/context/ThemeContext.tsx';

// Импорт данных
import { drinks } from './data/drinks.ts';
import { firstDishes } from './data/first-dishes.ts';
import { secondDishes } from './data/second-dishes.ts';
import { snacks } from './data/snacks.ts';

// ============================================================================
// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
// ============================================================================

// Компонент с основным контентом (использует тему)
function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const theme = useTheme();

  // Категории блюд для отображения
  const categories = [
    { title: 'Напитки', items: drinks },
    { title: 'Первые блюда', items: firstDishes },
    { title: 'Вторые блюда', items: secondDishes },
    { title: 'Закуски', items: snacks },
  ];

  // ============================================================================
  // ОБРАБОТЧИКИ
  // ============================================================================

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCheckoutOpen(false);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        // Фоновое изображение в зависимости от темы
        backgroundImage: `url(${
          theme.palette.mode === 'light'
            ? '/img/background/background_light.png'
            : '/img/background/background_dark.png'
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        // Полупрозрачный оверлей для лучшей читаемости контента
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor:
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(0, 0, 0, 0.75)',
          zIndex: 0,
        },
        // Все дочерние элементы должны быть выше оверлея
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      {/* Навигация */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, // Адаптивные отступы
          maxWidth: '1400px', // Максимальная ширина контента
          mx: 'auto', // Центрирование
          width: '100%',
        }}
      >
        <Grid container spacing={3}>
          {/* Категории блюд */}
          {categories.map((category) => (
            <Grid size={12} key={category.title}>
              {/* Заголовок категории */}
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  mt: 2,
                  fontWeight: 500,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  pl: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {category.title}
              </Typography>

              {/* Сетка блюд */}
              <Grid container spacing={2}>
                {category.items.map((dish) => (
                  <Grid
                    size={{
                      xs: 12, // 1 карточка на мобильных
                      sm: 6, // 2 карточки на планшетах
                      md: 4, // 3 карточки на небольших экранах
                      lg: 3, // 4 карточки на десктопах
                    }}
                    key={dish.id}
                  >
                    <CardDish dish={dish} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}

          {/* Информационные блоки */}
          <Grid size={12}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Специальное предложение */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: theme.shadows[2],
                    height: '100%',
                    transition: theme.transitions.create(
                      ['transform', 'box-shadow'],
                      {
                        duration: theme.transitions.duration.shorter,
                      }
                    ),
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.primary.main, mb: 1 }}
                  >
                    🎁 Специальное предложение
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    При заказе от 2000₽ - десерт в подарок!
                  </Typography>
                </Box>
              </Grid>

              {/* Информация о ресторане */}
              <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: theme.shadows[2],
                    height: '100%',
                    transition: theme.transitions.create(
                      ['transform', 'box-shadow'],
                      {
                        duration: theme.transitions.duration.shorter,
                      }
                    ),
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.primary.main, mb: 1 }}
                  >
                    📍 Информация о ресторане
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Время работы: с 10:00 до 23:00. Доставка бесплатно при заказе
                    от 1500₽
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Модальные окна */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleOrderSuccess}
      />
    </Box>
  );
}

// ============================================================================
// КОРНЕВОЙ КОМПОНЕНТ С ПРОВАЙДЕРАМИ
// ============================================================================

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Позволяет переопределять стили MUI */}
      <CustomThemeProvider>
        {/* Наш кастомный провайдер темы */}
        <CartProvider>
          {/* Провайдер корзины */}
          <CssBaseline /> {/* Сброс стилей и применение темы */}
          <AppContent />
        </CartProvider>
      </CustomThemeProvider>
    </StyledEngineProvider>
  );
}