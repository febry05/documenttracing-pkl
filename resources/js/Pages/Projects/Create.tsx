import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from "zod";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
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
import { CalendarIcon, Save } from "lucide-react";

import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { cn, handleNumericInput } from "@/lib/utils";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { useState } from 'react';
import { ProjectBusinessType } from "../Master/ProjectBusinessTypes/columns";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/Components/ui/calendar";

const formSchema = z.object({
    name: z.string().min(5).max(255),
    code: z.string().min(3).max(20),
    customer: z.string().min(3).max(255),
    contract_number: z.string().min(3).max(30),
    contract_start: z.date(),
    contract_end: z.date(),
    user_id : z.number(),
    project_business_type_id: z.number(),
});

type ProjectManager = {
    id: number;
    name: string;
}

interface PageProps {
    projectBusinessTypes: ProjectBusinessType[];
    projectManagers: ProjectManager[];
}

export default function UsersCreate({ projectBusinessTypes, projectManagers }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "",
            customer: "",
            contract_number: "",
            contract_start: undefined,
            contract_end: undefined,
            user_id: undefined,
            project_business_type_id: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await router.post(route("projects.store"), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <DashboardLayout
            header={
                <HeaderNavigation title="Create Project" back={true}/>
            }
        >
            <Head title="Create Project" />

            <Card className="p-8">
                <Form {...form}>
                    <form
                        action=""
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-8">

                            {/* Project info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    Project Information
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
                                    {/* Name Field */}
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
                                                        placeholder="Enter the project's name"
                                                        {...field}
                                                        minLength={5}
                                                        maxLength={255}
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Project Code Field */}
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Project Code
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter the project's code"
                                                        {...field}
                                                        minLength={3}
                                                        maxLength={20}
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Role Field */}
                                    <FormField
                                        control={form.control}
                                        name="contract_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Contract Number
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter the project's contract number"
                                                        {...field}
                                                        minLength={3}
                                                        maxLength={30}
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Project info [END] */}

                            {/* Project Details [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    Customer & Person in Charge Information
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
                                    {/* Business Type Field */}
                                    <FormField
                                        control={form.control}
                                        name="project_business_type_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Business Type
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
                                                        field.value
                                                            ? field.value.toString()
                                                            : ""
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the project's business type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {projectBusinessTypes.map(projectBusinessType => {
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        projectBusinessType.id
                                                                    }
                                                                    value={projectBusinessType.id.toString()}
                                                                >
                                                                    {projectBusinessType.name}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Customer Field */}
                                    <FormField
                                        control={form.control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Customer
                                                    <span className="text-destructive ms-1">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter the project's customer"
                                                        {...field}
                                                        minLength={3}
                                                        maxLength={255}
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Person In Charge Field */}
                                    <FormField
                                        control={form.control}
                                        name="user_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Person in Charge
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
                                                        field.value
                                                            ? field.value.toString()
                                                            : ""
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the project's person in charge" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {projectManagers.map(projectManager => {
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        projectManager.id
                                                                    }
                                                                    value={projectManager.id.toString()}
                                                                >
                                                                    {projectManager.name}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {/* Project Details [END] */}

                            {/* Dates Info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">
                                    Dates
                                </span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
                                    {/* Start Date Field */}
                                    <FormField
                                        control={form.control}
                                        name="contract_start"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Contract Start Date
                                                <span className="text-destructive ms-1">
                                                        *
                                                </span>
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick project's contract start date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Division Field */}
                                    <FormField
                                        control={form.control}
                                        name="contract_end"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Contract End Date
                                                <span className="text-destructive ms-1">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick project's contract end date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            {/* Dates Info [END] */}

                        </div>

                            <div className="flex">
                                <Button className="ms-auto" type="submit">
                                    <Save size={18} className="me-2" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}