"use client"
import Link from "next/link"
import Image from "next/image"
interface Props {
    id: string,
    name: string,
    description: string,
    pic: string | undefined | null,
    authorUsername: string,
    authorImageUrl: string | null | undefined,
    reviewRating: number,
    reviewCount: number,
    price: number,
    hoveredId: string | null,
    setHoveredId: (id: string | null) => void
}
import { AnimatePresence, motion } from "motion/react"
import { Check, StarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { generateTenantUrl } from "@/lib/utils"
import { useCart } from "@/modules/zustand/checkout/hooks/use-cart"
export default function ProductCard({
    id,
    authorImageUrl,
    authorUsername,
    description,
    name,
    pic,
    price,
    reviewCount,
    reviewRating,
    hoveredId,
    setHoveredId
}: Props) {
    const router=useRouter()
    const cart=useCart(authorUsername)
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        router.push(generateTenantUrl(authorUsername))
    }
    const isHovered = hoveredId === id
    return (
        <div
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative">
            <Link
                href={`/tenants/${authorUsername}/product/${id}`}
            >
                <div className="border border-gray-600 rounded-md bg-background overflow-hidden h-full flex flex-col shadow-xs">
                    <div className="relative aspect-square">
                        <Image
                            alt={name}
                            fill
                            className="object-cover"
                            src={pic || "/pictures/place.jpg"}
                        />
                    </div>
                    <div className="p-4 border-y flex flex-col gap-2 h-35">
                        <span className="h-20">
                        <h1 
                        style={{
                            lineHeight:"120%"
                        }}
                        className="line-clamp-2 text-base font-medium">{name}</h1>
                        </span>

                                              <div
                            onClick={handleClick}
                            className="flex items-center gap-2 w-fit">

                            <img
                                alt="auth"
                                src={authorImageUrl ? authorImageUrl : "/pictures/avatar.png"}
                                className="rounded-full h-7 w-7 object-cover shrink-0  border border-gray-400"
                            />

                            <p className="text-sm font-medium capitalize text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-700 hover:border-blue-600 border-b border-transparent">
                                {authorUsername}
                            </p>
                        </div>
                        {reviewCount > 0 && 
                            <div className="flex items-center gap-1 justify-between">
                                <div className="flex items-center gap-1">
                                     <StarIcon className="size-4 fill-yellow-500"/>
                                <p className="text-sm">{reviewRating} ({reviewCount})</p>
                                </div>

                               
                                  {cart.isProductInCart(id) && <div className="text-sm flex items-center gap-1 bg-green-100 rounded-md p-1"><Check className="h-4 w-4 text-green-700"/><h1 className="font-medium text-green-700">Added to Cart.</h1> </div>}
                            </div>
                        }
                    </div>
                     <div className="p-4 border-y border-gray-400 flex justify-between flex-1">
                        <h1 className="text-base font-medium">Price: {new Intl.NumberFormat("en-US",{
                            style:"currency",
                            currency:"USD"
                        }).format(Number(price))}</h1>
                      
                     </div>
                </div>
            </Link>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2,ease:"easeIn" }}
                        className="absolute inset-0 bg-stone-500/10 rounded-md pointer-events-none"
                    />
                )}
            </AnimatePresence>



        </div>
    )
}

