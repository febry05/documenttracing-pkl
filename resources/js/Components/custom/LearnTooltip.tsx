import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Info } from "lucide-react";
import { ReactElement } from "react";

export default function LearnTooltip({text, className}: {text: string | ReactElement, className: string}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={"hover:cursor-help " + className} type="button">
                    <Info size={14} className="text-neutral-700"/>
                </TooltipTrigger>
                <TooltipContent className="hover:cursor-normal">
                    { text }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
