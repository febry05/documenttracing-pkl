import React from "react"
import { usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
  } from "@/Components/ui/sidebar-alt"
import { Calendar, CalendarIcon, ChevronsUpDown, Clipboard, Home, Inbox, KeyRound, Search, Settings, UserRound } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";


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
          submenu : [
            {
                title: "User Role",
                href: route('user-roles.index'),
            },
            {
                title: "User Position",
                href: route('user-positions.index'),
            },
            {
                title: "User Division",
                href: route('user-divisions.index'),
            },
            {
                title: "Project Business Type",
                href: route('project-business-types.index'),
            },
            ]
        },
      ]

    return (
        <Sidebar collapsible="icon" className="flex">
            <SidebarHeader className="px-6 border-b">
                <SidebarMenu>
                    <SidebarMenuItem className="py-3">
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <img src="/img/icon.png" alt="APS Logo" className="w-8 m"/>
                                <span className="text-lg text-gray-700 dark:text-gray-400 font-bold ms-2">Document Tracer</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) =>
                            {
                                if(item.submenu !== undefined) {
                                    let listSubMenu = item.submenu.map(sub =>
                                        <SidebarMenuSub key={sub.title} className="text-muted-foreground">
                                            <SidebarMenuSubItem>
                                                <SidebarMenuButton>
                                                <a href={sub.href}>
                                                    <span className="ms-7">{sub.title}</span>
                                                </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    );
                                    return (
                                        <Collapsible key={item.title} className="group/collapsible">
                                            <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton asChild isActive={item.href.includes(url) ?? 'true'}>
                                                    <div>
                                                        <item.icon size={32}/>
                                                        <span className="ms-7">{item.title}</span>
                                                        <ChevronsUpDown className="ms-auto"/>
                                                    </div>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {listSubMenu}
                                            </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                } else {
                                    return (
                                        <SidebarMenuItem key={item.title} className="py-1">
                                            <SidebarMenuButton asChild isActive={item.href.includes(url) ?? 'true'}>
                                                <a href={item.href}>
                                                    <item.icon size={32}/>
                                                    <span className="ms-7">{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }
                            }
                        )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}
