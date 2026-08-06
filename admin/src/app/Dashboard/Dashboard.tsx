import { Film, MapPin, ShoppingCart, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/Statcard';
import DashboardChart from './DashboardChart';
import { api } from '@/lib/api';

const Dashboard = async () => {
    const response = await api.get("/admin/dashboard")
    const dashboard = response.data
    const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`

    const res = await api.get("/admin/dashboard/recent-order")
    const recentOrder = res.data
    return (
        <div className="space-y-8">
            <div className="p-3 md:p-0">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={dashboard.data.totalUsers} icon={Film} />
                <StatCard title="Total Orders" value={dashboard.data.totalOrders} icon={MapPin} />
                <StatCard title="Total Revenue" value={formatRupiah(dashboard.data.totalRevenue)} icon={DollarSign} />
                <StatCard title="Active Movies" value={dashboard.data.activeMovies} icon={ShoppingCart} />
            </div>

            <DashboardChart />

            <div className="bg-white md:rounded-xl border border-blue-950 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="md:text-lg font-semibold text-blue-950">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-950 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Film</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cinema</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date - Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {recentOrder.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{order.film}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{order.cinema}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{order.date} -{order.time}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{formatRupiah(order.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
