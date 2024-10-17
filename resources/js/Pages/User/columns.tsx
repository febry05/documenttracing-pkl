"use client"

import { Button } from "@/Components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: number
  name: string
  email: string
  position: string
  role: "Administrator" | "Project Manager" | "Guest"
}

export const columns: ColumnDef<User>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <Button className="bg-emerald-500 hover:bg-emerald-600 py-3 px-4">
                    <Pencil size={14}/>
                </Button>
            )
        },
    },
]
