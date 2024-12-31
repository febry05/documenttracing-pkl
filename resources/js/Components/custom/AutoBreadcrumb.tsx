import { Link, usePage } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/Components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import { can } from '@/lib/utils';
import { Auth } from '@/types/model';

const AutoBreadcrumb: React.FC = () => {
    const { url } = usePage();
    const pathnames = url.split('/').filter((x) => x);

    const { auth } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;

    const generateBreadcrumbs = () => {
        const breadcrumbs = [
            <BreadcrumbItem key="home">
                    <Link href={route(can(userPermissions, 'Handle Owned Project') ? 'dashboard' : 'monitoring.index')}>
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
                        {value === 'master' || (pathnames[index - 1] === 'users' || value === 'documents' || value === 'versions' || pathnames[index - 1] === 'user-roles')
                        ? (
                            <span className="text-neutral-300 dark:text-neutral-300">{value.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
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
            <BreadcrumbList className="font-normal text-muted-foreground md:text-xs">
                {generateBreadcrumbs()}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export { AutoBreadcrumb };
