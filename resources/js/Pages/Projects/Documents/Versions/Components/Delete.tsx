import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { ProjectDocumentVersions } from "@/types/model";

interface PageProps {
    projectId: number,
    projectDocumentId: number,
    projectDocumentVersion: ProjectDocumentVersions,
}

export function ProjectDocumentVersionDeleteDialog({ projectId, projectDocumentId, projectDocumentVersion }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            await Inertia.delete(route('user.destroy', projectDocumentVersion.id), {
                onFinish: () => {
                    setIsOpen(false);
                    router.visit(route('user.project.document.show', [projectId, projectDocumentId]), { only: ['projectId', 'projectDocument'] });
                },
            });
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
