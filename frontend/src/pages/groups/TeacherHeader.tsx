import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "../teacher/TeacherApi";

export default function TeacherHeader({ teacherId }: { teacherId: string }) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["teacher", teacherId],
        queryFn: () => getTeacher(teacherId),
    });

    if (isLoading) {
        return <div>Loading..</div>
    }

    if (error) {
        return <div>error : {error?.message}</div>
    }

    return (
        <div>{data?.Name}</div>
    )
}