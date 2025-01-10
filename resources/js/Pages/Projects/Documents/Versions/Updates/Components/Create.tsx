import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { IconButton } from "@/Components/custom/IconButton";
import { Plus, Save } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { DateTimePicker } from "@/Components/custom/DateTimePicker";
import React from "react";
import { dismissToast, showLoadingToast } from "@/lib/utils";

const formSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().max(255).optional(),
    document_link: z.string().max(255).optional(),
    status: z.number(),
    release_date: z.date(),
});

interface PageProps {
    projectId: number;
    projectDocumentId: number;
    projectDocumentVersionId: number;
    statuses: { key: number; value: string }[];
}

export default function ProjectDocumentVersionUpdateCreateDialog({
    projectId,
    projectDocumentId,
    projectDocumentVersionId,
    statuses,
}: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            document_link: "",
            status: undefined,
            release_date: new Date(),
        },
    });
    const [open, setOpen] = React.useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are creating the project document version update.");
            router.post(
                route("projects.documents.versions.updates.store", {
                    project: projectId,
                    document: projectDocumentId,
                    version: projectDocumentVersionId,
                }),
                values, {
                    onBefore: () => {
                        setOpen(false);
                    },
                    onFinish: () => {
                        dismissToast(loadingToast as string);
                    },
                    onSuccess: () => {
                        form.reset();
                    },
                });
            } catch (error) {
            console.error("Submission error:", error);
        }
    }

    // console.log(projectDocumentId);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit">
                    <Plus className="me-2" size={18} />
                    Add New Update
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Update</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        action=""
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Title
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter the update title"
                                                {...field}
                                                minLength={1}
                                                maxLength={255}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        {/* <span className="text-destructive ms-1">
                                            *
                                        </span> */}
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the update description"
                                                className="resize-none"
                                                {...field}
                                                minLength={3}
                                                maxLength={255}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Status
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            value={
                                                field.value
                                                    ? String(field.value)
                                                    : ""
                                            }
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the update status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem
                                                        key={status.key}
                                                        value={String(
                                                            status.key
                                                        )}
                                                    >
                                                        {status.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="document_link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter the update document link"
                                                {...field}
                                                minLength={1}
                                                maxLength={255}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Leave blank to use the last document
                                            link.
                                        </FormDescription>
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
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <DateTimePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Pick the date the update was issued.
                                            Leave it if it's today.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <IconButton
                                    text="Save"
                                    icon={Save}
                                    type="submit"
                                />
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
