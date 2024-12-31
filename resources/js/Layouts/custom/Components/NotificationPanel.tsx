import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { File, Bell, AlarmClock, Clipboard } from "lucide-react";
import { Notification } from "@/types/index";
import Countdown from "@/Components/custom/Countdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";

function NotificationItem({data}: {data: Notification}) {
    let priorityColor;

    if(data.project.projectDocument.priority === "High") {
        priorityColor = "border bg-red-50 hover:bg-red-50/60 " +
                        "dark:bg-red-800 dark:border-red-600 hover:dark:bg-red-800/60"
    } else if(data.project.projectDocument.priority === "Medium") {
        priorityColor = "border bg-yellow-50 hover:bg-yellow-50/70 " +
                        "dark:bg-yellow-800 dark:border-yellow-600 hover:dark:bg-yellow-800/70"
    } else if(data.project.projectDocument.priority === "Low") {
        priorityColor = "border dark:border-neutral-800/50"
    }

    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" asChild>
                    <Link href={route('projects.documents.versions.show', [data.project.id, data.project.projectDocument.id, data.project.projectDocument.projectDocumentVersion.id])}>
                        <Button
                            className={"flex flex-col justify-start w-full h-fit " + priorityColor}
                            variant="ghost"
                        >
                            <div className="text-sm w-full text-left flex mb-2">
                                <File size={16} className="me-2"/>
                                <span className="my-auto text-wrap w-fit">
                                    <span className="font-bold">
                                        {data.project.projectDocument.name}
                                    </span>
                                    {/* <span className="font-light"></span> */}
                                    {' '} on project {' '}
                                    <span className="font-semibold">
                                    {data.project.name}
                                    </span>
                                </span>
                            </div>
                            {/* <div className="text-xs font-normal w-full text-left text-wrap flex mb-2">
                                <Clipboard size={16} className="me-2"/>
                                <span className="w-fit line-clamp-3">
                                    {data.project.name}
                                </span>
                            </div> */}
                            <div className="w-full text-left  flex">
                                <AlarmClock size={16} className="me-2"/>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                    <Countdown endDate={data.project.projectDocument.projectDocumentVersion.deadline} endText="Time limit reached"/>
                                </span>
                            </div>
                        </Button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className="hover:cursor-normal">
                    Click to view
                </TooltipContent>
                </Tooltip>
        </TooltipProvider>
    );
}

export default function NotificationPanel({notifications}: {notifications: Notification[]}) {
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="shadow-none rounded-full w-12 h-12"
                >
                    <Bell size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 md:w-[28rem] w-screen">
                <div className="flex flex-col">
                    <div className="border p-4 px-8">
                        <div className="text-sm text-center font-semibold">Notifications</div>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                    {
                        notifications.length > 0 ? notifications.map((notification) => (
                        <NotificationItem key={notification.project.id} data={notification}/>
                        ))
                        : (<span className="text-muted-foreground italic text-center text-sm">No notifications.</span>)
                    }

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
