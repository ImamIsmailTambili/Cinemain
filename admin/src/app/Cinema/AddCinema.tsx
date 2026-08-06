"use client"

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AddCinema = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const router = useRouter();
    const [daerahList, setDaerahList] = useState<any[]>([]);

    const [form, setForm] = useState({
        nama: "",
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
            await api.post("/admin/cinema/addCinema", {
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
        <div className="flex justify-between items-center p-3 md:p-0">
            <div>
                <h1 className="text-2xl font-semibold mb-2">Cinema</h1>
                <p className="text-sm font-medium">Manage all cinema locations</p>
            </div>
            <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg cursor-pointer text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add Cinema
            </button>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-xl p-6 w-full max-w-md md:max-h-170 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Add New Cinema</h3>
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
                                    Add Cinema
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AddCinema