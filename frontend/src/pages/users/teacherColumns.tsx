import { ColumnDef } from "@tanstack/react-table"
import { UserResource } from "@clerk/types"


export const teacherColumns: ColumnDef<UserResource>[] = [
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
]