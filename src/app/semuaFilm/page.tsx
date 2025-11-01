import { prisma } from "@/lib/prisma"
import Link from "next/link"

const page = async () => {
    const films = await prisma.film.findMany({
        orderBy: {
            id: "asc"
        }
    })
    return (
        <div className="md:px-10 px-5 md:mt-30">
            <div className="flex gap-1 text-sm mb-5">
                <Link href="/">Beranda</Link>
                <p className="font-semibold">/ Film</p>
            </div>
            <h1 className="text-4xl font-bold mb-10">Film</h1>
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-5 gap-2">
                {films.map((film: typeof films[number]) => (
                    <Link key={film.id} href={`/detailFilm/${film.id}`} className="flex flex-col">
                        <img src={film.poster} alt={film.judul} key={film.id} className="lg:h-100 md:h-130 h-100 rounded-md" />
                        <p className="font-semibold text-sm">{film.judul}</p>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default page