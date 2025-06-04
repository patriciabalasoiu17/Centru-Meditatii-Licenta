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
import { Edit, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudent, addStudent, updateStudent, deleteStudent } from "./StudentApi";
import { toast } from "sonner";


export function AddStudentDialog({ id }: { id?: string }) {
    const { data: studentData } = useQuery({
        queryKey: ["student", id],
        queryFn: () => id ? getStudent(id) : Promise.resolve(null),
        enabled: !!id,
    });

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [year, setYear] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (studentData) {
            setName(studentData.Name);
            setMail(studentData.Mail);
            setPhone(studentData.Phone);
            setYear(studentData.Year);
        }
    }, [studentData]);

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Elev adăugat cu succes.");
            setOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Elev modificat cu succes.");
            setOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Elev șters cu succes.");
            setOpen(false);
        },
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const student = { Name: name, Mail: mail, Phone: phone, Year: year };

        if (id) {
            updateMutation.mutate({ id, student });
        } else {
            addMutation.mutate(student);
            setName(""); setMail(""); setPhone(""); setYear("");
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Ești sigur că vrei să ștergi acest elev?");
        if (confirmDelete && id) {
            deleteMutation.mutate(id);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {id ? <Edit /> : <Button variant="outline" className="m-2"> <Plus /> Adauga elev</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{id ? "Editează" : "Adaugă"} un elev </DialogTitle>

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
                        <Label htmlFor="year" className="text-right">
                            Clasa
                        </Label>
                        <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="ex: 7" className="col-span-3" />
                    </div>



                    <DialogFooter>
                        {id && <Button variant={"destructive"} onClick={handleDelete}>Șterge elevul</Button>}
                        <Button type="submit">Salvează modificarile</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


