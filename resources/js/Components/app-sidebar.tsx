import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/Components/ui/sidebar-alt";
import {
    CalendarIcon,
    ChevronDown,
    ChevronsUpDown,
    Clipboard,
    Gauge,
    Home,
    KeyRound,
    UserRound,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { Link, usePage } from "@inertiajs/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Auth } from "@/types/model";
import { can, canAny } from "@/lib/utils";
import { useState } from "react";

export function AppSidebar(url: any) {
    type SidebarItem = {
        title: string;
        href: string;
        icon: React.ComponentType<any>;
        submenu?: { title: string; href: string }[];
    };

    const items: SidebarItem[] = [
        {
            title: "Monitoring",
            href: "/monitoring",
            icon: CalendarIcon,
        },
    ];

    const { auth  } = usePage<{ auth: Auth }>().props;
    const userPermissions = auth.permissions;

    can(userPermissions, 'Handle Owned Project') && items.unshift(
        {
            title: "Overview",
            href: "/dashboard",
            icon: Gauge,
        }
    );

    canAny(userPermissions, ["Create Project", "View Project", "Update Project", "Delete Project"])
    && items.push(
        {
            title: "Projects",
            href: "/projects",
            icon: Clipboard,
        }
    );

    can(userPermissions, 'Manage User') && items.push(
        {
            title: "Users",
            href: "/users",
            icon: UserRound,
        }
    );

    can(userPermissions, 'Manage Master Data') && items.push(
        {
            title: "Master Data",
            href: "/settings",
            icon: KeyRound,
            submenu: [
                {
                    title: "User Role",
                    href: route("user-roles.index"),
                },
                {
                    title: "User Position",
                    href: route("user-positions.index"),
                },
                {
                    title: "User Division",
                    href: route("user-divisions.index"),
                },
                {
                    title: "Project Business Type",
                    href: route("project-business-types.index"),
                },
            ],
        }
    );

    return (
        <Sidebar collapsible="icon" className="flex">
            <SidebarHeader className="px-6 border-b">
                <SidebarMenu>
                    <SidebarMenuItem className="py-3">
                        <SidebarMenuButton asChild>
                            <Link href={route("dashboard")}>
                                <img
                                    src="/img/icon.png"
                                    alt="APS Logo"
                                    className="w-8 m"
                                />
                                <span className="text-lg text-gray-700 dark:text-gray-400 font-bold ms-2">
                                    Document Tracer
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                if (item.submenu !== undefined) {
                                    let listSubMenu = item.submenu.map(
                                        (sub) => (
                                            <SidebarMenuSub
                                                key={sub.title}
                                                className="text-muted-foreground"
                                            >
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuButton asChild isActive={sub.href.includes(url.url)}>
                                                        <Link href={sub.href}>
                                                            <span className="ms-7">
                                                                {sub.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        )
                                    );

                                    return (
                                        <Collapsible
                                            defaultOpen={localStorage.getItem(`sidebar-${item.title}`) !== 'closed'}
                                            className="group/collapsible"
                                            key={item.title}
                                            onOpenChange={(open) => {
                                                localStorage.setItem(
                                                    `sidebar-${item.title}`,
                                                    open ? 'open' : 'closed'
                                                );
                                            }}
                                        >
                                            <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    className="hover:bg-red"
                                                    asChild
                                                    {...(item.href.includes(
                                                        url.url
                                                    )
                                                        ? { isActive: true }
                                                        : {})}
                                                >
                                                    <div>
                                                        <item.icon
                                                            size={32}
                                                        />
                                                        <span className="ms-7" style={{ fontWeight: 400 }}>
                                                            {item.title}
                                                        </span>
                                                        <ChevronDown className="ms-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                    </div>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {listSubMenu}
                                            </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                } else {
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className="py-1"
                                        >
                                            <SidebarMenuButton
                                                asChild
                                                {...(item.href.includes(url.url)
                                                    ? { isActive: true }
                                                    : {})}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon size={32} />
                                                    <span className="ms-7">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    );
}
