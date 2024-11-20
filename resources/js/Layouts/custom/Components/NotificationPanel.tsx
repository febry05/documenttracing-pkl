import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { Bell } from "lucide-react";
import { Notification } from "@/types/index";

function NotificationItem({data}: {data: Notification}) {
    let priorityColor;

    if(data.project.projectDocument.priority === "High") {
        priorityColor = "border bg-red-50 hover:bg-red-50/60 " +
                        "dark:bg-red-800 dark:border-red-600 hover:dark:bg-red-800/60"
    } else if(data.project.projectDocument.priority === "Medium") {
        priorityColor = "border bg-yellow-50 hover:bg-yellow-50/70 " +
                        "dark:bg-yellow-800 dark:border-yellow-600 hover:dark:bg-yellow-800/70"
    } else if(data.project.projectDocument.priority === "Low") {
        priorityColor = "border dark:border-gray-800/50"
    }

    return(
        <Link href={route('projects.documents.versions.show', [data.project.id, data.project.projectDocument.id, data.project.projectDocument.projectDocumentVersion.id])}>
        <Button
            className={"flex flex-col justify-start w-full h-fit " + priorityColor}
            variant="ghost"
        >
            <div className="text-sm font-semibold w-full text-left">
                {data.project.projectDocument.name}
            </div>
            <div className="text-sm font-normal w-full text-left text-wrap">
                {data.project.name}
            </div>
            <div className="text-xs w-full text-left text-gray-500 dark:text-gray-400">
                {data.project.projectDocument.daysLeft} Days Left
            </div>
        </Button>
    </Link>
    );
}

export default function NotificationPanel({notifications}: {notifications: Notification[]}) {
    return(
        <Popover>
            <PopoverTrigger className="ms-auto" asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="shadow-none rounded-full w-12 h-12"
                >
                    <Bell size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <div className="flex flex-col">
                    <div className="border p-4 px-8">
                        <div className="text-sm text-center font-semibold">Notifications</div>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                    {notifications.map((notification) => (
                        <NotificationItem key={notification.project.id} data={notification}/>
                    ))}

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
