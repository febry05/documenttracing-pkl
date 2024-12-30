import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { UserDivision } from "@/types/model";

interface PageProps {
    data: UserDivision,
    closeDialog?: () => void;
}

export function UserDivisionDeleteDialog({data, closeDialog}: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            router.delete(route('user-divisions.destroy', data.id), {
                preserveScroll: true, // Keeps scroll position but reloads data
                onFinish: () => {
                    setIsOpen(false);
                    if (closeDialog) {
                        closeDialog(); // This will close both dialogs
                    }
                    form.reset();
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return(
        <FormDialog open={isOpen} onOpenChange={setIsOpen}
            trigger={
                {
                    text: "Delete",
                    icon: Trash2,
                    variant: "destructive"
                }
            }
            title="Delete User Division"
            description={
                <span>
                    Are you sure want to delete user division "
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
