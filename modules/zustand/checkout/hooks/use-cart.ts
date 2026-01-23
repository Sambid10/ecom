import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from "zustand/react/shallow";

export const useCart = (tenantSlug: string, userId: string) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);
  const clearCart = useCartStore((state) => state.clearCart);

  const productIds = useCartStore(
    useShallow((state) => state.getCartByTenant(tenantSlug, userId))
  );

  const toggleCartProducts = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId, userId);
      } else {
        addProduct(tenantSlug, productId, userId);
      }
    },
    [productIds, tenantSlug, userId, addProduct, removeProduct]
  );

  const isProductInCart = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const clearTenantCart = useCallback(
    () => {
      clearCart(tenantSlug, userId);
    },
    [tenantSlug, userId, clearCart]
  );

  const handleAddProduct = useCallback(
    (productId: string) => {
      addProduct(tenantSlug, productId, userId);
    },
    [tenantSlug, userId, addProduct]
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => {
      removeProduct(tenantSlug, productId, userId);
    },
    [tenantSlug, userId, removeProduct]
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleCartProducts,
    isProductInCart,
    totalProducts: productIds.length,
  };
};
