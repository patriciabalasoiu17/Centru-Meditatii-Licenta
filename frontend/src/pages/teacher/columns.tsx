import { ColumnDef } from "@tanstack/react-table"
import { type Teacher } from "./types"
import { AddTeacherDialog } from "./AddTeacherDialog"
import CalendarHeader from "./CalendarHeader"


export const columns: ColumnDef<Teacher>[] = [
    {
        header: "Orar",
        cell: (props) => <CalendarHeader teacherId={props.row.original._id} />

    },
    {
        accessorKey: "Name",
        header: "Nume",
    },
    {
        accessorKey: "Mail",
        header: "E-mail",
    },
    {
        accessorKey: "Phone",
        header: "Telefon",
    },
    {
        accessorKey: "Subject",
        header: "Materie",
        cell: (props) => <div className="flex flex-col"> {(props.getValue() as string[]).map((materie) => <div> {materie}  </div>)}</div>
    },
    {
        header: " ",
        cell: (props) => <AddTeacherDialog id={props.row.original._id} />
    }
]