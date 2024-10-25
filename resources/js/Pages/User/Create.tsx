import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from '@inertiajs/inertia';
import { Head } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Save } from "lucide-react";

import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { handleNumericInput } from "@/lib/utils";

const formSchema = z.object({
    email: z.string().min(5).max(255).email(),
    password: z.string().min(6).max(255),
    user_role_id: z.number(),
    name: z.string().min(3).max(255),
    nik: z.string().min(16).max(16).optional(),
    phone: z.string().min(10).max(15).optional(),
    employee_no: z.string().min(7).max(7),
    user_division_id: z.number(),
})

type UserMasterData = {
    id: number;
    name: string;
}

interface PageProps {
    auth: {
        user: any;
    };
    roles: UserMasterData[];
    divisions: UserMasterData[];
    positions: UserMasterData[];
}

export default function Dashboard({ auth, roles, divisions, positions }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            user_role_id: undefined,
            name: '',
            nik: undefined,
            phone: undefined,
            employee_no: '',
            user_division_id: undefined,
            user_position_id: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.post(route('users.store'), values);
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <HeaderNavigation title="Create User" back={true}/>
            }
        >
            <Head title="Users" />

            <Card className="p-8">
                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
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
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Enter the user's email" {...field} minLength={5} maxLength={255} value={field.value || ''} />
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
                                                <FormLabel>
                                                    Password
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Enter the user's password" {...field} minLength={6} maxLength={255} value={field.value || ''} />
                                                    </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Role Field */}
                                    <FormField
                                        control={form.control}
                                        name="user_role_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Role
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? field.value.toString() : ''}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the user's role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {roles.map(role => {
                                                            return (
                                                                <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                                                            )
                                                        })}
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
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter the user's full name" {...field} minLength={3} maxLength={255} value={field.value || ''}/>
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
                                                        <Input type="text" placeholder="Enter the user's NIK" {...field} minLength={16} maxLength={16} value={field.value || ''} onKeyDown={handleNumericInput} />
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
                                                <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="0812xxx" {...field} minLength={10} maxLength={15} value={field.value || ''} onKeyDown={handleNumericInput} />
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
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Enter the user's employee number" {...field} minLength={7} maxLength={7} value={field.value || ''} onKeyDown={handleNumericInput} />
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
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? field.value.toString() : ''}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the user's division" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {divisions.map(division => {
                                                            return (
                                                                <SelectItem key={division.id} value={division.id.toString()}>{division.name}</SelectItem>
                                                            )
                                                        })}
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
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? field.value.toString() : ''}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the user's position" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {positions.map(position => {
                                                            return (
                                                                <SelectItem key={position.id} value={position.id.toString()}>{position.name}</SelectItem>
                                                            )
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Employee Info [END] */}

                            <div className="flex">
                                <Button className="ms-auto" type="submit">
                                    <Save size={18} className="me-2"/>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
}
