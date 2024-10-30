import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { ProjectBusinessType, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import ProjectBusinessTypesCreateDialog from "./Components/Create";
import ProjectBusinessTypesEditDialog from "./Components/Edit";

interface PageProps {
    projectBusinessTypes: ProjectBusinessType[],
}

export default function ProjectBusinessTypesIndex({ projectBusinessTypes }: PageProps) {
    return (

        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Business Types List"
                    back={true}
                    button={<ProjectBusinessTypesCreateDialog />}
                />
            }
        >
            <Card className="flex-auto basis-1/2 p-4">
                <DataTable<ProjectBusinessType, any>
                    columns={columns}
                    data={projectBusinessTypes}
                    detailDialog="Edit Project Business Type"
                    renderDialogContent={(data) => (
                        <ProjectBusinessTypesEditDialog data={data} />
                    )}
                />
            </Card>
        </DashboardLayout>

    );
}
