"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Clapperboard, MapPin, Calendar, Clock5, ArrowLeft } from 'lucide-react';
import { api } from "@/lib/api";

interface Props {
    kursi?: { id: number; nomorKursi: string }[];
    order: {
        orderId: number,
        jamTayangId: number,
        jumlahTiket: number,
        poster: string,
        judul: string,
        cinema: string,
        tanggal: string,
        jam: string,
        harga: number
    }
}

export default function Kursi({ kursi = [], order }: Props) { // ✅ default array
    const router = useRouter();

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [bookedSeats, setBookedSeats] = useState<number[]>([]);

    // 🧭 Fetch kursi yang sudah dipesan (dari tabel KursiTerpesan)
    useEffect(() => {
        if (!order.jamTayangId) return;

        const getBookedSeats = async () => {
            try {
                const res = await api.get(`/kursi/terpesan/${order.jamTayangId}`);

                setBookedSeats(res.data); // ✅ default array
            } catch (error) {
                console.error("Gagal mengambil kursi terpesan:", error);
            }
        };

        getBookedSeats();
    }, [order.jamTayangId]);

    // ✅ safety check sebelum reduce
    const groupedSeats = (kursi || []).reduce(
        (acc: Record<string, { id: number; nomor: string }[]>, item) => {
            const nomor = item.nomorKursi.trim();
            const row = nomor.charAt(0);

            if (!acc[row]) acc[row] = [];
            acc[row].push({ id: item.id, nomor });

            return acc;
        },
        {}
    );

    const toggleSeat = (seatId: number) => {
        if (bookedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            if (selectedSeats.length < order.jumlahTiket) {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };


    const handleLanjut = async () => {
        if (selectedSeats.length !== order.jumlahTiket) {
            alert(`Pilih ${order.jumlahTiket} kursi terlebih dahulu`);
            return;
        }

        await api.post('/order/pilihKursi', {
            pesanId: order.orderId,
            kursiList: selectedSeats
        })

        router.push("/pembayaran");
    };

    const cancelOrder = async () => {
        await api.post('/order/cancel', {
            orderId: order.orderId
        })

        router.push("/")
    }

    return (
        <div className="lg:mt-25 md:px-10 px-5">
            <div className="flex items-center mb-10 gap-5">
                <button onClick={cancelOrder} className="cursor-pointer">
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-semibold">Pilih Kursi</h1>
            </div>
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
                                    const isSelected = selectedSeats.includes(seat.id);
                                    const isBooked = bookedSeats.includes(seat.id);

                                    return (
                                        <div
                                            key={seat.id}
                                            onClick={() => toggleSeat(seat.id)}
                                            className={`w-10 h-10 flex text-xs items-center justify-center rounded-md cursor-pointer 
                ${isBooked
                                                    ? "bg-red-500 text-white cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-blue-950 text-white"
                                                        : "bg-gray-200 text-black"
                                                }`}
                                        >
                                            {seat.nomor}
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
                            <img src={order.poster} className="rounded-md w-25" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{order.judul}</h1>
                            <div className="flex mt-3 gap-2">
                                <Clapperboard size={20} />
                                <p className="text-sm font-logo font-bold">Cinemain</p>
                            </div>
                            <div className="flex mt-3 gap-2">
                                <MapPin size={20} />
                                <p className="text-sm">{order.cinema}</p>
                            </div>
                            <div className="flex mt-3 gap-2">
                                <Calendar size={20} />
                                <p className="text-sm">{order.tanggal}, {order.jam}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-blue-950 flex px-10 py-2 gap-2">
                        <Clock5 color="white" />
                        <p className="text-white">{order.jam}</p>
                    </div>
                    <div className="px-5 mt-5">
                        <div>
                            <h1>Nomor kursi</h1>
                            <h1>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "Kamu belum pilih kursi"}</h1>
                        </div>
                        <div className="flex mt-5 items-center justify-between">
                            <p>{selectedSeats.length} kursi dipilih</p>
                            <p className="font-bold text-xl">{selectedSeats.length > 0 ? `Rp${(selectedSeats.length * order.harga).toLocaleString()}` : ""}</p>
                        </div>
                    </div>
                    <div className="flex justify-between gap-5 p-5">
                        <button
                            onClick={() => setSelectedSeats([])}
                            disabled={selectedSeats.length === 0}
                            className="rounded-full w-80 h-10 border border-blue-950 cursor-pointer"
                        >
                            Hapus Pilihan
                        </button>
                        <button
                            onClick={handleLanjut}
                            disabled={selectedSeats.length !== order.jumlahTiket}
                            className="bg-blue-950 text-white w-80 h-10 rounded-full border border-blue-950 disabled:bg-white disabled:text-black cursor-pointer"
                        >
                            Lanjut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
