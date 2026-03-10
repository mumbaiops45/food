"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedQuantity) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedQuantity === selectedQuantity
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedQuantity === selectedQuantity
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedQuantity, count: 1 }];
    });
  };

  const removeFromCart = (id, selectedQuantity) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedQuantity === selectedQuantity))
    );
  };

  const updateCount = (id, selectedQuantity, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedQuantity === selectedQuantity
            ? { ...item, count: item.count + delta }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCount, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}