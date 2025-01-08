import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { UserRole } from "@/types/model";
import { toast } from "sonner";

interface PageProps {
    data: UserRole,
}

export function UserRoleDeleteDialog({data}: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            const loadingToast = toast.loading("Loading...", {
                description: "Please wait while we are updating the user position.",
            });
            router.delete(route('user-roles.destroy', data.id), {
                onBefore: () => {
                    form.reset();
                    setIsOpen(false);
                },
                onFinish: () => {
                    toast.dismiss(loadingToast);
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return(
        <FormDialog
            open={isOpen} onOpenChange={setIsOpen}
            trigger={
                {
                    text: "Delete",
                    icon: Trash2,
                    variant: "destructive"
                }
            }
            title="Delete User Role"
            description={
                <span>
                    Are you sure want to delete user role "
                    <strong>{data.name}</strong>
                    "?
                </span>
                }
            footer={
                <Form {...form}>
                    <form action="" method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                        <Button type="submit" variant="destructive">Yes, delete it</Button>
                    </form>
                </Form>
            }
        />
    )
}
