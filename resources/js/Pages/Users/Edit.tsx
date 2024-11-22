import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Card } from "@/Components/ui/card";
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

import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { handleNumericInput } from "@/lib/utils";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { useEffect, useState } from "react";
import { IconButton } from "@/Components/custom/IconButton";
import { UserDeleteDialog } from "./Components/Delete";
import { User, UserDivision, UserPosition, UserRole } from "@/types/model";

const formSchema = z.object({
    email: z.string().min(5).max(255).email(),
    password: z.string().max(255).optional(),
    roles_id: z.number(),
    name: z.string().min(3).max(255),
    nik: z.string().max(16).optional(),
    phone: z.string().max(15).optional(),
    employee_no: z.string().min(7).max(7),
    user_division_id: z.number(),
    user_position_id: z.number(),
});

interface PageProps {
    user: User;
    userRoles: UserRole[];
    userDivisions: UserDivision[];
    userPositions: UserPosition[];
}

export default function UsersEdit({
    user,
    userRoles,
    userDivisions,
    userPositions,
}: PageProps) {
    // console.log(user);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user.email || "",
            password: user.password || "",
            roles_id: Number(user.roles_id),
            name: user.name || "",
            nik: user.nik || "",
            phone: user.phone || "",
            employee_no: user.employee_no,
            user_division_id: Number(user.user_division_id),
            user_position_id: Number(user.user_position_id),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.put(route("users.update", user.id), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    const [availableUserPositions, setAvailableUserPositions] =
        useState(userPositions);
    const [selectedDivision, setSelectedDivision] = useState(
        user.user_division_id || null
    );

    // Filter positions based on division on mount and when division changes
    useEffect(() => {
        if (selectedDivision) {
            setAvailableUserPositions(
                userPositions.filter(
                    (pos) => pos.user_division_id === selectedDivision
                )
            );
        } else {
            setAvailableUserPositions([]);
        }
    }, [selectedDivision, userPositions]);

    // Handle division change to filter positions and update selected division
    const handleDivisionChange = (divisionId: number) => {
        setSelectedDivision(divisionId);
    };

    return (
        <DashboardLayout
            header={<HeaderNavigation title="Edit User" />}
        >
            <Head title="Edit User" />

            <Card className="p-8">
                <Form {...form}>
                    <form
                        action=""
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-8">
                            {/* Credentials info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    User Credentials Information
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
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
                                                        placeholder="Enter the user's email"
                                                        {...field}
                                                        minLength={5}
                                                        maxLength={255}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter the user's password"
                                                        {...field}
                                                        minLength={6}
                                                        maxLength={255}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Role Field */}
                                    <FormField
                                        control={form.control}
                                        name="roles_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Role
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                    defaultValue={
                                                        user.roles_id
                                                            ? user.roles_id.toString()
                                                            : ""
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the user's role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {userRoles.map(
                                                            (role) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            role.id
                                                                        }
                                                                        value={role.id.toString()}
                                                                    >
                                                                        {
                                                                            role.name
                                                                        }
                                                                    </SelectItem>
                                                                );
                                                            }
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Credentials info [END] */}

                            {/* Personal Info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    User Personal Information
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
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
                                                        placeholder="Enter the user's full name"
                                                        {...field}
                                                        minLength={3}
                                                        maxLength={255}
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
                                                        placeholder="Enter the user's NIK"
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
                                </div>
                            </div>
                            {/* Personal Info [END] */}

                            {/* Employee Info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    User Employee Information
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
                                    {/* Employee Number FIeld */}
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
                                                        placeholder="Enter the user's employee number"
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

                                    {/* Division Field */}
                                    <FormField
                                        control={form.control}
                                        name="user_division_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Division
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        handleDivisionChange(
                                                            Number(value)
                                                        );
                                                    }}
                                                    defaultValue={
                                                        user.user_division_id?.toString() ||
                                                        ""
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the user's division" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {userDivisions.map(
                                                            (division) => (
                                                                <SelectItem
                                                                    key={
                                                                        division.id
                                                                    }
                                                                    value={division.id.toString()}
                                                                >
                                                                    {
                                                                        division.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Position Field */}
                                    <FormField
                                        control={form.control}
                                        name="user_position_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Position
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <Select
                                                    // onValueChange={(value) => console.log('Selected position:', value)}
                                                    defaultValue={
                                                        user.user_position_id?.toString() ||
                                                        ""
                                                    }
                                                    disabled={
                                                        !availableUserPositions.length
                                                    } // Disable if no positions available
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                availableUserPositions.length
                                                                    ? "Select the user's position"
                                                                    : "Select division first"
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {availableUserPositions.map(
                                                            (position) => (
                                                                <SelectItem
                                                                    key={
                                                                        position.id
                                                                    }
                                                                    value={position.id.toString()}
                                                                >
                                                                    {
                                                                        position.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Employee Info [END] */}
                            <div className="flex flex-row-reverse gap-4">
                                <IconButton
                                    type="submit"
                                    icon={Save}
                                    text="Save"
                                />
                                <UserDeleteDialog data={user} />
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}
