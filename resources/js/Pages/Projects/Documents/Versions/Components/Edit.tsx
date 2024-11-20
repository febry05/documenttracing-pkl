import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { IconButton } from "@/Components/custom/IconButton";
import { Plus, Save } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { DatePicker } from "@/Components/custom/DatePicker";
import { ProjectDocumentVersions } from "@/types/model";
import { ProjectDocumentVersionDeleteDialog } from "./Delete";

const formSchema = z.object({
    document_number: z.string().min(1).max(30),
    release_date: z.date(),
});

type Priority = {
    key: number,
    value: string,
};

interface PageProps {
    projectId: number,
    projectDocumentId: number,
    projectDocumentVersion: ProjectDocumentVersions,
}

export default function ProjectDocumentVersionEditDialog(
    { projectId, projectDocumentId, projectDocumentVersion }
    : PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            document_number: projectDocumentVersion.document_number || "",
            release_date: new Date(projectDocumentVersion.release_date),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await router.post(route("projects.documents.version.update", [projectId, projectDocumentId, projectDocumentVersion.id]), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit" >
                    <Plus className="me-2" size={18} />
                    Create Version
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project Document Version</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="document_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Document Number
                                            <span className="text-destructive ms-1">*</span>
                                        </FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter the project document's number" {...field} minLength={1} maxLength={30} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="release_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            Release Date
                                            <span className="text-destructive ms-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : undefined}
                                                setDate={(date) => field.onChange(date)}
                                                endYear={2090} // Set an appropriate end year
                                            />
                                        </FormControl>
                                            <FormDescription>
                                                Pick the date the document version was issued. Leave it if it's today.
                                            </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <div className="flex flex-row-reverse gap-4">
                                    <IconButton text="Save" icon={Save} type="submit" />
                                    <ProjectDocumentVersionDeleteDialog projectId={projectId} projectDocumentId={projectDocumentId} projectDocumentVersion={projectDocumentVersion} />
                                </div>
                            </DialogFooter>
                        </div>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
