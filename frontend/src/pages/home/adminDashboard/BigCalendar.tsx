import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { ClassEvent, getAllClassEvents } from "./CalendarApi";
import { useNavigate } from "react-router-dom";
import { AddEventDialog } from "./AddEventDialog";

export default function BigCalendar() {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getAllClassEvents(),
    });
    const navigate = useNavigate()



    return (
        <div className="flex flex-col h-full">
            <AddEventDialog />
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={(event) => { const newEvent = event as ClassEvent; navigate(`/group/${newEvent._id}/${newEvent.title}`) }}

            />
        </div>
    );
}