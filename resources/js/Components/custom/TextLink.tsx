import { Link } from "@inertiajs/react";
import { SquareArrowOutUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

export default function TextLink({ text = "Go to", href, className = "", iconClass="text-neutral-500", target }: { text?: string, href: string, className?: string, iconClass?: string, target?: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    { target
                        ? (
                            <a href={href} className={"hover:underline " + className} target={target}>
                                {text}
                                <SquareArrowOutUpRight size={12} className={"ms-1 my-auto inline " + iconClass} />
                            </a>
                        )
                        : (
                            <Link href={href} className={"hover:underline " + className}>
                                {text}
                                <SquareArrowOutUpRight size={12} className={"ms-1 my-auto inline " + iconClass} />
                            </Link>
                        )
                    }
                </TooltipTrigger>
                <TooltipContent>
                <p>Click to follow link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
