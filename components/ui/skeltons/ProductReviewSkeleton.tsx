import ContainerWrapper from "../containerWrapper/ContainerWrapper";
import { Skeleton } from "../skeleton";

export default function ProductReviewSkeleton() {
    return (
        <>
        <div className="h-23 w-full  bg-white border-y border-gray-800">
            <ContainerWrapper className="max-w-7xl flex justify-between items-center h-full">
                <div className="h-10 w-[80%]">
                    <Skeleton className="h-full" />
                </div>
                <div className="h-10 w-[10%]">
                    <Skeleton className="h-full"/>
                </div>
            </ContainerWrapper>
         
        </div>
        <div className="min-h-screen w-full pt-4 bg-white">
             <ContainerWrapper className="max-w-7xl min-h-screen">
               <Skeleton className="h-[80vh] w-full"/>
            </ContainerWrapper>
            
        </div>
        </>
        

    )
}
