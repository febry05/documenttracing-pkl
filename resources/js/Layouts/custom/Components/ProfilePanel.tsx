import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { LogOut, UserCog, UserRound } from "lucide-react";
import { ModeToggle } from "@/Components/mode-toggle";

type User = {
    name: string;
    role: string;
};

export default function ProfilePanel(user: User) {
    return(
        <Popover>
            <PopoverTrigger className="ms-4" asChild>
                <div>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="shadow-none rounded-full w-fit h-12 hidden md:block min-w-32"
                    >
                        <div className="my-auto px-6 flex flex-col pe-6 text-left">
                            <span className="text-xs">
                                {user.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {user.role}
                            </span>
                        </div>
                    </Button>
                    <Button
                        variant="secondary"
                        className="rounded-full p-4 md:hidden w-12 h-12"
                    >
                        <UserRound size={20} />
                    </Button>
                </div>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col">
                <Link href={route("profile.edit")}>
                    <Button
                        variant="ghost"
                        className="justify-start w-full"
                    >
                        <UserCog className="me-6" size={18} />
                        Profile Settings
                    </Button>
                </Link>

                <ModeToggle />

                <Link href={route("logout")} method="post" as="form">
                    <Button
                        variant="ghost"
                        className="justify-start w-full"
                    >
                        <LogOut className="me-6" size={18} />
                        Log out
                    </Button>
                </Link>
            </PopoverContent>
        </Popover>
    );
}
