export interface Film {
    id: number;
    judul: string;
    poster: string;
    sinopsis: string;
    produser: string;
    sutradara: string;
    penulis: string;
    production: string;
    pemeran: string;
    FilmDiCinema: FilmDiCinema[];
}

export interface Daerah {
    id: number;
    nama: string;
}

export interface Cinema {
    id: number;
    nama: string;
    daerahId: number;
    Daerah: Daerah;
}

export interface FilmDiCinema {
    id: number;
    cinemaId: number;
    filmId: number;
    harga: number;
    Cinema: Cinema;
    TanggalTayang: TanggalTayang[];
}

export interface TanggalTayang {
    id: number;
    tanggal: Date;
    JamTayang: JamTayang[];
}

export interface JamTayang {
    id: number;
    jam: string;
}

export interface FilmProps {
    film: Film | null;
    session: any;
}
