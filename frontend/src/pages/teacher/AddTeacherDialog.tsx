import { useEffect, useState } from "react";
import { SUBJECT_OPTIONS } from "./subjects";

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
import { Edit, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeacher, addTeacher, updateTeacher, deleteTeacher } from "./TeacherApi";
import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select";


export function AddTeacherDialog({ id }: { id?: string }) {
    const { data: teacherData } = useQuery({
        queryKey: ["teacher", id],
        queryFn: () => id ? getTeacher(id) : Promise.resolve(null),
        enabled: !!id,
    });

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const [subject, setSubject] = useState<string[]>([]);

    useEffect(() => {
        if (teacherData) {
            setName(teacherData.Name);
            setMail(teacherData.Mail);
            setPhone(teacherData.Phone);
            setSubject([...teacherData.Subject]);

        }
    }, [teacherData]);

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            toast.success("Profesor adăugat cu succes.");
            setOpen(false);
        },
        onError: () => {
            toast.error("Ceva nu a funcționat...");
            setOpen(false);

        }
    });

    const updateMutation = useMutation({
        mutationFn: updateTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            // toast.error("Ceva nu a funcționat...");
            toast.success("Profesor modificat cu succes.");
            setOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            toast.success("Profesor sters cu succes.");
            setOpen(false);
        },
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const teacher = { Name: name, Mail: mail, Phone: phone, Subject: subject };

        if (id) {
            updateMutation.mutate({ id, teacher });
        } else {
            addMutation.mutate(teacher);
            setName(""); setMail(""); setPhone(""); setSubject([]);
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Ești sigur că vrei să ștergi acest profesor?");
        if (confirmDelete && id) {
            deleteMutation.mutate(id);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {id ? <Edit /> : <Button variant="outline" className="m-2"> <Plus /> Adauga profesor</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{id ? "Editează" : "Adaugă"} un profesor </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nume
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Andrei Popescu" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            E-mail
                        </Label>
                        <Input id="mail" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="ex: andreipopescu@gmail.com" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Telefon
                        </Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="ex: 0770111222" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
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
                    </div>




                    <DialogFooter>
                        {id && <Button variant={"destructive"} onClick={handleDelete}>Șterge profesorul</Button>}
                        <Button type="submit">Salvează modificarile</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


