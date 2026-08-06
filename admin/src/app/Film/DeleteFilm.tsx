"use client";

import { Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
    film: any
}

const DeleteFilm = ({ film }: Props) => {
    const router = useRouter();
    const handleDelete = async (id: number) => {
        await api.delete(`/admin/film/deleteFilm/${id}`);
        router.refresh();
    };

    return (
        <div>
            <button onClick={() => handleDelete(film.id)} className="p-2 text-red-600 cursor-pointer">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}

export default DeleteFilm