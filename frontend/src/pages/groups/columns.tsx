import { ColumnDef } from "@tanstack/react-table"
import { AddGroupDialog } from "./AddGroup"
import DeleteGroup from "./DeleteGroup"
import StudentHeader from "./StudentHeader"
import TeacherHeader from "./TeacherHeader"
import { type Group } from "./types"

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