import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import InfoPair from "@/Components/custom/InfoPair";
import { Card } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import {
    Auth,
    Project,
    ProjectDocument,
    ProjectDocumentVersion,
    ProjectDocumentVersionUpdate,
} from "@/types/model";
import { Head, usePage } from "@inertiajs/react";
import ProjectDocumentVersionUpdateCreateDialog from "./Updates/Components/Create";
import { format } from "date-fns";
import TextLink from "@/Components/custom/TextLink";
import ProjectDocumentVersionEditDialog from "./Components/Edit";
import { Separator } from "@/Components/ui/separator";
import { can } from "@/lib/utils";
import Countdown from "@/Components/custom/Countdown";
import PriorityBadge from "@/Components/custom/PriorityBadge";
import StatusBadge from "@/Components/custom/StatusBadge";

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
        <div className="flex md:flex-row flex-col gap-6 bg-muted p-4 rounded-lg">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">
                    {projectDocumentVersionUpdate.title}
                </span>
                <span>
                    {projectDocumentVersionUpdate.description} {' '}
                </span>
                    {projectDocumentVersionUpdate.document_link && (<TextLink className="text-blue-800 text-sm" text="View Document" href={projectDocumentVersionUpdate.document_link}/>)}
            </div>
            {/* <Separator orientation="vertical"/> */}
            <div className="flex flex-col md:basis-2/5 md:items-end md:text-right md:ms-auto gap-2">
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
                <StatusBadge status={projectDocumentVersionUpdate.status_name} className="w-fit" />
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
    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;
    const userIsPIC = can(userPermissions, 'Handle Owned Project') && project.person_in_charge === auth.name;

    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Version Details"
                    button={(can(userPermissions, "Update Project Document Version") || userIsPIC) && (
                        <ProjectDocumentVersionEditDialog
                            project={project}
                            projectDocumentId={projectDocument.id}
                            projectDocumentVersion={projectDocumentVersion}
                        />
                    )}
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
                        value={
                            <PriorityBadge priority={projectDocument.priority_name} />
                        }
                    />
                    <InfoPair
                        label="Deadline"
                        value={projectDocumentVersion.deadline}
                    />
                    <InfoPair
                        label="Last Updated"
                        value={
                            projectDocumentVersionUpdates.length > 0
                                ? format(
                                      projectDocumentVersionUpdates[
                                          projectDocumentVersionUpdates.length -
                                              1
                                      ].updated_at,
                                      "EEEE, d MMMM yyyy, kk:mm:ss"
                                  )
                                : "N/A"
                        }
                    />
                    <InfoPair
                        label="Time Remaining"
                        value={
                            <Countdown startDate={new Date()} endDate={projectDocumentVersion.deadline} endText="Deadline Reached"/>
                        }
                    />
                    <InfoPair
                        label="Status"
                        value={
                            <StatusBadge status={projectDocumentVersion.latest_status_name} />
                        }
                    />
                    <InfoPair
                        label="Latest File"
                        value={
                            projectDocumentVersionUpdates.length > 0
                                ? projectDocumentVersionUpdates[
                                      projectDocumentVersionUpdates.length - 1
                                  ].document_link
                                : "N/A"
                        }
                    />
                </div>
            </Card>

            {(can(userPermissions, "View Project Document Version Update") || userIsPIC) && (
                <>
                    <HeaderNavigation
                        title="Updates"
                        size="md"
                        breadcrumb={false}
                        button={(can(userPermissions, "Create Project Document Version Update") || userIsPIC) && (
                            <ProjectDocumentVersionUpdateCreateDialog
                                projectId={project.id}
                                projectDocumentId={projectDocument.id}
                                projectDocumentVersionId={projectDocumentVersion.id}
                                statuses={statuses}
                            />
                        )}
                        className="mb-4"
                    />

                    <Card className="flex flex-col gap-4 p-8 mb-4">
                        {projectDocumentVersionUpdates.length === 0 && (
                            <span className="text-sm text-center">
                                No updates available.
                            </span>
                        )}
                        {projectDocumentVersionUpdates.map(
                            (projectDocumentVersionUpdate) => (
                                <div key={projectDocumentVersionUpdate.id}>
                                    <Update
                                        projectDocumentVersionUpdate={
                                            projectDocumentVersionUpdate
                                        }
                                    />
                                </div>
                            )
                        )}
                    </Card>
                </>
            )}
        </DashboardLayout>
    );
}
