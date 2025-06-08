import { Student } from "@/pages/student/types"
import { ColumnDef } from "@tanstack/react-table"
import { AddAbsenceDialog } from "./AddAbsenceDialog"
import AddStudentEvaluationDialog from "./AddStudentEvaluationDialog"

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "Name",
        header: "Nume",
    },
    {
        header: "Status Prezență",
        cell: (props) => <AddAbsenceDialog student={props.row.original} />

    },
    {
        accessorKey: "Status Fișă",
        cell: (props) => <AddStudentEvaluationDialog student={props.row.original} />
    },
]