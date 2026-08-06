import { prisma } from "../../config/db.js";

const myOrder = async (req, res) => {
    const { userId, jamTayangId, jumlahTiket } = req.body;

    if (!userId || !jamTayangId || !jumlahTiket) {
        return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const order = await prisma.pesan.create({
        data: {
            userId,
            jamTayangId,
            jumlahTiket,
            expiredAt: new Date(Date.now() + 10 * 60 * 1000)
        }
    });

    res.json(order);
};

const getOrder = async (req, res) => {
    const Order = await prisma.pesan.findFirst({
        where: {
            status: "PENDING",
        },
        include: {
            JamTayang: {
                include: {
                    TanggalTayang: {
                        include: {
                            FilmDiCinema: {
                                include: {
                                    Film: true,
                                    Cinema: true,
                                }
                            }
                        }
                    }
                }
            },
            KursiTerpesan: {
                include: {
                    MasterKursi: true
                }
            }
        }
    })
    const orderId = Order.id
    const jamTayangId = Order.JamTayang.id
    const jumlahTiket = Order.jumlahTiket
    const expired = Order.expiredAt
    const poster = Order.JamTayang.TanggalTayang.FilmDiCinema.Film.poster
    const judul = Order.JamTayang.TanggalTayang.FilmDiCinema.Film.judul
    const cinema = Order.JamTayang.TanggalTayang.FilmDiCinema.Cinema.nama
    const tanggal = Order.JamTayang.TanggalTayang.tanggal
    const jam = Order.JamTayang.jam
    const harga = Order.JamTayang.TanggalTayang.FilmDiCinema.harga
    const kursi = Order.KursiTerpesan.map(k => k.MasterKursi.nomorKursi)

    res.status(200).json({
        status: "success",
        data: {
            orderId,
            jamTayangId,
            jumlahTiket,
            expired,
            poster,
            judul,
            cinema,
            tanggal,
            jam,
            harga,
            kursi
        }
    })
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.body
    await prisma.pesan.update({
        where: { id: Number(orderId) },
        data: { status: "CANCELLED" }
    })

    res.json({ message: "Order dibatalkan" })
}

const pilihKursi = async (req, res) => {
    const { pesanId, kursiList } = req.body;

    // 2️⃣ Kursi PENDING aktif
    const pending = await prisma.kursiTerpesan.findMany({
        where: {
            masterKursiId: { in: kursiList },
            Pesan: {
                status: "PENDING",
                expiredAt: { gt: new Date() },
                NOT: { id: pesanId }
            }
        },
        include: { Pesan: true }
    });

    if (pending.length > 0) {
        return res.status(400).json({ error: "Kursi sedang dipilih user lain" });
    }

    // 4️⃣ Simpan kursi baru
    await prisma.kursiTerpesan.createMany({
        data: kursiList.map(k => ({
            pesanId,
            masterKursiId: k
        }))
    });

    res.json({ message: "Kursi berhasil dikunci sementara" });
};

const gantiKursi = async (req, res) => {
    const { pesanId } = req.body;

    await prisma.kursiTerpesan.deleteMany({
        where: { pesanId: Number(pesanId) }
    });

    res.json({ message: "Ganti Kursi berhasil" });
};


const pembayaran = async (req, res) => {
    const { orderId } = req.body;

    const pesan = await prisma.pesan.findUnique({
        where: { id: orderId }
    });

    if (!pesan || pesan.status !== "PENDING" || pesan.expiredAt < new Date()) {
        return res.status(400).json({
            message: "Order tidak valid atau expired"
        });
    }

    await prisma.pesan.update({
        where: { id: orderId },
        data: { status: "SUCCESS" }
    });

    res.json({ message: "Pembayaran berhasil" });
};


const deletePembayaran = async (req, res) => {

    const expiredOrders = await prisma.pesan.findMany({
        where: {
            status: "PENDING",
            expiredAt: { lt: new Date() }
        }
    });

    for (const pesan of expiredOrders) {
        await prisma.pesan.update({
            where: { id: pesan.id },
            data: { status: "CANCELLED" }
        });

        await prisma.kursiTerpesan.deleteMany({
            where: { pesanId: pesan.id }
        });
    }

    res.json({ message: "Expired order dibersihkan" });
};

export { myOrder, getOrder, cancelOrder, pilihKursi, gantiKursi, pembayaran, deletePembayaran }