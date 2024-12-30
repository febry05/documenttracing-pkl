import { Link, usePage } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

const AutoBreadcrumb: React.FC = () => {
    const { url } = usePage();
    const pathnames = url.split('/').filter((x) => x);

    const generateBreadcrumbs = () => {
        const breadcrumbs = [
            <BreadcrumbItem key="home">
                <Link href={route('dashboard')}>
                    <span>Home</span>
                </Link>
            </BreadcrumbItem>
        ];

        pathnames.forEach((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            breadcrumbs.push(
                <BreadcrumbSeparator key={`sep-${index}`}>
                    <ChevronRight className="mt-0.5" />
                </BreadcrumbSeparator>
            );

            if (isLast) {
                breadcrumbs.push(
                    <BreadcrumbItem key={to} className="text-primary">
                        <span>{value.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                    </BreadcrumbItem>
                );
            } else {
                breadcrumbs.push(
                    <BreadcrumbItem key={to}>
                        {value === 'master' || (pathnames[index - 1] === 'users' || value === 'documents' || value === 'versions' || value === 'user roles')
                        ? (
                            <span className="text-neutral-400 dark:text-neutral-400">{value.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                        ) : (
                            <Link href={to}>
                                <span>{value.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                            </Link>
                        )}
                    </BreadcrumbItem>
                );
            }
        });

        return breadcrumbs;
    };

    return (
        <Breadcrumb>
            <BreadcrumbList className="font-normal text-neutral-500 dark:text-neutral-300 md:text-xs">
                {generateBreadcrumbs()}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export { AutoBreadcrumb };
