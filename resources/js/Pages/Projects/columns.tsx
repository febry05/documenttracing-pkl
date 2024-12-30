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
        sortingFn: 'datetime',
        header: "Contract Start",
    },
    {
        accessorKey: "contract_end",
        sortingFn: 'datetime',
        header: "Contract End",
    },
    {
        accessorKey: "time_remaining",
        header: "Time Remaining",
        cell: ({ row }) => (
            <div className="w-full flex">
                <div className="mx-auto">
                    {row.original.contract_end && (
                        <Countdown startDate={row.original.contract_start} endDate={row.original.contract_end} />
                    )}
                </div>
            </div>
        ),
        sortingFn: (rowA, rowB) => {
            const timeLeftA = new Date(rowA.original.contract_end).getTime() - Date.now();
            const timeLeftB = new Date(rowB.original.contract_end).getTime() - Date.now();
            return timeLeftA - timeLeftB;
        }
    },
]
