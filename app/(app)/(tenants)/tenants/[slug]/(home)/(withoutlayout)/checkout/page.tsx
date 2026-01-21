import CheckoutView from "@/components/ui/CheckoutView/CheckoutView";
import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper";
import { ChevronRight } from "lucide-react";
interface Props {
  params: Promise<{ slug: string }>
}
export default async function CheckOut({params}:Props) {
  const {slug}=await params
  return (
    <ContainerWrapper className="min-h-[100dvh-64px]">
      <h1 className='capitalize mb-4 mt-4 flex items-center font-normal text-2xl underline underline-offset-2'>
        <ChevronRight /> Order Summary
      </h1>
        <CheckoutView slug={slug}/>
    </ContainerWrapper>
  )
}
