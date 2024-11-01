import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { ProjectBusinessType, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import ProjectBusinessTypesCreateDialog from "./Components/Create";
import ProjectBusinessTypesEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { useState } from "react";

interface PageProps {
    projectBusinessTypes: ProjectBusinessType[],
}

export default function ProjectBusinessTypesIndex({ projectBusinessTypes }: PageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

            <Head title="Project Business Types" />

            <Card className="flex-auto basis-1/2 p-4">
                <DataTable<ProjectBusinessType, any>
                    columns={columns}
                    data={projectBusinessTypes}
                    detailDialog="Edit Project Business Type"
                    renderDialogContent={(data) => (
                        <ProjectBusinessTypesEditDialog data={data} closeDialog={() => setIsDialogOpen(false)} />
                    )}
                />
            </Card>
        </DashboardLayout>

    );
}
