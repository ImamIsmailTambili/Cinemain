import { api } from "@/lib/api";

const User = async () => {
    const response = await api.get("/admin/user")
    const users = response.data

    return (
        <div className="space-y-6">
            <div className="p-3 md:p-0">
                <h1 className="text-2xl font-semibold mb-2">Users</h1>
                <p className="text-sm font-medium">Manage user accounts and activity</p>
            </div>

            <div className="bg-white md:rounded-xl border border-blue-950 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-950 text-white border-b border-slate-200">
                            <tr>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Telephone</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Pembelian</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {users.data.map((user: any) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 lg:px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center">
                                                <span className="text-xs lg:text-sm font-medium text-white">{user.nama
                                                    .slice(0, 2)
                                                    .toUpperCase()
                                                }</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-medium">{user.nama}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 lg:px-6 py-4 text-xs lg:text-sm font-medium">{user.telepon}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs lg:text-sm font-medium">{user.email}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs lg:text-sm font-medium">{user.totalPesanan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User
