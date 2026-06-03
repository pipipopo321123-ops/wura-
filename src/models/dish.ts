// ============================================================================
// МОДЕЛИ ДАННЫХ
// ============================================================================

// Категории блюд
export type DishCategory = 'snack' | 'first' | 'second' | 'drink';

// Интерфейс блюда
export interface Dish {
  id: string;          // Уникальный идентификатор
  name: string;        // Название блюда
  description: string; // Описание
  price: number;       // Цена
  category: DishCategory; // Категория
  image: string;       // URL изображения
}

// Константы для категорий (для использования в коде)
export const CATEGORY_LABELS: Record<DishCategory, string> = {
  snack: 'Закуски',
  first: 'Первые блюда',
  second: 'Вторые блюда',
  drink: 'Напитки'
};

// Цвета категорий (для использования без темы)
export const CATEGORY_COLORS: Record<DishCategory, string> = {
  snack: '#F9D6C5', // персиковый
  first: '#B5A8D5', // лавандовый
  second: '#B5D0D9', // голубой
  drink: '#C3E3C9' // зеленый
};