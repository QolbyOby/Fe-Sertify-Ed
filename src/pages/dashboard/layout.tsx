import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../dashboard/components/AppSidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="px-5 w-full">
                <SidebarTrigger className="pt-10" />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}