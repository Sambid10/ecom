import { parseAsStringLiteral, useQueryStates } from "nuqs"
import {parseAsArrayOf, parseAsString } from "nuqs"
export const sortValues= ["newest" , "oldest" , "trending"] as const
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
    sort:parseAsStringLiteral(sortValues).withOptions({
        clearOnDefault:true,
    }).withDefault("newest")
}
export const useProductFilter = () => {
    return useQueryStates(params)
}
