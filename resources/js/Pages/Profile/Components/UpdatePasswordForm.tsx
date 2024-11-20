import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Key, Save, Send } from "lucide-react";

import { IconButton } from "@/Components/custom/IconButton";
import { User } from "@/types/model";

const formSchema = z.object({
    password: z.string().min(6).max(255).optional(),
    password_new: z.string().min(6).max(255).optional(),
    password_confirmation: z.string().min(6).max(255).optional(),
});

interface PageProps {
    user: User;
}

export default function updatePasswordForm({
    user,
}: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            password_new: "",
            password_confirmation: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.put(route("profile.update", user.id), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <Form {...form}>
            <form
                action=""
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid md:grid-cols-3 gap-8 p-8">

                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Current Password
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your current password"
                                        {...field}
                                        minLength={6}
                                        maxLength={255}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="password_new"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    New Password
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your new password"
                                        {...field}
                                        minLength={6}
                                        maxLength={255}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Employee Number Field */}
                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    New Password Confirmation
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your new password again"
                                        {...field}
                                        minLength={6}
                                        maxLength={255}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="flex flex-row-reverse gap-4 mb-8 me-8">
                    <IconButton
                        className="ms-auto w-fit"
                        type="submit"
                        icon={Save}
                        text="Save"
                    />
                </div>


            </form>
        </Form>
    )
}
