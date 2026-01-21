"use client"
import { useCart } from "@/modules/zustand/checkout/hooks/use-cart"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "../button"
import { CheckSquareIcon, ChevronRight } from "lucide-react"
import NoProduct from "../skeltons/NoProduct"
import NoCart from "../skeltons/NoCart"
function ProductSkeleton() {
  return (
    <div className="w-full flex gap-2 border-b border-gray-800 animate-pulse">
      <div className="bg-gray-300 w-[35%] h-[22vh]" />
      <div className="p-2 flex justify-between w-full">
        <div className="flex flex-col gap-3 w-[70%]">
          <div className="bg-gray-300 h-5 w-3/4 rounded" />
          <div className="bg-gray-300 h-4 w-1/2 rounded" />
        </div>
        <div className="flex justify-end w-[30%]">
          <div className="bg-gray-300 h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  )
}

function SummarySkeleton() {
  return (
    <div className="border px-4 py-2 border-gray-800 rounded-md bg-white flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between">
        <div className="bg-gray-300 h-5 w-16 rounded" />
        <div className="bg-gray-300 h-5 w-20 rounded" />
      </div>
      <div className="bg-gray-300 h-10 w-full rounded" />
    </div>
  )
}

export default function CheckoutView({ slug }: { slug: string }) {
  const trpc = useTRPC()
  const { productIds, clearAllCarts ,removeProduct} = useCart(slug)

  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  )

  useEffect(() => {
    if (!error) return
    if (error.data?.code === "NOT_FOUND") {
      clearAllCarts()
      toast.warning("Invalid products found, cart cleared!!")
    }
  }, [error])

  const price = data?.docs.map((doc) => doc.price) ?? []
  const total = price.reduce((sum, p) => sum + p, 0)
 if(data?.docs.length ===0){
    return  <NoCart/>
 }
  return (
    <div className="mt-4">
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="border border-b-0 border-gray-800 rounded-md bg-white overflow-hidden flex flex-col">
          {isLoading && (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          )}

          {!isLoading && data?.docs.map((prod) =>
            <div key={prod.id} className="w-full flex gap-2 border-b border-gray-800">
              <div className="relative w-[35%] h-[22vh]">
                <Image
                  src={prod.image.url!}
                  fill
                  className="object-cover"
                  alt="productimg"
                />
              </div>

              <div className="p-2 flex justify-between w-full relative">
                <div className="flex flex-col gap-2 w-[70%]">
                  <h1 className="font-medium text-lg line-clamp-2">{prod.name}</h1>
                  <div className="flex items-center gap-1">
                    <Image
                      height={30}
                      width={30}
                      alt="tenant's profile pic"
                      className="rounded-full border border-gray-400"
                      src={prod.tenant.image?.url!}
                    />
                    <h1 className="text-[14px]">{prod.tenant.name}</h1>
                  </div>
                </div>

                <div className="flex justify-end w-[30%]">
                  <h1 className="text-base font-medium">
                    Price: {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(Number(prod.price))}
                  </h1>
                </div>
                <button 
                onClick={()=>removeProduct(prod.id)}
                className="absolute cursor-pointer bottom-2 right-2 text-red-600 underline text-[14px] underline-offset-2">
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <SummarySkeleton />
        ) : (
          <div className="border px-4 py-2 border-gray-800 rounded-md bg-white flex flex-col h-fit gap-4">
            <div className="flex justify-between">
              <h1>Total:</h1>
              <h1>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(total)}
              </h1>
            </div>
            <div className="w-full flex justify-center">
              <Button className="w-[80%] cursor-pointer h-11 text-base">
                <CheckSquareIcon /> Checkout
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
