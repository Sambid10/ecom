import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper";
import PictureSection from "@/components/ui/HomeSection/PictureSection";
export default function Home() {
  return (
   <div className="min-h-screen mt-4">
      <ContainerWrapper>
        <PictureSection/>
      </ContainerWrapper>
   </div>
  );
}
