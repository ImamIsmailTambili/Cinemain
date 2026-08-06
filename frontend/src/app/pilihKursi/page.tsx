import Kursi from "@/app/pilihKursi/kursi"
import { api } from "@/lib/api"
api

const page = async () => {
    const response = await api.get("/kursi")
    const kursi = response.data || []

    const res = await api.get("/order/getOrder")
    const order = res.data.data

    return (
        <div>
            <Kursi kursi={kursi} order={order} />
        </div>
    )
}

export default page