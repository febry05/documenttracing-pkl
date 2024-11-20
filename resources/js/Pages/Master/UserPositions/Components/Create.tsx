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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { UserDivision } from "@/types/model";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    user_division_id: z.number(),
});

interface PageProps {
    userDivisions: UserDivision[],
}

export default function UserPositionCreateDialog({ userDivisions }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            user_division_id: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await Inertia.post(route('user-positions.store'), values, {
                onFinish: () => {
                    setIsOpen(false);
                    router.visit(route('user-positions.index'), { only: ['userDivisions', 'userPositions'] });
                },
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit">
                    <Plus className="me-2" size={18} />
                    Create User Position
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User Position</DialogTitle>
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
                                                <Input type="text" placeholder="Enter the user position's name" {...field} minLength={3} maxLength={255} value={field.value || ''} />
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
                                            minLength={3} maxLength={255} value={field.value || ''}
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
                                        <Select
                                                value={field.value ? String(field.value) : ''}
                                                onValueChange={(value) => field.onChange(Number(value))}  // Simplify to direct update
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the user position's division" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {userDivisions.map((division) => (
                                                        <SelectItem key={division.id} value={String(division.id)}>
                                                            {division.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
