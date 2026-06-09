"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCartState, IState, Action } from "./useCartState";

type CartContextType = {
  state: IState;
  dispatch: React.Dispatch<Action>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartStateData = useCartState();

  return (
    <CartContext.Provider value={cartStateData}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext phải được đặt bên trong CartProvider");
  }
  return context;
}
