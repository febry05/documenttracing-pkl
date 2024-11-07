"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
    id: number
    code: string,
    name: string,
    project_business_type: string,
    customer: string,
    contract_number: string,
    contract_start: string,
    contract_end: string,
    time_period: string,
    time_remaining: string,
}

export const columns: ColumnDef<Project>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
    },
    {
        accessorKey: "code",
        header: "Project Code",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    // {
    //     accessorKey: "contract_number",
    //     header: "Contract Number",
    // },
    {
        accessorKey: "contract_start",
        header: "Contract Start",
    },
    {
        accessorKey: "contract_end",
        header: "Contract End",
    },
    // {
    //     accessorKey: "duration",
    //     header: "Duration",
    // },
    {
        accessorKey: "days_left",
        header: "Days Left",
    },
]
