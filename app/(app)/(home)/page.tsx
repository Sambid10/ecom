import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper";
import PictureSection from "@/components/ui/HomeSection/PictureSection";
import NewProductSection from "@/components/ui/HomeSection/NewProductSection";
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
export default async function Home() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    limit:5
  }))
  return (
    <div className="min-h-screen  mb-12">
      <ContainerWrapper>
        <PictureSection />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NewProductSection />
        </HydrationBoundary>
      </ContainerWrapper>
    </div>
  );
}
