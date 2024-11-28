"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';

type Column = {
    accessorKey: string;
    header: string;
}

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function CollapsibleRowTable({columns, data}: DataTableProps<any, any>) {
    const table = useReactTable({
        data,
        columns,
        getSubRows: (row) => row.documentVersions,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
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
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={row.depth === 0 ? '' : ''}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
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
    );
};
