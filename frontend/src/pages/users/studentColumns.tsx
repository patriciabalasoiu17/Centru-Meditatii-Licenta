import { ColumnDef } from "@tanstack/react-table"
import { UserResource } from "@clerk/types"


export const studentColumns: ColumnDef<UserResource>[] = [
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