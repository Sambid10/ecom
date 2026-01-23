import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface Cart {
  productIds: string[]
}

interface CartState {
  tenantCarts: Record<string, Record<string, Cart>>
  addProduct: (tenantSlug: string, productId: string, userId: string) => void
  removeProduct: (tenantSlug: string, productId: string, userId: string) => void
  clearCart: (tenantSlug: string, userId: string) => void
  clearAllCarts: () => void
  getCartByTenant: (tenantSlug: string, userId: string) => string[]
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},

      addProduct: (tenantSlug, productId, userId) =>
        set((state) => {
          const tenant = state.tenantCarts[tenantSlug] || {}
          const userCart = tenant[userId]?.productIds || []
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                ...tenant,
                [userId]: {
                  productIds: [...userCart, productId]
                }
              }
            }
          }
        }),

      removeProduct: (tenantSlug, productId, userId) =>
        set((state) => {
          const tenant = state.tenantCarts[tenantSlug] || {};
          const userCart = tenant[userId]?.productIds || [];
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                ...tenant,
                [userId]: {
                  productIds: userCart.filter((id) => id !== productId)
                }
              }
            }
          }
        }),

      clearAllCarts: () => set({ tenantCarts: {} }),

      clearCart: (tenantSlug, userId) =>
        set((state) => {
          const tenant = state.tenantCarts[tenantSlug] || {}
          const newTenant = { ...tenant }
          delete newTenant[userId]
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: newTenant
            }
          }
        }),

      getCartByTenant: (tenantSlug, userId) =>
        get().tenantCarts[tenantSlug]?.[userId]?.productIds || [],
    }),
    {
      name: "kpopshopify-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
