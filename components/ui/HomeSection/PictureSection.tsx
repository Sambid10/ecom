"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CustomButton from '../customButton'
import { ChevronRight } from 'lucide-react'
const picArray = [{
  url: "/pictures/sam1.png"
},
{
  url: "/pictures/sam3.jpg"
},
{
  url: "/pictures/sam.png"
},
{
  url: "/pictures/pics.jpg"
},
]
export default function PictureSection() {
  const [activeId, setActiveId] = useState(0)
  useEffect(() => {
    const handler = setInterval(() => {
      setActiveId((prev) => (prev + 1) % picArray.length)
    }, 60000)
    return () => clearInterval(handler)
  }, [])
  return (
    <div className="relative  w-full rounded-xl bg-black aspect-video md:aspect-22/9
">
      <Image
        fill
        alt='pic'
        className='object-cover opacity-80 border-gray-900 rounded-xl'
        src={picArray[activeId].url}
      />
      <div className='absolute top-[45%] left-4 md:left-12 -translate-y-1/2 flex flex-col gap-1'>
        <h1
          style={{
            lineHeight: "105%"
          }}
          className='font-dance font-bold  text-[2rem] sm:text-[3.85rem] md:text-[4.5rem] lg:text-[6rem]'>
          K-Shopify.
        </h1>
        <h1 className='font-mono text-xs sm:text-sm md:text-lg mb-2 italic font-medium flex items-center'> <ChevronRight className='md:h-4 md:w-4 h-3 w-3 font-bold' /> Your K-Pop Marketplace</h1>
        <div>
          <CustomButton
            showIcon={true}
            className='md:py-3.5  md:px-12 bg-black text-sm md:font-medium md:text-lg text-white hover:bg-gray-900 '
            href='/'
            text='Shop Now'
          />
        </div>

      </div>

    </div>
  )
}
