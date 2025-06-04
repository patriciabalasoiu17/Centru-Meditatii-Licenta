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
import { getTeachers } from "../teacher/TeacherApi"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Teacher } from "../teacher/types"
import { getStudents } from "../student/StudentApi"
import { Student } from "../student/types"
import { addGroup, getGroup, updateGroup } from "./GroupApi"
import { toast } from "sonner"
import { Edit } from "lucide-react"

export function AddGroupDialog({ id }: { id?: string }) {
    const { data: teacher } = useQuery<Teacher[]>({
        queryKey: ["teachers"],
        queryFn: getTeachers,
    });

    const { data: group } = useQuery({
        queryKey: ["group", id],
        queryFn: () => id ? getGroup(id) : Promise.resolve(null),
        enabled: !!id,
    });

    const { data: students } = useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: getStudents,
    });

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            toast.success("Grupă adaugat cu succes.");
            setOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            toast.success("Grupă modificată cu succes.");
            setOpen(false);
        },
    });

    const [open, setOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher>()
    const [selectedSubject, setSelectedSubject] = useState<string>("")
    const [selectedStudent, setSelectedStudents] = useState<string[]>();


    useEffect(() => {
        if (group) {
            setTitle(group.name);
            setSelectedTeacher(teacher?.find(selected => selected._id == group.teacherId));
            setSelectedSubject(group.subject)
            setSelectedStudents(group.students)
        }
    }, [group])


    const onSubmit = () => {
        if (title == null || selectedTeacher?._id == null || selectedSubject == null || selectedStudent == null) {
            toast.error("Toate câmpurile sunt obligatorii!")
            return;
        }

        const group = { name: title, teacherId: selectedTeacher._id, students: selectedStudent, subject: selectedSubject }

        if (id) {
            updateMutation.mutate({ id, group })

        } else {
            addMutation.mutate({ name: title, teacherId: selectedTeacher._id, subject: selectedSubject, students: selectedStudent })
        }
    }

    const studentOptions = students?.map(student => ({ label: student.Name, value: student._id ?? "" })) || []

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {id ? <Edit /> : <Button variant="outline">Adaugă Grupă</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Numele Grupei
                        </Label>
                        <Input id="name" placeholder="Introdu numele grupei" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Profesor
                        </Label>
                        <Select onValueChange={(id) => setSelectedTeacher(teacher?.find(selected => selected._id == id))} defaultValue={selectedTeacher?._id}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Alege un profesor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {teacher?.map((option) => option._id != null && <SelectItem value={option._id?.toString()}>{option.Name}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" >
                            Disciplină
                        </Label>
                        <Select onValueChange={setSelectedSubject} disabled={selectedTeacher == null} defaultValue={selectedSubject}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Alege o materie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {selectedTeacher?.Subject?.map((option) => <SelectItem value={option}>{option}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="name" >
                            Elevi
                        </Label>
                        {students && <MultiSelect options={studentOptions} onValueChange={setSelectedStudents} defaultValue={selectedStudent} />}
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={onSubmit}>Salvează grupa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
