import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { DataTable } from "@/Components/ui/data-table"
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Plus, ChevronLeft } from "lucide-react";
import { User, columns } from "./columns";

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
                <div className="grid grid-col-2">
                    <span className="font-semibold text-xl leading-tight">
                        Users List
                    </span>
                    <div className="flex justify-between">
                        <Button variant="link" className="p-0">
                            <ChevronLeft className="me-1" size={18}/>
                            <span className="mb-0.5">Back</span>
                        </Button>
                        <Link href={route('users.create')}>
                            <Button className="bg-blue-500 hover:bg-blue-600">
                                <Plus className="me-2" size={18}/>
                                Create User
                            </Button>
                        </Link>
                    </div>
                </div>
            }
            title=""
        >
            <Head title="Users" />

            <Card className="flex-auto basis-1/2 p-4">
                <DataTable columns={columns} data={data} filters={filters} />
            </Card>

            {/* <div className="z-50 absolute bottom-20 right-10">
                <Button variant="ghost" className="rounded-full shadow-xl bg-green-700 hover:bg-green-600">+</Button>
            </div> */}
        </AuthenticatedLayout>
    );
}
