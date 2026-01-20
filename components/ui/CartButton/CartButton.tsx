"use client"
import { useCart } from '@/modules/zustand/checkout/hooks/use-cart'
import { Button } from '../button'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
export default function CartButton({ tenantSlug,productId }: {
    tenantSlug: string,
    productId:string
}) {
    const cart = useCart(tenantSlug)
    return (
        <Button 
        onClick={()=>cart.toggleCartProducts(productId)}
        className={cn("cursor-pointer xs:w-[60%] w-[70%] mx-auto md:w-full h-11 rounded-full",cart.isProductInCart(productId) && "bg-red-500 hover:bg-red-400")}>
            <ShoppingCart className="h-9 w-9" />
            <span className="text-base">
                {cart.isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
            </span>
        </Button>
    )
}
