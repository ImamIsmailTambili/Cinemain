import Sidebar from "@/components/sidebar/Sidebar"
import SidebarSM from "@/components/sidebar/SidebarSM"
import TopBar from "@/components/topbar/TopBar"
import Notif from "./Notif"
import getUser from "@/components/GetUser"
import { redirect } from "next/navigation";

const page = async () => {
    const admin = await getUser();

    if (!admin) {
        redirect("/Login")
    }

    return (
        <div className="flex">
            <div className="hidden md:block min-h-screen">
                <Sidebar />
            </div>

            <div className="w-full">
                <TopBar />
                <div className="hidden md:block w-full p-8">
                    <Notif admin={admin} />
                </div>

                {/* Mobile View */}
                <div className="md:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50">
                    <SidebarSM />
                </div>

                <div className="md:hidden min-w-screen">
                    <Notif admin={admin} />
                </div>
                {/* Mobile View */}
            </div>
        </div>
    )
}

export default page