import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/datepicker"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePickerInput } from "@/components/ui/timepicker"
import { getTeachers } from "@/pages/teacher/TeacherApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { toast } from "sonner"
import { addClassEvent, deleteClassEvent, updateClassEvent } from "./CalendarApi"
import { Teacher } from "@/pages/teacher/types"
import { getGroups } from "@/pages/groups/GroupApi"
import { Group } from "@/pages/groups/types"

export function AddEventDialog() {
    const [teacherId, setTeacherId] = useState<string>();
    const [groupName, setGroupName] = useState<string>();
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [error, setError] = useState<string>();

    const [open, setOpen] = useState<boolean>();

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


    const { data: teachers } = useQuery({
        queryKey: ["teachers",],
        queryFn: getTeachers,
    });

    const { data: groups } = useQuery({
        queryKey: ["groups", teacherId],
        queryFn: () => getGroups({ teacherId: teacherId }),
        enabled: !!teacherId
    })



    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addClassEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classEvents"] });
            toast.success("Sedinta adaugată cu succes.");
        },
        onError: () => {
            toast.error("Ceva nu a functionat...");
        }
    });

    const handleTeacherChange = (value: React.SetStateAction<string | undefined>) => {
        setTeacherId(value)
        setGroupName("")
    }
    const handleOnClick = () => {
        if (error) {
            setError("");
        }
        console.log("🚀 ~ handleOnClick ~ teacherId:", teacherId)
        console.log("🚀 ~ handleOnClick ~ groupId:", groupName)
        if (teacherId == "" || groupName == "" || startDate == undefined || endDate == undefined) {
            setError("Toate câmpurile sunt obligatorii!")
        }
        addMutation.mutate({ title: groupName, start: startDate, end: endDate, teacherId: teacherId })

        setGroupName("")
        setTeacherId("")
        setStartDate(new Date())
        setEndDate(new Date())
        setOpen(false)
    }




    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
                <Button className="max-w-[12rem] mb-4">Adaugă ședința</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adaugă o ședință nouă</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" >
                        Profesor
                    </Label>
                    <Select onValueChange={value => handleTeacherChange(value)} value={teacherId} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Alege un profesor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {teachers?.map((teacher: Teacher) => <SelectItem value={`${teacher._id}`}>{teacher.Name}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" >
                        Grupa
                    </Label>
                    <Select onValueChange={value => setGroupName(value)} value={groupName} disabled={teacherId && groups ? groups.length == 0 : false ? false : true}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Alege o grupă" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {groups?.map((group: Group) => <SelectItem value={`${group.name}`}>{group.name}</SelectItem>)}
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
            </DialogContent>
        </Dialog>
    )
}
