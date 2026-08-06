"use client";

import { useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { LogIn } from 'lucide-react';

interface LoginPopupProps {
    trigger: React.ReactNode;
    href: string;
    isLoggedIn: boolean;
}

export default function BelumLoginPopup({ trigger, href, isLoggedIn }: LoginPopupProps) {
    const [show, setShow] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setShow(true);
        }
    };

    const popupContent = (
        <div
            className="fixed top-0 left-0 h-screen w-screen flex md:items-center items-end justify-center backdrop-blur-sm z-50"
            onClick={() => setShow(false)}
        >
            <div
                className="bg-gray-100 rounded-2xl p-10 md:w-100 w-full text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <LogIn color="white" size={80} className="rounded-full mx-auto bg-blue-950 p-5 mb-10" />
                <h1 className="text-xl font-bold mb-2">Yuk, Login Dulu Buat Lanjut</h1>
                <p className="text-sm mb-5">
                    Kamu baru bisa akses halaman ini setelah login.
                </p>
                <button
                    onClick={() => setShow(false)}
                    className="text-sm rounded-full px-10 py-2 border border-blue-950 mr-2"
                >
                    Nanti
                </button>
                <Link href="/login" onClick={() => setShow(false)} className="text-sm rounded-full px-10 py-2 bg-blue-950 text-white ml-2">
                    Login
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {isLoggedIn ? (
                <Link href={href} className="flex flex-col items-center text-sm gap-1">
                    {trigger}
                </Link>
            ) : (
                <button
                    onClick={handleClick}
                    className="flex flex-col items-center text-sm gap-1 cursor-pointer"
                >
                    {trigger}
                </button>
            )}

            {/* Render popup di luar headerSM pakai portal */}
            {show && typeof window !== "undefined" && createPortal(popupContent, document.body)}
        </>
    );
}
