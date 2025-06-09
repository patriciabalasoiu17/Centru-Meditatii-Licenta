import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { useUser } from "@clerk/clerk-react";

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {

    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading...</div>;

    const role = user?.publicMetadata?.role;


    return (
        <SidebarProvider className="w-full h-full">
            {role != undefined && <AppSidebar />}
            {role != undefined && <SidebarTrigger />}
            {children}
        </SidebarProvider>
    )
}
