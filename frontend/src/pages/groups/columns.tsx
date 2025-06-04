import { ColumnDef } from "@tanstack/react-table"
import { type Group } from "./types"
import TeacherHeader from "./TeacherHeader"
import StudentHeader from "./StudentHeader"
import { Library } from "lucide-react"
import DeleteGroup from "./DeleteGroup"
import { AddGroupDialog } from "./AddGroup"

export const columns: ColumnDef<Group>[] = [
    {
        accessorKey: "name",
        header: "Nume",
    },
    {
        accessorKey: "teacherId",
        header: "Profesor",
        cell: (props) => <TeacherHeader teacherId={props.getValue() as string} />
    },
    {
        header: "Catalog",
        cell: () => <Library />
    },
    {
        accessorKey: "subject",
        header: "Disciplină"
    },
    {
        accessorKey: "students",
        header: "Elevi",
        cell: (props) => <StudentHeader students={props.getValue() as string[]} />
    },
    {
        header: "Modifică ",
        cell: (props) => <AddGroupDialog id={props.row.original._id as string} />
    },
    {
        header: "Șterge",
        cell: (props) => <DeleteGroup groupId={props.row.original._id as string} />
    },

]