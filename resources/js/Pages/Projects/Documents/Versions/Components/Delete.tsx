import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { ProjectDocumentVersion } from "@/types/model";

interface PageProps {
    projectId: number,
    projectDocumentId: number,
    projectDocumentVersion: ProjectDocumentVersion,
}

export function ProjectDocumentVersionDeleteDialog({ projectId, projectDocumentId, projectDocumentVersion }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            router.delete(
                route("projects.documents.versions.destroy", [projectId, projectDocumentId, projectDocumentVersion.id]),
                {
                    preserveScroll: true,
                    onBefore: () => {
                        form.reset();
                        setIsOpen(false);
                    },
                }
            );
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return(
        <FormDialog
            open={isOpen} onOpenChange={setIsOpen}
            trigger={
                {
                    text: "Delete",
                    icon: Trash2,
                    variant: "destructive"
                }
            }
            title="Delete Project Document Version"
            description={
                <span>
                    Are you sure want to delete project document version "
                    <strong>{projectDocumentVersion.version}</strong>
                    "?
                </span>
                }
            footer={
                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                        <Button type="submit" variant="destructive">Yes, delete it</Button>
                    </form>
                </Form>
            }
        />
    )
}
