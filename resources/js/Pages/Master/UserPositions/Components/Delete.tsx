import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { UserPosition } from "@/types/model";

interface PageProps {
    data: UserPosition,
    closeDialog: () => void;
}

export function UserPositionDeleteDialog({ data, closeDialog }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm();

    async function onSubmit() {
        try {
            router.delete(route('user-positions.destroy', data.id), {
                onFinish: () => {
                    setIsOpen(false);
                    closeDialog(); // Close both dialogs
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <FormDialog open={isOpen} onOpenChange={setIsOpen}
            trigger={{
                text: "Delete",
                icon: Trash2,
                variant: "destructive"
            }}
            title="Delete User Position"
            description={
                <span>
                    Are you sure want to delete user position "
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
    );
}
