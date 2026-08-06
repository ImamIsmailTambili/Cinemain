import Link from "next/link";
import TabFilm from "./tabFilm";
import TabJadwaldanDetail from "./tabDetail/tabJadwaldanDetail"
import getUser from "@/components/getUser";
import { api } from "@/lib/api";

interface DetailFilmProps {
  params: Promise<{
    id: string;
  }>;
}

const detailFilm = async ({ params }: DetailFilmProps) => {
  const { id } = await params;

  const session = await getUser();
  const filmId = Number(id);

  if (Number.isNaN(filmId)) {
    throw new Error("ID film tidak valid");
  }

  const response = await api.get(`/film/${filmId}`);
  const film = response.data

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
