"use client"

import { UserDivision } from "@/types/model"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<UserDivision>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
        enableResizing: true,
        size: 10,
        minSize: 10,
        maxSize: 10,
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
