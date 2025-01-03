import { Badge } from '@/Components/ui/badge';

export default function StatusBadge({ status }: { status: "Completed" | "On Process" | "Pending" | "Not Started" | undefined | string }) {
    let variant: string;
    let className: string;

    if (status === 'Completed') {
        variant = 'default';
    } else if (status === 'Pending') {
        className = 'bg-yellow-300 hover:bg-yellow-300/90 text-foreground dark:text-background';
    } else if (status === 'On Process') {
        className = 'bg-emerald-600 hover:bg-emerald-600/90 text-foreground dark:text-background';
    } else {
        variant = 'secondary';
    }

    return (
        <Badge
            variant={variant as "destructive" | "secondary" | "default" | "outline" | undefined}
            className={className}
        >
            {status}
        </Badge>
    )
}