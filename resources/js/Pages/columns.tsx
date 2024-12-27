"use client"

import Countdown from "@/Components/custom/Countdown"
import PriorityBadge from "@/Components/custom/PriorityBadge"
import { Badge } from "@/Components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: number
  document: string
  project: string
  pic: string
  due_date: string
  days_left: string
  priority: "High"  | "Medium" | "Low"
}

export const columns: ColumnDef<Project>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
    },
    {
        accessorKey: "document",
        header: "Document",
    },
    {
        accessorKey: "project",
        header: "Project",
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
        cell: ({ getValue }) => (
            <div className="w-full flex">
                <div className="mx-auto">
                    {getValue() == 'N/A' ? <span className="text-muted-foreground italic">No Deadline</span> : getValue() as React.ReactNode}
                </div>
            </div>
        ),
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
                        <Countdown startDate={row.original.release_date} endDate={getValue() as string | Date} separateLines={true} endText="Time limit reached" />
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
    }
]
