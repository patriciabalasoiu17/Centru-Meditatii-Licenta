import { ColumnDef } from "@tanstack/react-table"
import { type Student } from "./types"
import { AddStudentDialog } from "./AddStudentDialog"
import { Library } from "lucide-react"
import { useNavigate } from "react-router-dom"


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
        cell: (props) => {
            console.log("🚀 ~ props:", props.row.original)
            const navigate = useNavigate();
            return <Library onClick={() => navigate(`/catalog/${(props.row.original as Student)._id}`)} />
        }
    },
    {
        header: "Edit",
        cell: (props) => <AddStudentDialog id={props.row.original._id} />
    }
]