import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { UserDivision, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserDivisionsCreateDialog from "./Components/Create";
import UserDivisionsEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { useState } from "react";

interface PageProps {
    userDivisions: UserDivision[],
}

export default function UserDivisionsIndex({ userDivisions }: PageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Divisions List"
                    button={<UserDivisionsCreateDialog />}
                />
            }
        >

            <Head title="User Divisions" />

            <Card className="flex-auto basis-1/2 p-8">
            <DataTable<UserDivision, any>
                columns={columns}
                data={userDivisions}
                detailDialog="Edit User Division"
                renderDialogContent={(data) => (
                    <UserDivisionsEditDialog data={data} closeDialog={() => setIsDialogOpen(false)} />
                )}
            />

            </Card>
        </DashboardLayout>

    );
}
