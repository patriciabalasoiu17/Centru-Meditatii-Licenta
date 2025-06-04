import { useQuery } from "@tanstack/react-query";
import { getGroups } from "./GroupApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddGroupDialog } from "./AddGroup";

export default function Groups() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["groups"],
        queryFn: () => getGroups({}),
    });


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error || !data) {
        return <div>Something went wrong...</div>
    }
    console.log("🚀 ~ Group ~ data:", data)
    return <div>
        <AddGroupDialog />
        <DataTable data={data} columns={columns} />
    </div>
}