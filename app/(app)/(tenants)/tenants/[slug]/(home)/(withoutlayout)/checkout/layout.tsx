import CheckoutNavbar from "@/components/ui/CheckoutNavbar/CheckoutNavbar";
import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper";
interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}
export default async function CheckoutLayout({ children, params }: Props) {
  const { slug } = await params
  return (
    <main className="relative">
      <div className="sticky top-0 z-30">
 <CheckoutNavbar slug={slug} />
      </div>
     
      <ContainerWrapper className="max-w-7xl">
        {children}
      </ContainerWrapper>
    </main>
  )
}
