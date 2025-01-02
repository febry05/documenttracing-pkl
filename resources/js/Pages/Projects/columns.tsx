"use client"

import Countdown from "@/Components/custom/Countdown"
import { Project } from "@/types/model"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Project>[] = [
    {
        header: 'No',
        accessorFn: (row, index) => index + 1,
        enableResizing: true,
        size: 20,
        minSize: 20,
        maxSize: 20,
    },
    {
        accessorKey: "code",
        header: "Project Code",
    },
    {
        accessorKey: "name",
        header: "Name",
        enableResizing: true,
        size: 300,
        minSize: 300,
        maxSize: 300,
    },
    {
        accessorKey: "type",
        header: "Type",
        enableResizing: true,
        size: 100,
        minSize: 100,
        maxSize: 100,
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
        enableResizing: true,
        size: 100,
        minSize: 100,
        maxSize: 100,
    },
    {
        accessorKey: "contract_end",
        sortingFn: 'datetime',
        header: "Contract End",
        enableResizing: true,
        size: 100,
        minSize: 100,
        maxSize: 100,
    },
    {
        accessorKey: "time_remaining",
        // accessorFn: (row) => {
        //     return (<Countdown startDate={row.contract_start} endDate={row.contract_end} />);
        // },
        header: "Time Remaining",
        filterFn: (row, columnId, filterValue) => {
            // If the filterValue is empty (i.e., "all" is selected), return true for all rows
            if (!filterValue) {
                return true;
            }

            const { compare, filterValue: value } = filterValue;

            // Ensure we are working with numbers for comparison
            const rowValue = new Date(row.getValue('contract_end')).getTime();
            const now = new Date().getTime();
            const daysLeft = Math.max(0, Math.floor((rowValue - now) / (1000 * 60 * 60 * 24)));
            const filterNum = parseFloat(value);

            console.log(rowValue, now, daysLeft, filterNum);

            if (isNaN(daysLeft) || isNaN(filterNum) || ((filterNum > 1) && (daysLeft === 0))) {
                return false;
            }

            if (compare === '<') return daysLeft < filterNum;
            if (compare === '>') return daysLeft > filterNum;

            return daysLeft === filterNum;
        },
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
        },
        enableResizing: true,
        size: 100,
        minSize: 100,
        maxSize: 100,
    },
]
