"use client";

import { useState } from 'react'
import { FilmProps } from './types';
import TabDetail from './tabDetail';
import TabJadwal from './tabJadwal/tabJadwal';

export default function tabJadwaldanDetail({ film, session }: FilmProps) {
    const [tab, setTab] = useState("jadwal");

    return (
        <div className="mt-10 mb-20">
            {/* Tab header */}
            <div className="flex border-b border-gray-300">
                <button
                    className={`px-4 py-2 text-lg font-semibold ${tab === "jadwal"
                        ? "border-b-2 border-blue-950"
                        : "text-gray-500"
                        }`}
                    onClick={() => setTab("jadwal")}
                >
                    Jadwal
                </button>
                <button
                    className={`px-4 py-2 text-lg font-semibold ${tab === "detail"
                        ? "border-b-2 border-blue-950"
                        : "text-gray-500"
                        }`}
                    onClick={() => setTab("detail")}
                >
                    Detail
                </button>
            </div>

            {/* Isi tab */}
            {tab === "jadwal" ? (
                <TabJadwal film={film} session={session} />
            ) : (
                <TabDetail film={film} />
            )}


        </div>

    )
}