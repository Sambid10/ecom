import Image from 'next/image' // if using Next.js

export default function NoCart() {
    return (
        <div className="flex flex-col items-center justify-center mt-8 text-center gap-4 overflow-x-clip">
            {/* video */}
            <div className="w-48 h-48 relative">
                <video
                    src="/videos/nocart.mp4"
                    preload="auto"
                    playsInline
                    loop
                    muted // make sure the gif is in the public folder
                    autoPlay
                    className="object-cover rounded-full border border-gray-200"
                />
            </div>

            {/* Message */}
            <h1 className="text-2xl font-bold text-gray-700">No Products Found.</h1>
            <p className="text-gray-500 text-sm -mt-2">
                Sorry, we couldn’t find any products. Please add your products in Cart.
            </p>
        </div>
    )
}
