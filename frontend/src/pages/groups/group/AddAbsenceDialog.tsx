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
import { MultiSelect } from "@/components/ui/multi-select"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Edit } from "lucide-react"
import { Student } from "@/pages/student/types"
import { getAbsencesForStudent } from "./AbsenceApi"
import { useParams } from "react-router-dom"

export function AddAbsenceDialog({ student }: { student: Student }) {
    console.log("🚀 ~ AddAbsenceDialog ~ student:", student)

    const params = useParams();

    if (!params.name) {
        return <div>Parametru invalid</div>;
    }
    const groupId = params.id;

    const { data: existingAbsences } = useQuery({
        queryKey: ["absences", student._id],
        queryFn: () => getAbsencesForStudent(student._id as string),
    });

    console.log("🚀 ~ AddAbsenceDialog ~ data:", existingAbsences)

    const alreadyAbsent = existingAbsences?.some(
        (absence) =>
            absence.groupId === groupId
    );
    console.log("🚀 ~ AddAbsenceDialog ~ alreadyAbsent:", alreadyAbsent)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Adaugă Absență</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Nume Elev
                        </Label>
                        <Input id="name" placeholder="Introdu numele grupei" value={student.Name} disabled />
                    </div>

                </div>

                <DialogFooter>
                    <Button>Salvează grupa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
