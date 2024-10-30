import { AlignJustifyIcon, ChevronLeft, LucideIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactElement } from "react";

export function HeaderNavigation({
    title,
    back,
    button,
}: PropsWithChildren<{
    title: string;
    back?: boolean;
    button?: JSX.Element;
}>) {
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
                {button}
            </div>
        </div>
    );
}
