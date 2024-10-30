import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { AlignJustifyIcon, LucideIcon } from "lucide-react"

interface PageProps {
    trigger: {
        text: string,
        icon?: LucideIcon,
    }
    title: string,
    description?: JSX.Element,
    content: JSX.Element,
    footer?: JSX.Element,
}

export function FormDialog({ trigger, title, description, content, footer }: PageProps) {
    const Icon = trigger?.icon || AlignJustifyIcon;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Icon className="me-2" size={18} />
                    {trigger.text}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                    {content}
                <DialogFooter>
                    {footer}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
