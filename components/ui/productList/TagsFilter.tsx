"use client"
import { useTRPC } from "@/trpc/client"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Label } from "../label"
import Loading from "../Loading/Loading"
import { Checkbox } from "../checkbox"
interface Props {
    tags?: string[] | null
    onTagsChange: (val: string[]) => void
}
export default function TagsFilter({ onTagsChange, tags }: Props) {
    const trpc = useTRPC()
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions({
        limit: 10
    }, {
        getNextPageParam: (lpage) => {
            return lpage.docs.length > 0 ? lpage.nextPage : undefined
        }
    }))
const onClick = (tag: string) => {
  if (tags?.includes(tag)) {
    onTagsChange(tags.filter((t) => t !== tag) || []);
  } else {
    onTagsChange([...(tags || []), tag]);
  }
};
    return (
        <div className="flex flex-col gap-y-3 mt-4">
            {isLoading ?
                <Loading /> :
                data?.pages.map((page) =>
                    page.docs.map((tag) =>
                        <div key={tag.id} className="flex items-center gap-2">
                            <Checkbox 
                            onClick={()=>onClick(tag.name)}
                            onCheckedChange={()=>onClick(tag.name)}
                            checked={tags?.includes(tag.name)}
                            className="border border-black" id={tag.id} defaultChecked={false} />
                            <Label htmlFor={tag.id}>{tag.name}</Label>
                        </div>
                    )
                )
            }
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}>
                    Load more..
                </button>
            )}
        </div>
    )
}
