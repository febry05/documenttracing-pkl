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
  } from "@/Components/ui/sidebar-alt"
import { Calendar, CalendarIcon, Clipboard, Home, Inbox, Search, Settings, UserRound } from "lucide-react"


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
          title: "Settings",
          href: "/settings",
          icon: Settings,
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
                                <span className="text-lg text-gray-700 font-bold ms-2">Document Tracer</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title} className="py-1">
                            <SidebarMenuButton asChild isActive={item.href.includes(url) ?? 'true'}>
                            {/* <SidebarMenuButton asChild> */}
                                <a href={item.href}>
                                    <item.icon size={32}/>
                                    <span className="ms-7">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}
