import { api } from "@/lib/api";
import getUser from "@/components/getUser";
import { Calendar, MapPin } from 'lucide-react';
import { cookies } from "next/headers";

const pesananList = async () => {
    const user = await getUser();

    if (!user) {
        return <div>Silakan login dulu</div>;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const response = await api.get(`/pesanan/me`, {
        headers: {
            cookie: `jwt=${token}`,
        }
    });

    const pesananList = response.data;

    return (
        <div className="mt-10">
            {pesananList.map((p: any) => {
                const film = p.JamTayang.TanggalTayang.FilmDiCinema.Film;
                const cinema = p.JamTayang.TanggalTayang.FilmDiCinema.Cinema;
                const tanggal = p.JamTayang.TanggalTayang.tanggal;
                const jam = p.JamTayang.jam;
                const kursi = p.KursiTerpesan
                    .map((kt: any) => kt.MasterKursi.nomorKursi)
                    .join(", ");


                return (
                    <div key={p.id} className="flex rounded-xl bg-gray-200 mb-5 items-center">
                        <div className="relative flex">
                            <img src={film.poster} alt={film.judul} className=" p-3 w-40  border-r-2 border-gray-400 border-dashed" />
                            <div className="absolute -right-2.5 top-[-10] w-5 h-5 bg-white rounded-full"></div>
                            <div className="absolute -right-2.5 bottom-[-10] w-5 h-5 bg-white rounded-full"></div>
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

export default pesananList;
