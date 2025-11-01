import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MetodePembayaran from "./metodePembayaran";
import DetailPesanan from "./detailPesanan";

const page = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="md:px-10 px-5 lg:mt-25">
            <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
            <div className="lg:flex mt-10 gap-10">
                <MetodePembayaran />
                <DetailPesanan session={session} />
            </div>
        </div>
    )
}

export default page