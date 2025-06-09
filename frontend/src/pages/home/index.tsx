import { useUser } from "@clerk/clerk-react";
import AdminDashboard from "./adminDashboard/admin-dashboard";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import StudentDashboard from "./studentDashboard/StudentDashboard";

export default function Home() {

    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    const role = user?.publicMetadata?.role;
    return <div className="w-full h-full">
        {role == "admin" && <AdminDashboard />}
        {role == "profesor" && <TeacherDashboard />}
        {role == "student" && <StudentDashboard />}
        {role == undefined && isSignedIn && <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <span className="text-5xl font-bold">Cerere în așteptare</span>
            <span className="text-3xl text-muted-foreground font-semibold">Te rugăm să aștepti până ce un administrator îți va aproba contul.</span>
        </div>}
        {role == undefined && !isSignedIn && <div className="mt-10 ml-10">
            <span className="text-2xl font-bold">Autentifică-te pentru a putea continua</span>
        </div>}

        {/* <AdminDashboard /> */}
    </div>
}