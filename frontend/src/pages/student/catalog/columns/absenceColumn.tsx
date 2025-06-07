import { Absence } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"

export const absenceColumns: ColumnDef<Absence>[] = [
    {
        accessorKey: "date",
        header: "Data",
        cell: ({ getValue }) => (new Date(getValue() as string).toISOString().split("T")[0])
    },
    {
        accessorKey: "groupName",
        header: "Grupa",
    },
    {
        accessorKey: "reason",
        header: "Motivație",

    },

]