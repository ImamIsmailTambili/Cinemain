"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Home, MapPin, ShoppingCart, Users } from "lucide-react";

const Menu = () => {
    const pathname = usePathname();
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, link: "/Dashboard" },
        { id: "films", label: "Films", icon: Film, link: "/Film" },
        { id: "cinemas", label: "Cinemas", icon: MapPin, link: "/Cinema" },
        { id: "orders", label: "Orders", icon: ShoppingCart, link: "/Order" },
        { id: "users", label: "Users", icon: Users, link: "/User" },
    ];
    return (
        <nav className="flex-1 md:p-4 space-y-1">
            {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.link;

                return (
                    <Link
                        key={item.id}
                        href={item.link}
                        className={`flex items-center gap-1 md:gap-3 px-2 md:px-4 py-3 md:rounded-lg text-sm font-medium transition-all 
                                ${isActive
                                ? "bg-blue-950 text-white"
                                : "text-black"
                            }
                                `}
                    >
                        <Icon className="w-5 h-5" />
                        <div className="hidden md:block">
                            {item.label}
                        </div>
                    </Link>
                );
            })}
        </nav>
    )
}

export default Menu