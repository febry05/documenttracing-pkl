import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inertia } from "@inertiajs/inertia";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { Save, Trash2 } from "lucide-react";
import { UserPositionDeleteDialog } from "./Delete";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { UserDivision } from "../../UserDivisions/columns";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    user_division_id: z.number(),
})

interface PageProps {
    data: any,
    userDivisions: UserDivision[],
    closeDialog: () => void;
}

export default function UserRolesEditDialog({ data, userDivisions, closeDialog }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
            user_division_id: data.user_divisino_id || undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.put(route('user-positions.update', data.id), values, {
                onSuccess: () => closeDialog(),
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
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
                                            <Input type="text" placeholder="Enter the user position's name" {...field} minLength={3} maxLength={255} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Enter the user position's description"
                                        className="resize-none"
                                        {...field}
                                        minLength={3} maxLength={255}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="user_division_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Division
                                        <span className="text-destructive ms-1">*</span>
                                    </FormLabel>
                                    <Select value={field.value ? field.value.toString() : ''} onValueChange={(value) => field.onChange(Number(value))}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the user position's division" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {userDivisions.map(division => {
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

                        <div className="flex flex-row-reverse gap-4">
                            <Button type="submit">
                                <Save className="me-2" size={18} />
                                Save
                            </Button>
                            <UserPositionDeleteDialog data={data} />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
