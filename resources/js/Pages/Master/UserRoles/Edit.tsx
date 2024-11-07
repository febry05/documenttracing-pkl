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
import { UserRoleDeleteDialog } from "./Components/Delete";
import { IconButton } from "@/Components/custom/IconButton";
import { Save } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(5).max(255).optional(),
    permissions: z.string().array(),
});

type Role = {
    id?: number;
    name: string;
    description: string;
}

type Permission = {
    id: number;
    name: string;
}

interface PageProps {
    role: Role,
    permissions: Permission[],
    rolePermissions: string[],
}

export default function UserRolesEdit({ role, permissions, rolePermissions }: PageProps) {
    console.log(rolePermissions);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: role.name || '',
            description: role.description || '',
            permissions: rolePermissions || [],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await router.put(route("user-roles.update", role.id), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <DashboardLayout
            header={
                <HeaderNavigation title="Edit User Role" back={true}/>
            }
        >
            <Head title="Edit User Role" />

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
                                    <FormLabel className="text-base">Role Permissions</FormLabel>
                                    <FormDescription>
                                        Select the permissionss you want this role assigned to.
                                    </FormDescription>
                                </div>

                                {/* Checkboxes */}
                                <div className="grid grid-cols-4 grid-flow-row gap-4">
                                    {permissions.map((permission) => (
                                        <FormField
                                        key={permission.id}
                                        control={form.control}
                                        name="permissions"
                                        render={({ field }) => {
                                            return (
                                            <FormItem
                                                key={permission.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(permission.name)}
                                                        onCheckedChange={(checked) => {
                                                            const updatedPermissions = checked
                                                                ? [...field.value, permission.name]
                                                                : field.value.filter((value) => value !== permission.name);
                                                            field.onChange(updatedPermissions);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {permission.name}
                                                </FormLabel>
                                            </FormItem>
                                            )
                                        }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>

                            <div className="flex flex-row-reverse gap-4">
                                <IconButton type="submit" icon={Save} text="Save"/>
                                <UserRoleDeleteDialog data={role}/>
                            </div>

                        </div>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}