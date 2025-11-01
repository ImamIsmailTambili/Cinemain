import Kursi from "@/app/pilihKursi/kursi"
import { prisma } from "@/lib/prisma"

const page = async () => {
    const kursi = await prisma.masterKursi.findMany()
    return (
        <div>
            <Kursi kursi={kursi} />
        </div>
    )
}

export default page