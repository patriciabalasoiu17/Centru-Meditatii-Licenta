import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAbsencesForStudent } from "@/pages/groups/group/AbsenceApi";
import { getEvaluationsForStudent, getGradeEvaluationsForStudent } from "@/pages/groups/group/EvaluationApi";

import { DataTable } from "./data-table";
import { absenceColumns } from "./columns/absenceColumn";
import { gradesPerSubjectColumns, GradeSummary } from "./columns/gradesPerSubjectColumns";
import { allGradesFlatColumns, FlatEvaluation } from "./columns/allGradesFlatColumns";

export default function StudentCatalogPage() {
    const studentId = useParams().studentId || "";

    const {
        data: absences,
        isLoading: loadingAbsences,
        error: errorAbsences,
    } = useQuery({
        queryKey: ["absences", studentId],
        queryFn: () => getAbsencesForStudent(studentId),
    });

    const {
        data: gradedEvaluations,
        isLoading: loadingGrades,
        error: errorGrades,
    } = useQuery({
        queryKey: ["evaluations", studentId],
        queryFn: () => getGradeEvaluationsForStudent(studentId),
    });

    const {
        data: evaluations,
        isLoading: loadingEvaluations,
        error: errorEvaluations,
    } = useQuery({
        queryKey: ["evaluationsNoGrades"],
        queryFn: () => getEvaluationsForStudent(studentId),
    });

    if (loadingAbsences || loadingGrades) return <div>Loading...</div>;
    if (!absences || !gradedEvaluations || errorAbsences || errorGrades) return <div>Something went wrong...</div>;


    const gradesPerSubjectData: GradeSummary[] = Object.entries(gradedEvaluations).map(([subject, entries]) => {
        const evaluations = entries.map(e => ({
            date: new Date(e.createdAt).toISOString().split("T")[0],
            grade: e.grade,
        }));


        const numericGrades = entries
            .filter(e => typeof e.grade === "number")
            .map(e => e.grade as number);

        const average = numericGrades.length
            ? numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length
            : 0;

        return { subject, evaluations, average };
    });


    const allGradesFlatData: FlatEvaluation[] = Object.entries(evaluations).flatMap(([subject, entries]) =>
        entries.map(entry => ({
            subject,
            grade: entry.grade ?? "-",
            date: new Date(entry.createdAt).toISOString().split("T")[0],
            groupName: entry.groupName,
            behavior: entry.behavior || "-",
            comment: entry.gradeComment || "-",
            topics: entry.subjects?.map((s: any) => s.name) || [],
            gaps:
                entry.gaps?.map((g: any) => `${g.classLevel}: ${g.topic} (${g.observation})`) || [],
            understandings:
                entry.subjects?.map((s: any) =>
                    `${s.name}: Înțelegere - ${s.understanding || "-"}, Exerciții - ${s.exercises || "-"}`
                ) || [],
        }))
    );

    return (
        <div className="space-y-8 px-4">
            <div className="text-xl font-bold">Catalog</div>

            <h2 className="text-xl font-semibold">Absențe</h2>
            <DataTable data={absences} columns={absenceColumns} />

            <h2 className="text-xl font-semibold">Note pe materii</h2>
            <DataTable data={gradesPerSubjectData} columns={gradesPerSubjectColumns} />

            <h2 className="text-xl font-semibold">Toate evaluările</h2>
            <DataTable data={allGradesFlatData} columns={allGradesFlatColumns} />
        </div>
    );
}
