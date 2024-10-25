import { AlignJustifyIcon, ChevronLeft, LucideIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export function HeaderNavigation({
    title,
    back,
    button,
}: PropsWithChildren<{
    title: string;
    back?: boolean;
    button?: {
        text: string;
        icon: LucideIcon;
        link: string;
    };
}>) {
    const Icon = button?.icon || AlignJustifyIcon;

    return (
        <div className="grid grid-row-2">
            <span className="font-semibold text-xl leading-tight">
                {title}
            </span>
            <div className="flex justify-between">
                {back && (
                    <Button variant="link" className="p-0" onClick={() => history.back()}>
                        <ChevronLeft className="me-1" size={18} />
                        <span className="mb-0.5">Back</span>
                    </Button>
                )}
                {button && (
                    <Link href={button.link}>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                            <Icon className="me-2" size={18} />
                            {button.text}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
