"use client"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"
const divs = [
    {
        id: 1,
        text: "Free shipping on all orders $50+",
        bgColor: "bg-teal-400",
        textColor: "text-gray-800",
    },
    {
        id: 2,
        text: "New Deals. 50% OFF.Get it before they're gone!",
        linktext: "Shop Now",
        link: "/",
        bgColor: "bg-purple-600",
        textColor: "text-white",
    },
    {
        id: 3,
        text: "New Arrivals: Explore the Latest K-Pop Albums and Merch!",
        bgColor: "bg-blue-400",
        textColor: "text-gray-800",
    },
]
export default function AdBanner() {
    const [activeDiv, setActivediv] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setActivediv((prev) => (prev + 1) % divs.length)
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="h-12 w-full relative overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={divs[activeDiv].id}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`${divs[activeDiv].bgColor} ${divs[activeDiv].textColor} absolute h-full w-full z-50 flex items-center justify-center  `}
                >
                    <div className="">
                        <h1 className="text-[13px]">{divs[activeDiv].text}</h1>
                        {divs[activeDiv].link &&
                            <Link
                                href={divs[activeDiv].link}
                            >
                                <h1 className="text-[13px] underline font-semibold text-center">{divs[activeDiv].linktext}</h1>
                            </Link>
                        }
                    </div>

                </motion.div>
            </AnimatePresence>

        </div>
    )
}
