"use client";

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"


const logout = () => {
    return (
        <div className="md:hidden rounded-full bg-blue-950 mt-10 p-3">
            <button onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/login`
            })} className="flex justify-center gap-3 items-center w-full cursor-pointer ">
                <LogOut color="white" className="w-5" />
                <h1 className="text-white">Logout</h1>
            </button>
        </div>
    )
}

export default logout