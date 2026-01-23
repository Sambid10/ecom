"use client"
import { useCart } from '@/modules/zustand/checkout/hooks/use-cart'
import { Button } from '../button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
export default function CartButton({ tenantSlug, productId, userId }: {
    tenantSlug: string,
    productId: string,
    userId: string | undefined
}) {
    const cart = userId ? useCart(tenantSlug,userId) : null
    const router = useRouter()
    const handleCartProducts = () => {
        if (userId) {
            cart!.toggleCartProducts(productId)
        } else {
            router.push("/sign-in")
            toast.error("Must be logged in.", {
                style: {
                    backgroundColor: "#DC2626", // red-600
                    color: "white"
                }
            })
        }
    }
    return (
        <Button
            onClick={handleCartProducts}
            className={cn("cursor-pointer xs:w-[60%] w-[70%] mx-auto md:w-full h-11 rounded-full", cart!.isProductInCart(productId) && "bg-red-500 hover:bg-red-400")}>
            <ShoppingCart className="h-9 w-9" />
            <span className="text-base">
                {cart!.isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
            </span>
        </Button>
    )
}
