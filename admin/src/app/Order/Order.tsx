import { api } from '@/lib/api';

const Order = async () => {
    const response = await api.get("/admin/order")
    const orders = response.data
    const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

    return (
        <div className="space-y-6">
            <div className="p-3 md:p-0">
                <h1 className="text-2xl font-semibold mb-2">Orders</h1>
                <p className="text-sm font-medium">View and manage all ticket orders</p>
            </div>

            <div className="bg-white md:rounded-xl border border-blue-950 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-950 text-white border-b border-slate-200">
                            <tr>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Film</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cinema</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jam</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Seats</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {orders.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.id}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.customer}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.film}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.cinema}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.jam}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{order.nomorKursi.join(', ')}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm  font-medium">{formatRupiah(order.harga * order.jumlahTiket)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Order
