import ContainerWrapper from "../containerWrapper/ContainerWrapper"
import Categories from "./Categories"
import { CustomCategory } from "./types"

interface Props{
    data:CustomCategory[]
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
