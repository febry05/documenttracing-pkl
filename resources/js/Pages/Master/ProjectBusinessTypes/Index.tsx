import { DataTable } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import ProjectBusinessTypeCreateDialog from "./Components/Create";
import ProjectBusinessTypeEditDialog from "./Components/Edit";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { ProjectBusinessType } from "@/types/model";

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
                    button={<ProjectBusinessTypeCreateDialog />}
                />
            }
        >
            <Head title="Project Business Types" />

            <Card className="flex-auto basis-1/2 p-8">
                <DataTable<ProjectBusinessType, any>
                    columns={columns}
                    data={projectBusinessTypes}
                    detailDialog="Edit Project Business Type"
                    renderDialogContent={(data) => (
                        <ProjectBusinessTypeEditDialog data={data} closeDialog={() => setIsDialogOpen(false)} />
                    )}
                />
            </Card>
        </DashboardLayout>

    );
}
