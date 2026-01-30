"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import CustomButton from "../customButton"
import { ChevronRight, ShoppingCart } from "lucide-react"

const picArray = [
  { url: "/pictures/karina.jpg" },
  { url: "/pictures/giselle.jpg" },
  { url: "/pictures/yuna1.jpg" },
  { url: "/pictures/yeji.png" },
  { url: "/pictures/miyeon.png" },
  { url: "/pictures/kar.jpg" },
  { url: "/pictures/gis.jpg" },
  { url: "/pictures/win.jpg" },
  { url: "/pictures/dani.jpg" },
  { url: "/pictures/ire.jpg" },
  { url: "/pictures/wen.jpg" },
  { url: "/pictures/hanni.jpg" },
]

export default function PictureSection() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    // pick a random image immediately
    setActiveId(Math.floor(Math.random() * picArray.length))

    const interval = setInterval(() => {
      setActiveId(prev => {
        let next = prev
        while (next === prev) {
          next = Math.floor(Math.random() * picArray.length)
        }
        return next
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full rounded-md aspect-16/13 sm:aspect-16/10 md:aspect-22/8 border border-gray-400 overflow-hidden">

      {activeId === null ? (
        // placeholder before first image loads
        <div className="w-full h-full bg-background" />
      ) : (
        <Image
          src={picArray[activeId].url}
          alt="Hero image"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-90 shadow-md transition-opacity duration-700"
        />
      )}

      {/* Overlay content */}
      <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 flex flex-col gap-1 text-black">
        <h1
          style={{ lineHeight: "105%" }}
          className="font-dance font-bold text-[2.4rem] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.8rem]"
        >
          K-Shopify.
        </h1>

        <h2 className="font-mono text-xs sm:text-sm md:text-lg mb-2 italic font-medium flex items-center">
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          Your K-Pop Marketplace
        </h2>

        <CustomButton
          icon={ShoppingCart}
          iconClassName="h-4 w-4 md:h-5 md:w-5 mr-2"
          className="md:py-3.5 md:px-12 bg-black text-sm md:font-medium md:text-lg text-white hover:bg-gray-900"
          href="/"
          text="Shop Now"
        />
      </div>
    </div>
  )
}
