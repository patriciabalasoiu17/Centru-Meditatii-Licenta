import Calendar from "./Calendar";
import { useQuery } from "@tanstack/react-query";
import { getClassEventsForStudent } from "./CalendarApi";

export default function BigCalendar({ studentId }: { studentId: string }) {
    const { data } = useQuery({
        queryKey: ["classEvents"],
        queryFn: () => getClassEventsForStudent({ studentId }),
    });


    return (
        <div>
            <Calendar
                events={data}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}