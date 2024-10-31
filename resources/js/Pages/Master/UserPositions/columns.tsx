"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserPosition = {
  id: number
  name: string
  description?: string | undefined
  division: string
}

export const columns: ColumnDef<UserPosition>[] = [
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
    {
        accessorKey: "division",
        header: "Division",
    },
]
