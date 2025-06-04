import { ColumnDef } from "@tanstack/react-table"
import { Check, Cross, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddAbsenceDialog } from "./AddAbsenceDialog"
import { Student } from "@/pages/student/types"

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
        cell: (props) => <div className="flex gap-2"><Check className="text-green-500" /> <Button>Modifica</Button></div>
    },
    {
        header: "Temă",
    },


]