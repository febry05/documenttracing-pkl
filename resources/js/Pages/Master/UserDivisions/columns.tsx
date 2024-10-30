"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserDivision = {
    id: number
    name: string
    description?: string | undefined
}

export const columns: ColumnDef<UserDivision>[] = [
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
