import { ColumnDef } from "@tanstack/react-table"
import { type Student } from "./types"
import { AddStudentDialog } from "./AddStudentDialog"
import { Library } from "lucide-react"


export const columns: ColumnDef<Student>[] = [
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
        accessorKey: "Year",
        header: "Clasa",
    },
    {
        header: "Catalog",
        cell: () => <Library />
    },
    {
        header: "Edit",
        cell: (props) => <AddStudentDialog id={props.row.original._id} />
    }
]