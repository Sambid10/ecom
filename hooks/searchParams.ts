import { createLoader, parseAsArrayOf, parseAsString,parseAsStringLiteral } from "nuqs/server"
export const sortValues= ["newest" , "oldest" , "trending"] as const
export const params = {
    minPrice: parseAsString.withOptions({
        clearOnDefault: true
    }),
    maxPrice: parseAsString.withOptions({
        clearOnDefault: true
    }),
    tags:parseAsArrayOf(parseAsString).withOptions({
        clearOnDefault:true
    }),
      sort:parseAsStringLiteral(sortValues).withOptions({
        clearOnDefault:true,
    }).withDefault("newest")
}

export const loadProductFilter=createLoader(params)