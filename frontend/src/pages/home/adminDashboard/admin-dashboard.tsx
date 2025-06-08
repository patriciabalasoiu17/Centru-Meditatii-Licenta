import { Card, CardContent } from "@/components/ui/card";
import PresenceChart from "./PresenceChart";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../student/StudentApi";
import { getTeachers } from "../../teacher/TeacherApi";
import BigCalendar from "./BigCalendar";

const AdminDashboard = () => {
    const { data: students } = useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    });

    const { data: teachers } = useQuery({
        queryKey: ["teachers"],
        queryFn: getTeachers,
    });

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-4 grid-rows-3 gap-4">
                <Card className="col-span-1 bg-[#8884d8]">
                    <CardContent className="flex flex-col justify-center items-center w-full h-full ">
                        <p className="text-5xl font-semibold text-white">{students?.length}</p>
                        <p className="text-3xl text-white">Elevi</p>
                    </CardContent>
                </Card>
                <Card className="col-span-1 bg-[#f87171]">
                    <CardContent className="flex flex-col justify-center items-center w-full h-full">
                        <p className="text-5xl font-semibold text-white">{teachers?.length}</p>
                        <p className="text-3xl text-white">Profesori</p>
                    </CardContent>
                </Card>
                <div className="col-span-2 row-span-3">
                    <BigCalendar />
                </div>
                <Card className="col-span-2 row-span-2 ">
                    <CardContent className="p-4">
                        <p className="text-lg font-semibold mb-4">Prezență</p>
                        <PresenceChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
