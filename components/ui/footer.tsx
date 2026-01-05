import Link from "next/link"
export default function Footer() {
    return (
        <footer className='h-32 w-full bg-white border-t border-gray-800'>
            <div className='relative h-full max-w-360 mx-auto px-4 flex items-center justify-end'>
                  <Link href={"/"}>
                    <h1 className='font-dance font-semibold text-2xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-[#000000] to-gray-800'>
                        K-Shopify
                    </h1>
                </Link>
            </div>
        </footer>
    )
}
