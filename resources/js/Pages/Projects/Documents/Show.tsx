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
import { Download, Link2 } from "lucide-react";
import ProjectDocumentVersionCreateDialog from "./Versions/Components/Create";
import {
    Auth,
    Project,
    ProjectDocument,
    ProjectDocumentVersion,
} from "@/types/model";
import { format } from "date-fns";
import TextLink from "@/Components/custom/TextLink";
import ProjectDocumentEditDialog from "./Components/Edit";
import { can } from "@/lib/utils";
import PriorityBadge from "@/Components/custom/PriorityBadge";
import { Badge } from "@/Components/ui/badge";
import StatusBadge from "@/Components/custom/StatusBadge";

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
    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;
    const userIsPIC = can(userPermissions, 'Handle Owned Project') && project.person_in_charge === auth.name;
    const autoGenerateBadge = projectDocument.is_auto ? (
        <Badge variant="default" className="flex w-fit py-0 my-0">
            <span className="border-r pe-2 h-full content-center">Yes</span>
            {projectDocument.weekly_deadline
                ? <span className="ms-2">Every {projectDocument.weekly_deadline_name}</span>
                : <span className="ms-2">Every {projectDocument.monthly_deadline}{projectDocument.monthly_deadline === 1 ? 'st' : projectDocument.monthly_deadline === 2 ? 'nd' : projectDocument.monthly_deadline === 3 ? 'rd' : 'th'} day</span>
            }
        </Badge>
    ) : (
        <Badge variant="secondary">No</Badge>
    );

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Details"
                    button={(can(userPermissions, "Update Project Document") || userIsPIC) && (
                        <ProjectDocumentEditDialog
                            priorities={priorities}
                            project={project}
                            projectDocument={projectDocument}
                        />
                    )}
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto mb-4">
                <div className="px-8 py-4 border-b">
                    <div className="col-span-5 leading-9 text-l font-semibold">{projectDocument.name}</div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    <InfoPair
                        label="Priority"
                        value={
                            <PriorityBadge priority={projectDocument.priority_name} />
                        }
                    />
                    {/* <InfoPair
                        label="Deadline Interval"
                        value={projectDocument.deadline_interval_name}
                    /> */}
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
                        value={autoGenerateBadge}
                    />
                </div>
            </Card>

            {/* Project Document Version */}
            {(can(userPermissions, "View Project Document Version") || userIsPIC) && (
                <>
                    <HeaderNavigation
                        title="Versions"
                        size="md"
                        breadcrumb={false}
                        button={(can(userPermissions, "Create Project Document Version") || userIsPIC) && (
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
                                            <div className="grid md:grid-cols-5 gap-4">
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
                                                    label="Status"
                                                    value={<StatusBadge status={projectDocumentVersion.latest_status_name} />}
                                                    width={7}
                                                    lineHeight="normal"
                                                />
                                                <InfoPair
                                                    label="Latest Document"
                                                    value={
                                                        projectDocumentVersion.latest_document == "N/A"
                                                        ? (
                                                            <span className="italic text-muted-foreground">
                                                                No document available.
                                                            </span>
                                                        )
                                                        : (
                                                            <a
                                                                href={
                                                                    projectDocumentVersion.latest_document
                                                                }
                                                                target="_blank"
                                                            >
                                                                <IconButton
                                                                    icon={Link2}
                                                                    variant="outline"
                                                                    text="View Document"
                                                                    size="xs"
                                                                    className="font-normal"
                                                                />
                                                            </a>
                                                        )
                                                    }
                                                    width={7}
                                                    lineHeight="normal"
                                                />
                                                <InfoPair
                                                    label="Last Update"
                                                    value={
                                                        projectDocumentVersion.latest_update == "N/A"
                                                        ? (
                                                            <span className="italic text-muted-foreground">
                                                                No update available.
                                                            </span>
                                                        )
                                                        : (
                                                            <span>
                                                                {format(
                                                                    projectDocumentVersion.latest_update,
                                                                    "d MMMM yyyy kk:mm:ss"
                                                                )}
                                                            </span>
                                                        )
                                                    }
                                                    width={7}
                                                    lineHeight="normal"
                                                />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )) : <span className="italic text-center text-sm p-6 text-muted-foreground">No versions available.</span> }
                        </Accordion>
                    </Card>
                </>
            )}
        </DashboardLayout>
    );
}
