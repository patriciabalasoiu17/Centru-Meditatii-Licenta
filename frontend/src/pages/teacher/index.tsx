import { type Teacher } from "./types"
import { getTeachers } from "./TeacherApi"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useQuery } from "@tanstack/react-query"
import { Toaster } from "sonner"
export default function Teacher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>Something went wrong...</div>
  }
  return <div className="w-[85%] p-4">
    <DataTable data={data} columns={columns} />
    <Toaster />
  </div>
}