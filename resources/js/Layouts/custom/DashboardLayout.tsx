import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar-alt";
import { AppSidebar } from "@/Components/app-sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/sonner";
import NotificationPanel from "./Components/NotificationPanel";
import ProfilePanel from "./Components/ProfilePanel";
import { Auth } from "@/types/model";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

type User = {
    name: string;
    role: string;
};

type Flash = {
    success: string;
    error: string;
};

type Theme = "dark" | "light" | "system"

export default function DashboardLayout({
    header,
    children,
}: PropsWithChildren<{
    header?: ReactNode;
}>) {
    const { auth, flash } = usePage<{
        auth: Auth;
        flash: Flash;
    }>().props;

    const fullName = auth.name.split(" ");
    const middleName = fullName[Math.floor((fullName.length / 2) | 0)];

    const user: User = {
        name: middleName,
        role: auth.role,
    };

    const { url } = usePage();

    useEffect(() => {
        if (flash.success) {
            toast.success("Success!", {
                description: flash.success,
                closeButton: true,
            });
        } else if (flash.error) {
            toast.error("Error!", {
                description: flash.error,
                closeButton: true,
            });
        }
    }, [flash]);

    // Get initial state from cookie
    const [open, setOpen] = useState(() => {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('sidebar:state='));
        return cookie ? cookie.split('=')[1] === 'true' : true;
    });

    // Handle sidebar state changes
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        document.cookie = `sidebar:state=${newOpen}; path=/; max-age=31536000`; // 1 year
    };

    return (
        <SidebarProvider
            defaultOpen={open}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <AppSidebar url={url} />
            <main className="w-full">
                <nav className="w-full p-3 px-4 flex border-b sticky top-0 z-10 bg-sidebar dark:bg-sidebar">
                    {/* Sidebar Trigger */}
                    <SidebarTrigger className="my-auto" />

                    <span className="ms-auto" />

                    {/* Notification Panel */}
                    {auth.permissions.includes("Handle Owned Project") && (
                        <NotificationPanel notifications={auth.notifications} />
                    )}

                    {/* Profile Panel */}
                    <ProfilePanel {...user} />
                </nav>
                <ScrollArea className="px-6 pt-4 flex-1">
                    <div className="pb-4 font-semibold text-xl leading-tight">
                        {header}
                    </div>
                    <div className="mb-6">{children}</div>
                    <Toaster richColors theme={localStorage.getItem("vite-ui-theme") as Theme || 'system'} duration={10000}/>
                </ScrollArea>
            </main>
        </SidebarProvider>
    );
}
