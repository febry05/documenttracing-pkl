import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { UserRole } from "@/types/model";
import { dismissToast, showLoadingToast } from "@/lib/utils";

interface PageProps {
    data: UserRole,
}

export function UserRoleDeleteDialog({data}: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            const loadingToast = showLoadingToast("Please wait while we are deleting the user role.");
            router.delete(route('user-roles.destroy', data.id), {
                onBefore: () => {
                    setIsOpen(false);
                },
                onFinish: () => {
                    dismissToast(loadingToast as string);
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
