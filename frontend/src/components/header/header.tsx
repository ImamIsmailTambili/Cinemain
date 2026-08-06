import Link from "next/link";
import SetelahLogin from "./sessionSetelahLogin"
import SebelumLogin from "./sessionSebelumLogin"
import HeaderSM from "./headerSM/headerSM";
import getUser from "@/components/getUser";

const Header = async () => {
    const user = await getUser();
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
                {user ? <SetelahLogin user={user} /> : <SebelumLogin />}

            </div>

            {/* Pilihan tambahan pada tampilan mobile/SM */}
            <HeaderSM />
        </div>
    );
};

export default Header;
