"use client";

import { useState } from "react";
import Menu from "./Menu";
import Logout from "./Logout";
import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';

const SidebarSM = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
            >
                {open ? <ArrowLeftFromLine size={30} className="text-blue-950" /> : <ArrowRightFromLine size={30} className="text-blue-950" />}
            </button>
            <aside className={`w-10 bg-white border-r border-t border-b border-slate-200 flex flex-col ${open ? "block" : "hidden"}`}>
                {/* Menu */}
                <Menu />

                <Logout />
            </aside>
        </div>

    );
}

export default SidebarSM