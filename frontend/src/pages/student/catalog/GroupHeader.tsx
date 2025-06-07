import { getGroup } from "@/pages/groups/GroupApi";
import { useQuery } from "@tanstack/react-query";

export default function GroupHeader({ groupId }: { groupId: string }) {
    console.log("🚀 ~ GroupHeader ~ groupId:", groupId)

    const { data } = useQuery({
        queryKey: ["group", groupId],
        queryFn: () => getGroup(groupId),
    });
    console.log("🚀 ~ GroupHeader ~ data:", data)
    return <div>MORTII {groupId}</div>
}