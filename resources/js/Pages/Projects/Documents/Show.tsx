import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { IconButton } from "@/Components/custom/IconButton";
import InfoPair from "@/Components/custom/InfoPair";
import { Card } from "@/Components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { Ellipsis, PenLine, Plus } from "lucide-react";
import TitleSeparator from "@/Components/custom/TitleSeparator";

export default function ProjectDocumentsShow() {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Details"
                    button={
                        <Link href="{route('projects.documents.edit', projectDocuments)}">
                            <IconButton icon={PenLine} text="Edit Document" variant="modify"/>
                        </Link>
                    }
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto p-4 mb-4">
                <div className="flex flex-col gap-4 px-4">
                    <InfoPair label="Name" value="{projectDocument.name}" width={4} />
                    <InfoPair label="Priority" value="{projectDocument.priority}" width={4} />
                    <InfoPair label="Due At" value="{projectDocument.due_at}" width={4} />
                    <InfoPair label="Person in Charge" value="{projectDocument.person_in_charge}" width={4} />
                    <InfoPair label="From Project" value="{projectDocument.from_project}" width={4} />
                </div>
            </Card>

            <TitleSeparator
                title="Versions"
                button={
                    {
                        text: "Create Version",
                        icon: Plus,
                        href: "route('projects.documents.create', project.id)",
                    }
                }
                className="mb-4"
            />

            <Card className="flex-auto p-4">
                <Accordion type="multiple" className="flex flex-col gap-4">
                    {/* {documents.map(document => ( */}
                        <AccordionItem key="{document.id}" value="{`item-${document.id}`}" className="bg-gray-50 dark:bg-background border-none rounded-md">
                            <AccordionTrigger className="bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-md hover:no-underline hover:bg-gray-300 hover:dark:bg-gray-700">
                                <div className="flex items-center">
                                    <div className="text-sm">{"projectDocumentVersion.name"}</div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 pb-0 flex flex-col">
                                    {/* {document.project_document_versions && document.project_document_versions.map(project_document_version => ( */}
                                        <div key="{project_document_version.id}" className="flex items-start">
                                            {/* <div className="text-sm">"{"project_document_version.date"}"</div> */}
                                            <div className="grid grid-row-2 gap-4">
                                                <InfoPair label="Document Number" value="{projectDocumentVersion.document_number}" width={7} lineHeight="normal" />
                                                <InfoPair label="Latest File" value="{projectDocumentVersion.file_name}" width={7} lineHeight="normal" />
                                            </div>
                                            <Link href="{route('projects.documents.versions.show', [project.id, document.id, project_document_version.id])}" className="ms-auto">
                                                <Ellipsis className="text-gray-500" size={20} />
                                            </Link>
                                        </div>
                                    {/* ))} */}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    {/* ))} */}
                </Accordion>
            </Card>

        </DashboardLayout>
    );
}
