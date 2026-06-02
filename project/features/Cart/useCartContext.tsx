"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCartState } from "./useCartState";

type CartContextType = ReturnType<typeof useCartState>;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartValues = useCartState();

  return (
    <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart phải được sử dụng bên trong một CartProvider");
  }

  return context;
}
