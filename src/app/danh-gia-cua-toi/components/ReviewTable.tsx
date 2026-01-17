"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { AlignLeftIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpDown, ChevronDown, EditIcon, Loader2Icon, MoreHorizontal, MoveLeftIcon, SearchIcon, TrashIcon, ViewIcon, WatchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteCommentMovieRequest, deleteMultipleCommentMovieRequest, IComment, useMyCommentsQuery } from "@/api/movie"
import Image from "next/image"
import { getImageUrl } from "@/lib/image"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import { useMutation } from "@tanstack/react-query"
import toast, { LoaderIcon } from "react-hot-toast"
import { getMutateError } from "@/lib/utils"
import ReviewItem from "./ReviewItem"


const MAPPING_DISPLAY: Record<string, string> = {
  movieThumbnail: 'Thumbnail',
  movieName: 'Tên phim',
  content: 'Nội dung',
  rating: 'Điểm đánh giá',
}
function ReviewTable() {
  const { data: comments = [], isLoading, refetch } = useMyCommentsQuery()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: deleteCommentMovieRequest
  })
  const { mutateAsync: deleteMultipleComments, isPending: loadingMultiple } = useMutation({
    mutationFn: deleteMultipleCommentMovieRequest
  })
  const router = useRouter()

  const handleDeleteMultiple = async () => {
    try {
      const idx = Object.keys(rowSelection)
      const ids = idx.map((x) => comments[Number(x)].id)
      await deleteMultipleComments({
        commentIds: ids
      })
      toast.success("Xóa đánh giá thành công!")
      refetch()
    } catch (error) {
      getMutateError(error)
    }
  }

  const handelDelete = async (id: number) => {
    try {
      await deleteComment({ id })
      toast.success("Xóa đánh giá thành công!")
      refetch()
    } catch (error) {
      getMutateError(error)
    }
  }


  const columns: ColumnDef<IComment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "movieThumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image alt='thumb' src={getImageUrl(row.getValue("movieThumbnail"))} width={100} height={50} />
      ),
    },
    {
      accessorKey: "movieName",
      header: "Tên phim",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("movieName")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Điểm đánh giá
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number
        return (
          <div className="flex items-center gap-1">
            <span className="text-primary text-xl">★</span>
            <span className="font-medium">{rating}/10</span>
          </div>
        )
      },
    },
    {
      accessorKey: "content",
      header: "Nội dung",
      cell: ({ row }) => {
        const content = row.getValue("content") as string | undefined
        return (
          <div className="max-w-md truncate text-sm">
            {content || <span className="text-muted-foreground">N/A</span>}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Hành động",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className='cursor-pointer py-2' onClick={() => router.push(`${ROUTES.MOVIE}/${row.original.movieSlug}`)}>
                <SearchIcon />
                Đi đến phim
              </DropdownMenuItem>
              {/* <DropdownMenuItem className='cursor-pointer py-2'>
                <EditIcon />
                Sửa đánh giá
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => handelDelete(row.original.id)} className='cursor-pointer py-2'>
                <TrashIcon />
                Xóa đánh giá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: comments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Lọc nội dung,tên phim..."
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          {Object.keys(rowSelection).length > 0 &&
            <Button
              loading={loadingMultiple}
              onClick={handleDeleteMultiple}
            >
              <TrashIcon />
              Xóa tất cả
            </Button>
          }
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Hiển thị <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {MAPPING_DISPLAY[column.id as keyof IComment]}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border border-secondary-700">
        <Table>
          {!isLoading &&
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
          }
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-120 w-full flex items-center justify-center"
                >
                  <LoaderIcon />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <ReviewItem key={cell.id} cell={cell} />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không thấy đánh giá nào!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewTable