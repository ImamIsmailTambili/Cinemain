"use client";

import { Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
    cinema: any
}

const DeleteCinema = ({ cinema }: Props) => {
    const router = useRouter();
    const handleDelete = async (id: number) => {
        await api.delete(`/admin/cinema/deleteCinema/${id}`);
        router.refresh();
    };

    return (
        <div>
            <button onClick={() => handleDelete(cinema.id)} className="p-2 text-red-600 cursor-pointer">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}

export default DeleteCinema