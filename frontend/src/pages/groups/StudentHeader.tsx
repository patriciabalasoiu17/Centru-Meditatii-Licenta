import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../student/StudentApi";
import { Student } from "../student/types";

export default function TeacherHeader({ students }: { students: string[] }) {

    const { data, isLoading, error } = useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: getStudents
    });


    if (isLoading) {
        return <div>Loading..</div>
    }

    if (error) {
        return <div>error : {error?.message}</div>
    }

    const filteredStudents = data?.filter((student) => { if (student._id != null) return students.includes(student._id) })

    return (
        <div>
            {filteredStudents?.map((student) => <div>{student.Name}</div>)}
        </div>
    )

}