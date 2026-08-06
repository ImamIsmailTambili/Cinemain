import { prisma } from "../../config/db.js"

const kursi = async (req, res) => {
    const kursi = await prisma.masterKursi.findMany()
    res.json(kursi)
}

const kursiTerpesan = async (req, res) => {
    try {
        const jamTayangId = Number(req.params.jamTayangId);

        if (isNaN(jamTayangId)) {
            return res.status(400).json({ error: "Invalid jamTayangId parameter" });
        }

        const pesanan = await prisma.pesan.findMany({
            where: {
                jamTayangId,
                status: { in: ["PENDING", "SUCCESS"] },
            },
            include: {
                KursiTerpesan: {
                    include: { MasterKursi: true }
                }
            }
        });

        const kursiTerpesan = pesanan.flatMap(p =>
            p.KursiTerpesan.map(k => k.MasterKursi.id)
        );

        res.json(kursiTerpesan);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }

}

export { kursi, kursiTerpesan };