import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
interface Props{
    params:Promise<{
        category:string
    }>
}
export default async function CategoryPage({params}:Props) {
    const {category}=await params
    return (
        <ContainerWrapper>
            <div className='min-h-screen mt-2'>{category}</div>
        </ContainerWrapper>

    )
}
