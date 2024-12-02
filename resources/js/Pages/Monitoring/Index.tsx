import { Card } from "@/Components/ui/card"
import { InfoCard } from "@/Components/custom/InfoCard";
import { FileBarChart, FileCog, FileClock, FileCheck2  } from "lucide-react";
import { ColumnFilterConfig } from "@/Components/ui/data-table";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { DateSelectForm } from "./Components/DateSelectForm";
import { columns } from "./columns";
import CollapsibleRowTable from "@/Components/custom/CollapsibleRowTable";

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
        // {
        //     columnId: "priority",
        //     label: "Priority",
        //     options: [
        //         { value: "all", label: "All Priority" },
        //         { value: "High", label: "High" },
        //         { value: "Medium", label: "Medium" },
        //         { value: "Low", label: "Low" },
        //     ]
        // },
        // {
        //     columnId: "days_left",
        //     label: "Days left",
        //     compare: "<",
        //     options: [
        //         { value: "all", label: "All" },
        //         { value: "11", label: "Next 10 Days" },
        //         { value: "8", label: "Next 7 Days" },
        //         { value: "4", label: "Next 3 Days" },
        //     ]
        // }
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
            {/* <Head title="Dashboard" /> */}
            <div className="flex flex-col gap-4 md:gap-4">
                <div className="grid grid-cols-4 gap-4 md:gap-4">
                    <InfoCard title={stats.total_documents.toString()} caption="Total Documents" icon={FileBarChart}/>
                    <InfoCard title={stats.ongoing_documents.toString()} caption="Ongoing Documents" icon={FileCog}/>
                    <InfoCard title={stats.pending_documents.toString()} caption="Pending Documents" icon={FileClock}/>
                    <InfoCard title={stats.completed_documents.toString()} caption="Completed Documents"icon={FileCheck2}/>
                </div>
                <div className="flex flex-row gap-4 md:gap-4">
                    <Card className="flex-auto basis-1/2 p-8">

                        {/* <div className="rounded"> */}
                            {/* <div className="border-b px-4 text-muted-foreground h-12 mb-4
                                            transition-colors hover:bg-muted/50
                                            font-medium text-left text-sm flex items-center">
                                {columns.map(column => (
                                    <div key={column.accessorKey} className="flex-auto">{column.header}</div>
                                ))}

                            </div> */}

                            {/* <div className="flex flex-col gap-4">
                                <Accordion type="multiple" className="flex flex-col gap-4">
                                {projects.map(project => (
                                    <AccordionItem key={project.id} value={`item-${project.id}`} className="bg-gray-50 dark:bg-background border-none rounded-md">
                                        <AccordionTrigger className="bg-gray-200 dark:bg-gray-800 px-5 py-3 rounded-md hover:no-underline hover:bg-gray-300 hover:dark:bg-gray-700">
                                            <div className="flex items-center text-sm">
                                                <span className="me-4">{projects.indexOf(project) + 1}</span>
                                                <TextLink text={project.name} href={route('projects.show', 1)} />
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="p-4 pb-0 flex flex-col gap-4">
                                                {project.documentVersions.map((doc, docIndex) => (
                                                    <div className="border-b h-12
                                                        transition-colors hover:bg-muted/50
                                                        font-medium text-left text-sm flex items-center" key={docIndex}>
                                                        <div className="flex-auto">{projects.indexOf(project) + 1}.{project.documentVersions.indexOf(doc) + 1}</div>
                                                        <div className="flex-auto">{doc.name}</div>
                                                        <div className="flex-auto">{doc.person_in_charge}</div>
                                                        <div className="flex-auto">{doc.priority}</div>
                                                        <div className="flex-auto">{doc.due_date ?? "N/A"}</div>
                                                        <div className="flex-auto">{doc.status}</div>
                                                        <div className="flex-auto">
                                                            <a href={doc.document_link} target="_blank" rel="noopener noreferrer">
                                                                {doc.document_link ? "View Document" : "N/A"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            </div> */}
                        {/* </div> */}
                        <CollapsibleRowTable data={projects} columns={columns} />
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
