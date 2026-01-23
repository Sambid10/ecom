"use client"

import { Fragment, Suspense, useState, useMemo } from "react"
import Image from "next/image"
import { ErrorBoundary } from "react-error-boundary"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import Link from "next/link"
import ProductPageSkeleton from "../skeltons/ProductPageSkeleton"
import dynamic from "next/dynamic"
import { Check, Star } from "lucide-react"
import { Progress } from "../progress"
import Loading from "../Loading/Loading"
import { Button } from "../button"

// CartButton dynamically imported with no SSR
const CartButton = dynamic(() => import("../CartButton/CartButton"), {
  ssr: false,
  loading: () => <Loading divclassName="h-11" />,
})

export default function ProductPage({ productId, tenantSlug }: { productId: string; tenantSlug: string }) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ErrorBoundary fallback={<h1>Error fetching data</h1>}>
        <ProductPageSuspense productId={productId} tenantSlug={tenantSlug} />
      </ErrorBoundary>
    </Suspense>
  )
}

function ProductPageSuspense({ productId, tenantSlug }: { productId: string; tenantSlug: string }) {
  const trpc = useTRPC()

  // Fetch product and tenant data using suspense queries
  const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }))
  const { data: tenantdata } = useSuspenseQuery(trpc.tenant.getOne.queryOptions({ slug: tenantSlug }))

  // Session query
  const { data: session } = useQuery(trpc.auth.session.queryOptions())

  const additionalImages = data.additionalimage?.map((img) => img.url) ?? []
  const mainImageDefault = data.image.url ?? "/pictures/place.png"
  const [mainImage, setMainImage] = useState<string>(mainImageDefault)

  // Detect touch screens
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(pointer: coarse)").matches
  }, [])

  const handleSelect = (url: string) => setMainImage(url)

  return (
    <div className="min-h-screen flex flex-col pb-12 pt-2">
      {/* MAIN IMAGE */}
      <div className="w-full lg:max-w-300 h-[50vh] mx-auto relative bg-white rounded-t-md border border-b-0 border-gray-800">
        <Image fill alt="product" className="object-contain" src={mainImage} />
      </div>

      {/* THUMBNAILS */}
      {additionalImages.length > 0 && (
        <div className="w-full lg:max-w-300 flex flex-row gap-4 mx-auto relative bg-white py-4 px-4 border border-b-0 border-gray-800">
          {/* Default image */}
          <div
            onMouseEnter={!isTouch ? () => handleSelect(mainImageDefault) : undefined}
            onClick={isTouch ? () => handleSelect(mainImageDefault) : undefined}
            className={`h-30 w-30 relative rounded-sm cursor-pointer border ${
              mainImage === mainImageDefault ? "border-black border-2 brightness-100" : "border-white brightness-75"
            }`}
          >
            <Image fill alt="thumb" className="object-cover rounded-sm" src={mainImageDefault} />
          </div>

          {/* Additional images */}
          {data.additionalimage.map((pic) => (
            <div
              key={pic.id}
              onMouseEnter={!isTouch ? () => handleSelect(pic.url!) : undefined}
              onClick={isTouch ? () => handleSelect(pic.url!) : undefined}
              className={`h-30 w-30 relative rounded-sm cursor-pointer border ${
                mainImage === pic.url ? "border-black border-2 brightness-100" : "border-white brightness-75"
              }`}
            >
              <Image fill alt="thumb" className="object-cover rounded-sm" src={pic.url!} />
            </div>
          ))}
        </div>
      )}

      {/* PRODUCT DETAILS */}
      <div className="w-full lg:max-w-300 mx-auto bg-white rounded-b-md border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-6">
          {/* LEFT SECTION */}
          <div className="md:col-span-4 border md:border-r-gray-800 border-b-gray-800 md:border-b-transparent border-l-transparent border-t-transparent">
            <div className="px-4">
              <div className="-mx-4.25 border-b border-gray-800 pb-4 pt-4">
                <h1 className="font-medium text-lg px-4">&middot; {data.product.name}</h1>
              </div>

              <div className="-mx-4 grid grid-cols-12 border-b border-gray-800">
                <div className="col-span-2 border-r border-gray-800">
                  <h1 className="px-4 py-4 ml-2 text-base">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      Number(data.product.price)
                    )}
                  </h1>
                </div>

                <div className="col-span-4 flex items-center gap-3 ml-2 border-r border-gray-800">
                  <img
                    className="h-9 w-9 rounded-full border border-gray-300 object-cover"
                    alt="tenant"
                    src={tenantdata.image.url ?? "/pictures/avatar.png"}
                  />
                  <Link href={`/tenants/${tenantdata.tenant.name}`}>
                    <h1 className="text-base font-medium capitalize text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-700">
                      {tenantdata.tenant.name}
                    </h1>
                  </Link>
                </div>

                <div className="col-span-6 flex items-center ml-2">Ratings</div>
              </div>

              <div className="py-4 px-2">
                <h1 className="font-medium mb-1">Product Description:</h1>
                <p className="text-gray-800 text-sm">{data.product.description}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:col-span-2">
            <div className="border-b border-gray-800">
              <div className="py-4 px-4 flex flex-col gap-2">
                {/* PURCHASED / CART BUTTON */}
                {data.ispurchasedProduct ? (
                  <Button className="cursor-pointer xs:w-[60%] w-[70%] mx-auto md:w-full h-11 rounded-full text-[15px] bg-green-600 hover:bg-green-500">
                    <Check />
                    Order Placed.
                  </Button>
                ) : session?.user?.id ? (
                  <CartButton userId={session.user.id} tenantSlug={tenantSlug} productId={productId} />
                ) : (
                  <Link href="/sign-in">
                    <Button className="xs:w-[60%] w-[70%] mx-auto md:w-full h-11 rounded-full text-[15px]">
                      Add to Cart
                    </Button>
                  </Link>
                )}

                <h1 className="text-center text-sm text-gray-800">
                  {data.product.refundPolicy} money back guarantee.
                </h1>
              </div>
            </div>

            {/* RATINGS SECTION */}
            <div className="flex flex-col gap-2 py-4 px-4">
              <div className="flex justify-between">
                <h1>Ratings</h1>
                <div className="flex items-center gap-2">
                  <Star className="fill-yellow-500 h-4 w-4" />
                  <h1 className="text-sm">(5) /5 ratings</h1>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <Fragment key={stars}>
                    <div className="text-sm text-gray-800 flex gap-1">
                      <span>{stars}</span>
                      <span>{stars === 1 ? "star" : "stars"}</span>
                    </div>
                    <Progress value={29} className="h-6.25 bg-gray-200/50 border border-black" />
                    <span className="text-sm text-gray-800">0%</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
