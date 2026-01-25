import { ReviewGetOne } from '@/modules/reviews/types'
import React from 'react'
interface Props {
    open: boolean,
    setOpen: (open: boolean) => void
    initialData: ReviewGetOne,
    productId: string
}
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Forms from './Form'
export default function FormDialog({ initialData, open, productId, setOpen }: Props) {
    const closeDialog=()=>{
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Review?</DialogTitle>
                    <DialogDescription className='text-xs -mt-1'>
                        Updating your review will overwrite your previous feedback for this product.
                    </DialogDescription>
                </DialogHeader>
                <Forms closeDialog={closeDialog} initialData={initialData} productId={productId}/>
            </DialogContent>
        </Dialog>
    )
}
