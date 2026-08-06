"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AddFilm = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const router = useRouter();

    const [form, setForm] = useState({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/admin/film/addFilm", {
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
        <div className="flex justify-between items-center p-3 md:p-0">
            <div>
                <h1 className="text-2xl font-semibold mb-2">Films</h1>
                <p className="text-sm font-medium">Manage all films in the system</p>
            </div>
            <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add Film
            </button>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-xl p-6 md:max-w-xl w-full max-h-screen md:max-h-170 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Add New Film</h3>
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
                                    className="flex-1 px-4 py-2 border border-blue-950 text-slate-700 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer transition-colors text-sm font-medium"
                                >
                                    Add Film
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AddFilm