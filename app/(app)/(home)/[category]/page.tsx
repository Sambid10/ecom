import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
interface Props {
    params: Promise<{
        category: string
    }>
}
import Link from 'next/link'
export default async function CategoryPage({ params }: Props) {
    const { category } = await params
    return (
        <ContainerWrapper>
            <div className='min-h-screen ml-4'>
                <div className='flex items-center gap-2'>
                    <Link
                        className='text-blue-600 font-medium text-base capitalize  hover:underline'
                        href={`/`}
                    >Home</Link>
                    <h1 className='text-blue-500
                00'>&gt;</h1>
                    <Link
                        className='text-blue-600 font-medium text-base capitalize hover:underline'
                        href={`${category}`}
                    >{category}</Link>
                </div>

            </div>
        </ContainerWrapper>

    )
}
