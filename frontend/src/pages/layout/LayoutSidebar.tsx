import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="w-full h-full">
            <AppSidebar />
            {/* <main className="w-full h-full"> */}
            <SidebarTrigger />
            {children}
            {/* </main> */}
        </SidebarProvider>
    )
}
