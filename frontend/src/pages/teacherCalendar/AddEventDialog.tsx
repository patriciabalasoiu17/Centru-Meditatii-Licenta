import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/datepicker"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addClassEvent, ClassEvent, deleteClassEvent, updateClassEvent } from "./CalendarApi"
import { toast } from "sonner"
import { TimePickerInput } from "@/components/ui/timepicker"
import React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getGroups } from "../groups/GroupApi"
import { Group } from "../groups/types"

export function AddEventDialog({ setSelectedEvent, classEvent, open, setOpenDialog, teacherId }: { setSelectedEvent: Dispatch<SetStateAction<ClassEvent | null>>, classEvent: ClassEvent | null, open: boolean, setOpenDialog: (open: boolean) => void, teacherId?: string }) {
    const [title, setTitle] = useState<string | undefined>();
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [error, setError] = useState<string>();

    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);

    const onSelectStart = (start: Date | undefined) => {
        if (start != null) {
            setStartDate(new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes()))
            if (endDate != null)
                setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), start.getHours() + 2, start.getMinutes()));
        }
    }

    const { data: teacherGroups } = useQuery({
        queryKey: ["teacherGroup", teacherId],
        queryFn: () => teacherId ? getGroups({ teacherId }) : Promise.resolve(null),
        enabled: !!teacherId,
    });


    useEffect(() => {
        setTitle(classEvent?.title as string ?? "");
        setStartDate(classEvent?.start || new Date());
        setEndDate(classEvent?.end || new Date());
        setError(undefined);
    }, [classEvent]);

    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addClassEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classEvents"] });
            toast.success("Sedinta adaugată cu succes.");
            setOpenDialog(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpenDialog(false);

        }
    });

    const updateMutation = useMutation({
        mutationFn: updateClassEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classEvents"] });
            toast.success("Sedinta modificată cu succes.");
            setOpenDialog(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpenDialog(false);

        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteClassEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classEvents"] });
            toast.success("Sedinta ștearsă cu succes.");
            setOpenDialog(false);
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
            setOpenDialog(false);

        }
    });

    const handleOnClick = () => {
        if (title == undefined || startDate == undefined || endDate == undefined) {
            setError("Toate câmpurile sunt obligatorii.")
            return;
        }
        if (classEvent != null && classEvent._id != null) {
            updateMutation.mutate({ id: classEvent._id, classEvent: { title, start: startDate, end: endDate } });
        } else {
            addMutation.mutate({ title, start: startDate, end: endDate, teacherId: teacherId })
        }
        setTitle("")
        setStartDate(new Date())
        setEndDate(new Date())
        setSelectedEvent(null);

    }

    const deleteOnClick = () => {
        if (classEvent?._id) {
            deleteMutation.mutate(classEvent._id)
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(!open)
        setSelectedEvent(null)
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">Adaugă ședința</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adaugă o ședință nouă</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" >
                        Grupa
                    </Label>
                    <Select onValueChange={value => setTitle(value)} value={title} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Alege o grupa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {teacherGroups?.map((teacherGroup: Group) => <SelectItem value={teacherGroup.name}>{teacherGroup.name}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Label>Dată prima ședință</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
                <Label>Dată ultima ședință</Label>
                <DatePicker date={endDate} setDate={setEndDate} />

                <div className="flex gap-2 items-center justify-between">
                    <div className="flex flex-col gap-2 items-start">
                        <Label htmlFor="minutes" className="text-xs">
                            Oră început
                        </Label>
                        <div className="flex items-center gap-2">
                            <TimePickerInput
                                picker="hours"
                                date={startDate}
                                setDate={onSelectStart}
                                ref={hourRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
                            />
                            <span className="text-xl font-bold">:</span>

                            <TimePickerInput
                                picker="minutes"
                                date={startDate}
                                setDate={onSelectStart}
                                ref={minuteRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-start">
                        <Label htmlFor="minutes" className="text-xs">
                            Oră sfârșit
                        </Label>
                        <div className="flex items-center gap-2">

                            <TimePickerInput
                                picker="hours"
                                date={endDate}
                                setDate={setEndDate}
                                ref={hourRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
                            />
                            <span className="text-xl font-bold">:</span>

                            <TimePickerInput
                                picker="minutes"
                                date={endDate}
                                setDate={setEndDate}
                                ref={minuteRef}
                                onLeftFocus={() => hourRef.current?.focus()}
                                onRightFocus={() => secondRef.current?.focus()}
                            />
                        </div>
                    </div>
                </div>



                {error && <div className="text-red-500">{error}</div>}
                <Button onClick={() => handleOnClick()}>Salvează ședința</Button>
                {classEvent?._id && <Button onClick={deleteOnClick}>Șterge ședința</Button>}
            </DialogContent>
        </Dialog>
    )
}
