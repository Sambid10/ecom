"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CustomButton from '../customButton'
import { ChevronRight, ShoppingCart } from 'lucide-react'
const picArray = [
  {
  url: "/pictures/sam7.jpg"
},
  {
  url: "/pictures/sam8.jpg"
},
   {
  url: "/pictures/sam6.jpg"
},
  {
  url: "/pictures/sam5.jpg"
},
  {
  url: "/pictures/sam4.jpg"
},{
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
      setActiveId((prev) => {
        let next= prev;
        while (next === prev){
          next=Math.floor(Math.random() * picArray.length)
        }
        return next
      })
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
            iconClassName={"h-4 w-4 md:h-5 md:w-5 mr-2"}
            icon={ShoppingCart}
            className='md:py-3.5  md:px-12 bg-black text-sm md:font-medium md:text-lg text-white hover:bg-gray-900 '
            href='/'
            text='Shop Now'
          />
        </div>

      </div>

    </div>
  )
}
