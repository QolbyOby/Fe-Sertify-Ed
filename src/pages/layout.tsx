import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div>
            
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}