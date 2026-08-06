"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post("/admin/logout", {}, {
                withCredentials: true,
            });

            router.replace("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="md:p-4 md:border-t border-slate-200">
            <button
                onClick={handleLogout}
                className="w-full flex items-center md:gap-3 px-2 md:px-4 py-3 md:rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
            >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block text-sm font-medium">Logout</span>
            </button>
        </div>
    );
};

export default Logout;
