"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CustomButton from '../customButton'
import { ChevronRight, ShoppingCart } from 'lucide-react'

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
    // pick first random image immediately
    setActiveId(Math.floor(Math.random() * picArray.length))

    const handler = setInterval(() => {
      setActiveId(prev => {
        let next = prev
        while (next === prev) {
          next = Math.floor(Math.random() * picArray.length)
        }
        return next
      })
    }, 60000)

    return () => clearInterval(handler)
  }, [])

  return (
    <div className="relative w-full rounded-md  aspect-16/13 sm:aspect-16/10  md:aspect-22/8 border border-gray-400">

      {activeId === null ? (
        // placeholder until first random picks
        <div className="w-full h-full rounded-xl bg-background aspect-16/13 sm:aspect-16/10  md:aspect-22/8 " />
      ) : (
        <img
          alt="pic"
          className="object-cover opacity-100 brightness-90 border-gray-900 rounded-md shadow-md aspect-16/13 sm:aspect-16/10  md:aspect-22/8"
          src={picArray[activeId].url}
        />
      )}

      <div className="absolute top-[45%] left-4 md:left-12 -translate-y-1/2 flex flex-col gap-1">
        <h1
          style={{ lineHeight: "105%" }}
          className="font-dance font-bold text-[2.4rem] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.8rem]"
        >
          K-Shopify.
        </h1>
        <h1 className="font-mono text-xs sm:text-sm md:text-lg mb-2 italic font-medium flex items-center">
          <ChevronRight className="md:h-4 md:w-4 h-3 w-3 font-bold" /> Your K-Pop Marketplace
        </h1>
        <div>
          <CustomButton
            iconClassName="h-4 w-4 md:h-5 md:w-5 mr-2"
            icon={ShoppingCart}
            className="md:py-3.5 md:px-12 bg-black text-sm md:font-medium md:text-lg text-white hover:bg-gray-900"
            href="/"
            text="Shop Now"
          />
        </div>
      </div>

    </div>
  )
}
