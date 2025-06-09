import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


import {
  Backpack,
  GraduationCap,
  Home,
  Library,
  Users,
} from "lucide-react";

import {
  useUser,
} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStudentByEmail } from "../student/StudentApi";

export function AppSidebar() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  const role = user?.publicMetadata?.role;

  const email = user?.primaryEmailAddress?.emailAddress;

  const {
    data,
  } = useQuery({
    queryKey: ["student", email],
    queryFn: () => getStudentByEmail(email || ""),
    enabled: isLoaded && !!email && role == "student"
  });

  const studentId = data?._id || ""


  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      allowedRoles: ["admin", "profesor", "student"],
    },
    {
      title: "Profesori",
      url: "/teacher",
      icon: GraduationCap,
      allowedRoles: ["admin"],
    },
    {
      title: "Elevi",
      url: "/student",
      icon: Backpack,
      allowedRoles: ["admin"],
    },
    {
      title: "Grupe",
      url: "/group",
      icon: Backpack,
      allowedRoles: ["admin", "profesor"],
    },
    {
      title: "Utilizatori",
      url: "/users",
      icon: Users,
      allowedRoles: ["admin"],
    },
    {
      title: "Catalog",
      url: `/catalog/${studentId}`,
      icon: Library,
      allowedRoles: ["student"],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    item.allowedRoles.includes(role as string)
  );

  return (

    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
