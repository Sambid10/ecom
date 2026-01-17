import Link from "next/link"
import ProductFilters from "../productList/ProductFilters"
import SortFilter from "../productList/SortFilter"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import ProductskeletonWrapper from "../skeltons/Productskeleton"
import ProductList from "../productList/ProductList"
interface Props {
  category?: string
  subcategory?: string
}
export default function ProductListView({ category, subcategory }: Props) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-10 pb-20  relative '>
      <div className="lg:col-span-2 flex flex-col gap-2 w-full pb-4 relative">
        
        <div className='absolute top-0 w-[50vw] flex items-center gap-2 h-8'>
          <Link
            className='text-blue-600 font-medium text-base capitalize  hover:underline'
            href={`/`}
          >Home</Link>
          <h1 className='text-blue-500'>&gt;</h1>
          <Link
            className='text-blue-600 font-medium text-base capitalize hover:underline'
            href={`${category}`}
          >{category}</Link>
          {subcategory &&
            <>
              <h1 className='text-blue-500'>&gt;</h1>
              <Link
                className='text-blue-600 font-medium text-base capitalize hover:underline'
                href={`${subcategory}`}
              >{subcategory}</Link>
            </>

          }
        </div>
        <ProductFilters />
      </div>
      <div className='lg:absolute lg:right-0 lg:-mt-0.5  mt-4 ml-auto '>
        <SortFilter />
      </div>
      <div className='lg:col-span-4 xl:col-span-8 overflow-y-auto min-h-dvh gap-y-6 pt-4 lg:pt-10 lg:ml-4'>

        <Suspense fallback={<ProductskeletonWrapper />}>
          <ErrorBoundary fallback={<p>Error fetching Products.Please try again.</p>}>
          {subcategory ? <ProductList category={subcategory} /> : <ProductList category={category} />}
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  )
}
