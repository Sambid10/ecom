import { useCart } from "@/modules/zustand/checkout/hooks/use-cart"
import { Button } from "../button"
import { generateTenantUrl } from "@/lib/utils"
import Link from "next/link"
import { ShoppingCartIcon } from "lucide-react"
interface Props {
    className?: string,
    hideIfEmpty: boolean
    tenantSlug: string
}
export default function CheckoutButton({ tenantSlug, className, hideIfEmpty }: Props) {
    const { totalProducts } = useCart(tenantSlug)
    if (hideIfEmpty && totalProducts === 0) return null
    return (
        <div className="relative">
            <Button
                title="Cart"
                className="h-10 w-10 rounded-full px-5 flex items-center justify-center" asChild>
                <Link
                    href={`${generateTenantUrl(tenantSlug)}2/checkout`}
                >
                    <ShoppingCartIcon />

                </Link>
            </Button>
            <div className="absolute -top-2 -right-1 bg-red-600 h-5.5 w-5.5 rounded-full text-white flex items-center justify-center">
                <h1 className="text-sm">{totalProducts > 0 ? totalProducts : ""}</h1>
            </div>
        </div>

    )
}
