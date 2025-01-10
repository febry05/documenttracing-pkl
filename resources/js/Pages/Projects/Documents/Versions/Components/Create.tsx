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
import { dismissToast, handleNumericInput, showLoadingToast } from "@/lib/utils";
import { DateTimePicker } from "@/Components/custom/DateTimePicker";
import { Switch } from "@/Components/ui/switch";
import React from "react";

const formSchema = z.object({
    document_number: z.string().min(1).max(30),
    release_date: z.date(),
});

type Priority = {
    key: number;
    value: string;
};

interface PageProps {
    projectId: number;
    projectDocumentId: number;
}

export default function ProjectDocumentVersionCreateDialog({
    projectId,
    projectDocumentId,
}: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            document_number: "",
            release_date: new Date(),
        },
    });

    const [open, setOpen] = React.useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are creating the project document version.");
            router.post(
                route("projects.documents.versions.store", [
                    projectId,
                    projectDocumentId,
                ]),
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit">
                    <Plus className="me-2" size={18} />
                    Create Version
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project Document Version</DialogTitle>
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
                                name="document_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Document Number
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter the project document's number"
                                                {...field}
                                                minLength={1}
                                                maxLength={30}
                                                value={field.value || ""}
                                            />
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
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <DateTimePicker
                                                value={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : undefined
                                                }
                                                onChange={(date) =>
                                                    field.onChange(date)
                                                }
                                                hideTime={true}
                                                placeholder="Select the contract start date"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Pick the date the document version
                                            was issued. Leave it if it's today.
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
