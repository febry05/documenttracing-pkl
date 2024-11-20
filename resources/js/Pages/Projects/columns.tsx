"use client"

import { Project } from "@/types/model"
import { ColumnDef } from "@tanstack/react-table"

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
    {
        accessorKey: "contract_start",
        header: "Contract Start",
    },
    {
        accessorKey: "contract_end",
        header: "Contract End",
    },
    {
        accessorKey: "days_left",
        header: "Days Left",
    },
]
