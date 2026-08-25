import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  cart: [],

  setUser: (user) => set({ user }),

  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),
}));