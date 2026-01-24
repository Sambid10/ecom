import { caller, getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Navbar from "@/components/ui/navbar/navbar"
import Footer from "@/components/ui/footer/footer"
import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper"
import { redirect } from "next/navigation"
import LibraryViewSuspense from "@/components/ui/LibraryView/LibraryView"
export default async function page() {
  const {user}=await caller.auth.session()
  if(!user?.id){
    return redirect("/sign-in")
  }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery (trpc.orders.getMany.queryOptions({
    limit: 8,
    page:1
}))

  return (
    <>
      <div className="sticky top-0 w-full z-30">
        <Navbar />
      </div>
       <div className="border-y border-black bg-white">
          <ContainerWrapper className="max-w-7xl py-4 relative">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-normal">Library</h1>
              <p className="text-gray-800 text-sm">Your purchases and reviews.</p>
            </div>
          </ContainerWrapper>

        </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContainerWrapper className="max-w-7xl mx-auto py-6 pb-18 relative">
              <LibraryViewSuspense/>
        </ContainerWrapper>
      </HydrationBoundary>

      <Footer isTenant={false} />
    </>

  )
}
