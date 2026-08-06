import AddCinema from './AddCinema';
import UpdateCinema from './UpdateCinema';
import DeleteCinema from './DeleteCinema';
import { api } from '@/lib/api';

const Cinema = async () => {
    const response = await api.get("/admin/cinema")
    const cinemas = response.data

    return (
        <div className="space-y-6">
            <AddCinema />

            <div className="bg-white md:rounded-xl border border-blue-950 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-950 text-white border-b border-slate-200">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cinema Name</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">City Name</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {cinemas.data.map((cinema: any) => (
                                <tr key={cinema.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 md:px-6 py-4 text-xs font-medium">{cinema.nama}</td>
                                    <td className="px-3 md:px-6 py-4 text-xs font-medium">{cinema.daerah}</td>
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="flex items-center md:gap-2">
                                            <UpdateCinema cinema={cinema} />
                                            <DeleteCinema cinema={cinema} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cinema
