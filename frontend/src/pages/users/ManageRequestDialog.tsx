import { useEffect, useState } from "react";

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
import { Check } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { SUBJECT_OPTIONS } from "../teacher/subjects";
import { addRole, getUser } from "./UserApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addTeacher } from "../teacher/TeacherApi";
import { Teacher } from "./types";
import { addStudent } from "../student/StudentApi";
import { Student } from "../student/types";


export function ManageRequestDialog({ id }: { id: string }) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [subject, setSubject] = useState<string[]>([]);
    const [year, setYear] = useState("");

    const { data: userData } = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
    })

    const queryClient = useQueryClient();

    const addRoleMutation = useMutation({
        mutationFn: () => addRole(id, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["students"] });
            // toast.success("Profesor adaugat cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpen(false);

        }
    });

    const addTeacherMutation = useMutation({
        mutationFn: addTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Profesor adaugat cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpen(false);

        }
    });

    const addStudentMutation = useMutation({
        mutationFn: addStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Elev adaugat cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpen(false);

        }
    });


    useEffect(() => {
        if (userData) {
            let user = ""
            if (userData.firstName != null)
                user += userData.firstName
            if (userData.lastName != null)
                user += " " + userData.lastName

            setName(user);
        }
    }, [userData]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        addRoleMutation.mutate()
        if (role === "profesor" && userData != null && userData.emailAddresses[0].emailAddress != null) {
            const teacher: Teacher = { Name: name, Mail: userData.emailAddresses[0].emailAddress, Phone: phone, Subject: subject }
            addTeacherMutation.mutate(teacher)
        }

        if (role === "student" && userData != null && userData.emailAddresses[0].emailAddress != null) {
            const student: Student = { Name: name, Mail: userData.emailAddresses[0].emailAddress, Phone: phone, Year: year };
            addStudentMutation.mutate(student)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="m-2 hover:bg-green-300 bg-green-100 border-2 border-green-900"> <Check /> Gestionează</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Gestionează cererea</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input disabled id="email" value={userData?.emailAddresses[0].emailAddress} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nume
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Andrei Popescu" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Telefon
                        </Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="ex: 0770 111 222" className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Rol
                        </Label>
                        <Select onValueChange={value => setRole(value)} value={role} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Alege un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="profesor">Profesor</SelectItem>
                                    <SelectItem value="student">Elev</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {role === "profesor" && <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                            Materie
                        </Label>
                        <MultiSelect
                            options={SUBJECT_OPTIONS}
                            onValueChange={setSubject}
                            defaultValue={subject}
                            placeholder="Alege materii"
                            variant="inverted"
                            className="col-span-3"
                            animation={2}
                            maxCount={3}
                        />
                    </div>}

                    {role === "student" && <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                            Clasa
                        </Label>
                        <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="ex: VII" className="col-span-3" />
                    </div>}

                    <DialogFooter>
                        <Button type="submit">Salveaza modificarile</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}