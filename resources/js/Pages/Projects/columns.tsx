"use client"

import Countdown from "@/Components/custom/Countdown"
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
        accessorKey: "person_in_charge",
        header: "Person In Charge",
        enableHiding: true,
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
        accessorKey: "contract_end",
        header: "Time Remaining",
        cell: ({ getValue, row }) => (
            <div className="w-full flex">
                <div className="mx-auto">
                    {getValue() && (
                        <Countdown startDate={row.original.contract_start} endDate={getValue() as string | Date} />
                    )}
                </div>
            </div>
        ),
    },
]
