import { ColumnDef } from "@tanstack/react-table"
import { Student } from "../student/types"


export const studentColumns: ColumnDef<Student>[] = [
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
]