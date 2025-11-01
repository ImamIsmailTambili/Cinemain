import Link from "next/link";
import HeaderSM from "@/components/header/headerSM/headerSM";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SetelahLogin from "./sessionSetelahLogin"
import SebelumLogin from "./sessionSebelumLogin"

const Header = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <div className="fixed top-0 z-50 bg-white/70 backdrop-blur-sm w-full flex items-center justify-between py-3 lg:px-20 md:px-10 px-5">
                {/* Logo */}
                <div>
                    <Link href="/" className="text-3xl text-blue-950 font-logo font-bold">
                        Cinemain
                    </Link>
                </div>

                {/* Session Login */}
                {session?.user ? (
                    <SetelahLogin />
                ) : (
                    // Pilihan Sebelum Login
                    <SebelumLogin />
                )
                }

            </div>

            {/* Pilihan tambahan pada tampilan mobile/SM */}
            <HeaderSM />
        </div>
    );
};

export default Header;
