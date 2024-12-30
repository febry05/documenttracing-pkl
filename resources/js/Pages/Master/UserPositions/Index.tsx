import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserPositionsCreateDialog from "./Components/Create";
import UserPositionEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { UserDivision, UserPosition } from "@/types/model";

interface PageProps {
    userPositions: UserPosition[],
    userDivisions: UserDivision[],
}

export default function UserPositionsIndex({ userPositions, userDivisions }: PageProps) {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Positions List"
                    button={<UserPositionsCreateDialog userDivisions={userDivisions} />}
                />
            }
        >

            <Head title="User Positions" />

            <Card className="flex-auto basis-1/2 p-8">
                <DataTable<UserPosition, any>
                    columns={columns}
                    data={userPositions}
                    detailDialog="Edit User Position"
                    renderDialogContent={(data, closeDialog) => (
                        <UserPositionEditDialog data={data} userDivisions={userDivisions} closeDialog={closeDialog} />
                    )}
                />
            </Card>
        </DashboardLayout>
    );
}
