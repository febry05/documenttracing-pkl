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
