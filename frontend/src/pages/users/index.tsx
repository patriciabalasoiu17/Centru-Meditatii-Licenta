import { useQuery } from "@tanstack/react-query";
import { getUsers, getUsersWithoutRole } from "./UserApi";
import { RequestDataTable } from "./requestDatatable";
import { requestColumns } from "./requestColumns";
import { TeacherDatatable } from "./teacherDatatable";
import { getTeachers } from "../teacher/TeacherApi";
import { teacherColumns } from "./teacherColumns";
import { StudentDatatable } from "./studentDatatable";
import { getStudents } from "../student/StudentApi";
import { studentColumns } from "./studentColumns";


export default function Users() {

  const { data: requests, isLoading: isLoadingRequest, error: errorRequest } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersWithoutRole,
  });
  console.log("🚀 ~ Users ~ requests:", requests)

  const { data: teachers, isLoading: isLoadingTeachers, error: errorTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const { data: students, isLoading: isStudentLoading, error: errorStudent } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });


  if (isLoadingRequest || isLoadingTeachers || isStudentLoading) {
    return <div>Loading...</div>
  }
  if (errorRequest || errorTeachers || !requests || !teachers || errorStudent || !students) {
    return <div>Something went wrong...</div>
  }

  return (
    <div className="w-full ">
      <div className="mt-10 p-4">
        <RequestDataTable data={requests} columns={requestColumns} />
      </div>

      <div className="mt-10 p-4">
        <TeacherDatatable data={teachers} columns={teacherColumns} />
      </div>

      <div className="mt-10 p-4">
        <StudentDatatable data={students} columns={studentColumns} />
      </div>

    </div>
  )
}
