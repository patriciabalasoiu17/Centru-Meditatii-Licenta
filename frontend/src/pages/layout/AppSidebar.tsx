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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Backpack,
  ChevronUp,
  GraduationCap,
  Home,
  Library,
  User2,
  Users,
} from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStudentByEmail } from "../student/StudentApi";

export function AppSidebar() {
  const { user, isLoaded, isSignedIn } = useUser();

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {isSignedIn ? (
                    <>
                      <UserButton />
                      <div className="flex flex-col ml-2">
                        <span className="text-black">
                          {user.primaryEmailAddress?.emailAddress}
                        </span>
                        <span className="text-xs text-neutral-600">
                          {role as string}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <User2 /> Not signed in
                    </>
                  )}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <SignOutButton />
                  </SignedIn>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
