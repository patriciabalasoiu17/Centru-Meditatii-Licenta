import { useUser } from "@clerk/clerk-react";
import AdminDashboard from "./admin-dashboard";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";

export default function Home() {

    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    const role = user?.publicMetadata?.role;
    return <div className="w-full h-full">
        {role == "admin" && <AdminDashboard />}
        {role == "profesor" && <TeacherDashboard />}
        {role == "student" && "Esti elev"}

        {/* <AdminDashboard /> */}
    </div>
}