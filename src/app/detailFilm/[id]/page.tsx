import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFilm } from "./getFilm";
import TabFilm from "./tabFilm";
import TabJadwaldanDetail from "./tabDetail/tabJadwaldanDetail"

interface DetailFilmProps {
  params: {
    id: string;
  };
}

const detailFilm = async ({ params }: DetailFilmProps) => {
  const session = await getServerSession(authOptions);
  const filmId = parseInt((await params).id);

  if (isNaN(filmId)) {
    throw new Error("ID film tidak valid");
  }

  const film = await getFilm(filmId)

  return (
    <div className="lg:w-4/6 w-full px-5 mx-auto lg:mt-30">
      <div className="flex gap-1">
        <Link href="/" className="text-sm">Beranda /</Link>
        <Link href="/semuaFilm" className="text-sm">Film /</Link>
        <p className="text-sm font-bold">{film?.judul}</p>
      </div>
      <h1 className="md:text-3xl text-xl font-bold mt-5">Detail film</h1>
      <TabFilm film={film} />

      <TabJadwaldanDetail film={film} session={session} />


    </div>
  );
};

export default detailFilm;
