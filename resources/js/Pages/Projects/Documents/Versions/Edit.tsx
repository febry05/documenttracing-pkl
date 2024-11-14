import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { IconButton } from "@/Components/custom/IconButton";
import { Card } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export default function ProjectDocumentVersionEdit() {
    return (
        <DashboardLayout
            header={
                <HeaderNavigation
                    title="Projects List"
                    button={
                        <Link href={route("projects.create")}>
                            {/* <IconButton /> */}
                        </Link>
                    }
                />
            }
        >
            <Head title="Projects" />

            <Card className="flex-auto basis-1/2 p-4">
                Project Document Version Edit
            </Card>
        </DashboardLayout>
    );
}
