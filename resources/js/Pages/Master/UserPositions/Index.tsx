import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { UserPosition, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserPositionsCreateDialog from "./Components/Create";
import UserPositionsEditDialog from "./Components/Edit";
import { UserDivision } from "../UserDivisions/columns";

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
                    back={true}
                    button={<UserPositionsCreateDialog userDivisions={userDivisions} />}
                />
            }
        >
            <Card className="flex-auto basis-1/2 p-4">
                <DataTable<UserPosition, any>
                    columns={columns}
                    data={userPositions}
                    detailDialog="Edit User Position"
                    renderDialogContent={(data) => (
                        <UserPositionsEditDialog data={data} userDivisions={userDivisions} />
                    )}
                />
            </Card>
        </DashboardLayout>
    );
}
