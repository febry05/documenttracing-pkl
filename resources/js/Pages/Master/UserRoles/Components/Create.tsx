import { Button } from "@/Components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { CircleAlert, CircleCheck, Plus, TriangleAlert } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inertia } from "@inertiajs/inertia";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
})

export default function UserRolesCreateDialog() {
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
            Inertia.post(route('user-roles.store'), values, {
                onSuccess: () => {
                    setIsOpen(false);
                    toast(
                        <span className="text-primary">
                            <CircleCheck size={16} className="me-1"/>
                            Success!
                        </span>
                        , {
                        description: <span>User Role "<strong>{values.name}</strong>" has been added.</span>,
                        action: {
                            label: "Close",
                            onClick: () => console.log('User Role has been added.'),
                        }
                    });
                },
                onError: () => {
                    toast(
                    <span className="text-red">
                        <TriangleAlert size={16} className="me-1"/>
                        Error!
                    </span>
                    , {
                        description: <span>Problem occurred when adding User Role.</span>,
                        action: {
                            label: "Close",
                            onClick: () => console.log('Error adding User Role'),
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="me-2" size={18} />
                    Create User Role
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User Role</DialogTitle>
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
                                                <Input type="text" placeholder="Enter the user role's name" {...field} minLength={3} maxLength={255} value={field.value || ''} />
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
                                            placeholder="Enter the user role's description"
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
