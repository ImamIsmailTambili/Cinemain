import { prisma } from "../../config/db.js";

const order = async (req, res) => {
    try {
        const allOrders = await prisma.pesan.findMany({
            where: {
                status: "SUCCESS",
            },
            select: {
                id: true,
                jumlahTiket: true,
                status: true,
                createdAt: true,
                User: {
                    select: {
                        nama: true,
                    },
                },
                KursiTerpesan: {
                    select: {
                        MasterKursi: {
                            select: {
                                nomorKursi: true,
                            },
                        },
                    },
                },
                JamTayang: {
                    select: {
                        jam: true,
                        TanggalTayang: {
                            select: {
                                tanggal: true,
                                FilmDiCinema: {
                                    select: {
                                        harga: true,
                                        Cinema: {
                                            select: {
                                                nama: true,
                                            },
                                        },
                                        Film: {
                                            select: {
                                                judul: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const orders = allOrders.map((order) => ({
            id: order.id,
            customer: order.User?.nama ?? "-",
            nomorKursi: order.KursiTerpesan.map(
                (k) => k.MasterKursi.nomorKursi
            ),
            jam: order.JamTayang?.jam ?? "-",
            tanggal: order.JamTayang?.TanggalTayang?.tanggal ?? null,
            harga:
                order.JamTayang?.TanggalTayang?.FilmDiCinema?.harga ?? 0,
            cinema:
                order.JamTayang?.TanggalTayang?.FilmDiCinema?.Cinema?.nama ?? "-",
            film:
                order.JamTayang?.TanggalTayang?.FilmDiCinema?.Film?.judul ?? "-",
            status: order.status,
            jumlahTiket: order.jumlahTiket,
            createdAt: order.createdAt,
        }));

        res.status(200).json({
            status: "success",
            data: orders,
        });
    } catch (error) {
        console.error("ORDER ERROR:", error);

        res.status(500).json({
            status: "error",
            message: "Gagal mengambil order",
            error: error.message,
        });
    }
};

export { order };