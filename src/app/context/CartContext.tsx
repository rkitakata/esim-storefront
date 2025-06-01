'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Plan } from '../types/plan';

interface CartContextType {
  cart: Plan[];
  addToCart: (item: Plan) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Plan[]>(() => {
    // Load cart from localStorage on initial mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Plan) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id.toString() !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
