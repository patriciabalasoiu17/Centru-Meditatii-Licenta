import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CalendarHeader({ teacherId }: { teacherId: string | undefined }) {
    const navigate = useNavigate();
    return <Calendar onClick={() => navigate(`/calendar/${teacherId}`)} />
}