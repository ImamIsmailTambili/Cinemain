import { useState } from 'react';
import { FilmProps } from '../types';
import ListTanggal from './listTanggal';
import ListKota from './listKota';
import ListBioskop from './listBioskop';
import TiketPopup from './tiketPopup';

const TabJadwal = ({ film, session }: FilmProps) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [expandedCinemaId, setExpandedCinemaId] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false)
    const [ticketCount, setTicketCount] = useState(1)
    const [selectedTanggalPopup, setSelectedTanggalPopup] = useState<string | null>(null)
    const [selectedJamId, setSelectedJamId] = useState<number | null>(null);
    const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
    const [selectedHarga, setSelectedHarga] = useState<number | null>(null);

    const user = session?.user;

    // ambil semua tanggal tayang unik
    const dates = Array.from(
        new Set(
            film?.tayangDi.flatMap(t =>
                t.TanggalTayang.map(tgl => new Date(tgl.tanggal).toISOString())
            ) || []
        )
    ).sort();

    // ambil semua kota (daerah) unik
    const cities = Array.from(
        new Set(film?.tayangDi.map(t => t.Cinema.daerah.nama) || [])
    );

    // ✅ Tambahan
    const toggleCinema = (id: number) => {
        setExpandedCinemaId((prev) => (prev === id ? null : id));
    };

    const handleSelectTime = (
        time: string,
        tanggal: string,
        jamId: number,
        cinemaName: string,
        harga: number,
    ) => {
        if (!user) {
            alert("Silahkan Login dulu")
            return
        }
        setSelectedTime(time)
        setSelectedTanggalPopup(tanggal)
        setSelectedJamId(jamId)
        setSelectedCinema(cinemaName)
        setSelectedHarga(harga)
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
        setSelectedTime(null)
        setTicketCount(1)
    }

    return (
        <div>
            <div className="mt-6">
                {/* Tanggal – bisa scroll horizontal kalau banyak */}
                <ListTanggal
                    dates={dates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                {/* Pilihan kota */}
                <ListKota
                    cities={cities}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                />

                {/* Daftar bioskop */}
                <ListBioskop
                    filmTayang={film?.tayangDi || []}
                    selectedCity={selectedCity}
                    selectedDate={selectedDate}
                    expandedCinemaId={expandedCinemaId}
                    toggleCinema={toggleCinema}
                    handleSelectTime={handleSelectTime}
                    selectedTime={selectedTime}
                />
            </div>

            {showModal && (
                <TiketPopup
                    closeModal={closeModal}
                    filmJudul={film?.judul || ""}
                    poster={film?.poster || ""}
                    selectedTime={selectedTime}
                    selectedTanggalPopup={selectedTanggalPopup}
                    ticketCount={ticketCount}
                    tambahTicket={() => setTicketCount((prev) => prev + 1)}
                    kurangTicket={() => setTicketCount((prev) => (prev > 1 ? prev - 1 : 1))}
                    selectedJamId={selectedJamId}
                    selectedCinema={selectedCinema}
                    selectedHarga={selectedHarga}
                />
            )}
        </div>
    )
}

export default TabJadwal