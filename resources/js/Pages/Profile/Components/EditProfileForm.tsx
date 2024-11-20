import { router } from "@inertiajs/react";
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
import { Save } from "lucide-react";

import { handleNumericInput } from "@/lib/utils";
import { IconButton } from "@/Components/custom/IconButton";
import { User, UserDivision, UserPosition, UserRole } from "@/types/model";

const formSchema = z.object({
    email: z.string().min(5).max(255).email(),
    password: z.string().min(6).max(255).optional(),
    name: z.string().min(3).max(255),
    nik: z.string().min(16).max(16).optional(),
    phone: z.string().min(10).max(15).optional(),
    employee_no: z.string().min(7).max(7),
});

interface PageProps {
    user: User;
    userRoles: UserRole[];
    userPositions: UserPosition[];
    userDivisions: UserDivision[];
}

export default function EditProfileForm({
    user,
    userRoles,
    userPositions,
    userDivisions,
}: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user.email || "",
            password: user.password || "",
            name: user.name || "",
            nik: user.nik || "",
            phone: user.phone || "",
            employee_no: user.employee_no,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("awd");
            router.put(route("profile.update", user.id), values);
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Full Name
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        {...field}
                                        minLength={3}
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                        minLength={5}
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
                        name="employee_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Employee Number
                                    <span className="text-destructive ms-1">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your employee number"
                                        {...field}
                                        minLength={7}
                                        maxLength={7}
                                        onKeyDown={
                                            handleNumericInput
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* NIK Field */}
                    <FormField
                        control={form.control}
                        name="nik"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NIK</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your NIK"
                                        {...field}
                                        minLength={16}
                                        maxLength={16}
                                        onKeyDown={
                                            handleNumericInput
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Number Field */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="0812xxx"
                                        {...field}
                                        minLength={10}
                                        maxLength={15}
                                        onKeyDown={
                                            handleNumericInput
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <IconButton
                        className="mt-auto w-fit"
                        type="submit"
                        icon={Save}
                        text="Save"
                    />
                </div>
            </form>
        </Form>
    )
}
