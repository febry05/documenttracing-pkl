import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { IconButton } from "@/Components/custom/IconButton";
import InfoPair from "@/Components/custom/InfoPair";
import { Card } from "@/Components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Download, PenLine, SquareArrowOutUpRight } from "lucide-react";
import ProjectDocumentVersionCreateDialog from "./Versions/Components/Create";
import {
    Auth,
    Project,
    ProjectDocument,
    ProjectDocumentVersion,
} from "@/types/model";
import { Badge } from "@/Components/ui/badge";
import { format } from "date-fns";
import TextLink from "@/Components/custom/TextLink";
import ProjectDocumentEditDialog from "./Components/Edit";
import { can } from "@/lib/utils";

interface PageProps {
    project: Project;
    projectDocument: ProjectDocument;
    projectDocumentVersions: ProjectDocumentVersion[];
    priorities: { key: number; value: string }[];
}

export default function ProjectDocumentsShow({
    project,
    projectDocument,
    projectDocumentVersions,
    priorities,
}: PageProps) {
    const priorityValue = projectDocument.priority;
    type Variant = "default" | "secondary" | "destructive" | "outline";
    let variant: Variant;
    let priority: "High" | "Medium" | "Low";
    if (priorityValue === 3) {
        variant = "destructive";
        priority = "High";
    } else if (priorityValue === 2) {
        priority = "Medium";
    } else {
        variant = "secondary";
        priority = "Low";
    }

    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Details"
                    button={can(userPermissions, "Update Project Document") && (
                        <ProjectDocumentEditDialog
                            priorities={priorities}
                            projectId={project.id}
                            projectDocument={projectDocument}
                        />
                    )}
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto mb-4">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    <InfoPair label="Name" value={projectDocument.name} />
                    <InfoPair
                        label="Priority"
                        value={
                            <Badge
                                variant={variant}
                                className={
                                    priority === "Medium" &&
                                    "bg-yellow-300 hover:bg-yellow-400 text-foreground dark:text-background"
                                }
                            >
                                {priority}
                            </Badge>
                        }
                    />
                    <InfoPair
                        label="Deadline Interval"
                        value={
                            "Every " +
                            projectDocument.deadline_interval +
                            " Days"
                        }
                    />
                    <InfoPair
                        label="From Project"
                        value={
                            <TextLink
                                text={project.name}
                                href={route("projects.show", project.id)}
                            />
                        }
                    />
                    <InfoPair
                        label="Automatically Generate Version"
                        value={projectDocument.is_auto_name}
                    />
                </div>
            </Card>

            {can(userPermissions, "View Project Document Version Update") && (
                <VersionsSection project={project} projectDocument={projectDocument} projectDocumentVersions={projectDocumentVersions} userPermissions={userPermissions} />
            )}
        </DashboardLayout>
    );
}

function VersionsSection({project, projectDocument, projectDocumentVersions, userPermissions}: {project: Project, projectDocument: ProjectDocument, projectDocumentVersions: ProjectDocumentVersion[], userPermissions: string[]}) {

    return(
        <>
            <HeaderNavigation
                title="Versions"
                size="md"
                breadcrumb={false}
                button={can(userPermissions, "Create Project Document Version") && (
                    <ProjectDocumentVersionCreateDialog
                        projectId={project.id}
                        projectDocumentId={projectDocument.id}
                    />
                )}
                className="mb-4"
            />

            <Card className="flex-auto p-4">
                <Accordion type="multiple" className="flex flex-col gap-4">
                    {projectDocumentVersions.length > 0 ? projectDocumentVersions.map((projectDocumentVersion) => (
                        <AccordionItem
                            key={projectDocumentVersion.id}
                            value={`item-${projectDocumentVersion.id}`}
                            className="bg-gray-50 dark:bg-background border-none rounded-md"
                        >
                            <AccordionTrigger className="bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-md hover:no-underline hover:bg-gray-300 hover:dark:bg-gray-700">
                                <div className="flex items-center">
                                    <TextLink
                                        text={projectDocumentVersion.version}
                                        href={route(
                                            "projects.documents.versions.show",
                                            [
                                                project.id,
                                                projectDocument.id,
                                                projectDocumentVersion.id,
                                            ]
                                        )}
                                        className="text-sm"
                                    />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-4 pb-0 flex flex-col">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <InfoPair
                                            label="Document Number"
                                            value={
                                                projectDocumentVersion.document_number
                                            }
                                            width={7}
                                            lineHeight="normal"
                                        />
                                        <InfoPair
                                            label="Release Date"
                                            value={format(
                                                projectDocumentVersion.release_date,
                                                "d MMMM yyyy"
                                            )}
                                            width={7}
                                            lineHeight="normal"
                                        />
                                        <InfoPair
                                            label="Latest Document"
                                            value={
                                                <Link
                                                    href={
                                                        projectDocumentVersion.latest_document
                                                    }
                                                    target="_blank"
                                                >
                                                    <IconButton
                                                        icon={Download}
                                                        variant="outline"
                                                        text="Download File"
                                                    />
                                                </Link>
                                            }
                                            width={7}
                                            lineHeight="normal"
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )) : 'No versions available.'}
                </Accordion>
            </Card>
        </>
    )
}
