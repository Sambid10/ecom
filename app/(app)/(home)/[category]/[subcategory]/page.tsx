import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
interface Props{
    params:Promise<{
        category:string;
        subcategory:string
    }>
}
export default async function CategoryPage({params}:Props) {
    const {category,subcategory}=await params
    return (
        <ContainerWrapper>
            <div className='min-h-screen mt-2'>{category}/{subcategory}</div>
        </ContainerWrapper>

    )
}
