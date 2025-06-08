import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Student } from "@/pages/student/types";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getEvaluation, saveEvaluation } from "./EvaluationApi";
import { Evaluation, Gap, Subject } from "@/lib/types";

export default function StudentEvaluationDialog({ student }: { student: Student }) {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const groupName = params.name || "";
    const classEventId = params.id || ""
    const queryClient = useQueryClient();

    const [grade, setGrade] = useState<number | undefined>(undefined);
    const [gradeComment, setGradeComment] = useState("");
    const [gradeEnabled, setGradeEnabled] = useState(false);

    const [behavior, setBehavior] = useState("");
    const [homework, setHomework] = useState("");
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [editingSubjectIndex, setEditingSubjectIndex] = useState<number | null>(null);

    const [gaps, setGaps] = useState<Gap[]>([]);
    const [editingGap, setEditingGap] = useState<{ index: number; field: keyof Gap } | null>(null);

    const { data: existingEvaluation } = useQuery({
        queryKey: ["evaluation", student._id, groupName],
        queryFn: () => getEvaluation(student._id as string, groupName, classEventId),
        enabled: !!student._id && !!groupName,
    });

    useEffect(() => {
        if (existingEvaluation) {
            if (existingEvaluation.grade !== undefined && existingEvaluation.grade !== null) {
                setGradeEnabled(true);
                setGrade(existingEvaluation.grade);
                setGradeComment(existingEvaluation.gradeComment || "");
            }
            setBehavior(existingEvaluation.behavior || "");
            setSubjects(existingEvaluation.subjects || []);
            setGaps(existingEvaluation.gaps || []);
        }
    }, [existingEvaluation]);

    const { mutate: submitEvaluation, isPending } = useMutation({
        mutationFn: saveEvaluation,
        onSuccess: () => {
            toast.success("Evaluare salvată!");
            queryClient.invalidateQueries({ queryKey: ["evaluation", student._id, groupName] });
            setOpen(false);
        },
        onError: () => toast.error("Eroare la salvare."),
    });

    const handleSubmit = () => {
        if (
            subjects.some((s) => !s.name || !s.understanding || !s.exercises) ||
            gaps.some((g) => !g.classLevel || !g.topic || !g.observation)
        ) {
            toast.error("Completează toate câmpurile necesare.");
            return;
        }

        const payload: Evaluation = {
            studentId: student._id as string,
            groupName,
            classEventId,
            behavior,
            subjects,
            gaps,
            ...(gradeEnabled
                ? { grade, gradeComment }
                : { grade: null, gradeComment: "" }),
            homework
        }

        submitEvaluation(payload);
    };

    const handleSubjectChange = (index: number, key: keyof Subject, value: string) => {
        const updated = [...subjects];
        updated[index][key] = value;
        setSubjects(updated);
    };

    const handleGapChange = (index: number, key: keyof Gap, value: string) => {
        const updated = [...gaps];
        updated[index][key] = value;
        setGaps(updated);
    };

    const handleGapEdit = (index: number, field: keyof Gap) => {
        setEditingGap({ index, field });
    };

    const isEditing = (index: number, field: keyof Gap) =>
        editingGap?.index === index && editingGap?.field === field;


    const isValid =
        subjects.every((s) => s.name && s.understanding && s.exercises) &&
        gaps.every((g) => g.classLevel && g.topic && g.observation);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={existingEvaluation ? "bg-slate-400" : "bg-amber-300"}>
                    {existingEvaluation ? "Modifică evaluarea" : "Adaugă Evaluare"}
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[1200px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Fișă Evaluare Elev</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <h1 className="text-xl font-semibold">Numele elevului: {student.Name}</h1>

                    <div className="border p-4 rounded-md space-y-4">
                        <label className="flex items-center gap-2">
                            <Checkbox checked={gradeEnabled} onCheckedChange={(val) => setGradeEnabled(!!val)} />
                            Adaugă notă
                        </label>

                        {gradeEnabled && (
                            <>
                                <div className="flex items-center gap-4">
                                    <Label>Notă finală:</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={10}
                                        value={grade ?? ""}
                                        onChange={(e) => setGrade(Number(e.target.value))}
                                        className="w-20 text-center"
                                    />
                                </div>
                                <div>
                                    <Label className="block mb-2">Comentariu asupra notei:</Label>
                                    <Textarea
                                        placeholder="Ex: Evaluare orală la final de oră..."
                                        value={gradeComment}
                                        onChange={(e) => setGradeComment(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">Subiecte Abordate</h2>
                            <Button variant="outline" onClick={() => setSubjects([...subjects, { name: "", understanding: "", exercises: "" }])}>Adaugă Subiect</Button>
                        </div>

                        {subjects.map((subject, index) => (
                            <div key={index} className="border p-4 rounded-md space-y-4">
                                {editingSubjectIndex === index ? (
                                    <Input
                                        value={subject.name}
                                        onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                                        onBlur={() => setEditingSubjectIndex(null)}
                                        autoFocus
                                    />
                                ) : (
                                    <span onClick={() => setEditingSubjectIndex(index)} className="font-medium cursor-pointer">
                                        {subject.name || "<Click pentru a edita subiectul>"}
                                    </span>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="block mb-2">Nivel Înțelegere</Label>
                                        <div className="flex gap-4">
                                            {["Slab", "Mediu", "Ridicat"].map((level) => (
                                                <label key={level} className="flex items-center gap-1">
                                                    <Checkbox
                                                        checked={subject.understanding === level}
                                                        onCheckedChange={() => handleSubjectChange(index, "understanding", level)}
                                                    />
                                                    {level}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block mb-2">Nivel Exerciții</Label>
                                        <div className="flex gap-4">
                                            {["Slab", "Mediu", "Ridicat"].map((level) => (
                                                <label key={level} className="flex items-center gap-1">
                                                    <Checkbox
                                                        checked={subject.exercises === level}
                                                        onCheckedChange={() => handleSubjectChange(index, "exercises", level)}
                                                    />
                                                    {level}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">Elemente de aprofundat (lacune)</h2>
                            <Button variant="outline" onClick={() => setGaps([...gaps, { classLevel: "", topic: "", observation: "" }])}>Adaugă</Button>
                        </div>

                        <div className="border p-4 rounded-md space-y-2">
                            <div className="grid grid-cols-3 gap-4 font-medium mb-2">
                                <div>Clasa</div>
                                <div>Subiect</div>
                                <div>Observații</div>
                            </div>
                            {gaps.map((gap, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4">
                                    {isEditing(index, "classLevel") ? (
                                        <Input
                                            value={gap.classLevel}
                                            onChange={(e) => handleGapChange(index, "classLevel", e.target.value)}
                                            onBlur={() => setEditingGap(null)}
                                            autoFocus
                                        />
                                    ) : (
                                        <div onClick={() => handleGapEdit(index, "classLevel")} className="cursor-pointer">
                                            {gap.classLevel || "-"}
                                        </div>
                                    )}

                                    {isEditing(index, "topic") ? (
                                        <Input
                                            value={gap.topic}
                                            onChange={(e) => handleGapChange(index, "topic", e.target.value)}
                                            onBlur={() => setEditingGap(null)}
                                        />
                                    ) : (
                                        <div onClick={() => handleGapEdit(index, "topic")} className="cursor-pointer">
                                            {gap.topic || "-"}
                                        </div>
                                    )}

                                    {isEditing(index, "observation") ? (
                                        <Textarea
                                            value={gap.observation}
                                            onChange={(e) => handleGapChange(index, "observation", e.target.value)}
                                            onBlur={() => setEditingGap(null)}
                                        />
                                    ) : (
                                        <div onClick={() => handleGapEdit(index, "observation")} className="cursor-pointer">
                                            {gap.observation || "-"}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Observații comportamentale:</Label>
                        <Textarea
                            rows={4}
                            placeholder="Introduceți observațiile..."
                            value={behavior}
                            onChange={(e) => setBehavior(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Temă pentru acasa:</Label>
                        <Textarea
                            rows={4}
                            placeholder="Introduceți tema..."
                            value={homework}
                            onChange={(e) => setHomework(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={isPending || !isValid}>
                            {isPending ? "Se salvează..." : "Trimite evaluarea"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
