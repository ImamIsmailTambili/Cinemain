import getUser from "@/components/getUser";
import GantiKurrsi from "./gantiKurrsi";
import MetodePembayaran from "./metodePembayaran";
import DetailPesanan from "./detailPesanan";
import { api } from "@/lib/api";

const page = async () => {
    const session = await getUser();

    const res = await api.get("/order/getOrder")
    const order = res.data.data

    return (
        <div className="md:px-10 px-5 lg:mt-25">
            <GantiKurrsi order={order} />
            <div className="lg:flex mt-10 gap-10">
                <MetodePembayaran />
                <DetailPesanan session={session} order={order} />
            </div>
        </div>
    )
}

export default page