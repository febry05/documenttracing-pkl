import ApplicationLogo from "@/Components/ApplicationLogo";
import APSLogo from "@/Components/Icons/APSLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background">
            <div>
                <Link href="/" className="flex gap-2 items-center justify-center">
                    <img src="/img/aps_logo_only.png" alt="Angkasa Pura Supportrs Logo" className="w-14"/>
                    <span className="text-primary font-bold text-3xl ms-1">Document</span>
                    <span className="text-red-600 font-bold text-3xl">Tracer</span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4">{children}</div>
        </div>
    );
}
