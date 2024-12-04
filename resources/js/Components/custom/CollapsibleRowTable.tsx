"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import TextLink from './TextLink';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
import { router } from '@inertiajs/react';

type Column = {
    accessorKey: string;
    header: string;
}

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    detailPage: string;
}

export default function CollapsibleRowTable({columns, data, detailPage}: DataTableProps<any, any>) {
    const table = useReactTable({
        data,
        columns,
        getSubRows: (row) => row.documentVersions,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => true,
        initialState: {
            expanded: true,
        },
    });

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
                            (row.depth > 0 || row.depth > 0) ? (
                                <TooltipProvider key={row.id}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                                className="cursor-pointer"
                                                onClick={() => router.visit(route(detailPage, { project: row.original.id, document: row.original.project_document_id, version: row.original.id }))}
                                            >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={row.depth === 0 ? "py-2" : "py-2"}>
                                                    {row.depth === 0 && row.getCanExpand() && cell.column.columnDef.header === "Name" ? (
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
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.depth === 0 ? "bg-sky-500 hover:bg-sky-500/90 dark:bg-sky-700 dark:hover:bg-sky-700/90 text-background" : ""}
                                    {...row.depth === 0 &&{
                                        onClick: row.getToggleExpandedHandler(),
                                        style: { cursor: 'pointer' },
                                    }}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className={row.depth === 0 ? "py-2" : "py-2"}>
                                        {row.depth === 0 && row.getCanExpand() && cell.column.columnDef.header === "Name" ? (
                                            <>
                                                <TextLink href={route('projects.show', row.original.id)} text={cell.getValue()?.toString()} className='w-fit'/>
                                            </>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            )
                        ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No data yet.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    );
};
