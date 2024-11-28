"use client"

import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
        status: string
        document_link: string
    }[]
}[];

// Next:
// 1. Parent row coloring
// 2. Expand animation

export const columns: ColumnDef<ProjectMonitoring>[] = [
    {
        header: 'No',
        cell: ({ row }) => (
            <div className="text-right">
                <div>
                    {row.index + 1}{row.depth > 0 ? '.' + row.index + 1 : ''}
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
            const priorityValue = row.getValue<string>("priority");
            if (priorityValue != undefined) {
                let variant;
                if (priorityValue === 'High') {
                    variant = 'destructive';
                } else if (priorityValue === 'Medium') {
                    variant = '';
                } else {
                    variant = 'secondary';
                }
                return (
                    <div className="w-full flex">
                        <div className="mx-auto">
                            <Badge variant={variant as "destructive" | "secondary" | "default" | "outline" | undefined} className={priorityValue === 'Medium' ? 'bg-yellow-300 hover:bg-yellow-400 text-foreground dark:text-background' : ''}>
                                {priorityValue}
                            </Badge>
                        </div>
                    </div>
                );
            }
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
        header: "Days Left",
        filterFn: (row, columnId, filterValue) => {
            // If the filterValue is empty (i.e., "all" is selected), return true for all rows
            if (!filterValue) {
                return true;
            }

            const { compare, filterValue: value } = filterValue;

            // Ensure we are working with numbers for comparison
            const rowValue = parseFloat(row.getValue(columnId));
            const filterNum = parseFloat(value);

            // If row value or filter value is not a valid number, skip this row
            if (isNaN(rowValue) || isNaN(filterNum)) {
                return false;
            }

            // Handle comparison
            if (compare === '<') return rowValue < filterNum;
            if (compare === '>') return rowValue > filterNum;

            // Default equality comparison if no compare operator is found
            return rowValue === filterNum;
        },
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
                    {row.getCanExpand() ? (
                        <Button
                            {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: { cursor: 'pointer' },
                            }}
                            className="ms-auto px-2.5"
                            variant="outline"
                            size="sm"
                        >
                            {row.getIsExpanded() ? <ChevronLeft size={16} /> : <ChevronDown size={16} />}
                        </Button>
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