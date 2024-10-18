import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { DataTable } from "@/Components/ui/data-table"
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Save, ChevronLeft } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { HeaderNavigation } from "@/Components/custom/HeaderNavigation";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <HeaderNavigation title="Create User" back={true}/>
            }
            title=""
        >
            <Head title="Users" />

            <Card className="p-8">
                <div className="flex flex-col gap-8">
                    {/* Personal Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input type="text" id="name" placeholder="Full Name" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="nik">NIK</Label>
                            <Input type="number" id="nik" placeholder="NIK" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input type="number" id="phone" placeholder="0821xxx" />
                        </div>
                    </div>

                    {/* Employee Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="employee_no">Employee Number</Label>
                            <Input type="number" id="employee_no" placeholder="Employee Number" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="division">Division</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Division" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="system">Human Resources</SelectItem>
                                    <SelectItem value="dark">General Affairs</SelectItem>
                                    <SelectItem value="light">Information Communication Technology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="division">Position</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="system">Head</SelectItem>
                                    <SelectItem value="dark">Supervisor</SelectItem>
                                    <SelectItem value="light">Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Credentials */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Password" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="division">Role</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="system">Administrator</SelectItem>
                                    <SelectItem value="dark">Project Manager</SelectItem>
                                    <SelectItem value="light">Guest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex">
                        <Button className="ms-auto">
                            <Save size={18} className="me-2"/>
                            Save
                        </Button>
                    </div>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}

/*
name, nik, phone,
employee_no, division, position
email, password, role,
*/
