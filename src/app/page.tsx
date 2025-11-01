import { prisma } from "@/lib/prisma"
import FilmSlider from "@/components/FilmSlider"
import { Search } from 'lucide-react';
import Link from "next/link";

const App = async () => {
  const films = await prisma.film.findMany({
    orderBy: {
      id: "asc"
    }
  })

  return (
    <div>
      <div className="lg:mt-25">
        <h1 className="lg:text-4xl text-2xl text-center font-bold mb-5">
          Feel the magic beyond
        </h1>
        <div className="flex items-center lg:w-2/5 md:w-fit w-5/6 mx-auto bg-gray-100 rounded-full px-3 md:py-2 py-4">
          <Search className="w-4" />
          <input
            type="text"
            placeholder="Cari film atau bioskop"
            className="lg:grow grow-0 pl-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Lagi Tayang */}
      <div className="lg:mt-20 mt-10 lg:px-30 md:px-15 px-5">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-2xl md:text-xl text-lg font-semibold">Lagi Tayang</h1>
          <Link
            href="/semuaFilm"
            className="lg:text-lg md:text-base text-sm font-semibold bg-blue-950 text-white rounded-full px-4 py-1"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
      <FilmSlider films={films} />
      {/* Lagi Tayang */}
    </div>
  )
}

export default App;
