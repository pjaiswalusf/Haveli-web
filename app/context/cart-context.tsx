'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem } from '@/app/data/menu';

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem, quantity: number, customization: any) => void;
    removeFromCart: (uniqueId: string) => void;
    updateQuantity: (uniqueId: string, delta: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount (optional, nice helper)
    useEffect(() => {
        const savedCart = localStorage.getItem('haveli_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('haveli_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: MenuItem, quantity: number, customization: any) => {
        const newItem: CartItem = {
            uniqueId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            menuItem: item,
            quantity,
            customization
        };
        setCart(prev => [...prev, newItem]);
    };

    const removeFromCart = (uniqueId: string) => {
        setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.uniqueId === uniqueId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((sum, item) => {
            const price = parseFloat(item.menuItem.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
