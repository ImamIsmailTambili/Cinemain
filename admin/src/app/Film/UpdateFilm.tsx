"use client"
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
    film: any
}

const UpdateFilm = ({ film }: Props) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const router = useRouter();

    const [form, setForm] = useState({
        judul: film.judul,
        genre: film.genre,
        duration: String(film.duration),
        sinopsis: film.sinopsis,
        produser: film.produser,
        sutradara: film.sutradara,
        production: film.production,
        pemeran: film.pemeran,
        poster: film.poster,
        trailer: film.trailer,
        penulis: film.penulis,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.put(`/admin/film/updateFilm/${film.id}`, {
                ...form,
                duration: Number(form.duration)
            })

            setShowAddModal(false);
            setForm({
                judul: "",
                genre: "",
                duration: "",
                sinopsis: "",
                produser: "",
                sutradara: "",
                production: "",
                pemeran: "",
                poster: "",
                trailer: "",
                penulis: "",
            });

            router.refresh();
        } catch (error) {
            console.error(error)
            alert("Terjadi kesalahan saat membuat film")
        }
    }
    return (
        <div>
            <button
                onClick={() => setShowAddModal(true)}
                className="p-2 cursor-pointer"
            >
                <Pencil className="w-4 h-4" />
            </button>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-xl p-6 md:max-w-xl w-full max-h-screen md:max-h-170 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Update Film</h3>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul</label>
                                <input
                                    name="judul"
                                    value={form.judul}
                                    onChange={handleChange}
                                    placeholder="Judul Film"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Genre</label>
                                <input
                                    name="genre"
                                    value={form.genre}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter genre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                                <input
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="120"
                                    type="number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sipnosis</label>
                                <input
                                    name="sinopsis"
                                    value={form.sinopsis}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter sipnosis"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Produser</label>
                                <input
                                    name="produser"
                                    value={form.produser}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter produser"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sutradara</label>
                                <input
                                    name="sutradara"
                                    value={form.sutradara}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter sutradara"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Production</label>
                                <input
                                    name="production"
                                    value={form.production}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter production"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pemeran</label>
                                <input
                                    name="pemeran"
                                    value={form.pemeran}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter pemeran"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Poster</label>
                                <input
                                    name="poster"
                                    value={form.poster}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter URL poster"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Trailer</label>
                                <input
                                    name="trailer"
                                    value={form.trailer}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter URL trailer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Penulis</label>
                                <input
                                    name="penulis"
                                    value={form.penulis}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    placeholder="Enter penulis"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border border-blue-950 text-slate-700 rounded-lg cursor-pointer text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-sm font-medium"
                                >
                                    Update Film
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default UpdateFilm