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

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="grid grid-col-2">
                    <span className="font-semibold text-xl leading-tight">
                        Create User
                    </span>
                    <div className="flex justify-between">
                        <Button variant="link" className="p-0">
                            <ChevronLeft className="me-1" size={18}/>
                            <span className="mb-0.5">Back</span>
                        </Button>
                    </div>
                </div>
            }
            title=""
        >
            <Head title="Users" />

            <Card className="p-8">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input type="name" id="name" placeholder="Full Name" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="employee_no">Employee Number</Label>
                            <Input type="employee_no" id="employee_no" placeholder="Employee Number" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
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
                        <div className="grid w-full max-w-sm items-center gap-1.5">
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
                </div>

                <div className="flex">
                    <Button className="ms-auto">
                        <Save size={18} className="me-2"/>
                        Save
                    </Button>
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
