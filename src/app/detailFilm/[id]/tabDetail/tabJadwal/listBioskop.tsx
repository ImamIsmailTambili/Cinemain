"use client";

import { FilmDiCinema } from "../types";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ListBioskopProps {
    filmTayang: FilmDiCinema[];
    selectedCity: string | null;
    selectedDate: string | null;
    expandedCinemaId: number | null;
    toggleCinema: (id: number) => void;
    handleSelectTime: (
        time: string,
        tanggal: string,
        jamId: number,
        cinemaName: string,
        harga: number
    ) => void;
    selectedTime: string | null;
}

import React from 'react'

const listBioskop = ({
    filmTayang,
    selectedCity,
    selectedDate,
    expandedCinemaId,
    toggleCinema,
    handleSelectTime,
    selectedTime,
}: ListBioskopProps) => {
    return (
        <div className="flex flex-col gap-3">
            {filmTayang
                .filter(
                    (t) =>
                        (!selectedCity || t.Cinema.daerah.nama === selectedCity) &&
                        (!selectedDate ||
                            t.TanggalTayang.some(
                                (tt) => new Date(tt.tanggal).toISOString() === selectedDate
                            ))
                )
                .map((tayang) => (
                    <div key={tayang.id} className="border p-4 rounded-lg mb-4">
                        <div
                            className="cursor-pointer"
                            onClick={() => toggleCinema(tayang.id)}
                        >
                            <p className="font-semibold text-lg flex justify-between items-center">
                                {tayang.Cinema.nama}
                                <span>{expandedCinemaId === tayang.id ? <ArrowUp size={20} /> : <ArrowDown size={20} />}</span>
                            </p>
                        </div>

                        {expandedCinemaId === tayang.id && (
                            <div className="mt-5">
                                {tayang.TanggalTayang.filter(
                                    (tt) =>
                                        !selectedDate ||
                                        new Date(tt.tanggal).toISOString() === selectedDate
                                ).map((tt) => (
                                    <div key={tt.id} className="mt-2">
                                        <div className="flex justify-between">
                                            <p>Reguler 2D</p>
                                            <p>Rp{tayang.harga.toLocaleString()}</p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-5 mt-3">
                                            {tt.jam.map((j) => (
                                                <span
                                                    key={j.id}
                                                    onClick={() =>
                                                        handleSelectTime(
                                                            j.jam,
                                                            new Date(tt.tanggal).toLocaleDateString("id-ID", {
                                                                weekday: "long",
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }),
                                                            j.id,
                                                            tayang.Cinema.nama,
                                                            tayang.harga
                                                        )
                                                    }
                                                    className={`p-3 rounded-md text-sm cursor-pointer transition-all ${selectedTime === j.jam
                                                        ? "bg-blue-950 text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                        }`}
                                                >
                                                    {j.jam}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    )
}

export default listBioskop

