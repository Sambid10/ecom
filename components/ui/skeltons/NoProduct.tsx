import Image from 'next/image' // if using Next.js

export default function NoProduct() {
  return (
    <div className="flex flex-col items-center justify-center mt-2 text-center gap-4 overflow-x-clip">
      {/* Image */}
      <div className="w-48 h-48 relative">
        <Image
          src="/pictures/chuu-cry.gif" // make sure the gif is in the public folder
          alt="No products"
          fill
          className="object-cover rounded-full border border-gray-200"
        />
      </div>

      {/* Message */}
      <h1 className="text-2xl font-bold text-gray-700">No Products Found.</h1>
      <p className="text-gray-500 text-sm -mt-2">
        Sorry, we couldn’t find any products. Please check back later or try a different search.
      </p>
    </div>
  )
}
