import { create } from 'zustand';

type CartStore = {
  cartItems: any[];
  animateCart: boolean;
  addToCart: (item: any) => void;
  triggerCartAnimation: () => void;
  resetCartAnimation: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  animateCart: false,

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
      animateCart: true,
    })),

  triggerCartAnimation: () => set({ animateCart: true }),

  resetCartAnimation: () => set({ animateCart: false }),
}));
