import Navbar from '../navbar/navbar'
import ContainerWrapper from '../containerWrapper/ContainerWrapper'
import Footer from '../footer/footer'

export default function LibraryView() {
    return (
        <div className='relative'>
            <div className='sticky top-0 w-full'>
                  <Navbar />
            </div>
          

            <div className='   min-h-screen'>
                <div className='border-y border-black'>
                    <ContainerWrapper className='max-w-7xl flex flex-col gap-1  py-4'>
                        <h1 className='text-3xl font-normal'> Library</h1>
                        <p className='text-gray-800 text-sm'>Your purchases and reviews.</p>
                    </ContainerWrapper>
                </div>


            </div>
            <Footer isTenant={false} />
        </div>
    )
}
