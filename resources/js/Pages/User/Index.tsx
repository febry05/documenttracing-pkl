import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
// import { PageProps } from "@/types";
import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { User, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";

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

type Filter = {
    id: number;
    name: string;
}

interface PageProps {
    auth: {
        user: any;
    }
    users: User[],
    positions: Filter[],
    roles: Filter[]
}

export default function UsersIndex({ auth, users, positions, roles }: PageProps) {
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

    const button = {
        text: "Create User",
        icon: Plus,
        link: route('users.create'),
    }

    return (
        <DashboardLayout
        // <DashboardLayout
            // user={auth.user}
            header={
                <HeaderNavigation title="Users List" back={true} button={button}/>
            }
        >
            <Head title="Users" />

            <Card className="flex-auto basis-1/2 p-4">
                <DataTable columns={columns} data={data} filters={filters} />
            </Card>

            {/* <div className="z-50 absolute bottom-20 right-10">
                <Button variant="ghost" className="rounded-full shadow-xl bg-green-700 hover:bg-green-600">+</Button>
            </div> */}
        </DashboardLayout>
    );
}
