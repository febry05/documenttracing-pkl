import { Link } from "@inertiajs/react";
import { SquareArrowOutUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

export default function TextLink({ text = "Go to", href, className = "" }: { text?: string, href: string, className?: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={href} className={"hover:underline " + className}>
                        {text}
                        <SquareArrowOutUpRight size={12} className="ms-1 my-auto text-neutral-500 inline" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                <p>Click to follow link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
