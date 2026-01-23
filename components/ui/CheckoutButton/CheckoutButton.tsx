"use client"
import { useCart } from "@/modules/zustand/checkout/hooks/use-cart"
import { Button } from "../button"
import { generateTenantUrl } from "@/lib/utils"
import Link from "next/link"
import { ShoppingCartIcon } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
interface Props {
    className?: string,
    tenantSlug: string
}
export default function CheckoutButton({ tenantSlug, className }: Props) {
    const trpc=useTRPC()
    const {data:session}=useQuery(trpc.auth.session.queryOptions())
    const cart = session?.user?.id ? useCart(tenantSlug,session.user.id) : null
    const totalProducts=cart?.totalProducts ?? 0
    return (
        <div className="relative">
            <Button
                title="Cart"
                className="h-10 w-10 rounded-full px-5 flex items-center justify-center" asChild>
                <Link
                    href={`${generateTenantUrl(tenantSlug)}/checkout`}
                >
                    <ShoppingCartIcon />

                </Link>
            </Button>
            {totalProducts > 0 && 
             <div className="absolute -top-2 -right-1 bg-red-600 h-5.5 w-5.5 rounded-full text-white flex items-center justify-center">
                <h1 className="text-sm">{cart!.totalProducts > 0 ? cart!.totalProducts : ""}</h1>
            </div>
            }
             
            
          
        </div>

    )
}
