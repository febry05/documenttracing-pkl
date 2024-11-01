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
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    }
    title: string,
    description?: JSX.Element | string,
    content?: JSX.Element | string,
    footer?: JSX.Element,
    open?: boolean,
    onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>,
}

export function FormDialog({ trigger, title, description, content, footer, open, onOpenChange }: PageProps) {
    const Icon = trigger?.icon || AlignJustifyIcon;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant={trigger.variant}>
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
