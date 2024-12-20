import { Card } from "@/Components/ui/card"
import { InfoCard } from "@/Components/custom/InfoCard";
import { FileBarChart, FileCog, FileClock, FileCheck2  } from "lucide-react";
import { ColumnFilterConfig } from "@/Components/ui/data-table";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { DateSelectForm } from "./Components/DateSelectForm";
import { columns } from "./columns";
import CollapsibleRowTable from "@/Components/custom/CollapsibleRowTable";
import { Head } from "@inertiajs/react";

export type ProjectMonitoring = {
    id: number
    name: string
    person_in_charge: string
    documentVersions: {
        id: number
        name: string
        person_in_charge: string
        priority: "High" | "Medium" | "Low"
        due_date: string
        status: string
        document_link: string
    }[]
};

interface PageProps {
    stats: {
        total_documents: number,
        ongoing_documents: number,
        pending_documents: number,
        completed_documents: number,
    },
    projects: ProjectMonitoring[],
    availableYears: number[],
    selectedMonth: string,
    selectedYear: string
}

export default function MonitoringIndex({ stats, projects, availableYears, selectedMonth, selectedYear }: PageProps) {

    const filters: ColumnFilterConfig[] = [
        {
            columnId: "status",
            label: "Status",
            options: [
                { value: "all", label: "All Status" },
                { value: "Completed", label: "Completed" },
                { value: "On Process", label: "On Process" },
                { value: "Pending", label: "Pending" },
                { value: "Not Started", label: "Not Started" },
            ]
        },
        {
            columnId: "priority",
            label: "Priority",
            options: [
                { value: "all", label: "All Priority" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
            ]
        },
        {
            columnId: "days_left",
            label: "Time Remaining",
            compare: "<",
            options: [
                { value: "all", label: "All Time" },
                { value: "11", label: "10 Days Left" },
                { value: "8", label: "7 Days Left" },
                { value: "4", label: "3 Days Left" },
            ]
        },
    ];

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Monitoring Page"
                    button={
                        <DateSelectForm availableYears={availableYears} selectedYear={selectedYear} selectedMonth={selectedMonth}  />
                    }
                />
            }
        >
            <Head title="Monitoring" />

            <div className="flex flex-col gap-4 md:gap-4">
                <div className="grid grid-cols-4 gap-4 md:gap-4">
                    <InfoCard title={stats.total_documents.toString()} caption="Total Documents" icon={FileBarChart}/>
                    <InfoCard title={stats.ongoing_documents.toString()} caption="Ongoing Documents" icon={FileCog}/>
                    <InfoCard title={stats.pending_documents.toString()} caption="Pending Documents" icon={FileClock}/>
                    <InfoCard title={stats.completed_documents.toString()} caption="Completed Documents"icon={FileCheck2}/>
                </div>
                <div className="flex flex-row gap-4 md:gap-4">
                    <Card className="flex-auto basis-1/2 p-8">
                        <CollapsibleRowTable data={projects} columns={columns} filters={filters} detailPage="projects.documents.versions.show"/>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
