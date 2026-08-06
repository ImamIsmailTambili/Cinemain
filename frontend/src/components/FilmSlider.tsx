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
    const perPage = { lg: 4, md: 3, sm: 2 };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % films.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
    };

    const getVisibleFilms = (count: number) => {
        return Array.from({ length: count }, (_, i) => films[(currentIndex + i) % films.length]);
    };

    return (
        <div className="flex items-center lg:gap-5 md:gap-3 gap-1 w-full mt-10 lg:px-15 px-5 group">
            {/* Tombol kiri */}
            {films.length > perPage.lg && (
                <div className=" bg-blue-950 rounded-full opacity-0 group-hover:opacity-100">
                    <ChevronLeft onClick={goToPrev} color="white" className="md:p-2 md:w-10 w-5 md:h-10 h-5" />
                </div>
            )}

            {/* Gambar ukuran LG */}
            <div className="hidden lg:flex gap-3 mx-auto">
                {getVisibleFilms(perPage.lg).map((film) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`}>
                        <img
                            src={film.poster}
                            alt={film.judul}
                            className="rounded-md hover:scale-105 h-110 object-cover"
                        />
                    </Link>
                ))}
            </div>

            {/* Gambar ukuran MD */}
            <div className="hidden lg:hidden md:flex gap-3 mx-auto">
                {getVisibleFilms(perPage.md).map((film) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`}>
                        <img
                            src={film.poster}
                            alt={film.judul}
                            className="rounded-md hover:scale-105 h-110 object-cover"
                        />
                    </Link>
                ))}
            </div>

            {/* Gambar ukuran SM */}
            <div className="md:hidden flex mx-auto gap-2">
                {getVisibleFilms(perPage.sm).map((film) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`}>
                        <img
                            src={film.poster}
                            alt={film.judul}
                            className="rounded-md hover:scale-105 h-110 object-cover"
                        />
                    </Link>
                ))}
            </div>

            {/* Tombol kanan */}
            {films.length > perPage.lg && (
                <div className="bg-blue-950 rounded-full opacity-0 group-hover:opacity-100">
                    <ChevronRight onClick={goToNext} color="white" className="md:p-2 md:w-10 w-5 md:h-10 h-5" />
                </div>
            )}
        </div>
    );
}
