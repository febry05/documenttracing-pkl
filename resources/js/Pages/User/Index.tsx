import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { DataTable } from "@/Components/ui/data-table"
import { User, columns } from "./columns"

function getData(): User[] {
    let mockData: User[] = [];
    for (let i = 1; i <= 25; i++) {
        mockData.push({
            id: i,
            name: i % 2 === 0 ? "Muhammad Ferdy Maulana" : "Muhammad Azhim Nugroho",
            position: i % 3 === 0 ? "Karyawan Magang" : (i % 4 === 1 ? "ICT Staff" : "GA Staff"),
            role: i % 4 === 0 ? "Administrator" : (i % 3 === 1 ? "Project Manager" : "Guest"),
            email: i % 2 === 0 ? "ferdymaulana7404@gmail.com" : "mazhn34@gmail.com",
        });
    }
    return mockData;
}

export default function Dashboard({ auth }: PageProps) {
    const data = getData()

    const filters = [
        {
            columnId: "position",
            options: [
                { value: "all", label: "All Position" },
                { value: "Karyawan Magang", label: "Karyawan Magang" },
                { value: "ICT Staff", label: "ICT Staff" }
            ]
        },
        {
            columnId: "role",
            options: [
                { value: "all", label: "All Roles" },
                { value: "Administrator", label: "Administrator" },
                { value: "Project Manager", label: "Project Manager" },
                { value: "Guest", label: "Guest" }
            ]
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="grid grid-cols-3 place-content-between">
                    <span className="font-semibold text-xl leading-tight">
                        Users List
                    </span>
                </div>
            }
            title=""
        >
            <Head title="Users" />
            <DataTable columns={columns} data={data} filters={filters} />
        </AuthenticatedLayout>
    );
}
