import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { UserDivision, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import UserDivisionsCreateDialog from "./Components/Create";
import UserDivisionsEditDialog from "./Components/Edit";

interface PageProps {
    userDivisions: UserDivision[],
}

export default function UserDivisionsIndex({ userDivisions }: PageProps) {
    return (

        <DashboardLayout
            header={
                <HeaderNavigation
                    title="User Divisions List"
                    back={true}
                    button={<UserDivisionsCreateDialog />}
                />
            }
        >
            <Card className="flex-auto basis-1/2 p-4">
                <DataTable<UserDivision, any>
                    columns={columns}
                    data={userDivisions}
                    detailDialog="Edit User Division"
                    renderDialogContent={(data) => (
                        <UserDivisionsEditDialog data={data} />
                    )}
                />
            </Card>
        </DashboardLayout>

    );
}
