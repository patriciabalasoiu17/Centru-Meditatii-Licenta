import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getTeacherByEmail } from "../teacher/TeacherApi";
import { AddGroupDialog } from "./AddGroup";
import { getGroups } from "./GroupApi";
import { useGroupColumns } from "./columns";
import { DataTable } from "./data-table";
import { Group } from "./types";

export default function Groups() {
    const { user, isLoaded } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const role = user?.publicMetadata?.role;

    const {
        data: teacher,
        isLoading: loadingTeacher,
        error: errorTeacher,
    } = useQuery({
        queryKey: ["teacher", email],
        queryFn: () => getTeacherByEmail(email as string),
        enabled: !!email && role === "profesor",
    });

    const {
        data: groups,
        isLoading: loadingGroups,
        error: errorGroups,
    } = useQuery({
        queryKey: ["groups", role, teacher?._id],
        queryFn: () =>
            role === "admin"
                ? getGroups({})
                : getGroups({ teacherId: teacher?._id }),
        enabled: isLoaded && ((role === "admin") || (role === "profesor" && !!teacher)),
    });

    if (loadingGroups || (role === "profesor" && loadingTeacher)) {
        return <div>Loading...</div>;
    }

    if (!groups || errorGroups || (role === "profesor" && errorTeacher)) {
        return <div>Something went wrong...</div>;
    }

    return (
        <div className="w-[85%] p-4">
            {role === "admin" && <AddGroupDialog />}
            <DataTable data={groups as Group[]} columns={useGroupColumns()} />
        </div>
    );
}
