import { ColumnDef } from "@tanstack/react-table"
import { type Group } from "@/pages/groups/types"

export const columns: ColumnDef<Group>[] = [
    {
        accessorKey: "Name",
        header: "Nume",
    },
    {
        header: "Status Prezență",
        cell: (props) =>
            <div>Prezent</div>

    },
    {
        accessorKey: "Status Fișă",
    },
    {
        header: "Temă",
    },


]