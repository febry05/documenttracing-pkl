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

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { Inertia } from "@inertiajs/inertia";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"

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
  detailDialog?: string;
  renderDialogContent?: (data: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters = [],
  detailPage,
  detailDialog,
  renderDialogContent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = React.useState<TData | null>(null)

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
  })

  const handleRowClick = (row: Row<TData>) => {
    const rowData = row.original
    if (detailDialog && renderDialogContent) {
      setSelectedRowData(rowData)
      setIsDialogOpen(true)
    } else if (detailPage) {
      Inertia.visit(route(detailPage, { id: rowData.id }))
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedRowData(null)
  }

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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TooltipProvider key={row.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="cursor-pointer"
                        onClick={() => handleRowClick(row)}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
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
          {selectedRowData && renderDialogContent && renderDialogContent(selectedRowData)}
        </DialogContent>
      </Dialog>
    </div>
  )
}
