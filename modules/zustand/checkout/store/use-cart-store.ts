import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface Cart {
  productIds: string[]
}

interface CartState {
  tenantCarts: Record<string, Cart>
  addProduct: (tenantSlug: string, productId: string) => void
  removeProduct: (tenantSlug: string, productId: string) => void
  clearCart: (tenantSlug: string) => void
  clearAllCarts: () => void
  getCartByTenant: (tenantSlug: string) => string[]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},

      addProduct: (tenantSlug, productId) =>
        set((state) => {
          const existing = state.tenantCarts[tenantSlug]?.productIds || []
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                productIds: [...existing, productId]
              }
            }
          }
        }),

      removeProduct: (tenantSlug, productId) =>
        set((state) => {
          const existing = state.tenantCarts[tenantSlug]?.productIds || []
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                productIds: existing.filter((id) => id !== productId)
              }
            }
          }
        }),

      clearAllCarts: () => set({ tenantCarts: {} }),

      clearCart: (tenantSlug) =>
        set((state) => {
          const newcarts = { ...state.tenantCarts }
          delete newcarts[tenantSlug]
          return { tenantCarts: newcarts }
        }),

      getCartByTenant: (tenantSlug) =>
        get().tenantCarts[tenantSlug]?.productIds || []
    }),
    {
      name: "kpopshopify-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
