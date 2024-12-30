import { PropsWithChildren, ReactNode, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar-alt";
import { AppSidebar } from "@/Components/app-sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/sonner";
import NotificationPanel from "./Components/NotificationPanel";
import ProfilePanel from "./Components/ProfilePanel";
import { Auth } from "@/types/model";
import { toast } from "sonner";

type User = {
    name: string;
    role: string;
};

type Flash = {
    success: string;
    error: string;
};

type Theme = "dark" | "light" | "system"

const FormSchema = z.object({
    search: z.string().min(2, {
        message: "Search must be at least 4 characters.",
    }),
});

export default function DashboardLayout({
    header,
    children,
}: PropsWithChildren<{
    header?: ReactNode;
}>) {
    const { auth, flash, notifications } = usePage<{
        auth: Auth;
        flash: Flash;
    }>().props;

    const fullName = auth.name.split(" ");
    const middleName = fullName[Math.floor((fullName.length / 2) | 0)];

    const user: User = {
        name: middleName,
        role: auth.role,
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            search: "",
        },
    });

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

    return (
        <SidebarProvider>
            <AppSidebar url={url} />
            <main className="w-full">
                <nav className="w-full p-3 px-4 flex border-b sticky top-0 z-10 bg-sidebar dark:bg-sidebar">
                    {/* Sidebar Trigger */}
                    <SidebarTrigger className="my-auto md:hidden" />

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
