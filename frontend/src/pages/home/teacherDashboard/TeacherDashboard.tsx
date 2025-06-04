import { getTeacherByEmail } from "@/pages/teacher/TeacherApi";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import BigCalendar from "./BigCalendar";

export default function TeacherDashboard() {
    const { user, isLoaded } = useUser();

    const email = user?.primaryEmailAddress?.emailAddress;

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["teacher", email],
        queryFn: () => getTeacherByEmail(email || ""),
        enabled: isLoaded && !!email, // only run when user is loaded and email exists
    });

    if (!isLoaded || isLoading) {
        return <div>Se încarcă dashboardul profesorului...</div>;
    }

    if (isError) {
        return <div>Eroare la încărcarea datelor profesorului: {error?.message}</div>;
    }

    if (!data?._id) {
        return <div>Nu s-au găsit informații despre profesor.</div>;
    }

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <BigCalendar teacherId={data._id} />
        </div>
    );
}
