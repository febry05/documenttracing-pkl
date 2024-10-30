import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { FormDialog } from "@/Components/custom/FormDialog";
import { Button } from "@/Components/ui/button";
import { Form } from "@/Components/ui/form";
import { Trash2 } from "lucide-react";

interface PageProps {
    data: any,
}

export function UserPositionDeleteDialog({data}: PageProps) {
    const form = useForm();

    async function onSubmit() {
        try {
            await Inertia.delete(route('user-positions.destroy', data.id));
        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return(
        <FormDialog
            trigger={
                {
                    text: "Delete",
                    icon: Trash2,
                    variant: "destructive"
                }
            }
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
    )
}
