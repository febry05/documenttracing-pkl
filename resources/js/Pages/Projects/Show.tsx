import { Head, Link } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Download, Ellipsis, PenLine, Plus } from "lucide-react";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import InfoPair from "@/Components/custom/InfoPair";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { IconButton } from "@/Components/custom/IconButton";
import ProjectDocumentCreateDialog from "./Documents/Components/Create";
import { Project, ProjectDocument, ProjectDocumentVersion } from "@/types/model";
import { format } from "date-fns";
import TextLink from "@/Components/custom/TextLink";

type Priority = {
    key: number,
    value: string,
};

interface PageProps {
    project: Project,
    projectDocuments: ProjectDocument[],
    projectDocumentVersions: ProjectDocumentVersion[],
    priorities: Priority[],
}

export default function ProjectShow({ project, projectDocuments, projectDocumentVersions, priorities }: PageProps) {
    console.log(projectDocuments);
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Details"
                    button={
                        <Link href={route('projects.edit', project.id)}>
                            <IconButton icon={PenLine} text="Edit Project" variant="modify"/>
                        </Link>
                    }
                />
            }
        >
            <Head title="Project Details" />

            <Card className="flex flex-col mb-4">
                <div className="px-8 py-4 border-b">
                    <div className="col-span-5 leading-9 text-l font-semibold">{project.name}</div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    <InfoPair label="Project Code" value={project.code} />
                    <InfoPair label="Start & End Date" value={format(project.contract_start, "d MMMM yyyy") + ' - ' + format(project.contract_end, "d MMMM yyyy")} />
                    <InfoPair label="Contract Number" value={project.contract_number} />
                    <InfoPair label="Duration" value={project.duration} />
                    <InfoPair label="Type" value={project.type} />
                    <InfoPair label="Days Left" value={project.days_left ? project.days_left.toString() : ""} />
                    <InfoPair label="Customer" value={project.customer} />
                    <InfoPair label="Person in Charge" value={project.person_in_charge} />
                </div>
            </Card>

            <HeaderNavigation
                title="Documents"
                size="md"
                breadcrumb={false}
                button={
                    <ProjectDocumentCreateDialog priorities={priorities} projectId={project.id}/>
                }
                className="mb-4"
            />

            <Card className="flex flex-col">
                <div className="p-8">
                <Accordion type="multiple" className="flex flex-col gap-4">
                    {projectDocuments.map(projectDocument => (
                        <AccordionItem key={projectDocument.id} value={`item-${projectDocument.id}`} className="bg-gray-50 dark:bg-background border-none rounded-md">
                            <AccordionTrigger className="bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-md hover:no-underline hover:bg-gray-200/90 hover:dark:bg-gray-800/90">
                                <div className="flex items-center">
                                    <TextLink text={projectDocument.name} href={route('projects.documents.show', [project.id, projectDocument.id])} className="text-sm" />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 pb-0 flex flex-col gap-4">
                                    {projectDocument.project_document_versions && projectDocument.project_document_versions.map(project_document_version => (
                                        <div key={project_document_version.id} className="flex items-center gap-4">
                                            <TextLink text={project_document_version.version} href={route('projects.documents.versions.show', [project.id, projectDocument.id, project_document_version.id])} className="text-sm" />
                                            <Link href={route('projects.documents.versions.show', [project.id, projectDocument.id, project_document_version.id])} className="ms-auto">
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
