import { Button } from "@/Components/ui/button";
import { AlignJustifyIcon, LucideIcon } from "lucide-react";

interface PageProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    className?: string;
    icon: LucideIcon,
    text: string | JSX.Element,
}

export function iconButton({variant, className, icon, text}: PageProps) {
    const Icon = icon || AlignJustifyIcon;

    return (
        <Button className={className} variant={variant}>
            <Icon className="me-1" size={18} />
            {text}
        </Button>
    )
}
