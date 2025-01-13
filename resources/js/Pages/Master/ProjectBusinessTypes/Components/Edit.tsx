import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inertia } from "@inertiajs/inertia";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { Save, Trash2 } from "lucide-react";
import { ProjectBusinessTypeDeleteDialog } from "./Delete";
import { router } from "@inertiajs/react";
import { ProjectBusinessType } from "@/types/model";
import { dismissToast, showLoadingToast } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
})

interface PageProps {
    data: ProjectBusinessType,
    closeDialog: () => void;
}

export default function ProjectBusinessTypeEditDialog({ data, closeDialog }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are updating the business project type.");
            router.put(route('project-business-types.update', data.id), values, {
                    preserveScroll: true,
                    onBefore: () => {
                        closeDialog();
                    },
                    onFinish: () => {
                        dismissToast(loadingToast as string);
                    },
                }
            );
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                        <span className="text-destructive ms-1">*</span>
                                    </FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter the project business type's name" {...field} minLength={3} maxLength={255} />
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
                                    <FormControl>
                                        <Textarea
                                        placeholder="Enter the project business type's description"
                                        className="resize-none"
                                        {...field}
                                        minLength={3} maxLength={255}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </form>
                    </Form>
                <div className="flex flex-row-reverse gap-4">
                    <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        <Save className="me-2" size={18} />
                        Save
                    </Button>
                    <ProjectBusinessTypeDeleteDialog data={data} closeDialog={closeDialog} />
                </div>
            </div>
        </div>
    );
}
