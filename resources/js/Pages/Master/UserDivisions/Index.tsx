import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserDivisionCreateDialog from "./Components/Create";
import UserDivisionEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { UserDivision } from "@/types/model";

interface PageProps {
    userDivisions: UserDivision[],
}

export default function UserDivisionsIndex({ userDivisions }: PageProps) {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Divisions List"
                    button={<UserDivisionCreateDialog />}
                />
            }
        >

            <Head title="User Divisions" />

            <Card className="flex-auto basis-1/2 p-8">
            <DataTable<UserDivision, any>
                columns={columns}
                data={userDivisions}
                detailDialog="Edit User Division"
                renderDialogContent={(data, closeDialog) => (
                    <UserDivisionEditDialog data={data} closeDialog={closeDialog} />
                )}
            />

            </Card>
        </DashboardLayout>

    );
}
