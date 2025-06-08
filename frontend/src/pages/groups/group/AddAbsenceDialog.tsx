import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Student } from "@/pages/student/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { addAbsence, deleteAbsence, getAbsencesForStudent } from "./AbsenceApi"
import { getClassEvent } from "@/pages/teacherCalendar/CalendarApi"

export function AddAbsenceDialog({ student }: { student: Student }) {

    const params = useParams();

    if (!params.name || !params.id) {
        return <div>Parametru invalid</div>;
    }

    const groupName = params.name || "";
    const classEventId = params.id || ""

    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");


    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addAbsence,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["absences", student._id] });
            toast.success("Absență adăugată cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a funcționat...");
            setOpen(false);

        }
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteAbsence(student._id as string, groupName, classEventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["absences", student._id] });
            toast.success("Absență adăugată cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a funcționat...");
            setOpen(false);

        }
    });

    const { data: existingAbsences } = useQuery({
        queryKey: ["absences", student._id],
        queryFn: () => getAbsencesForStudent(student._id as string),
        enabled: !!student._id,
    });

    const { data: currentClassEvent } = useQuery({
        queryKey: ["classEvent", classEventId],
        queryFn: () => getClassEvent(classEventId),
        enabled: !!student._id,
    });


    const alreadyAbsent = existingAbsences?.some(
        (absence) =>
            absence.groupName === groupName && absence.classEventId == classEventId
    );

    const handleSubmit = () => {
        addMutation.mutate({ studentId: student._id || "", groupName: groupName, classEventId: classEventId, date: currentClassEvent?.start as Date, reason: reason })
    }

    const deleteAbsenceOnClick = () => {
        if (alreadyAbsent)
            deleteMutation.mutate()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <div>
                    <Button variant="outline" className={alreadyAbsent ? "bg-red-300" : "bg-amber-300"} onClick={deleteAbsenceOnClick}>
                        {alreadyAbsent ? "Șterge Absență" : "Adaugă Absență"}
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Aduagă absență</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Nume Elev
                        </Label>
                        <Input id="name" placeholder="Introdu numele grupei" value={student.Name} disabled />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Motivație (opțional)
                        </Label>
                        <Input id="name" placeholder="Introdu numele grupei" onChange={(e) => setReason(e.target.value)} value={reason} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Adaugă absență</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
