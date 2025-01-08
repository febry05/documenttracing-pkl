"use client"

import Countdown from "@/Components/custom/Countdown"; // Ensure Countdown component accepts endDate and separateLines props
import { IconButton } from "@/Components/custom/IconButton";
import PriorityBadge from "@/Components/custom/PriorityBadge";
import StatusBadge from "@/Components/custom/StatusBadge";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, Download, Link, Link2 } from "lucide-react";
import React from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProjectMonitoring = {
    id: number
    name: string
    person_in_charge: string
    documentVersions: {
        id: number
        name: string
        person_in_charge: string
        priority: "High" | "Medium" | "Low"
        due_date: string
        release_date: string
        status: string
        document_link: string
    }[]
}[];

export const columns: ColumnDef<ProjectMonitoring>[] = [
    {
        accessorKey: "index",
        header: 'No',
        cell: ({ row }) => (
            <div>
                <div>
                    {
                        row.depth > 0
                        ? `${row.getParentRow()!.index + 1}.${row.index + 1}`
                        : row.index + 1
                    }
                </div>
            </div>
        ),
        size: 10,
        minSize: 10,
        maxSize: 10,
        enableResizing: true,
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
            const aNumber = rowA.depth > 0
                ? parseInt(`${rowA.getParentRow()!.index + 1}${rowA.index + 1}`)
                : rowA.index + 1;
            const bNumber = rowB.depth > 0
                ? parseInt(`${rowB.getParentRow()!.index + 1}${rowB.index + 1}`)
                : rowB.index + 1;
            return aNumber < bNumber ? -1 : aNumber > bNumber ? 1 : 0;
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 200,
        minSize: 200,
        maxSize: 200,
        enableResizing: false,
    },
    {
        accessorKey: "person_in_charge",
        header: "Person in Charge",
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            return (
                <>
                    {row.getValue<string>("priority") &&
                        <div className="w-full flex">
                            <div className="mx-auto">
                                <PriorityBadge priority={row.getValue<string>("priority")} />
                            </div>
                        </div>
                    }
                </>
            );
        },
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
        sortingFn: 'datetime',
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "days_left",
        header: "Time Remaining",
        filterFn: (row, columnId, filterValue) => {
            // If the filterValue is empty (i.e., "all" is selected), return true for all rows
            if (!filterValue) {
                return true;
            }

            const { compare, filterValue: value } = filterValue;

            // Ensure we are working with numbers for comparison
            const rowValue = new Date(row.getValue(columnId)).getTime();
            const now = new Date().getTime();
            const daysLeft = Math.max(0, Math.floor((rowValue - now) / (1000 * 60 * 60 * 24)));
            const filterNum = parseFloat(value);

            console.log(filterNum);

            if (isNaN(daysLeft) || isNaN(filterNum) || ((filterNum > 1) && (daysLeft === 0))) {
                return false;
            }

            if (compare === '<') return daysLeft < filterNum;
            if (compare === '>') return daysLeft > filterNum;

            return daysLeft === filterNum;
        },
        cell: ({ row, getValue }) => (
            <div className="w-full flex">
                {getValue() && (
                    <Countdown startDate={row.original.release_date} endDate={getValue() as string | Date} separateLines={true} endText="Time Limit Reached" />
                )}
            </div>
        ),
        sortingFn: (rowA, rowB) => {
            if (rowA.original.due_date === null || rowB.original.due_date === null) {
                return null;
            }
            const timeLeftA = new Date(rowA.original.due_date).getTime() - Date.now();
            const timeLeftB = new Date(rowB.original.due_date).getTime() - Date.now();
            return timeLeftA - timeLeftB;
        },
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue, row }) => (
            <div className="w-full flex">
                <div className="mx-auto">
                {row.depth != 0 && (
                    <StatusBadge status={getValue()}/>
                )}
                </div>
            </div>
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "document_link",
        header: "Latest Document",
        cell: ({ row, getValue }) => (
            <div>
                <div className="flex">
                    {row.depth === 0 ? (
                        <div className="ms-auto">
                            {row.getIsExpanded() ? <ChevronLeft size={16} /> : <ChevronDown size={16} />}
                        </div>
                    ) : ( getValue() == "N/A"
                        ? (
                            <span className="text-sm text-muted-foreground italic">
                                No document.
                            </span>
                        )
                        : (<a
                            href={getValue() as string}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IconButton
                                icon={Link2}
                                variant="outline"
                                text="View"
                                size="xs"
                                className="font-normal"
                            />
                        </a>
                    ))}{' '}
                </div>
            </div>
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
]
