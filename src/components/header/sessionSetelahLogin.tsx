import Link from "next/link"
import { Settings, UserRound, BadgePercent } from 'lucide-react';
import Logout from "@/components/header/logoutHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const sessionSetelahLogin = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className="md:flex gap-10 items-center hidden">
            {/* Button Pesanan */}
            <div className="border-r-2">
                <Link href="/pesanan" className="flex text-sm gap-2 mr-10 items-center">
                    <BadgePercent />
                    <p>Pesanan Saya</p>
                </Link>
            </div>
            {/* Button Profile */}
            <div className="relative">
                <details className="group">
                    <summary className="flex">
                        <UserRound />
                    </summary>
                    <div className="absolute right-0 mt-2 w-70 bg-white text-black shadow-lg border border-blue-950">
                        <div className="flex items-center border-b border-b-blue-950 px-5 py-3 justify-between">
                            <div className="bg-blue-950 rounded-full p-2">
                                <UserRound color="white" />
                            </div>
                            <p className="text-md">{session?.user?.username ?? "Guest"}</p>
                            <Settings className="w-5" />
                        </div>
                        <div className="flex border-b border-b-blue-950 px-5 py-3 gap-5 items-center">
                            <UserRound className="w-5" />
                            <Link href="mtix" className="text-sm">My m.tix</Link>
                        </div>
                        <Logout />
                    </div>
                </details>
            </div>
        </div>
    )
}

export default sessionSetelahLogin