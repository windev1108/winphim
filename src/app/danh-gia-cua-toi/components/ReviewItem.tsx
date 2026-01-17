import { IComment } from '@/api/movie'
import { TableCell } from '@/components/ui/table'
import { Cell, flexRender } from '@tanstack/react-table'
import React from 'react'

interface ReviewItemProps {
    cell: Cell<IComment, unknown>
}

const ReviewItem = ({ cell }: ReviewItemProps) => {
    return (
        <TableCell key={cell.id}>
            {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
            )}
        </TableCell>
    )
}

export default ReviewItem