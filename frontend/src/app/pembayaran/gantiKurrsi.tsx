"use client";

import { ArrowLeft } from 'lucide-react';
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
    order: { orderId: number }
}
const GantiKurrsi = ({ order }: Props) => {
    const router = useRouter()

    const cancelOrder = async () => {
        await api.post('/order/gantiKursi', {
            pesanId: order.orderId
        })

        router.push("/pilihKursi")
    }

    return (
        <div className="flex items-center mb-10 gap-5">
            <button onClick={cancelOrder} className="cursor-pointer">
                <ArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
        </div>
    )
}

export default GantiKurrsi