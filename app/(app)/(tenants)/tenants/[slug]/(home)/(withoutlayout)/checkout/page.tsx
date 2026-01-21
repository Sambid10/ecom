import CheckoutView from "@/components/ui/CheckoutView/CheckoutView";
import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper";
interface Props {
  params: Promise<{ slug: string }>
}
export default async function CheckOut({params}:Props) {
  const {slug}=await params
  return (
    <ContainerWrapper className="min-h-[100dvh-64px]">
        <CheckoutView slug={slug}/>
    </ContainerWrapper>
  )
}
