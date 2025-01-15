import { LayoutDashboard, FolderKanban, Users, Calendar, Settings, LogOut, Building2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { Button } from "./ui/button"
import Link from "next/link"
// Menu items.
const items = [
  {
    title: "דשבורד",
    url: "/home",
    icon: LayoutDashboard ,
  },
  {
    title: "פרויקטים",
    url: "/projects",
    icon: FolderKanban ,
  },
  {
    title: "צוותים",
    url: "/users",
    icon: Users  ,
  },
  {
    title: "לוח שנה",
    url: "/cities",
    icon: Calendar  ,
  },
  {
    title: "ערים",
    url: "/cities",
    icon: Building2   ,
  },
]

export async function  AppSidebar() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <h2 className="text-2xl font-bold text-green-600">לוח בקרה</h2>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="mt-10">
            {items.map((item) => {
                const isActive = false; // Check if the item is active
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "bg-blue-100 rounded-md" : ""} // Apply a different background for the active item
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
              <SidebarMenuItem>
                {user && 
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.picture ?? ""} />
                    <AvatarFallback>{user.given_name}</AvatarFallback>
                  </Avatar>
                  <p>{user.given_name + " " + user.family_name}</p>
                  
                  <Button variant={'ghost'} size={'icon'} aria-label="Logout" title="Logout" className="rounded-full mr-auto" asChild>
                        <LogoutLink>
                            <LogOut/>
                        </LogoutLink>
                  </Button>
                </div>
                }
              </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
