import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inertia } from "@inertiajs/inertia";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
import { router } from "@inertiajs/react";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
})

export default function UserDivisionCreateDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            router.post(route('user-divisions.store'), values, {
                preserveScroll: true, // Keeps scroll position but reloads data
                onBefore: () => {
                    form.reset();
                    setIsOpen(false);
                }, // Closes the dialog on success
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit" >
                    <Plus className="me-2" size={18} />
                    Create User Division
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User Division</DialogTitle>
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
                                                <Input type="text" placeholder="Enter the user division's name" {...field} minLength={3} maxLength={255} value={field.value || ''} />
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
                                            placeholder="Enter the user division's description"
                                            className="resize-none"
                                            {...field}
                                            minLength={3} maxLength={255} value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">Save</Button>
                            </DialogFooter>
                        </div>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
