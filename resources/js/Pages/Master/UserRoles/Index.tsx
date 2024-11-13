import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { UserRole, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

interface PageProps {
    userRoles: UserRole[],
}

const breadcrumb = [
    { name: 'Master' },
    { name: 'User Roles' }
]

export default function UserRolesIndex({ userRoles }: PageProps) {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Roles List"
                    breadcrumb={breadcrumb}
                    button={
                        <Link href={route('user-roles.create')}>
                            <Button>
                                <Plus className="me-2" size={18} />
                                Create User Role
                            </Button>
                        </Link>
                    }
                />
            }
        >
            <Head title="User Roles" />

            {/* <BreadcrumbBuilder tree={tree}/> */}

            <Card className="flex-auto basis-1/2 p-8">
                <DataTable<UserRole, any>
                    columns={columns}
                    data={userRoles}
                    detailPage="user-roles.edit"
                />
            </Card>
        </DashboardLayout>

    );
}
