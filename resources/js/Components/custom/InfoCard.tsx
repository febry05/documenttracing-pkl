import { Card } from "@/Components/ui/card";
import { AlignJustifyIcon, LucideIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export function InfoCard({ title, caption, icon }: PropsWithChildren<{title: string, caption: string, icon: LucideIcon}>) {
    const Icon = (icon ?? AlignJustifyIcon) as React.ElementType;

    return (
        <Card className="w-25 h-30 p-4">
            <div className="grid grid-rows-2 gap-4 place-content-center">
                <div className="flex justify-center">
                    {<Icon className="mt-3" size={36}/>}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-center">{ title }</span>
                    <span className="text-center">{ caption }</span>
                </div>
            </div>
        </Card>
    );
}
