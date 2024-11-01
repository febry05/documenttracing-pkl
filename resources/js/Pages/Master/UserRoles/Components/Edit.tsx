import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inertia } from "@inertiajs/inertia";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { Save } from "lucide-react";
import { UserRoleDeleteDialog } from "./Delete";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
})

interface PageProps {
    data: any,
    closeDialog: () => void;
}

export default function UserRolesEditDialog({ data, closeDialog }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.put(route('user-roles.update', data.id), values, {
                onSuccess: () => closeDialog(),
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
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
                                            <Input type="text" placeholder="Enter the user role's name" {...field} minLength={3} maxLength={255} />
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
                                        placeholder="Enter the user role's description"
                                        className="resize-none"
                                        {...field}
                                        minLength={3} maxLength={255}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-row-reverse gap-4">
                            <Button type="submit">
                                <Save className="me-2" size={18} />
                                Save
                            </Button>
                            <UserRoleDeleteDialog data={data} />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
