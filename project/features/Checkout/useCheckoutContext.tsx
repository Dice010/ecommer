"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCheckoutState } from "./useCheckoutState";

type CheckoutContextType = ReturnType<typeof useCheckoutState>;

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const checkoutValues = useCheckoutState();

  return (
    <CheckoutContext.Provider value={checkoutValues}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout phải được sử dụng bên trong một CheckoutProvider");
  }
  return context;
}