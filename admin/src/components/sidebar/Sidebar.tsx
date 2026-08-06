import Menu from "./Menu";
import Logout from "./Logout";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-10 md:w-40 lg:w-64 h-full bg-white border-r border-slate-200 flex flex-col">
            {/* Logo */}
            <div className="p-5 text-center">
                <Link href="/Dashboard" className="text-3xl font-logo text-blue-950">
                    Cinemain
                </Link>
            </div>

            {/* Menu */}
            <Menu />

            {/* Logout */}
            <Logout />
        </aside>
    );
};

export default Sidebar;
