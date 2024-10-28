import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card } from "@/Components/ui/card"
import { InfoCard } from "@/Components/custom/InfoCard";
import { FileBarChart, FileCog, FileClock, FileCheck2  } from "lucide-react";
import { ColumnFilterConfig, DataTable } from "@/Components/ui/data-table";
import { columns, Project } from "./columns";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";

function getData(): Project[] {
    let mockData: Project[] = [];
    for (let i = 1; i <= 25; i++) {
        mockData.push({
            id: i,
            name: i % 2 === 0 ? "Wifi Managed Service Concordia Longue" : "Seat Management Peralatan TI",
            pic: i % 2 === 0 ? "Muhammad Azhim Nugroho" : "Muhammad Ferdy Maulana",
            due_date: i % 3 === 0 ? "31 October 2024" : (i % 4 === 1 ? "26 October 2024" : "20 October 2024"),
            days_left: i % 3 === 0 ? "11" : (i % 4 === 1 ? "4" : "1"),
            priority: i % 3 === 0 ? "High" : (i % 4 === 1 ? "Medium" : "Low"),
        });
    }
    return mockData;
}

export default function Dashboard({ auth }: PageProps) {
    const data = getData()

    const filters: ColumnFilterConfig[] = [
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
            label: "Days left",
            compare: "<",
            options: [
                { value: "all", label: "All" },
                { value: "11", label: "Next 10 Days" },
                { value: "8", label: "Next 7 Days" },
                { value: "4", label: "Next 3 Days" },
            ]
        }
    ];

    return (
        <DashboardLayout
            header={
                <span className="font-semibold text-xl leading-tight">
                    Overview - Last 30 Days
                </span>
            }
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 md:gap-4">
                <div className="grid grid-cols-4 gap-4 md:gap-4">
                    <InfoCard title="666" caption="Total Documents" icon={FileBarChart}/>
                    <InfoCard title="69" caption="Ongoing Documents" icon={FileCog}/>
                    <InfoCard title="34" caption="Pending Documents" icon={FileClock}/>
                    <InfoCard title="420" caption="Completed Documents"icon={FileCheck2}/>
                </div>
                <div className="flex flex-row gap-4 md:gap-4">
                    <Card className="flex-auto basis-1/2 p-4">
                        <DataTable columns={columns} data={data} filters={filters} />
                    </Card>
                    <Card className="flex-auto basis-1/4 p-4">Filler</Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
