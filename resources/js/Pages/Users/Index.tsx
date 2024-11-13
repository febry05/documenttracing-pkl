import { Head, Link } from "@inertiajs/react";
import { DataTable, FilterOption } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { User, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Button } from "@/Components/ui/button";

interface PageProps {
    users: User[],
    positions: FilterOption[],
    roles: FilterOption[]
}

export default function UsersIndex({ users, positions, roles }: PageProps) {
    const filters = [
        {
            columnId: "position",
            options: [
                { value: "all", label: "All Position" },
                ...positions,
            ]
        },
        {
            columnId: "role",
            options: [
                { value: "all", label: "All Roles" },
                ...roles
            ]
        }
    ];

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Users List"
                    back={true}
                    button={
                        <Link href={route('users.create')}>
                            <Button>
                                <Plus className="me-2" size={18} />
                                Create User
                            </Button>
                        </Link>
                    }
                />
            }
        >
            <Head title="Users" />

            <Card className="flex-auto basis-1/2 p-8">
                <DataTable columns={columns} data={users} filters={filters} detailPage="users.edit" />
            </Card>
        </DashboardLayout>
    );
}
