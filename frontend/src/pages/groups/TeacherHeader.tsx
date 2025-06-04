import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "../teacher/TeacherApi";

export default function TeacherHeader({ teacherId }: { teacherId: string }) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["teacher", teacherId],
        queryFn: () => getTeacher(teacherId),
    });

    return (
        <div>{data?.Name}</div>
    )
}