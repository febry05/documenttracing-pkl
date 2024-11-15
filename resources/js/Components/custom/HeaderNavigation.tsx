import { PropsWithChildren } from "react";
import { AutoBreadcrumb } from "./AutoBreadcrumb";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ChevronLeft } from "lucide-react";
import BreadcrumbBuilder from "./BreadcrumbBuilder";

export function HeaderNavigation({
    title,
    back,
    button,
    breadcrumb = true,
    size = "xl",
    className,
}: PropsWithChildren<{
    title: string;
    back?: string;
    button?: JSX.Element;
    breadcrumb?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
}>) {
    return (
        <div className={"flex gap-3 flex-col md:justify-between md:items-center md:flex-row " + className}>
            <div className="grid grid-row-2 gap-1">
                <span className={"font-semibold leading-tight text-" + (size) }>
                    {title}
                </span>

                {back && (
                <Link href={back}>
                    <Button variant="link" className="p-0">
                        <ChevronLeft className="me-1" size={18} />
                        <span className="mb-0.5">Back</span>
                    </Button>
                </Link>
                )}

                {breadcrumb && (
                    <AutoBreadcrumb />
                )}

                {/* {breadcrumb && (
                    <BreadcrumbBuilder tree={breadcrumb}/>
                )} */}
            </div>
            {button}
        </div>
    );
}
