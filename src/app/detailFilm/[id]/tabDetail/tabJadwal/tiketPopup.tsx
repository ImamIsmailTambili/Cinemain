"use client";

import { X, CircleMinus, CirclePlus } from "lucide-react";
import Link from "next/link";

interface TiketPopupProps {
    closeModal: () => void;
    filmJudul: string;
    poster: string;
    selectedTime: string | null;
    selectedTanggalPopup: string | null;
    ticketCount: number;
    tambahTicket: () => void;
    kurangTicket: () => void;
    selectedJamId: number | null;
    selectedCinema: string | null;
    selectedHarga: number | null;
}

export default function tiketPopup({
    closeModal,
    filmJudul,
    selectedTime,
    selectedTanggalPopup,
    ticketCount,
    tambahTicket,
    kurangTicket,
    selectedJamId,
    selectedCinema,
    selectedHarga,
    poster,
}: TiketPopupProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
                <div className="flex gap-3 items-center">
                    <X onClick={closeModal} className="cursor-pointer" />
                    <h1 className="font-semibold">Berapa kursi yang mau kamu pilih?</h1>
                </div>

                <div className="flex mt-5 gap-5 items-center">
                    <div>
                        <h1 className="text-3xl font-logo font-bold">Cinemain</h1>
                    </div>
                    <div>
                        <h1 className="font-semibold">{filmJudul}</h1>
                        <h1 className="text-sm">{selectedTanggalPopup}</h1>
                    </div>
                </div>

                <div className="text-xs mt-5">
                    <p>Tiket yang udah dibeli gak bisa di-refund atau ditukar</p>
                    <p className="mt-2">
                        Kamu wajib membeli tiket untuk anak berumur 2 tahun dan lebih
                    </p>
                </div>

                <div className="w-full rounded-md bg-blue-950 text-white mt-5 px-5 py-3">
                    <h1 className="text-sm">{selectedTime}</h1>
                </div>

                <div className="justify-center flex mt-5 gap-5">
                    <CircleMinus onClick={kurangTicket} className="cursor-pointer" />
                    <h1>{ticketCount}</h1>
                    <CirclePlus onClick={tambahTicket} className="cursor-pointer" />
                </div>

                <div className="mt-5 w-full rounded-full text-center bg-blue-950 text-white py-2">
                    <Link
                        href={{
                            pathname: "/pilihKursi",
                            query: {
                                jumlahTiket: ticketCount,
                                jam: selectedTime,
                                tanggal: selectedTanggalPopup,
                                jamTayangId: selectedJamId,
                                judul: filmJudul,
                                cinema: selectedCinema,
                                poster: poster,
                                harga: selectedHarga,
                            },
                        }}
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
}
