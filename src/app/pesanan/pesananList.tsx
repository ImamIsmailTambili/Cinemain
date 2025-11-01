import React from 'react'
import { getPesananUser } from "./loader";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Calendar, MapPin } from 'lucide-react';

type PesananType = {
    id: number;
    jamTayang: {
        jam: string;
        tanggalTayang: {
            tanggal: Date;
            filmdiCinema: {
                film: {
                    poster: string;
                    judul: string;
                };
                Cinema: {
                    nama: string;
                };
            };
        };
    };
    kursiTerpesan: {
        masterKursi: {
            nomorKursi: string;
        };
    };
};

const pesananList = async () => {
    const session = await getServerSession(authOptions)
    const pesananList = await getPesananUser(Number(session?.user.id))
    return (
        <div className="mt-10">
            {pesananList.map((p: PesananType) => {
                const film = p.jamTayang.tanggalTayang.filmdiCinema.film;
                const cinema = p.jamTayang.tanggalTayang.filmdiCinema.Cinema;
                const kursi = p.kursiTerpesan.masterKursi.nomorKursi;
                const tanggal = p.jamTayang.tanggalTayang.tanggal;
                const jam = p.jamTayang.jam;

                return (
                    <div key={p.id} className="flex rounded-xl bg-gray-200 mb-5 items-center">
                        <div className="relative flex">
                            <img src={film.poster} alt={film.judul} className=" p-3 w-40  border-r-2 border-gray-400 border-dashed" />
                            <div className="absolute -right-[9px] top-[-10] w-5 h-5 bg-white rounded-full"></div>
                            <div className="absolute -right-[9px] bottom-[-10] w-5 h-5 bg-white rounded-full"></div>
                        </div>
                        <div className="p-5 w-full">
                            <p className="text-xl font-semibold">{film.judul}</p>
                            <div className="mt-3 text-sm mb-3">
                                <div className="flex gap-2 items-center mb-1">
                                    <MapPin size={15} />
                                    <p>{cinema.nama}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Calendar size={15} />
                                    <p>{new Date(tanggal).toLocaleDateString()} {jam}</p>
                                </div>
                            </div>
                            <p>Kursi: {kursi}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default pesananList