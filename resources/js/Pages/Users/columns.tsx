"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/model"

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
]
