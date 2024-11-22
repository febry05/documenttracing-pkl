import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
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

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { IconButton } from "@/Components/custom/IconButton";
import { Plus, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { handleNumericInput } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    base_deadline: z.number().min(1).max(31),
    deadline_interval: z.number().min(1).max(30),
    priority: z.number(),
    due_at: z.date(),
});

type Priority = {
    key: number,
    value: string,
};

interface PageProps {
    priorities: Priority[],
    projectId: number,
}

export default function ProjectDocumentCreateDialog(
    { priorities, projectId }
    : PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            base_deadline: undefined,
            deadline_interval:  1 | 3 | 7 | 30,
            priority: undefined,
            due_at: new Date(),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await router.post(route("projects.documents.store", projectId), values);
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    const deadlineIntervals = [
        { key: 1, value: 'Every 1 day' },
        { key: 3, value: 'Every 3 days' },
        { key: 7, value: 'Every 7 days' },
        { key: 30, value: 'Every 30 days' },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <IconButton text="Create Document" icon={Plus} className="w-fit"/> */}
                <Button className="w-fit" >
                    <Plus className="me-2" size={18} />
                    Create Document
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project Document</DialogTitle>
                </DialogHeader>

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
                                                <Input type="text" placeholder="Enter the project document's name" {...field} minLength={3} maxLength={255} value={field.value || ''} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="base_deadline"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Monthly Deadline Date
                                                <span className="text-destructive ms-1">*</span>
                                            </FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter the project document's monthly deadline date"
                                                        {...field}
                                                        minLength={1}
                                                        maxLength={2}
                                                        min={1}
                                                        max={31}
                                                        value={field.value || ''}
                                                        onKeyDown={handleNumericInput}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                                                <span className="text-destructive ms-1">*</span>
                                            </FormLabel>
                                            <Select
                                                    value={field.value ? String(field.value) : ''}
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the project document's deadline interval" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {deadlineIntervals.map((deadlineInterval) => (
                                                            <SelectItem key={deadlineInterval.key} value={String(deadlineInterval.key)}>
                                                                {deadlineInterval.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Priority
                                            <span className="text-destructive ms-1">*</span>
                                        </FormLabel>
                                        <Select
                                                value={field.value ? String(field.value) : ''}
                                                onValueChange={(value) => field.onChange(Number(value))}  // Simplify to direct update
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the project document's priority" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {priorities.map((priority) => (
                                                        <SelectItem key={priority.key} value={String(priority.key)}>
                                                            {priority.value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <IconButton text="Save" icon={Save} type="submit" />
                            </DialogFooter>
                        </div>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
