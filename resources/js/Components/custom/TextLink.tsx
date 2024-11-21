import { Link } from "@inertiajs/react";
import { SquareArrowOutUpRight } from "lucide-react";

export default function TextLink({ text = "Go to", href, className = "" }: { text?: string, href: string, className?: string }) {
    return (
        <Link href={href} className={"hover:underline flex " + className}>
            {text}
            <SquareArrowOutUpRight size={12} className="ms-2 my-auto text-gray-500" />
        </Link>
    );
}
