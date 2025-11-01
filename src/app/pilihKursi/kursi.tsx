"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Clapperboard, MapPin, Calendar, Clock5 } from 'lucide-react';

interface KursiProps {
    kursi: { id: number; nomorKursi: string }[];
}

export default function Kursi({ kursi }: KursiProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const jumlahTiket = parseInt(searchParams.get("jumlahTiket") || "1");
    const jam = searchParams.get("jam");
    const tanggal = searchParams.get("tanggal");
    const jamTayangId = searchParams.get("jamTayangId");
    const judul = searchParams.get("judul");
    const cinema = searchParams.get("cinema");
    const poster = searchParams.get("poster");
    const hargaParam = searchParams.get("harga");
    const harga = hargaParam ? parseInt(hargaParam) : 0;


    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [bookedSeats, setBookedSeats] = useState<string[]>([]);

    // 🧭 Fetch kursi yang sudah dipesan (dari tabel KursiTerpesan)
    useEffect(() => {
        if (!jamTayangId) return;
        fetch(`/api/bookedSeats?jamTayangId=${jamTayangId}`)
            .then(res => res.json())
            .then(data => setBookedSeats(data.bookedSeats))
            .catch(err => console.error(err));
    }, [jamTayangId]);

    const groupedSeats = kursi.reduce((acc: Record<string, string[]>, item) => {
        const row = item.nomorKursi.charAt(0);
        if (!acc[row]) acc[row] = [];
        acc[row].push(item.nomorKursi);
        return acc;
    }, {});

    const toggleSeat = (seat: string) => {
        if (bookedSeats.includes(seat)) return; // 🚫 Tidak bisa pilih kursi yang sudah dipesan

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            if (selectedSeats.length < jumlahTiket) {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    const handleLanjut = () => {
        if (selectedSeats.length !== jumlahTiket) {
            alert(`Pilih ${jumlahTiket} kursi terlebih dahulu`);
            return;
        }

        // Simpan ke pembayaran / checkout
        router.push(
            `/pembayaran?jamTayangId=${jamTayangId}&kursi=${selectedSeats.join(",")}&cinema=${cinema}&jumlahTiket=${jumlahTiket}&jam=${jam}&tanggal=${tanggal}&judul=${judul}&poster=${poster}&harga=${harga}`
        );
    };

    return (
        <div className="lg:mt-25 md:px-10 px-5">
            <h1 className="text-2xl font-semibold mb-10">Pilih Kursi</h1>
            <div className="lg:flex items-center gap-5 justify-between">
                {/* Layout Kursi */}
                <div className="rounded-md bg-gray-100 overflow-x-auto md:p-5 p-2 lg:w-3/5 w-full lg:mb-0 mb-10">
                    <div className="min-w-max">
                        <div className="flex gap-10 mb-5 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="rounded-sm bg-gray-300 w-5 h-5" />
                                <p className="text-sm">Tersedia</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="rounded-sm bg-red-500 w-5 h-5" />
                                <p className="text-sm">Terisi</p>
                            </div>
                        </div>
                        <div className="w-full rounded-md bg-gray-400 mb-10 text-center p-2">
                            <p className="text-xl">Area Layar</p>
                            <p className="font-logo">Cinemain</p>
                        </div>
                        {Object.keys(groupedSeats).map((row) => (
                            <div key={row} className="grid grid-cols-18 gap-2 px-2 py-1">
                                {groupedSeats[row].map((seat) => {
                                    const isSelected = selectedSeats.includes(seat);
                                    const isBooked = bookedSeats.includes(seat);

                                    return (
                                        <div
                                            key={seat}
                                            onClick={() => toggleSeat(seat)}
                                            className={`w-10 h-10 flex text-xs items-center justify-center rounded-md cursor-pointer 
                    ${isBooked ? "bg-red-500 text-white cursor-not-allowed" :
                                                    isSelected ? "bg-blue-950 text-white" :
                                                        "bg-gray-200 text-black"}`}
                                        >
                                            {seat}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="shadow-xl rounded-md lg:w-2/5 w-full">
                    <div className="flex items-center p-5 gap-3">
                        <div>
                            <img src={poster || ""} className="rounded-md w-[100px]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{judul}</h1>
                            <div className="flex mt-3 gap-2">
                                <Clapperboard size={20} />
                                <p className="text-sm font-logo font-bold">
                                    Cinemain
                                </p>
                            </div>
                            <div className="flex mt-3 gap-2">
                                <MapPin size={20} />
                                <p className="text-sm">{cinema}</p>
                            </div>
                            <div className="flex mt-3 gap-2">
                                <Calendar size={20} />
                                <p className="text-sm">{tanggal}, {jam}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-blue-950 flex px-10 py-2 gap-2">
                        <Clock5 color="white" />
                        <p className="text-white">{jam}</p>
                    </div>
                    <div className="px-5 mt-5">
                        <div>
                            <h1>Nomor kursi</h1>
                            <h1>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "Kamu belum pilih kursi"}</h1>
                        </div>
                        <div className="flex mt-5 items-center justify-between">
                            <p>{selectedSeats.length} kursi dipilih</p>
                            <p className="font-bold text-xl">{selectedSeats.length > 0 ? `Rp${(selectedSeats.length * harga).toLocaleString()}` : ""}</p>
                        </div>

                    </div>
                    <div className="flex justify-between gap-5 p-5">
                        <button
                            onClick={() => setSelectedSeats([])}
                            disabled={selectedSeats.length === 0}
                            className="rounded-full w-45 h-10 border border-blue-950 cursor-pointer">
                            Hapus Pilihan
                        </button>
                        <button
                            onClick={handleLanjut}
                            disabled={selectedSeats.length !== jumlahTiket}
                            className="bg-blue-950 text-white w-45 h-10 rounded-full border border-blue-950 disabled:bg-white disabled:text-black cursor-pointer"
                        >
                            Lanjut
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
