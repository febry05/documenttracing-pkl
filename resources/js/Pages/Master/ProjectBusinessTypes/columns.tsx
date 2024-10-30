"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ProjectBusinessType = {
  id: number
  name: string
  description?: string | undefined
}

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
