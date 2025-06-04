import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { ClassEvent, getClassEvents } from "./CalendarApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BigCalendar({ teacherId }: { teacherId: string }) {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getClassEvents({ teacherId }),
    });
    console.log("🚀 ~ BigCalendar ~ data:", data)

    const [triggerOpenDialog, setTriggerOpenDialog] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);

    const navigate = useNavigate()

    return (
        <div>
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={(event) => { navigate(`/group/${event._id}/${event.title}`) }}
            />
        </div>
    );
}