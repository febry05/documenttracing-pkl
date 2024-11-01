import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { UserRole, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserRolesCreateDialog from "./Components/Create";
import UserRolesEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { useState } from "react";

interface PageProps {
    userRoles: UserRole[],
}

export default function UserRolesIndex({ userRoles }: PageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Roles List"
                    back={true}
                    button={<UserRolesCreateDialog />}
                />
            }
        >
            <Head title="User Roles" />

            <Card className="flex-auto basis-1/2 p-4">
                <DataTable<UserRole, any>
                    columns={columns}
                    data={userRoles}
                    detailPage="user-roles.edit"
                    detailDialog="Edit User Role"
                    renderDialogContent={(data) => (
                        <UserRolesEditDialog data={data} closeDialog={() => setIsDialogOpen(false)} />
                    )}
                />
            </Card>
        </DashboardLayout>

    );
}
