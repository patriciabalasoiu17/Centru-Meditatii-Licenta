import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { PresenceChart } from "./PresenceChart";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../student/StudentApi";
import { getTeachers } from "../teacher/TeacherApi";

const AdminDashboard = () => {
    const [date, setDate] = useState(new Date());
    const { data: students } = useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    });

    const { data: teachers } = useQuery({
        queryKey: ["teachers"],
        queryFn: getTeachers,
    });
    console.log("🚀 ~ AdminDashboard ~ teachers:", teachers)

    return (
        <div className="p-6 space-y-6">
            {/* User info */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-semibold">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">Admin</p>
                    </div>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xl font-semibold">{students?.length}</p>
                        <p className="text-muted-foreground">Elevi</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xl font-semibold">{teachers?.length}</p>
                        <p className="text-muted-foreground">Profesori</p>
                    </CardContent>
                </Card>
            </div>

            {/* Presence Chart */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-lg font-semibold mb-4">Prezență</p>
                    <PresenceChart />
                </CardContent>
            </Card>

            {/* Calendar and Agenda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-lg font-semibold mb-2">Agenda - {format(date, "dd MMM yyyy")}</p>
                        <ul className="space-y-2">
                            <li className="text-sm">
                                <strong>8:00</strong> - Simulare Evaluare Națională Matematică
                            </li>
                            <li className="text-sm">
                                <strong>12:00</strong> - Simulare Bacalaureat Matematică
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-lg font-semibold mb-2">Calendar</p>
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </CardContent>
                </Card>
            </div>

            {/* Ședințe */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-lg font-semibold mb-4">Ședințe</p>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="py-2">Data</th>
                                <th>Ora</th>
                                <th>Materie</th>
                                <th>Profesor</th>
                                <th>Grupa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2">24/05/2025</td>
                                <td>10:00</td>
                                <td>Matematică</td>
                                <td>Bălașa P.</td>
                                <td>MATE1</td>
                            </tr>
                            <tr>
                                <td className="py-2">25/05/2025</td>
                                <td>10:00</td>
                                <td>Fizică</td>
                                <td>Petrescu M.</td>
                                <td>FIZGR5</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
