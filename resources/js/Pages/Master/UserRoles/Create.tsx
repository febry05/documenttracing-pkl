import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
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

import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { Checkbox } from "@/Components/ui/checkbox";
import LearnTooltip from "@/Components/custom/LearnTooltip";
import { dismissToast, permissionGroups, showLoadingToast } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    permissions: z.string().array(),
});

type Permission = {
    id: number;
    name: string;
}

interface PageProps {
    permissions: Permission[],
}

export default function UserRoleCreate({ permissions }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: [],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are creating the user role.");
            router.post(route("user-roles.store"), values, {
                onBefore: () => {
                    form.reset();
                },
                onFinish: () => {
                    dismissToast(loadingToast as string);
                }
            });
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <DashboardLayout
            header={
                <HeaderNavigation title="Create User Role"/>
            }
        >
            <Head title="Create User Role" />

            <Card className="p-8">
            <Form {...form}>
                    <form
                        action=""
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-8">

                            {/* Role Data */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Role Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                                <span className="text-destructive ms-1">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter the user role's name"
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

                                {/* Role Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter the user role's description"
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
                            </div>

                            {/* Permission Data */}
                            <FormItem>
                                {/* Title & Description */}
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Role Permissions
                                        <span className="text-destructive ms-1">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormDescription>
                                        Select the permissions you want this role assigned to.
                                    </FormDescription>
                                </div>

                                {/* Checkboxes */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    {Object.values(permissionGroups).map((group) => (
                                            <div key={group.name} className="text-sm">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-sm">{group.name}</span>
                                                        {group.description && <LearnTooltip text={description} />}

                                                    </div>
                                                    {
                                                        group.permissions.map((permission) => (
                                                            <FormField
                                                                key={permission.name}
                                                                control={form.control}
                                                                name="permissions"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(permission.name)}
                                                                                onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange([...field.value, permission.name])
                                                                                    : field.onChange(
                                                                                        field.value.filter((value) => value !== permission.name)
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="text-sm flex gap-2 item-center hover:cursor-pointer">
                                                                            {permission.name}
                                                                            {permission.description && <LearnTooltip text={permission.description} />}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <FormMessage />
                            </FormItem>


                            <Button type="submit">Save</Button>

                        </div>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}
