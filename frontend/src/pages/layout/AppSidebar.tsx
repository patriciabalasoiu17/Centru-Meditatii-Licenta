import { Backpack, Calendar, ChevronUp, GraduationCap, Home, Inbox, Search, Settings, User2, Users } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, UserProfile, useUser } from "@clerk/clerk-react"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Profesori",
    url: "/teacher",
    icon: GraduationCap,
  },
  {
    title: "Elevi",
    url: "/student",
    icon: Backpack,
  },
  {
    title: "Grupele mele",
    url: "/group",
    icon: Backpack,
  },
  {
    title: "Utilizatori",
    url: "/users",
    icon: Users,
  },

]
export function AppSidebar() {

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  const role = user?.publicMetadata?.role;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
                <SidebarMenuButton className="" >
                  {isSignedIn && <>
                    <UserButton />
                    <div className="flex flex-col">
                      <span className="text-black">
                        {user.primaryEmailAddress?.emailAddress}
                      </span>
                      <span className="text-xs text-neutral-600"> {role as string} </span>
                    </div>
                  </>
                  }
                  {!isSignedIn && <>
                    < User2 /> Not signed in
                  </>
                  }
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
  )
}
