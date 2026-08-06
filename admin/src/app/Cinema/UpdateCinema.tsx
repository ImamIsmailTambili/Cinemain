"use client"

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
    cinema: any
}

const UpdateCinema = ({ cinema }: Props) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const router = useRouter();
    const [daerahList, setDaerahList] = useState<any[]>([]);

    const [form, setForm] = useState({
        nama: cinema.nama,
        daerahId: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        const fetchDaerah = async () => {
            const response = await api.get("/admin/cinema/daerah");
            setDaerahList(response.data.data);
        };

        fetchDaerah();
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.put(`/admin/cinema/updateCinema/${cinema.id}`, {
                nama: form.nama,
                daerahId: Number(form.daerahId)
            })

            setShowAddModal(false);
            setForm({
                nama: "",
                daerahId: "",
            });

            router.refresh();
        } catch (error) {
            console.error(error)
            alert("Terjadi kesalahan saat membuat cinema")
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
                    <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-170 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Update Cinema</h3>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                                <input
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    placeholder="Nama Cinema"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Daerah</label>
                                <select
                                    name="daerahId"
                                    value={form.daerahId}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-950"
                                    required
                                >
                                    <option value="">Pilih Daerah</option>
                                    {daerahList.map((daerah) => (
                                        <option key={daerah.id} value={daerah.id}>
                                            {daerah.nama}
                                        </option>
                                    ))}
                                </select>
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
                                    Update Cinema
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default UpdateCinema