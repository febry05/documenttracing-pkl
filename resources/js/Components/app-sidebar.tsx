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
    ChevronsUpDown,
    Clipboard,
    Home,
    KeyRound,
    UserRound,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { Link } from "@inertiajs/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function AppSidebar(url: any) {
    const items = [
        {
            title: "Home",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "Projects",
            href: "/projects",
            icon: Clipboard,
        },
        {
            title: "Monitoring",
            href: "/monitoring",
            icon: CalendarIcon,
        },
        {
            title: "User",
            href: "/users",
            icon: UserRound,
        },
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
        },
    ];

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
                                                    <SidebarMenuButton asChild>
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
                                        <Accordion
                                            type="single"
                                            key={item.title}
                                            collapsible
                                        >
                                            <AccordionItem value="item-1" className="border-0">
                                                <AccordionTrigger className="p-0 border-0 hover:bg-accent hover:text-accent-foreground rounded pe-2">
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
                                                        </div>
                                                    </SidebarMenuButton>
                                                </AccordionTrigger>
                                                <AccordionContent className="flex flex-col text-muted-foreground">
                                                    {listSubMenu}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
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
