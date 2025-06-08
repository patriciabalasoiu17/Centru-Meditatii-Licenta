import { useQueries, useQuery } from "@tanstack/react-query";
import { getGroups } from "../GroupApi";
import { useParams } from "react-router-dom";
import { type Group } from "../types";
import { getStudent } from "@/pages/student/StudentApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Student } from "@/pages/student/types";

export default function Group() {
    const params = useParams();

    if (!params.name) {
        return <div>Parametru invalid</div>;
    }

    const groupName = params.name

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["group", groupName],
        queryFn: () => getGroups({ name: groupName }),
    });

    const studentQueries = useQueries({
        queries:
            data?.students.map((id) => ({
                queryKey: ["student", id],
                queryFn: () => getStudent(id),
            })) ?? [],
    });

    const isStudentsLoading = studentQueries.some((q) => q.isLoading);
    const isStudentsError = studentQueries.some((q) => q.isError);

    if (isLoading) return <div>Se încarcă grupul...</div>;
    if (error || !data) return <div>Nu s-a găsit grupul.</div>;

    if (isStudentsLoading) return <div>Se încarcă studenții...</div>;
    if (isStudentsError) return <div>Eroare la încărcarea studenților.</div>;

    const students = studentQueries.map((q) => q.data).filter(Boolean);

    return (
        <div>
            <DataTable data={students as Student[]} columns={columns} />
        </div>
    );
}
