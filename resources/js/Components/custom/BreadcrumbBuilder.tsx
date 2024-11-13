import { usePage } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export type Tree = {
    name: string;
    url?: string;
};

interface PageProps {
    tree: Tree[],
}

export default function BreadcrumbBuilder ({ tree }: PageProps) {

    const generateBreadcrumbs = () => {
        const breadcrumbs = [
            <BreadcrumbItem key="home">
                <BreadcrumbLink href={ route('dashboard') }>Home</BreadcrumbLink>
            </BreadcrumbItem>
        ];

        tree.forEach((value, index) => {
            const isLast = index === tree.length - 1;

            breadcrumbs.push(
                <BreadcrumbSeparator key={`sep-${index}`}>
                    <ChevronRight className="mt-0.5" />
                </BreadcrumbSeparator>
            );

            if (isLast) {
                breadcrumbs.push(
                    <BreadcrumbItem key={value.name} className="text-primary">
                        <span>{value.name}</span>
                    </BreadcrumbItem>
                );
            } else {
                breadcrumbs.push(
                    <BreadcrumbItem key={value.name}>
                        {value.url
                        ? (
                            <BreadcrumbLink className="hover:underline" href={value.url}>{value.name}</BreadcrumbLink>
                        ) : (
                            <span className="text-gray-600 dark:text-gray-400">{value.name}</span>
                        )}
                    </BreadcrumbItem>
                );
            }
        });

        return breadcrumbs;
    };

    return (
        <Breadcrumb>
            <BreadcrumbList className="font-normal text-gray-500 dark:text-gray-300">
                {generateBreadcrumbs()}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
