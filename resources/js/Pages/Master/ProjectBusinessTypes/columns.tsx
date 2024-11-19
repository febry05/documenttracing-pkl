"use client"

import { ProjectBusinessType } from "@/types/model"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ProjectBusinessType>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]
