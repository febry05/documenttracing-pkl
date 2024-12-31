"use client"

import * as React from "react"
import {
  Row,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"

import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "./button"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, MoveDown, MoveUp } from "lucide-react"

export interface FilterOption {
  value: string;
  label: string;
}

export interface ColumnFilterConfig {
  columnId: string;
  label?: string;
  compare?: '<' | '>';
  options: FilterOption[];
}

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filters?: ColumnFilterConfig[];
  detailPage?: string;
  detailPageFn?: (data?: TData) => void;
  detailDialog?: string;
  renderDialogContent?: (data: TData, closeDialog: () => void) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters = [],
  detailPage,
  detailPageFn,
  detailDialog,
  renderDialogContent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState<TData | null>(null);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    //default page size, loaded from localStorage or fallback to 10
    pageSize: Number(localStorage.getItem('tablePageSize')) || 10,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
        pagination: {
            pageIndex: 0, //custom initial page index
            pageSize: Number(localStorage.getItem('tablePageSize')) || 10, //custom default page size
        },
    },
  })

  const handleRowClick = (row: Row<TData>) => {
    const rowData = row.original
    if (detailDialog && renderDialogContent) {
      setSelectedRowData(rowData)
      setIsDialogOpen(true)
    } else if (detailPage) {
        router.visit(route(detailPage, { id: rowData.id }));
    } else if (detailPageFn) {
        detailPageFn(rowData);
    }
  }

  const closeDialog = () => {
    console.log('close dialog');
    setIsDialogOpen(false);
    setSelectedRowData(null);
  };

  return (
    <div>
      <div className="flex flex-row-reverse gap-4 pb-4">
        {filters.map(filter => {
          const label = filter.label || filter.columnId;
          return (
            <Select key={filter.columnId} onValueChange={(value) => {
              const column = table.getColumn(filter.columnId);
              if (column) {
                if (value === 'all') {
                  column.setFilterValue('');
                } else if (filter.compare) {
                  column.setFilterValue({ compare: filter.compare, filterValue: value });
                } else {
                  column.setFilterValue(value);
                }
              }
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Filter ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
        <Input
          value={globalFilter}
          onChange={event => {
            const value = String(event.target.value);
            setGlobalFilter(value);
            table.setGlobalFilter(value);
          }}
          placeholder="Search in table..."
          className="max-w-sm me-auto"
        />
      </div>
      <div className="rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center w-full text-black font-semibold">
                          <div
                              className={
                              header.column.getCanSort()
                                  ? "flex items-center gap-1 cursor-pointer select-none w-full"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                          >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                  <div className="w-4 text-neutral-300 ms-auto">
                                      {header.column.getIsSorted() === "asc" ? (
                                      <div className="flex flex-col">
                                          <ChevronUp size={14} className="text-black"/>
                                      </div>
                                  ) : header.column.getIsSorted() === "desc" ? (
                                      <div className="flex flex-col">
                                          <ChevronDown size={14} className="text-black"/>
                                      </div>
                                      ) : (
                                      <ChevronsUpDown size={14}/>
                                      )}
                                  </div>
                              )}
                          </div>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                (detailPage || detailPageFn || detailDialog) ? (
                  <TooltipProvider key={row.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className="cursor-pointer"
                          onClick={() => handleRowClick(row)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              style={{
                                width: cell.column.getSize(),
                                minWidth: cell.column.columnDef.minSize,
                                maxWidth: cell.column.columnDef.maxSize
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to view details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center italic text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{detailDialog}</DialogTitle>
                    </DialogHeader>
                    {selectedRowData && renderDialogContent && renderDialogContent(selectedRowData, closeDialog)}
                </DialogContent>
        </Dialog>

        {/* Pagination */}
        <div className="flex gap-2 mt-4 text-sm">

            <div className="flex gap-2 items-center">
                <span>Showing {' '}</span>
                <Select onValueChange={
                        (value) => {
                            table.setPageSize(Number(value));
                            localStorage.setItem('tablePageSize', value);
                        }
                    }>
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder={table.getState().pagination.pageSize.toString()}/>
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <SelectItem key={pageSize} value={pageSize.toString()}>{pageSize}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span>{' '} entries</span>
            </div>

            <div className="flex ms-auto gap-2 items-center">
                <Button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    size="xs"
                    >
                    <ChevronFirst size={16}/>
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    size="xs"
                    >
                    <ChevronLeft size={16}/>
                </Button>

                <div className="mx-2">
                    Page {' '}
                    <Input type="number" placeholder="Page Index" value={table.getState().pagination.pageIndex + 1} className="w-14 inline-block h-8" onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)} />
                    {' '} of {' '}
                    <span className="">{table.getPageCount()}</span>
                </div>

                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    size="xs"
                    >
                    <ChevronRight size={16}/>
                </Button>
                <Button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    size="xs"
                    >
                    <ChevronLast size={16}/>
                </Button>
            </div>
        </div>
    </div>
  )
}
