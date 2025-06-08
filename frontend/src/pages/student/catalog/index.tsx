import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAbsencesForStudent } from "@/pages/groups/group/AbsenceApi";
import { getEvaluationsForStudent, getGradeEvaluationsForStudent } from "@/pages/groups/group/EvaluationApi";

import { DataTable } from "./data-table";
import { absenceColumns } from "./columns/absenceColumn";
import { gradesPerSubjectColumns, GradeSummary } from "./columns/gradesPerSubjectColumns";
import { allGradesFlatColumns, FlatEvaluation } from "./columns/allGradesFlatColumns";
import BarChartMedii from "./charts/BarChartAverageGrade";
import LineChartEvolutie from "./charts/LineChartGradeEvolution";
import PieChartAbsences from "./charts/PieChartAbsencesPerGroup";

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
        queryKey: ["evaluationsNoGrades", studentId],
        queryFn: () => getEvaluationsForStudent(studentId),
        enabled: !!studentId,
    });

    if (loadingAbsences || loadingGrades || loadingEvaluations) return <div>Loading...</div>;
    if (!absences || !gradedEvaluations || !evaluations || errorEvaluations || errorAbsences || errorGrades) return <div>Something went wrong...</div>;


    const gradesPerSubjectData: GradeSummary[] = Object.entries(gradedEvaluations).map(([subject, entries]) => {
        const evaluations: { date: string, grade: number | string }[] = entries.map((e: { createdAt: string | number | Date; grade: number | string; }) => ({
            date: new Date(e.createdAt).toISOString().split("T")[0],
            grade: e.grade,
        }));


        const numericGrades = entries
            .filter((e: { grade: number | string; }) => typeof e.grade === "number")
            .map((e: { grade: number; }) => e.grade as number);

        const average = numericGrades.length
            ? numericGrades.reduce((a: number, b: number) => a + b, 0) / numericGrades.length
            : 0;

        return { subject, evaluations, average };
    });


    const allGradesFlatData: FlatEvaluation[] = Object.entries(evaluations ?? {}).flatMap(([subject, entries]) =>
        entries?.map((entry: { grade: any; createdAt: string | number | Date; groupName: any; behavior: any; gradeComment: any; subjects: any[]; gaps: any[]; homework: any; }) => ({
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
            homework: entry.homework
        }))
    );

    return (
        <div className="space-y-8 px-4">
            <div className="text-xl font-bold">Catalog</div>
            <div className="grid grid-cols-3 grid-rows-3 gap-x-6">
                <div className="col-span-1 row-span-1 ">
                    <h2 className="text-xl font-semibold">Absențe</h2>
                    <DataTable data={absences} columns={absenceColumns} />
                </div>
                <div className="col-span-1 row-span-1">
                    <h2 className="text-xl font-semibold">Note pe materii</h2>
                    <DataTable data={gradesPerSubjectData} columns={gradesPerSubjectColumns} />
                </div>

                <div className="col-span-3 row-span-2">
                    <h2 className="text-xl font-semibold">Toate evaluările</h2>
                    <DataTable data={allGradesFlatData} columns={allGradesFlatColumns} />
                </div>
                <div className="col-span-1 row-span-1">
                    <h3 className="text-lg font-semibold mb-2">Media notelor pe materii</h3>
                    {gradesPerSubjectData.length == 0 ? <div className="font-bold text-xl flex justify-center items-center h-full">Nu există suficiente date pentru a crea graficul </div> : <BarChartMedii data={gradesPerSubjectData} />}
                </div>
                <div className="col-span-1 row-span-1">
                    <h3 className="text-lg font-semibold mb-2">Evoluția notelor în timp</h3>
                    {allGradesFlatData.length == 0 ? <div className="font-bold text-xl flex justify-center items-center h-full">Nu există suficiente date pentru a crea graficul </div> : <LineChartEvolutie data={allGradesFlatData} />}
                </div>
                <div className="col-span-1 row-span-1">
                    <h3 className="text-lg font-semibold mb-2">Distribuția absențelor pe grupe</h3>
                    {absences.length == 0 ? <div className="font-bold text-xl flex justify-center items-center h-full">Nu există suficiente date pentru a crea graficul </div> : <PieChartAbsences data={absences} />
                    }
                </div>

            </div>
        </div>
    );
}
