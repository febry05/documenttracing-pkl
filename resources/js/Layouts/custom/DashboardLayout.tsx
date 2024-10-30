import React, { PropsWithChildren, ReactNode } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar-alt"
import { AppSidebar } from "@/Components/app-sidebar"
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Bell, UserRound, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { ModeToggle } from "@/Components/mode-toggle";
import { Button } from "@/Components/ui/button";

type User = {
    name: string,
    role: string
}

const FormSchema = z.object({
    search: z.string().min(2, {
      message: "Search must be at least 4 characters.",
    }),
})


export default function DashboardLayout({
    // user,
    header,
    children,
}: PropsWithChildren<{
    header?: ReactNode;
    // user: User;
}>) {
    const user:User = {
        name: "Edmund Ovdisav",
        role: "Administrator",
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          search: "",
        },
      })

    function onSubmit(data: z.infer<typeof FormSchema>) {

    }

    const { url } = usePage();

    return (
        <SidebarProvider>
            <AppSidebar url={url} />
            <main className="w-full">
                <nav className="w-full p-3 px-4 flex border-b sticky top-0 z-10 bg-sidebar dark:bg-sidebar">
                    <SidebarTrigger className="my-auto"/>

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

                    {/* Theme Mode Toggle */}
                    <div className="ms-auto">
                        <ModeToggle />
                    </div>

                    {/* Notification Panel */}
                    <Popover>
                        <PopoverTrigger className="ms-4">
                            <Button variant="secondary" size="icon" className="shadow-none rounded-full w-12 h-12">
                                <Bell size={20}/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Notification Panel</PopoverContent>
                    </Popover>

                    {/* Profile Panel */}
                    <Popover>
                        <PopoverTrigger className="ms-4 ">
                            <Button variant="secondary" size="icon" className="shadow-none rounded-full w-40 h-12 hidden md:block">
                                <div className="my-auto px-6 flex flex-col pe-6 text-left">
                                    <span className="text-sm">{user.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.role}</span>
                                </div>
                            </Button>
                            <Button variant="secondary" className="rounded-full p-4 md:hidden w-12 h-12">
                                <UserRound size={20}/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-4">
                            Profile Panel
                            <hr />
                            <ModeToggle />
                        </PopoverContent>
                    </Popover>
                </nav>
                <ScrollArea className="px-6 pt-6 flex-1">
                        <div className="pb-4 font-semibold text-xl leading-tight">
                            {header}
                        </div>
                        <div className="mb-6">{children}</div>
                </ScrollArea>
            </main>
        </SidebarProvider>
    )
}

