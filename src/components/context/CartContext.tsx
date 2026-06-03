import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish } from '../../models/dish';

// ============================================================================
// ТИПЫ ДЛЯ КОРЗИНЫ
// ============================================================================

// Товар в корзине - расширяет Dish, добавляя количество
export interface CartItem extends Dish {
    quantity: number;
}

// Тип для контекста корзины
interface CartContextType {
    cartItems: CartItem[];          // Массив товаров в корзине
    addToCart: (dish: Dish) => void; // Добавить товар
    removeFromCart: (dishId: string) => void; // Удалить товар
    updateQuantity: (dishId: string, quantity: number) => void; // Изменить количество
    clearCart: () => void;           // Очистить корзину
    getTotalPrice: () => number;     // Получить общую сумму
    getTotalItems: () => number;     // Получить общее количество товаров
}

// ============================================================================
// СОЗДАНИЕ КОНТЕКСТА
// ============================================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// Хук для использования корзины в компонентах
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// ============================================================================
// ПРОВАЙДЕР КОРЗИНЫ
// ============================================================================

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Инициализация состояния из localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Ошибка загрузки корзины из localStorage:', error);
            return [];
        }
    });

    // Сохранение корзины в localStorage при изменении
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Ошибка сохранения корзины в localStorage:', error);
        }
    }, [cartItems]);

    // ============================================================================
    // ФУНКЦИИ ДЛЯ РАБОТЫ С КОРЗИНОЙ
    // ============================================================================

    // Добавление товара в корзину
    const addToCart = (dish: Dish) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === dish.id);

            if (existingItem) {
                // Если товар уже есть, увеличиваем количество
                return prevItems.map(item =>
                    item.id === dish.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Если товара нет, добавляем новый с количеством 1
            return [...prevItems, { ...dish, quantity: 1 }];
        });
    };

    // Удаление товара из корзины
    const removeFromCart = (dishId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== dishId));
    };

    // Обновление количества товара
    const updateQuantity = (dishId: string, quantity: number) => {
        if (quantity <= 0) {
            // Если количество меньше или равно 0, удаляем товар
            removeFromCart(dishId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === dishId ? { ...item, quantity } : item
            )
        );
    };

    // Очистка корзины
    const clearCart = () => {
        setCartItems([]);
    };

    // Подсчет общей суммы
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Подсчет общего количества товаров
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // ============================================================================
    // RETURN
    // ============================================================================

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};