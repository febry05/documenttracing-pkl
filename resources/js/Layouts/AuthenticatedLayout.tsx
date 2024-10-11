import { PropsWithChildren, ReactNode, useState } from "react";
import { Link } from "@inertiajs/react";
import { MenuItemProp, User } from "@/types";
import { CalendarIcon, CircleUser, Clipboard, KeyRound, LayoutDashboard, UserRound } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import Sidebar from "@/Components/Sidebar";
import MobileMenu from "@/Components/MobileMenu";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import AppearanceDropdown from "@/Components/AppearanceDropdown";

const links: MenuItemProp[] = [
    {
        title: "Dashboard",
        href: route("dashboard"),
        variant: "default",
        icon: LayoutDashboard
    },
    {
        title: "Projects",
        href: route("profile.edit"),
        variant: "ghost",
        icon: Clipboard,
    },
    {
        title: "Monitoring",
        href: route("profile.edit"),
        variant: "ghost",
        icon: CalendarIcon,
    },
    {
        title: "Users",
        href: route("profile.edit"),
        variant: "ghost",
        icon: UserRound,
    },
    {
        title: "Guest Token",
        href: route("profile.edit"),
        variant: "ghost",
        icon: KeyRound,
    },
];

export default function AuthenticatedLayout({
    user,
    header,
    children,
    title,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    title: String;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed"
        >
            <ResizablePanel
                defaultSize={16}
                minSize={8}
                maxSize={20}
                collapsedSize={3.5}
                collapsible={true}
                onCollapse={() => {
                    setIsCollapsed(true);
                }}
                onExpand={() => {
                    setIsCollapsed(false);
                }}
                className={cn("min-w-[65px] hidden md:block", {
                    "transition-all duration-300 ease-in-out": isCollapsed,
                })}
            >
                <Sidebar links={links} isCollapsed={isCollapsed} />
            </ResizablePanel>

            <ResizableHandle withHandle className={"hidden md:flex"} />

            <ResizablePanel className="h-full w-full flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <MobileMenu links={links} />

                    <div className="w-full flex-1 flex gap-4 justify-between items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <h1>{title}</h1>
                            </div>
                        </div>

                        <div className="space-x-4">
                            <AppearanceDropdown />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle user menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="cursor-pointer"
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="cursor-pointer w-full"
                                            href={route("logout")}
                                            method={"post"}
                                            as={"button"}
                                        >
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <ScrollArea className="px-6 pt-6 flex-1">
                    <div className="pb-4">{header}</div>

                    <div className="mb-6">{children}</div>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
