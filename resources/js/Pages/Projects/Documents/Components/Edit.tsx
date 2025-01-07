import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import LearnTooltip from "@/Components/custom/LearnTooltip";
import { Input } from "@/Components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { IconButton } from "@/Components/custom/IconButton";
import { PenLine, Plus, Save } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Auth, Project, ProjectDocument } from "@/types/model";
import { can, handleNumericInput } from "@/lib/utils";
import { ProjectDocumentDeleteDialog } from "./Delete";
import { deadlineIntervals, weekdays } from "./Create";
import { Switch } from "@/Components/ui/switch";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    deadline_interval: z.number().min(1).max(30),
    weekly_deadline: z.number().optional(),
    monthly_deadline: z.number().min(1).max(31).optional(),
    priority: z.number(),
    is_auto: z.boolean().optional(),
});

type Priority = {
    key: number;
    value: string;
};

interface PageProps {
    priorities: Priority[];
    project: Project;
    projectDocument: ProjectDocument;
}

export default function ProjectDocumentEditDialog({
    priorities,
    project,
    projectDocument,
}: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: projectDocument.name || "",
            weekly_deadline: projectDocument.weekly_deadline || undefined,
            monthly_deadline: projectDocument.monthly_deadline || undefined,
            deadline_interval: projectDocument.deadline_interval || undefined,
            priority: projectDocument.priority,
            is_auto: projectDocument.is_auto || undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            router.put(
                route("projects.documents.update", [
                    project.id,
                    projectDocument.id,
                ]),
                values
            , {
                preserveScroll: true,
                onFinish: () => {
                    form.reset();
                    setIsOpen(false);
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;
    const userIsPIC = can(userPermissions, 'Handle Owned Project') && project.person_in_charge === auth.name;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit" variant="modify">
                    <PenLine className="me-2" size={18} />
                    Edit Document
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Project Document</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        action=""
                        method="POST"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-4">
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
                                                placeholder="Enter the project document's name"
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

                            <FormField
                                control={form.control}
                                name="deadline_interval"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Deadline Interval
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            value={
                                                field.value
                                                    ? String(field.value)
                                                    : ""
                                            }
                                            onValueChange={(value) =>
                                                field.onChange(
                                                    Number(value)
                                                )
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the project document's deadline interval" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {deadlineIntervals.map(
                                                    (deadlineInterval) => (
                                                        <SelectItem
                                                            key={
                                                                deadlineInterval.key
                                                            }
                                                            value={String(
                                                                deadlineInterval.key
                                                            )}
                                                        >
                                                            {
                                                                deadlineInterval.value
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

                            {form.watch("deadline_interval") === 2 && (
                                <FormField
                                    control={form.control}
                                    name="weekly_deadline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Weekly Deadline Day
                                                <span className="text-destructive ms-1">*</span>
                                            </FormLabel>
                                            <Select
                                                value={field.value ? String(field.value) : ""}
                                                onValueChange={(value) => field.onChange(Number(value))}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the project document's weekday deadline" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {weekdays.map((weekday) => (
                                                        <SelectItem key={weekday.key} value={String(weekday.key)}>
                                                            {weekday.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {form.watch("deadline_interval") === 3 && (
                                <FormField
                                    control={form.control}
                                    name="monthly_deadline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Monthly Deadline Date
                                                <span className="text-destructive ms-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter the project document's monthly deadline date"
                                                    {...field}
                                                    minLength={1}
                                                    maxLength={2}
                                                    min={1}
                                                    max={31}
                                                    value={field.value || ""}
                                                    onKeyDown={handleNumericInput}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Priority
                                            <span className="text-destructive ms-1">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            value={
                                                field.value
                                                    ? String(field.value)
                                                    : ""
                                            }
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            } // Simplify to direct update
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the project document's priority" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {priorities.map((priority) => (
                                                    <SelectItem
                                                        key={priority.key}
                                                        value={String(
                                                            priority.key
                                                        )}
                                                    >
                                                        {priority.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="is_auto"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-input px-4 py-2 space-y-0">
                                        <div className="space-y-0.5">
                                            <FormLabel className="flex gap-2">
                                                Generate Automatically
                                                <LearnTooltip
                                                    text={
                                                        <>
                                                            Automatically generate the next document version when the current document version deadline ends.
                                                            <br/>
                                                            <span className="font-bold text-destructive">This cannot be changed later when editing the document properties.</span>
                                                        </>
                                                    }
                                                    className="my-auto"
                                                />
                                            </FormLabel>
                                        </div>
                                        <FormControl className="mt-0">
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={true}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <div className="flex flex-row-reverse gap-4">
                                    <IconButton
                                        text="Save"
                                        icon={Save}
                                        type="submit"
                                    />
                                    {(can(userPermissions, "Delete Project Document") || userIsPIC) && (
                                        <ProjectDocumentDeleteDialog
                                            projectId={project.id}
                                            projectDocument={projectDocument}
                                        />
                                    )}
                                </div>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
