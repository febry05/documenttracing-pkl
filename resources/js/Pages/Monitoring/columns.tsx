"use client"

import Countdown from "@/Components/custom/Countdown"; // Ensure Countdown component accepts endDate and separateLines props
import PriorityBadge from "@/Components/custom/PriorityBadge";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronLeft } from "lucide-react";
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
        enableResizing: false,
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
        size: 25,
        minSize: 25,
        maxSize: 25,
        enableResizing: false,
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
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
                <div className="mx-auto">
                    {getValue() && (
                        <Countdown startDate={row.original.release_date} endDate={getValue() as string | Date} separateLines={true} endText="Time Limit Reached" />
                    )}
                    {/* 22 */}
                </div>
            </div>
        ),
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
            <div className="w-full flex">
                <div className="mx-auto">
                    {getValue() as React.ReactNode}
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
        header: "File",
        cell: ({ row, getValue }) => (
            <div>
                <div className="flex">
                    {row.depth === 0 ? (
                        <div className="ms-auto">
                            {row.getIsExpanded() ? <ChevronLeft size={16} /> : <ChevronDown size={16} />}
                        </div>
                    ) : (
                        ''
                    )}{' '}
                    {getValue<boolean>()}
                </div>
            </div>
        ),
        size: 100,
        minSize: 100,
        maxSize: 100,
        enableResizing: false,
    },
]
