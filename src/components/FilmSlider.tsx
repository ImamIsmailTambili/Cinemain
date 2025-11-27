"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Film {
    id: number;
    poster: string;
    judul: string;
}

interface FilmSliderProps {
    films: Film[];
}

export default function FilmSlider({ films }: FilmSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const perPage = 4;
    const perPageSM = 2;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % films.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
    };

    // Ambil 4 gambar dimulai dari currentIndex
    const visibleFilms = [];
    for (let i = 0; i < perPage; i++) {
        const index = (currentIndex + i) % films.length;
        visibleFilms.push(films[index]);
    }
    const visibleFilmsSM = [];
    for (let i = 0; i < perPageSM; i++) {
        const index = (currentIndex + i) % films.length;
        visibleFilmsSM.push(films[index]);
    }

    return (
        <div className="flex items-center lg:gap-5 md:gap-3 gap-1 w-full mt-10 lg:px-30 px-5 group">
            {/* Tombol kiri */}
            {films.length > perPage && (
                <div className=" bg-blue-950 rounded-full opacity-0 group-hover:opacity-100">
                    <ChevronLeft onClick={goToPrev} color="white" className="md:p-2 md:w-10 w-5 md:h-10 h-5" />
                </div>
            )}

            {/* Gambar ukuran MD keatas */}
            <div className="sm:hidden md:flex gap-3">
                {visibleFilms.map((film) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`}>
                        <img
                            src={film.poster}
                            alt={film.judul}
                            className="rounded-md hover:scale-105 h-130 object-cover"
                        />
                    </Link>
                ))}
            </div>

            {/* Gambar ukuran SM */}
            <div className="md:hidden sm:flex mx-auto gap-2">
                {visibleFilmsSM.map((film) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`}>
                        <img
                            src={film.poster}
                            alt={film.judul}
                            className="rounded-md hover:scale-105 h-100 object-cover"
                        />
                    </Link>
                ))}
            </div>

            {/* Tombol kanan */}
            {films.length > perPage && (
                <div className="bg-blue-950 rounded-full opacity-0 group-hover:opacity-100">
                    <ChevronRight onClick={goToNext} color="white" className="md:p-2 md:w-10 w-5 md:h-10 h-5" />
                </div>
            )}
        </div>
    );
}
