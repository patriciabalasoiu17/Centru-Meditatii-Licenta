import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { ClassEvent, getClassEvents } from "./CalendarApi";
import { AddEventDialog } from "./AddEventDialog";
import { useState } from "react";

export default function BigCalendar({ teacherId }: { teacherId: string }) {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getClassEvents({ teacherId }),
    });

    const [triggerOpenDialog, setTriggerOpenDialog] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);

    return (
        <div>
            <AddEventDialog setSelectedEvent={setSelectedEvent} classEvent={selectedEvent} open={triggerOpenDialog} setOpenDialog={setTriggerOpenDialog} teacherId={teacherId} />
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={(event) => { setSelectedEvent(event as ClassEvent); setTriggerOpenDialog(!triggerOpenDialog) }}
            />
        </div>
    );
}