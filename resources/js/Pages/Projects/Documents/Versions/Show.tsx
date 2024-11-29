import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { IconButton } from "@/Components/custom/IconButton";
import InfoPair from "@/Components/custom/InfoPair";
import { Card } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import {
    Project,
    ProjectDocument,
    ProjectDocumentVersion,
    ProjectDocumentVersionUpdate,
} from "@/types/model";
import { Head, Link } from "@inertiajs/react";
import { PenLine, Plus } from "lucide-react";
import ProjectDocumentVersionUpdateCreateDialog from "./Updates/Components/Create";
import { format } from "date-fns";
import TextLink from "@/Components/custom/TextLink";
import ProjectDocumentVersionCreateDialog from "./Components/Create";
import ProjectDocumentVersionEditDialog from "./Components/Edit";
import { Separator } from "@/Components/ui/separator";

interface PageProps {
    project: Project;
    projectDocument: ProjectDocument;
    projectDocumentVersion: ProjectDocumentVersion;
    projectDocumentVersionUpdates: ProjectDocumentVersionUpdate[];
    statuses: { key: number; value: string }[];
}

function Update({
    projectDocumentVersionUpdate,
}: {
    projectDocumentVersionUpdate: ProjectDocumentVersionUpdate;
}) {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <span className="font-semibold">
                    {projectDocumentVersionUpdate.title}
                </span>
                {projectDocumentVersionUpdate.description}
            </div>
            <div className="flex flex-col basis-1/4 items-end text-right ms-auto">
                <span className="font-semibold">
                    {format(
                        projectDocumentVersionUpdate.created_at,
                        "EEEE, d MMMM yyyy"
                    )}
                </span>
                <div>
                    <span className="text-muted-foreground">at </span>
                    {format(
                        projectDocumentVersionUpdate.created_at,
                        "kk:mm:ss"
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProjectDocumentVersionShow({
    project,
    projectDocument,
    projectDocumentVersion,
    projectDocumentVersionUpdates,
    statuses,
}: PageProps) {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Version Details"
                    button={
                        <ProjectDocumentVersionEditDialog
                            projectId={project.id}
                            projectDocumentId={projectDocument.id}
                            projectDocumentVersion={projectDocumentVersion}
                        />
                    }
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto mb-4">
                <div className="grid md:grid-cols-2 gap-8 p-8">
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
                        label="Part of Document"
                        value={
                            <TextLink
                                text={projectDocument.name}
                                href={route("projects.documents.show", [
                                    project.id,
                                    projectDocument.id,
                                ])}
                            />
                        }
                    />
                    <InfoPair
                        label="Document Number"
                        value={projectDocumentVersion.document_number}
                    />
                    <InfoPair
                        label="Person In Charge"
                        value={project.person_in_charge}
                    />
                    <InfoPair
                        label="Priority"
                        value={projectDocument.priority}
                    />
                    <InfoPair
                        label="Deadline"
                        value={projectDocument.deadline}
                    />
                    <InfoPair
                        label="Last Updated"
                        value={
                            projectDocumentVersionUpdates.length > 0
                                ? format(
                                      projectDocumentVersionUpdates[0]
                                          .created_at,
                                      "EEEE, d MMMM yyyy, kk:mm:ss"
                                  )
                                : "N/A"
                        }
                    />
                    <InfoPair
                        label="Days Remaining"
                        value={
                            Math.ceil(
                                (new Date(projectDocument.deadline).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 60 * 60 * 24)
                            ) + " Days Left"
                        }
                    />
                    <InfoPair
                        label="Status"
                        value={
                            projectDocumentVersionUpdates.length > 0
                                ? projectDocumentVersionUpdates[0].status
                                : "N/A"
                        }
                    />
                    <InfoPair
                        label="Latest File"
                        value={
                            projectDocumentVersionUpdates.length > 0
                                ? projectDocumentVersionUpdates[0].document_link
                                : "N/A"
                        }
                    />
                </div>
            </Card>

            <HeaderNavigation
                title="Updates"
                size="md"
                breadcrumb={false}
                button={
                    <ProjectDocumentVersionUpdateCreateDialog
                        projectId={project.id}
                        projectDocumentId={projectDocument.id}
                        projectDocumentVersionId={projectDocumentVersion.id}
                        statuses={statuses}
                    />
                }
                className="mb-4"
            />

            <Card className="flex flex-col gap-4 p-8 mb-4">
                {projectDocumentVersionUpdates.length === 0 && (
                    <span className="text-sm text-center">
                        There are no updates yet.
                    </span>
                )}
                {projectDocumentVersionUpdates.map(
                    (projectDocumentVersionUpdate) => (
                        <>
                            <Update
                                projectDocumentVersionUpdate={
                                    projectDocumentVersionUpdate
                                }
                            />
                            {projectDocumentVersionUpdates.indexOf(
                                projectDocumentVersionUpdate
                            ) !==
                                projectDocumentVersionUpdates.length - 1 && (
                                <Separator />
                            )}
                        </>
                    )
                )}
            </Card>
        </DashboardLayout>
    );
}
