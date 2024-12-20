import { Badge } from '@/Components/ui/badge';

export default function PriorityBadge({ priority }: { priority: "High" | "Medium" | "Low" | undefined | string }) {
    let variant:string;

    if (priority === 'High') {
        variant = 'destructive';
    } else if (priority === 'Medium') {
        variant = '';
    } else {
        variant = 'secondary';
    }
    return (
        <Badge variant={variant as "destructive" | "secondary" | "default" | "outline" | undefined} className={priority === 'Medium' ? 'bg-yellow-300 hover:bg-yellow-400 text-foreground dark:text-background' : ''}>
            {priority}
        </Badge>
    )
}
