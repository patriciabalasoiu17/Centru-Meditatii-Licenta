import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { ClassEvent, getClassEvents } from "./CalendarApi";
import { useNavigate } from "react-router-dom";

export default function BigCalendar({ teacherId }: { teacherId: string }) {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getClassEvents({ teacherId }),
    });

    const navigate = useNavigate()

    return (
        <div>
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={(event) => { const newEvent = event as ClassEvent; navigate(`/group/${newEvent._id}/${newEvent.title}`) }}
            />
        </div>
    );
}