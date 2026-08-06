"use client";

import { useEffect, useState } from 'react';

const scroll = ({ children }: { children: React.ReactNode }) => {
    const [scrolled, setScrolled] = useState(false)
    const [lastScrolled, setlastScrolled] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            if (currentScroll > lastScrolled && currentScroll > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
            setlastScrolled(currentScroll)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrolled])

    return (
        <div className={`md:hidden fixed bottom-0 z-50 w-full flex justify-between items-center py-3 px-15 bg-white/70 backdrop-blur-lg ${scrolled ? "opacity-0" : "opacity-100"}`}>
            {children}
        </div>
    )
}

export default scroll