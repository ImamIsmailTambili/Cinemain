import { Film } from "@prisma/client"

interface TabDetailProps {
    film: Film;
}

const TabDetail = ({ film }: TabDetailProps) => {
    return (
        <div className="mt-10 text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
            <p className="text-justify">
                {film?.sinopsis}
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-5">Produser</h2>
            <p>
                {film?.produser}
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-5">Sutradara</h2>
            <p>
                {film?.sutradara}
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-5">Penulis</h2>
            <p>
                {film?.penulis}
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-5">Production</h2>
            <p>
                {film?.production}
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-5">Pemeran</h2>
            <p>
                {film?.pemeran}
            </p>
        </div>
    )
}

export default TabDetail