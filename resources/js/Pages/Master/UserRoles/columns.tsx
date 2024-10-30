"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserRole = {
  id: number
  name: string
  description: string | undefined
}

export const columns: ColumnDef<UserRole>[] = [
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
