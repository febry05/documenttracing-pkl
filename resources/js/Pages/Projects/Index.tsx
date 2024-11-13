import { Head, Link } from "@inertiajs/react";
import { DataTable, FilterOption } from "@/Components/ui/data-table";
import { Card } from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { Project, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Button } from "@/Components/ui/button";

interface PageProps {
    projects: Project[];
    projectBusinessTypes: FilterOption[];
}

export default function UsersIndex({
    projects,
    projectBusinessTypes,
}: PageProps) {
    const filters = [
        {
            columnId: "type",
            label: "Type",
            options: [
                { value: "all", label: "All Type" },
                ...projectBusinessTypes,
            ],
        },
    ];

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Projects List"
                    // back={route('dashboard')}
                    button={
                        <Link href={route("projects.create")}>
                            <Button>
                                <Plus className="me-2" size={18} />
                                Create Project
                            </Button>
                        </Link>
                    }
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto basis-1/2 p-4">
                <DataTable
                    columns={columns}
                    data={projects}
                    filters={filters}
                    detailPage="projects.show"
                />
            </Card>
        </DashboardLayout>
    );
}
