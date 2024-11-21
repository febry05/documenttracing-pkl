import { Head } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/custom/DashboardLayout";
import { User, UserDivision, UserPosition, UserRole } from "@/types/model";
import InfoPair from "@/Components/custom/InfoPair";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";
import { Separator } from "@/Components/ui/separator";
import EditProfileForm from "./Components/EditProfileForm";
import UpdatePasswordForm from "./Components/UpdatePasswordForm";

interface PageProps {
    user: User;
    userRoles: UserRole[];
    userPositions: UserPosition[];
    userDivisions: UserDivision[];
}

export default function Edit({
    user, userRoles, userPositions, userDivisions
}: PageProps) {
    return (
        <DashboardLayout
            header={<HeaderNavigation title="Profile" />}
        >
            <Head title="Profile" />

            <div className="space-y-6">
                <Card className="flex flex-col mb-4">
                    <div className="px-8 py-4 border-b">
                        <div className="col-span-5 leading-9 text-l font-semibold">Profile Information</div>
                    </div>

                    <EditProfileForm user={user} userRoles={userRoles} userPositions={userPositions} userDivisions={userDivisions} />

                    <Separator className="mx-auto" />

                    <div className="grid md:grid-cols-3 gap-8 p-8">
                        <InfoPair label="Role" value={user.role} />
                        <InfoPair label="Position" value={user.user_position} />
                        <InfoPair label="Division" value={user.user_division} />
                    </div>
                </Card>

                <Card>
                    <div className="px-8 py-4 border-b">
                        <div className="col-span-5 leading-9 text-l font-semibold">Update Password</div>
                    </div>
                    <UpdatePasswordForm user={user} />
                </Card>
            </div>
        </DashboardLayout>
    );
}
