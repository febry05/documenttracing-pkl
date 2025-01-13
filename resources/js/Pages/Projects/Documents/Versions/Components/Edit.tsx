import { router, usePage } from "@inertiajs/react";
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
import { PenLine, Save } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Auth, Project, ProjectDocumentVersion } from "@/types/model";
import { ProjectDocumentVersionDeleteDialog } from "./Delete";
import { DateTimePicker } from "@/Components/custom/DateTimePicker";
import { can, dismissToast, showLoadingToast } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
    document_number: z.string().min(1).max(30),
    release_date: z.date(),
});

interface PageProps {
    project: Project,
    projectDocumentId: number,
    projectDocumentVersion: ProjectDocumentVersion,
}

export default function ProjectDocumentVersionEditDialog(
    { project, projectDocumentId, projectDocumentVersion }
    : PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            document_number: projectDocumentVersion.document_number || "",
            release_date: new Date(projectDocumentVersion.release_date),
        },
    });
    const [isOpen, setIsOpen] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are updating the project document version.");
            router.put(
                route("projects.documents.versions.update", [project.id, projectDocumentId, projectDocumentVersion.id]), values, {
                    preserveScroll: true,
                    onBefore: () => {
                        setIsOpen(false);
                    },
                    onFinish: () => {
                        dismissToast(loadingToast as string);
                    },
                }
            );
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;
    const userIsPIC = can(userPermissions, 'Handle Owned Project') && project.person_in_charge === auth.name;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit" variant="modify">
                    <PenLine className="me-2" size={18} />
                    Edit Version
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Project Document Version</DialogTitle>
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
                                            <DateTimePicker
                                                value={field.value ? new Date(field.value) : undefined}
                                                onChange={(date) => field.onChange(date)}
                                                hideTime={true}
                                                placeholder="Select the contract start date"
                                            />
                                        </FormControl>
                                            <FormDescription>
                                                Pick the date the document version was issued. Leave it if it's today.
                                            </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

                <DialogFooter>
                    <div className="flex flex-row-reverse gap-4">
                        <IconButton text="Save" icon={Save} type="submit" onClick={form.handleSubmit(onSubmit)}/>
                        { (can(userPermissions, 'Delete Project Document Version') || userIsPIC)
                            && <ProjectDocumentVersionDeleteDialog projectId={project.id} projectDocumentId={projectDocumentId} projectDocumentVersion={projectDocumentVersion} />
                        }
                    </div>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
