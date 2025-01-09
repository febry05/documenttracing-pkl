import { Head, router } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { InfoCard } from "@/Components/custom/InfoCard";
import { FileBarChart, FileCog, FileClock, FileCheck2 } from "lucide-react";
import { ColumnFilterConfig, DataTable } from "@/Components/ui/data-table";
import { columns, Project } from "./columns";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";

interface PageProps {
    stats: {
        totalDocuments: number;
        onProcessDocuments: number;
        pendingDocuments: number;
        completedDocuments: number;
    };
    documents: Project[];
}

export default function Dashboard({ stats, documents }: PageProps) {
    const filters: ColumnFilterConfig[] = [
        {
            columnId: "priority",
            label: "Priority",
            options: [
                { value: "all", label: "All Priority" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
            ],
        },
        {
            columnId: "days_left",
            label: "Time Remaining",
            compare: "<",
            options: [
                { value: "all", label: "All Time" },
                { value: "11", label: "Next 10 Days" },
                { value: "8", label: "Next 7 Days" },
                { value: "4", label: "Next 3 Days" },
                { value: "1", label: "Reached Time Limit" },
            ],
        },
    ];

    return (
        <DashboardLayout
            header={
                <span className="font-semibold text-xl leading-tight">
                    Overview - Uncompleted Documents
                </span>
            }
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 md:gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoCard
                        title={stats.totalDocuments.toString()}
                        caption="Total Documents"
                        icon={FileBarChart}
                    />
                    <InfoCard
                        title={stats.onProcessDocuments.toString()}
                        caption="On Process Documents"
                        icon={FileCog}
                    />
                    <InfoCard
                        title={stats.pendingDocuments.toString()}
                        caption="Pending Documents"
                        icon={FileClock}
                    />
                    <InfoCard
                        title={stats.completedDocuments.toString()}
                        caption="Completed Documents"
                        icon={FileCheck2}
                    />
                </div>
                <div className="flex flex-row gap-4 md:gap-4">
                    <Card className="flex-auto basis-1/2 p-8">
                        <DataTable
                            columns={columns}
                            data={documents}
                            filters={filters}
                            detailPageFn={(data) =>
                                router.visit(
                                    route("projects.documents.versions.show", [
                                        data.project_id,
                                        data.project_document_id,
                                        data.project_document_version_id,
                                    ])
                                )
                            }
                        />
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
