import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { ManageRequestDialog } from "./ManageRequestDialog"
import { UserResource } from "@clerk/types"


export const requestColumns: ColumnDef<UserResource>[] = [
    {
        accessorKey: "imageUrl",
        header: "",
        cell: (prop) => <Avatar>
            <AvatarImage src={prop.getValue() as string} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    },
    {
        accessorKey: "lastName",
        header: "Nume"
    },
    {
        accessorKey: "firstName",
        header: "Prenume"
    },
    {
        header: "Gestionează cerere",
        cell: (prop) => <ManageRequestDialog id={prop.row.original.id} />
    },
    {
        accessorKey: "createdAt",
        header: "Data crearii",
        cell: (prop) => <div>{new Date(prop.getValue() as string).toLocaleString()}</div>
    }
]