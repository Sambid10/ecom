"use client"
import Link from "next/link"
import { useState } from "react"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
export const navbarItems = [
    { href: "/", id: 1, children: "Home" },
    { href: "/about", id: 2, children: "About" },
    { href: "/features", id: 3, children: "Features" },
    { href: "/pricing", id: 4, children: "Pricing" },
    { href: "/contact", id: 5, children: "Contact" },
]

export const NavBarItem = () => {
    const pathname=usePathname()
    const [pos,setPos]=useState({
        width:0,
        left:0,
        opacity:0
    })

    return (
        <div 
        onMouseLeave={()=>setPos((prev)=>({...prev,opacity:0}))}
        className="relative z-0 isolate bg-white border border-gray-800 rounded-full flex">
            {navbarItems.map((nav,_)=>
                <Link
                className={`${pathname === nav.href && "bg-black rounded-full font-medium"}`}
                onMouseEnter={(e)=>{
                   const el=e.currentTarget
                   setPos({
                    left:el.offsetLeft,
                    opacity:1,
                    width:el.offsetWidth
                   })
                }}
                key={nav.id}
                href={nav.href}
                >
                    <h1 className={` text-white px-4 lg:px-6 py-2 mix-blend-difference relative z-40 text-[15px]`}>{nav.children}</h1>
                </Link>
            )}
            <motion.div
           transition={{duration:0.2,ease:"easeInOut"}}
            animate={{left:pos.left,opacity:pos.opacity,width:pos.width}}
            className="absolute z-10 h-full bg-gray-800 rounded-full"/>
        </div>
    )
}
