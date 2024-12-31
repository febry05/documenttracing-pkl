import { LucideIcon } from "lucide-react";
import { IconButton } from "./IconButton";
import { Link } from "@inertiajs/react";

export default function TitleSeparator({ title, className, button }: { title: string, className: string, button?: {
    href: string,
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    className?: string;
    icon: LucideIcon,
    text: string | JSX.Element,
    type?: "button" | "submit" | "reset"
} }) {
    return (
        <div className={"flex justify-between items-center " + className}>
            <span className="font-semibold text-neutral-600">
                {title}
            </span>
            { button && (
                <Link href={button.href}>
                    <IconButton icon={button.icon} text={button.text} className={button.className} variant={button.variant} type={button.type}/>
                </Link>
            )}
        </div>
    )
}
