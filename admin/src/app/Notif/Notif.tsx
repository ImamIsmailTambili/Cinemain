"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/* ===== TYPES ===== */
type Notification = {
    id: number;
    message: string;
    isRead: boolean;
};

type Admin = {
    username?: string;
};

type Props = {
    admin: Admin | null;
};

const Notif = ({ admin }: Props) => {
    const [data, setData] = useState<Notification[]>([]);
    const [tab, setTab] = useState<"Unread" | "Read">("Unread");

    /* ===== FETCH ===== */
    useEffect(() => {
        const fetchNotif = async () => {
            const res = await api.get("/admin/notification");
            setData(res.data.data);
        };

        fetchNotif();
    }, []);

    const unread = data.filter(n => !n.isRead);
    const read = data.filter(n => n.isRead);

    /* ===== MARK AS READ ===== */
    const markAsRead = async (id: number) => {
        try {
            await api.put(`/admin/notification/${id}`);

            setData(prev =>
                prev.map(n =>
                    n.id === id ? { ...n, isRead: true } : n
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    const initials =
        admin?.username?.slice(0, 2)?.toUpperCase() ?? "";

    return (
        <div className="space-y-6 md:space-y-8">
            <h1 className="text-2xl font-semibold p-3 md:p-0">Notification</h1>

            <div className="border border-blue-950">
                {/* TAB */}
                <div className="grid grid-cols-2 border-b border-blue-950">
                    <button
                        className={`py-2 font-semibold ${tab === "Unread"
                            ? "bg-blue-950 text-white"
                            : ""
                            }`}
                        onClick={() => setTab("Unread")}
                    >
                        Unread
                    </button>

                    <button
                        className={`py-2 font-semibold ${tab === "Read"
                            ? "bg-blue-950 text-white"
                            : ""
                            }`}
                        onClick={() => setTab("Read")}
                    >
                        Read
                    </button>
                </div>

                {/* CONTENT */}
                {tab === "Unread" ? (
                    <div className="md:p-3 flex md:gap-5">
                        <div className="hidden md:block">
                            <div className="flex items-center justify-between px-3 md:w-50 lg:w-80 h-10 border border-blue-950">
                                <p>All</p>
                                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-950 text-white">
                                    <p className="text-sm">{unread.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            {unread.length === 0 ? (
                                <div className="border border-blue-950 p-10">
                                    <p className="text-center">No unread notifications</p>
                                </div>
                            ) : (
                                unread.map(n => (
                                    <button
                                        key={n.id}
                                        onClick={() => markAsRead(n.id)}
                                        className="flex w-full items-center gap-3 border border-blue-950 p-4 md:mb-3 text-left cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {initials}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                {admin?.username?.toUpperCase()}
                                            </h3>
                                            <p className="text-sm">
                                                {n.message}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="md:p-3">
                        {read.map(n => (
                            <div
                                key={n.id}
                                className="flex items-center gap-3 border border-blue-950 p-4 md:mb-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center">
                                    <span className="text-sm font-semibold text-white">
                                        {initials}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        {admin?.username?.toUpperCase()}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {n.message}
                                    </p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notif;
