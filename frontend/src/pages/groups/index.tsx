import { useQuery } from "@tanstack/react-query";
import { getGroups } from "./GroupApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddGroupDialog } from "./AddGroup";
import { Group } from "./types";

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
    return <div>
        <AddGroupDialog />
        <DataTable data={data as Group[]} columns={columns} />
    </div>
}