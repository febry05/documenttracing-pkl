import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { Save } from "lucide-react";
import { UserPositionDeleteDialog } from "./Delete";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { router } from "@inertiajs/react";
import { UserDivision, UserPosition } from "@/types/model";
import { dismissToast, showLoadingToast } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    user_division_id: z.number(),
})

interface PageProps {
    data: UserPosition,
    userDivisions: UserDivision[],
    closeDialog: () => void;
}

export default function UserPositionEditDialog({ data, userDivisions, closeDialog }: PageProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
            user_division_id: data.user_division_id || undefined,
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const loadingToast = showLoadingToast("Please wait while we are updating the user position.");
            router.put(route('user-positions.update', data.id), values, {
                onBefore: () => {
                    closeDialog();
                },
                onFinish: () => {
                    dismissToast(loadingToast as string);
                },
                onSuccess: () => {
                    form.reset();
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
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
                    </form>
                </Form>

                <div className="flex flex-row-reverse gap-4">
                    <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        <Save className="me-2" size={18} />
                        Save
                    </Button>
                    <UserPositionDeleteDialog data={data} closeDialog={closeDialog} />
                </div>
            </div>
        </div>
    );
}
