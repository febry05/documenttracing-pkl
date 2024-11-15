import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { IconButton } from "@/Components/custom/IconButton";
import InfoPair from "@/Components/custom/InfoPair";
import TitleSeparator from "@/Components/custom/TitleSeparator";
import { Card } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { Circle, PenLine, Plus } from "lucide-react";

function Update() {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <span className="font-semibold">
                    Extremity direction existence as dashwoods do up
                </span>
                Securing marianne led welcomed offended but offering six raptures. Conveying concluded newspaper rapturous oh at. Two indeed suffer saw beyond far former mrs remain.
            </div>
            <div className="flex flex-col basis-1/4 items-end">
                <span className="font-semibold">
                    Friday, 6 September 2024
                </span>
                14:33:29 WITA
            </div>
        </div>
    );
}

export default function ProjectDocumentVersionShow() {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Project Document Version Details"
                    button={
                        <Link href="{route('projects.documents.versions.edit', projectDocumentVersions)}">
                            <IconButton icon={PenLine} text="Edit Version" variant="modify"/>
                        </Link>
                    }
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto p-4 mb-4">
                <div className="flex flex-col gap-4 px-8 py-4">
                    <div className="grid grid-cols-2">
                        <InfoPair label="From Project" value="{projectDocumentVersion.from_project}" />
                        <InfoPair label="Monthly Deadline" value="{projectDocumentVersion.monthly_deadline}" />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Person In Charge" value="{projectDocumentVersion.from_project}" />
                        <InfoPair label="Last Update" value="{projectDocumentVersion.monthly_deadline}" />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Document Number" value="{projectDocumentVersion.from_project}" />
                        <InfoPair label="Days Remaining" value="{projectDocumentVersion.monthly_deadline}" />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="From Project" value="{projectDocumentVersion.from_project}" />
                        <InfoPair label="Priority" value="{projectDocumentVersion.monthly_deadline}" />
                    </div>
                    <div className="grid grid-cols-2">
                        <InfoPair label="Status" value="{projectDocumentVersion.from_project}" />
                        <InfoPair label="Latest File" value="{projectDocumentVersion.monthly_deadline}" />
                    </div>
                </div>
            </Card>

            <TitleSeparator
                title="Updates"
                button={
                    {
                        text: "Add New Update",
                        icon: Plus,
                        href: "route('projects.documents.create', project.id)",
                    }
                }
                className="mb-4"
            />

            <Card className="flex flex-col gap-4 p-8 mb-4">
                <Update />
                <Separator />
                <Update />
                <Separator />
                <Update />
            </Card>
        </DashboardLayout>
    );
}
