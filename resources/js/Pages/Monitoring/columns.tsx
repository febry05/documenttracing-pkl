"use client"

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
        accessorKey: "pic",
        header: "PIC",
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
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
                    {getValue()}
                </div>
            </div>
        ),
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const priorityValue = row.getValue("priority");
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
                        <Badge variant={variant} className={priorityValue === 'Medium' && 'bg-yellow-300 hover:bg-yellow-400 text-foreground dark:text-background'}>
                            {priorityValue}
                        </Badge>
                    </div>
                </div>
            );
        },
    }
]
