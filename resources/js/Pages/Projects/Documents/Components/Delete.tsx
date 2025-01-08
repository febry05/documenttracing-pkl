import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { ProjectDocument } from "@/types/model";

interface PageProps {
    projectId: number,
    projectDocument: ProjectDocument,
}

export function ProjectDocumentDeleteDialog({ projectId, projectDocument }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            router.delete(route('projects.documents.destroy', [projectId, projectDocument.id]), {
                onBefore: () => {
                    setIsOpen(false);
                    router.visit(route('projects.documents.show', ), { only: ['userDivisions', 'userPositions'] });
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return(
        <FormDialog open={isOpen} onOpenChange={setIsOpen}
            trigger={
                {
                    text: "Delete",
                    icon: Trash2,
                    variant: "destructive"
                }
            }
            title="Delete Project Document"
            description={
                <span>
                    Are you sure want to delete project document "
                    <strong>{projectDocument.name}</strong>
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
