import { Calendar, ChevronUp, Home, Inbox, User2 } from "lucide-react"
import logo from "@/assets/logo.png"
import type { User } from "@/type/User"

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
import { Link } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
    {
        title: "Layout Certificate",
        url: "layout-editor",
        icon: Home,
    },
    {
        title: "Create Certificate",
        url: "generator",
        icon: Inbox,
    },
    {
        title: "List Certificate",
        url: "certificates",
        icon: Calendar,
    },
]

export function AppSidebar() {
    const currentUser: User | null = JSON.parse(localStorage.getItem("currentUser") || "null")

    return (
        <Sidebar>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="relative overflow-hidden py-10 bg-purple-900">
                        {/* Cahaya blur */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute w-72 h-72 bg-purple-400 opacity-50 rounded-full blur-3xl animate-moveLight"></div>
                            <div className="absolute w-72 h-72 bg-pink-400 opacity-40 rounded-full blur-3xl animate-moveLight delay-1000"></div>
                        </div>

                        {/* Konten */}
                        <div className="relative flex justify-center items-center gap-3 text-white">
                            <img className="h-10" src={logo} alt="" />
                            <h1 className="text-lg font-semibold">SertifyEd</h1>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
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
                                    <User2 /> {currentUser?.name}
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
                                    <span>
                                        <Link to='/'>
                                            Sign out
                                        </Link>
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}