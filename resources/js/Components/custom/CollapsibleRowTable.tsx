"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import TextLink from './TextLink';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
import { router } from '@inertiajs/react';
import React from 'react';
import { ColumnFilterConfig } from '../ui/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

type Column = {
    accessorKey: string;
    header: string;
}

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters?: ColumnFilterConfig[];
    detailPage: string;
}

export default function CollapsibleRowTable({columns, data, filters = [], detailPage}: DataTableProps<any, any>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState<string>("");

    const table = useReactTable({
        data,
        columns,
        getSubRows: (row) => row.documentVersions,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: (row) => row.documentVersions && row.documentVersions.length > 0,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        filterFromLeafRows: true,
        initialState: {
            expanded: data.reduce((acc, row, index) => {
                if (row.documentVersions && row.documentVersions.length > 0) {
                    acc[index] = true;
                }
                return acc;
            }, {}),
        },
        state: {
            columnFilters,
            globalFilter,
        }
    });

    return (
        <div>
            {/* Filters [START] */}
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
                        }}}
                    >
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
            {/* Filters [END] */}

            {/* Table [START] */}
            <div className="rounded-md border">
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                (row.depth > 0) ? (
                                    <TooltipProvider key={row.id}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    className="cursor-pointer"
                                                    onClick={() => router.visit(route(detailPage, { project: row.original.project_id, document: row.original.project_document_id, version: row.original.id }))}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={row.depth === 0 ? "py-2" : "py-2"}>
                                                            {row.depth === 0 && cell.column.columnDef.header === "Name" ? (
                                                                <>
                                                                    <TextLink href={route('projects.show', row.original.id)} text={cell.getValue()?.toString()} className='w-fit'/>
                                                                </>
                                                            ) : (
                                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                                            )}
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
                                    <React.Fragment key={row.id}>
                                        <TooltipProvider key={row.id}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TableRow
                                                        key={row.id}
                                                        data-state={row.getIsSelected() && "selected"}
                                                        className={row.depth === 0 ? "bg-sky-500 hover:bg-sky-500/90 dark:bg-sky-700 dark:hover:bg-sky-700/90 text-background" : ""}
                                                        onClick={() => row.toggleExpanded()}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={row.depth === 0 ? "py-2" : "py-2"}>
                                                                {row.depth === 0 && cell.column.columnDef.header === "Name" ? (
                                                                    <>
                                                                        <TextLink href={route('projects.show', row.original.id)} text={cell.getValue()?.toString()} className='w-fit'/>
                                                                    </>
                                                                ) : (
                                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                <p>Click to expand</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        {row.getIsExpanded() && (!row.original.documentVersions || row.original.documentVersions.length === 0) && (
                                            <TableRow key={`${row.id}-no-versions`}>
                                                <TableCell colSpan={table.getAllColumns().length} className="text-center py-6 italic text-muted-foreground">
                                                    No document versions available.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                )
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="text-center py-2">
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
