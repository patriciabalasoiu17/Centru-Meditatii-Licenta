import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { deleteGroup } from "./GroupApi";
import { toast } from "sonner";

export default function DeleteGroup({ groupId }: { groupId: string }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups"] });
            toast.success("Grupă ștearsă cu succes.");
        },
    });
    return <Trash onClick={() => deleteMutation.mutate(groupId)}
    />

}