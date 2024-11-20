import { PropsWithChildren, ReactNode, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar-alt";
import { AppSidebar } from "@/Components/app-sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
    CircleCheck,
    TriangleAlert,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import NotificationPanel from "./Components/NotificationPanel";
import ProfilePanel from "./Components/ProfilePanel";

type User = {
    name: string;
    role: string;
};

type Auth = {
    name: string;
    role: string;
};

type Flash = {
    success: string;
    error: string;
};

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
    const { auth, flash, notifications } = usePage<{ auth: Auth; flash: Flash; notifications: Notification[] }>().props;

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

    function onSubmit(data: z.infer<typeof FormSchema>) {}

    const { url } = usePage();

    useEffect(() => {
        if (flash.success) {
            console.log(flash.success);
            toast(
                <span className="text-primary flex">
                    <CircleCheck size={16} className="me-1" />
                    Success!
                </span>,
                {
                    description: flash.success,
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                }
            );
        } else if (flash.error) {
            toast(
                <span className="text-primary flex">
                    <TriangleAlert size={16} className="me-1" />
                    Error!
                </span>,
                {
                    description: flash.error,
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                }
            );
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar url={url} />
            <main className="w-full">
                <nav className="w-full p-3 px-4 flex border-b sticky top-0 z-10 bg-sidebar dark:bg-sidebar">
                    <SidebarTrigger className="my-auto" />

                    {/* Search Bar */}
                    {/* <div className="rounded-full bg-white hover:bg-gray-100 flex ms-4 w-72">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem className="flex">
                                        <FormControl>
                                            <Input className="rounded-full border-0 shadow-none h-13" placeholder="Search anything..." {...field} />
                                        </FormControl>
                                        <Button className="rounded-full h-13 w-13" type="submit" size="icon">
                                            <Search/>
                                        </Button>
                                    </FormItem>
                                )}
                                />

                                <FormMessage />
                            </form>
                        </Form>
                    </div> */}

                    <div className="ms-auto">
                        <Button
                            variant="outline"
                            onClick={() =>
                                toast("Event has been created", {
                                    description:
                                        "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })
                            }
                        >
                            Show Toast
                        </Button>
                    </div>

                    {/* Notification Panel */}
                    <NotificationPanel notifications={notifications}/>

                    {/* Profile Panel */}
                    <ProfilePanel {...user} />
                </nav>
                <ScrollArea className="px-6 pt-4 flex-1">
                    <div className="pb-4 font-semibold text-xl leading-tight">
                        {header}
                    </div>
                    <div className="mb-6">{children}</div>
                    <Toaster />
                </ScrollArea>
            </main>
        </SidebarProvider>
    );
}
