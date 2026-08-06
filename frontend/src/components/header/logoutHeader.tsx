"use client";

import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const logoutHeader = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await api.post("/auth/logout", {}, {
                withCredentials: true
            })

            router.push("/");
            router.refresh()
        } catch (error) {
            console.error("Logout failed", error)
        }

    };

    return (
        <button onClick={handleLogout} className="flex px-5 py-3 gap-5 items-center w-full cursor-pointer">
            <LogOut className="w-5" />
            <h1 className="text-sm">Log out</h1>
        </button>
    )
}

export default logoutHeader