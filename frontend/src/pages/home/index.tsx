import { useUser } from "@clerk/clerk-react";
import AdminDashboard from "./adminDashboard/admin-dashboard";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import StudentDashboard from "./studentDashboard/StudentDashboard";

export default function Home() {

    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    const role = user?.publicMetadata?.role;
    return <div className="w-full h-full">
        {role == "admin" && <AdminDashboard />}
        {role == "profesor" && <TeacherDashboard />}
        {role == "student" && <StudentDashboard />}
        {role == undefined && "Momentan nu esti logat."}

        {/* <AdminDashboard /> */}
    </div>
}