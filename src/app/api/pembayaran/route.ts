import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ gunakan prisma instance global

type MasterKursiType = {
    id: number;
    nomorKursi: string;
};


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, jamTayangId, kursiList } = body; // kursiList = ['A1', 'A2', ...]

        if (!userId || !jamTayangId || !kursiList?.length) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        // Ambil kursi yang ada di MasterKursi
        const masterKursi = await prisma.masterKursi.findMany({
            where: {
                nomorKursi: { in: kursiList },
            },
        }) as MasterKursiType[];

        // Cek apakah semua kursi valid
        if (masterKursi.length !== kursiList.length) {
            return NextResponse.json(
                { error: "Beberapa kursi tidak ditemukan di MasterKursi" },
                { status: 400 }
            );
        }

        // 🔒 Cek apakah kursi sudah dipesan (hindari double booking)
        const kursiSudahTerpesan = await prisma.kursiTerpesan.findMany({
            where: {
                jamTayangId: Number(jamTayangId),
                masterKursiId: { in: masterKursi.map((k) => k.id) },
            },
        });

        if (kursiSudahTerpesan.length > 0) {
            return NextResponse.json(
                { error: "Beberapa kursi sudah dipesan orang lain" },
                { status: 400 }
            );
        }

        // Simpan ke database (transaksi biar atomic)
        const result = await prisma.$transaction(async (tx: typeof prisma) => {
            const createdRecords = [];

            for (const kursi of masterKursi) {
                const kursiTerpesan = await tx.kursiTerpesan.create({
                    data: {
                        jamTayangId: Number(jamTayangId),
                        masterKursiId: kursi.id,
                    },
                });

                const pesan = await tx.pesan.create({
                    data: {
                        userId: Number(userId),
                        jamTayangId: Number(jamTayangId),
                        kursiTerpesanId: kursiTerpesan.id,
                    },
                });

                createdRecords.push({ kursiTerpesan, pesan });
            }

            return createdRecords;
        });

        return NextResponse.json({
            message: "Pesanan berhasil dibuat",
            data: result,
        });
    } catch (error) {
        console.error("❌ Gagal membuat pesanan:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
