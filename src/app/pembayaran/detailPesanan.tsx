"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clapperboard, MapPin, CreditCard } from "lucide-react";
import { Session } from "next-auth";

interface DetailPesananProps {
    session: Session | null;
}

const DetailPesanan = ({ session }: DetailPesananProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const user = session?.user;

    // 🔍 Ambil data dari query URL
    const jamTayangId = searchParams.get("jamTayangId");
    const kursi = searchParams.get("kursi")?.split(",") || [];
    const jumlahTiket = kursi.length;
    const judul = searchParams.get("judul");
    const poster = searchParams.get("poster");
    const tanggal = searchParams.get("tanggal");
    const jam = searchParams.get("jam");
    const cinema = searchParams.get("cinema");
    const hargaParam = searchParams.get("harga")
    const harga = hargaParam ? parseInt(hargaParam) : 0;

    const [total, setTotal] = useState(0);

    // Hitung total harga
    useEffect(() => {
        setTotal(jumlahTiket * harga);
    }, [jumlahTiket, harga]);

    const handleBayar = async () => {
        const res = await fetch("/api/pembayaran", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user?.id,
                jamTayangId,
                kursiList: kursi,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            alert(`Pembayaran Berhasil!\n\nFilm: ${judul}\nKursi: ${kursi.join(", ")}\nTotal: Rp${total.toLocaleString("id-ID")}`);
            router.push("/");
        } else {
            alert(`Gagal: ${data.error}`);
        }
    };

    return (
        <div className="lg:w-2/5 w-full lg:mt-0 mt-10">
            <h1 className="text-xl font-bold mb-10">
                Detail Pesanan
            </h1>

            <div className="bg-white border border-blue-950 rounded-lg p-6">
                <div className="flex gap-5 mb-6">
                    <img src={poster || ""} alt={judul || ""} className="w-[120px] rounded-md" />
                    <div>
                        <h2 className="text-lg font-semibold">{judul}</h2>
                        <div className="flex mt-2 gap-2 items-center text-md text-black font-logo">
                            <Clapperboard />
                            <span>Cinemain</span>
                        </div>
                        <div className="flex mt-2 gap-2 items-center text-sm text-black">
                            <MapPin />
                            <span>{cinema}</span>
                        </div>
                        <div className="flex mt-2 gap-2 items-center text-sm text-black">
                            <Calendar />
                            <span>{tanggal}, {jam}</span>
                        </div>
                    </div>
                </div>

                {/* Detail Kursi */}
                <div className="border-t py-4 flex items-center justify-between">
                    <div className="flex gap-3">
                        <button className="rounded-md w-10 h-10 text-center bg-blue-950 text-white">{jumlahTiket}</button>
                        <div>
                            <h3 className="font-semibold">Tiket</h3>
                            <p className="text-sm">{kursi.join(", ")}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg text-black font-semibold">
                            {jumlahTiket} x Rp{harga.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-black border-t pt-4 mb-5">
                    <span>Total Pembayaran</span>
                    <span>Rp{total.toLocaleString("id-ID")}</span>
                </div>

                {/* Tombol Bayar */}
                <button
                    onClick={handleBayar}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition-all"
                >
                    <CreditCard />
                    Bayar Sekarang
                </button>
            </div>

        </div>
    )
}

export default DetailPesanan