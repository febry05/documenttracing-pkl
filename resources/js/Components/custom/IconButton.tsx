import { Button } from "@/Components/ui/button";
import { AlignJustifyIcon, LucideIcon } from "lucide-react";

interface PageProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'modify' | 'show' | 'warn',
    className?: string,
    icon: LucideIcon,
    text: string | JSX.Element,
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    disabled?: boolean,
}

export function IconButton({variant, className, icon, text, type, onClick, disabled}: PageProps) {
    const Icon = icon || AlignJustifyIcon;

    return (
        <Button className={className} variant={variant} type={type} onClick={onClick} disabled={disabled}>
            <Icon className="me-2" size={18} />
            {text}
        </Button>
    )
}
