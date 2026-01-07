import ContainerWrapper from "../containerWrapper/ContainerWrapper"
import Categories from "./Categories"

interface Props{
    data:any
}
export default function SearchFilters({data}:Props) {
  return (
    <div>
        <ContainerWrapper>
            <Categories data={data}/>
        </ContainerWrapper>
    </div>
  )
}
