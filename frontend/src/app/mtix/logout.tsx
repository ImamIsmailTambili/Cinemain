"use client";

import { LogOut } from "lucide-react"
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const logout = () => {
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
        <div className="md:hidden rounded-full bg-blue-950 mt-10 p-3">
            <button onClick={handleLogout} className="flex justify-center gap-3 items-center w-full cursor-pointer ">
                <LogOut color="white" className="w-5" />
                <h1 className="text-white">Logout</h1>
            </button>
        </div>
    )
}

export default logout