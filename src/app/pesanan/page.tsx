import Link from "next/link"
import PesananList from "./pesananList";

const page = () => {
    return (
        <div className="lg:w-3/5 md:w-4/5 w-full px-5 mx-auto lg:mt-25">
            <div className="flex gap-1">
                <Link href="/" className="text-sm">Beranda /</Link>
                <p className="font-semibold">Pesanan</p>
            </div>
            <h1 className="mt-10 text-2xl font-bold">Pesanan Saya</h1>
            <PesananList />
        </div>
    )
}

export default page