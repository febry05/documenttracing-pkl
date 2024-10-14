import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card } from "@/Components/ui/card"
import { InfoCard } from "@/Components/custom/InfoCard";
import { FileBarChart, FileCog, FileClock, FileCheck2  } from "lucide-react";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <span className="font-semibold text-xl leading-tight">
                    Overview - Last 30 Days
                </span>
            }
            title="Dashboard"
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 md:gap-4">
                <div className="grid grid-cols-4 gap-4 md:gap-4">
                    <InfoCard title="666" caption="Total Documents" icon={FileBarChart}/>
                    <InfoCard title="69" caption="Ongoing Documents" icon={FileCog}/>
                    <InfoCard title="34" caption="Pending Documents" icon={FileClock}/>
                    <InfoCard title="420" caption="Completed Documents"icon={FileCheck2}/>
                </div>
                <div className="flex flex-row gap-4 md:gap-4">
                    <Card className="flex-auto basis-1/2 p-4">Filler</Card>
                    <Card className="flex-auto basis-1/4 p-4">Filler</Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
