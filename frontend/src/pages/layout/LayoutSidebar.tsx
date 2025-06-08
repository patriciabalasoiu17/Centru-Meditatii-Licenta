import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="w-full h-full">
            <AppSidebar />
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )
}
