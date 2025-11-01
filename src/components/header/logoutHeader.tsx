"use client";

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const logoutHeader = () => {
    return (
        <button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`
        })} className="flex px-5 py-3 gap-5 items-center w-full cursor-pointer">
            <LogOut className="w-5" />
            <h1 className="text-sm">Log out</h1>
        </button>
    )
}

export default logoutHeader