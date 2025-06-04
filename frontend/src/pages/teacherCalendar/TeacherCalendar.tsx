import { useParams } from "react-router-dom"
import BigCalendar from "./BigCalendar";

export default function TeacherCalendar() {
    const params = useParams();

    if (params.id == null) {
        return (<div>Something went wrong</div>)
    }
    return (
        <div className="w-full h-full">
            <BigCalendar teacherId={params.id} />
        </div>
    );
}