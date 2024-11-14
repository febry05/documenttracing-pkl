import { Head, Link } from "@inertiajs/react";
import { DataTable, FilterOption } from "@/Components/ui/data-table"
import { Card } from "@/Components/ui/card";
import { Ellipsis, PenLine, Plus, SquarePen } from "lucide-react";
import { Project, columns } from "./columns";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Button } from "@/Components/ui/button";
import InfoPair from "@/Components/custom/InfoPair";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";

interface PageProps {
    project: {
        id: number;
        code: string;
        name: string;
        type: string;
        customer: string;
        person_in_charge: string;
        contract_number: string;
        contract_start: string;
        contract_end: string;
        duration: string;
        days_left: number;
    },
    documents: {
        id: number,
        name: string,
        project_document_versions: {
            id: number,
            date: string,
        }[],
    }[],
}

export default function ProjectShow({ project, documents }: PageProps) {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Details"
                    button={
                        <Link href={route('projects.edit', project.id)}>
                            <Button>
                                <PenLine className="me-2" size={18} />
                                Edit Project
                            </Button>
                        </Link>
                    }
                />
            }
        >
            <Head title="Project Details" />

            <Card className="flex flex-col mb-6">
                <div className="px-8 py-4 border-b">
                    <div className="col-span-5 leading-9 text-l font-semibold">{project.name}</div>
                </div>
                <div className="flex flex-col gap-4 px-8 py-4">
                    <div className="grid grid-cols-2">
                        <InfoPair label="Project Code" value={project.code} />
                        <InfoPair label="Start & End Date" value={project.contract_start + ' - ' + project.contract_end} />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Contract Number" value={project.contract_number} />
                        <InfoPair label="Duration" value={project.duration} />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Type" value={project.type} />
                        <InfoPair label="Days Left" value={project.days_left.toString()} />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Customer" value={project.customer} />
                        <InfoPair label="Person in Charge" value={project.person_in_charge} />
                    </div>
                </div>
            </Card>
            <Card className="flex flex-col">
                <div className="p-8">
                <Accordion type="multiple" className="flex flex-col gap-4">
                    {documents.map(document => (
                        <AccordionItem key={document.id} value={`item-${document.id}`} className="bg-gray-50 dark:bg-background border-none rounded-md">
                            <AccordionTrigger className="bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-md hover:no-underline hover:bg-gray-300 hover:dark:bg-gray-700">
                                <div className="flex items-center">
                                    <Link href={route('projects.documents.show', [project.id, document.id])} className="hover:underline">
                                        <div className="text-sm">{document.name}</div>
                                    </Link>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 pb-0 flex flex-col gap-4">
                                    {document.project_document_versions && document.project_document_versions.map(project_document_version => (
                                        <div key={project_document_version.id} className="flex items-center gap-4">
                                            <div className="text-sm">{project_document_version.date}</div>
                                            <Link href={route('projects.documents.versions.show', [project.id, document.id, project_document_version.id])} className="ms-auto">
                                                <Ellipsis className="text-gray-500" size={20} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                </div>
            </Card>
        </DashboardLayout>
    );
}
