import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import BigCalendar from "./BigCalendar";
import { getStudentByEmail } from "@/pages/student/StudentApi";
import { getAbsencesForStudent } from "@/pages/groups/group/AbsenceApi";
import { getEvaluationsForStudent, getGradeEvaluationsForStudent } from "@/pages/groups/group/EvaluationApi";
import { FlatEvaluation } from "@/pages/student/catalog/columns/allGradesFlatColumns";
import { GradeSummary } from "@/pages/student/catalog/columns/gradesPerSubjectColumns";
import BarChartMedii from "./charts/BarChartAverageGrade";
import LineChartEvolutie from "./charts/LineChartGradeEvolution";
import PieChartAbsences from "./charts/PieChartAbsencesPerGroup";

export default function StudentDashboard() {
    const { user, isLoaded } = useUser();

    const email = user?.primaryEmailAddress?.emailAddress;

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["student", email],
        queryFn: () => getStudentByEmail(email || ""),
        enabled: isLoaded && !!email,
    });

    const studentId = data?._id || ""

    const {
        data: absences,
        isLoading: loadingAbsences,
        error: errorAbsences,
    } = useQuery({
        queryKey: ["absences", studentId],
        queryFn: () => getAbsencesForStudent(studentId),
        enabled: !!studentId
    });

    const {
        data: gradedEvaluations,
        isLoading: loadingGrades,
        error: errorGrades,
    } = useQuery({
        queryKey: ["evaluations", studentId],
        queryFn: () => getGradeEvaluationsForStudent(studentId),
        enabled: !!studentId
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

    if (!isLoaded || isLoading || loadingAbsences || loadingGrades || loadingEvaluations) {
        return <div>Se încarcă dashboardul elevului...</div>;
    }

    if (isError || errorAbsences || errorGrades || errorEvaluations || !data || !absences || !gradedEvaluations || !evaluations) {
        return <div>Eroare la încărcarea datelor studentului: {error?.message}</div>;
    }

    if (!data?._id) {
        return <div>Nu s-au găsit informații despre student.</div>;
    }

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


    const allGradesFlatData: FlatEvaluation[] = Object.entries(evaluations ?? {}).flatMap(([subject, entries]) =>
        entries?.map(entry => ({
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
        <div className="p-8 grid grid-cols-3 grid-rows-3">
            <div className="col-span-3 row-span-2">

                <BigCalendar studentId={data._id} />
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
    );
}
