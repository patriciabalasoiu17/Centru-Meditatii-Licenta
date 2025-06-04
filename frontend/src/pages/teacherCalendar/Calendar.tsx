import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
    View,
    Views,
} from "react-big-calendar";
import moment from "moment";
import { SetStateAction, useCallback, useState } from "react";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {

    const [date, setDate] = useState(new Date())
    const [view, setView] = useState<View>(Views.WEEK)

    const onNavigate = useCallback((newDate: SetStateAction<Date>) => setDate(newDate), [setDate])
    const onView = useCallback((newView: View) => setView(newView), [setView])

    return <BigCalendar {...props} localizer={localizer} date={date} view={view} views={[Views.WEEK]} min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 21, 0)} onNavigate={onNavigate} onView={onView} />;
}