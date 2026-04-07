"use client";
import React, { createContext, useContext } from "react";

type CartLine = { id: string; quantity: number };

export type CartContextType = {
  items: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Bare provider: no logic, returns empty cart and no-op actions.
  const items: CartLine[] = [];
  function add(_id: string, _qty = 1) {
    // no-op
  }
  function remove(_id: string) {
    // no-op
  }
  function update(_id: string, _qty: number) {
    // no-op
  }
  function clear() {
    // no-op
  }
  const totalCount = 0;
  const totalPrice = 0;

  const value: CartContextType = { items, add, remove, update, clear, totalCount, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
