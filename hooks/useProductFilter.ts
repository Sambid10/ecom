import { parseAsStringLiteral, useQueryStates } from "nuqs"
import {parseAsArrayOf, parseAsString } from "nuqs"
const sort= ["Newest" , "Oldest" , "Trending"]
export const params = {
    minPrice: parseAsString.withOptions({
        clearOnDefault: true
    }).withDefault(""),
    maxPrice: parseAsString.withOptions({
        clearOnDefault: true
    }).withDefault(""),
    tags:parseAsArrayOf(parseAsString).withOptions({
        clearOnDefault:true
    }).withDefault([]),
    sort:parseAsStringLiteral(sort).withOptions({
        clearOnDefault:true,
    }).withDefault("")
}
export const useProductFilter = () => {
    return useQueryStates(params)
}
