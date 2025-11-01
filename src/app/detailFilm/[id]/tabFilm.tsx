import Link from "next/link"
import { Play } from 'lucide-react';

const TabFilm = ({ film }: any) => {

    return (
        <div className="mt-10 flex md:items-center items-start gap-5 ">
            {/* Poster */}
            <img
                src={film?.poster}
                className="rounded-md w-[120px]"
            />

            {/* Isi Film */}
            <div className="md:w-2/4 w-full">
                <p className="w-fit rounded-full bg-blue-950 text-white text-center md:text-sm text-xs px-3 py-1">
                    Advance ticket sales
                </p>

                <p className="mt-2 md:text-sm text-xs text-blue-950">
                    Tayang : Oktber | Jual : September
                </p>

                {/* judul */}
                <p className="mt-2 md:text-3xl text-xl font-bold">{film?.judul}</p>

                {/* genre */}
                <p className="text-sm font-bold">{film?.genre}</p>

                {/* tag film dan trailer */}
                <div className="md:flex mt-3 gap-5 items-center justify-between">
                    {/* tag versi SM */}
                    <div className="flex mb-3 gap-2 text-sm sm:text-xs md:hidden">
                        <p className="rounded-md bg-blue-950 text-white px-2 py-1">
                            1h 46m
                        </p>
                        <p className="rounded-md bg-blue-950 text-white px-2 py-1">
                            2D
                        </p>
                    </div>

                    {/* trailer */}
                    <Link
                        href={film?.trailer || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 items-center"
                    >
                        <Play
                            stroke="none"
                            className="w-8 h-8 fill-white rounded-full bg-blue-950 p-2"
                        />
                        <p className="md:text-lg text-sm">Lihat trailer</p>
                    </Link>

                    {/* tag versi MD keatas */}
                    <div className="hidden md:flex gap-2 text-sm">
                        <p className="rounded-md bg-blue-950 text-white px-2 py-1">
                            1h 46m
                        </p>
                        <p className="rounded-md bg-blue-950 text-white px-2 py-1">
                            2D
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabFilm