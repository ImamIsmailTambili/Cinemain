import AddFilm from './AddFilm';
import UpdateFilm from './UpdateFilm';
import DeleteFilm from './DeleteFilm';
import { api } from '@/lib/api';

const Film = async () => {
    const response = await api.get("/admin/film")
    const films = response.data

    return (
        <div className="space-y-6">
            <AddFilm />

            <div className="bg-white md:rounded-xl border border-blue-950 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-950 text-white border-b border-slate-200">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Film</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Genre</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cinema</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {films.data.map((film: any) => (
                                <tr key={film.id} className="hover:bg-slate-50">
                                    <td className="w-45 lg:w-70 px-3 lg:px-6 py-4">
                                        <div className="lg:flex items-center text-center lg:text-left gap-3">
                                            <img src={film.poster} className="rounded-xl w-20" />
                                            <span className="text-xs md:text-sm font-medium">
                                                {film.judul}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm font-medium">{film.genre}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm font-medium">{film.cinema.join(", ")}</td>
                                    <td className="px-3 lg:px-6 py-4 text-xs md:text-sm font-medium">{film.duration
                                        ? `${Math.floor(film.duration / 60)} hr ${film.duration % 60} m`
                                        : "-"}
                                    </td>
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="flex items-center md:gap-2">
                                            <UpdateFilm film={film} />
                                            <DeleteFilm film={film} />
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

export default Film