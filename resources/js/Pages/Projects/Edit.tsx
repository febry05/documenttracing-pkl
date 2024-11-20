import { Head, router } from "@inertiajs/react";
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
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { ProjectBusinessType } from "@/types/model";
import { IconButton } from "@/Components/custom/IconButton";
import { ProjectDeleteDialog } from "./Components/Delete";
import { DatePicker } from "@/Components/custom/DatePicker";
import { Project } from "@/types/model";

const formSchema = z
    .object({
        name: z.string().min(5).max(255),
        code: z.string().min(3).max(20),
        customer: z.string().min(3).max(255),
        contract_number: z.string().min(3).max(30),
        contract_start: z.date(),
        contract_end: z.date(),
        user_profile_id: z.number(),
        project_business_type_id: z.number(),
    })
    .refine((data) => data.contract_end >= data.contract_start, {
        message:
            "Contract end date must be later than or equal to contract start date",
        path: ["contract_end"],
    });

type ProjectManager = {
    id: number;
    name: string;
};

interface PageProps {
    project: Project;
    projectBusinessTypes: ProjectBusinessType[];
    projectManagers: ProjectManager[];
}

export default function ProjectEdit({
    project,
    projectBusinessTypes,
    projectManagers,
}: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: project.name || "",
            code: project.code || "",
            customer: project.customer || "",
            contract_number: project.contract_number || "",
            contract_start: new Date(project.contract_start),
            contract_end: new Date(project.contract_end),
            user_profile_id: Number(project.user_profile_id),
            project_business_type_id: Number(project.project_business_type_id),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await router.put(route("projects.update", project.id), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <DashboardLayout
            header={<HeaderNavigation title="Edit Project" />}
        >
            <Head title="Edit Project" />

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
                                                        type="text"
                                                        placeholder="Enter the project's code"
                                                        {...field}
                                                        minLength={3}
                                                        maxLength={20}
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
                                                        {projectBusinessTypes.map(
                                                            (
                                                                projectBusinessType
                                                            ) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            projectBusinessType.id
                                                                        }
                                                                        value={projectBusinessType.id.toString()}
                                                                    >
                                                                        {
                                                                            projectBusinessType.name
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
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Person In Charge Field */}
                                    <FormField
                                        control={form.control}
                                        name="user_profile_id"
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
                                                        {projectManagers.map(
                                                            (
                                                                projectManager
                                                            ) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            projectManager.id
                                                                        }
                                                                        value={projectManager.id.toString()}
                                                                    >
                                                                        {
                                                                            projectManager.name
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
                            {/* Project Details [END] */}

                            {/* Dates Info [START] */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-sm">Dates</span>
                                <div className="grid xs:grid-rows-3 lg:grid-cols-3 gap-4">
                                    {/* Start Date Field */}
                                    <FormField
                                        control={form.control}
                                        name="contract_start"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>
                                                    Contract Start Date
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        date={field.value ? new Date(field.value) : undefined}
                                                        setDate={(date) => field.onChange(date)}
                                                        endYear={2090} // Set an appropriate end year
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* End Date Field */}
                                    <FormField
                                        control={form.control}
                                        name="contract_end"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>
                                                    Contract End Date
                                                    <span className="text-destructive ms-1">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        date={field.value ? new Date(field.value) : undefined}
                                                        setDate={(date) => {
                                                            // Ensure contract_end cannot be earlier than contract_start
                                                            if (date && (!form.getValues("contract_start") || date > new Date(form.getValues("contract_start")))) {
                                                                field.onChange(date);
                                                            }
                                                        }}
                                                        endYear={2090}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Dates Info [END] */}
                            </div>

                            <div className="flex flex-row-reverse gap-4">
                                <IconButton
                                    type="submit"
                                    icon={Save}
                                    text="Save"
                                />
                                <ProjectDeleteDialog project={project} />
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </DashboardLayout>
    );
}
