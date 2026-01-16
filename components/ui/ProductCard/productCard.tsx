import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
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
import { StarIcon } from "lucide-react"

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

    const isHovered = hoveredId === id

    return (
        <div
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative">
            <Link
                href="/"

            >
                <div className="border border-gray-600 rounded-md bg-background overflow-hidden h-full flex flex-col shadow-xs">
                    <div className="relative aspect-square">
                        <Image
                            alt={name}
                            fill
                            className="object-cover"
                            src={pic || "/pictures/place.png"}
                        />
                    </div>
                    <div className="p-4 border-y flex flex-col gap-2 flex-1">
                        <h1 
                        style={{
                            lineHeight:"120%"
                        }}
                        className="line-clamp-2 text-base font-medium">{name}</h1>
                        <div className="flex items-center gap-2">
                        
                                <Image
                                alt="auth"
                                width={16}
                                height={16}
                                src={authorImageUrl ? authorImageUrl : "/pictures/avatar.png" }
                                className="rounded-full border shrink-0 size-[30px] border border-gray-400"
                                />
                            
                            <p className="text-sm underline font-medium underline-offset-2">{authorUsername}</p>
                        </div>
                        {reviewCount > 0 && 
                            <div className="flex items-center gap-1">
                                <StarIcon className="size-4 fill-yellow-500"/>
                                <p className="text-sm">{reviewRating} ({reviewCount})</p>
                            </div>
                        }
                    </div>
                     <div className="p-4 border-y border-gray-400 flex flex-col gap-2 flex-1">
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
                        className="absolute inset-0 bg-black/10 rounded-md pointer-events-none"
                    />
                )}
            </AnimatePresence>



        </div>
    )
}

