import { RefObject, useEffect } from "react";

export function useOutsideClick({ref,handler}:{ref:RefObject<HTMLDivElement | null>,handler:()=>void}){
    useEffect(()=>{
        function handleClick(event: MouseEvent | TouchEvent){
            if(!ref.current) return

            if(!ref.current.contains(event.target as Node)){
                handler()
            }
        }
        document.addEventListener("mousedown",handleClick)
        document.addEventListener("touchstart",handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
    }
    },[ref,handler])
}