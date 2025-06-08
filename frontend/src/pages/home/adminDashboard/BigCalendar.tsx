import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { ClassEvent, getAllClassEvents } from "./CalendarApi";
import { useNavigate } from "react-router-dom";
import { AddEventDialog } from "./AddEventDialog";
import { useState } from "react";
import { UpdateEventDialog } from "./UpdateEventDialog";

export default function BigCalendar() {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getAllClassEvents(),
    });


    const [selectedEvent, setSelectedEvent] = useState<ClassEvent | undefined>();
    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-full">
            <AddEventDialog />
            <UpdateEventDialog classEvent={selectedEvent as ClassEvent | undefined} />
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event) => setSelectedEvent(event as ClassEvent)}
                onSelectSlot={() => setSelectedEvent(undefined)}
                onDoubleClickEvent={(event) => { const newEvent = event as ClassEvent; navigate(`/group/${newEvent._id}/${newEvent.title}`) }}

            />
        </div>
    );
}