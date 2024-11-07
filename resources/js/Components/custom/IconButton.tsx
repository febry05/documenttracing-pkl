import { Button } from "@/Components/ui/button";
import { AlignJustifyIcon, LucideIcon } from "lucide-react";

interface PageProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    className?: string;
    icon: LucideIcon,
    text: string | JSX.Element,
    type?: string
}

export function IconButton({variant, className, icon, text, type}: PageProps) {
    const Icon = icon || AlignJustifyIcon;

    return (
        <Button className={className} variant={variant} type={type}>
            <Icon className="me-2" size={18} />
            {text}
        </Button>
    )
}
