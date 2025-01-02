import { Head, Link, usePage } from "@inertiajs/react";
import { DataTable, FilterOption } from "@/Components/ui/data-table";
import { Card } from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Button } from "@/Components/ui/button";
import { can } from "@/lib/utils";
import { Auth, Project, User } from "@/types/model";

interface PageProps {
    projects: Project[];
    projectBusinessTypes: FilterOption[];
    pics: User[];
}

export default function ProjectsIndex({
    projects,
    projectBusinessTypes,
    pics,
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
        {
            columnId: "person_in_charge",
            label: "Person in Charge",
            options: [
                { value: "all", label: "All PIC" },
                ...pics,
            ],
        },
        {
            columnId: "time_remaining",
            label: "Time Remaining",
            compare: "<",
            options: [
                { value: "all", label: "All Time" },
                { value: "367", label: "A year Left" },
                { value: "192", label: "6 Months Left" },
                { value: "96", label: "3 Months Left" },
                { value: "32", label: "A Month Left" },
                { value: "11", label: "10 Days Left" },
                { value: "8", label: "7 Days Left" },
                { value: "4", label: "3 Days Left" },
                { value: "1", label: "Contract Ended" },
            ]
        },
    ];

    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Projects List"
                    button={can(userPermissions, "Create Project") && (
                        <Link href={route("projects.create")}>
                            <Button>
                                <Plus className="me-2" size={18} />
                                Create Project
                            </Button>
                        </Link>
                    )}
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
