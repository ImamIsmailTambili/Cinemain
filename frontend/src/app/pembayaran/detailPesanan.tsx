"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clapperboard, MapPin, CreditCard } from "lucide-react";
import { api } from "@/lib/api";

interface Props {
    session: any,
    order: {
        orderId: number,
        jamTayangId: number,
        jumlahTiket: number,
        expired: Date,
        poster: string,
        judul: string,
        cinema: string,
        tanggal: string,
        jam: string,
        harga: number,
        kursi: string
    }
}

const detailPesanan = ({ session, order }: Props) => {
    const router = useRouter();
    const user = session;

    const [total, setTotal] = useState(0);

    // Hitung total harga
    useEffect(() => {
        setTotal(order.jumlahTiket * order.harga);
    }, [order.jumlahTiket, order.harga]);

    const pembayaran = async () => {
        if (new Date(order.expired) < new Date()) {
            alert("Pesanan sudah expired")

            await api.post("/order/deletePembayaran")

            router.push("/")
            return;
        }

        await api.post("/order/pembayaran", {
            orderId: order.orderId
        })

        router.push("/")
    }

    return (
        <div className="lg:w-2/5 w-full lg:mt-0 mt-10">
            <h1 className="text-xl font-bold mb-10">
                Detail Pesanan
            </h1>

            <div className="bg-white border border-blue-950 rounded-lg p-6">
                <div className="flex gap-5 mb-6">
                    <img src={order.poster || ""} alt={order.judul || ""} className="w-30 rounded-md" />
                    <div>
                        <h2 className="text-lg font-semibold">{order.judul}</h2>
                        <div className="flex mt-2 gap-2 items-center text-md text-black font-logo">
                            <Clapperboard />
                            <span>Cinemain</span>
                        </div>
                        <div className="flex mt-2 gap-2 items-center text-sm text-black">
                            <MapPin />
                            <span>{order.cinema}</span>
                        </div>
                        <div className="flex mt-2 gap-2 items-center text-sm text-black">
                            <Calendar />
                            <span>{order.tanggal}, {order.jam}</span>
                        </div>
                    </div>
                </div>

                {/* Detail Kursi */}
                <div className="border-t py-4 flex items-center justify-between">
                    <div className="flex gap-3">
                        <button className="rounded-md w-10 h-10 text-center bg-blue-950 text-white">{order.jumlahTiket}</button>
                        <div>
                            <h3 className="font-semibold">Tiket</h3>
                            <p className="text-sm">{order.kursi}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg text-black font-semibold">
                            {order.jumlahTiket} x Rp{order.harga.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-black border-t pt-4 mb-5">
                    <span>Total Pembayaran</span>
                    <span>Rp{total.toLocaleString("id-ID")}</span>
                </div>

                {/* Tombol Bayar */}
                <button
                    onClick={pembayaran}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-all"
                >
                    <CreditCard />
                    Bayar Sekarang
                </button>
            </div>

        </div>
    )
}

export default detailPesanan