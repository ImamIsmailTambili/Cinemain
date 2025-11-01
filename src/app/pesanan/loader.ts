import { prisma } from "@/lib/prisma";

export async function getPesananUser(userId: number) {
    return await prisma.pesan.findMany({
        where: { userId },
        include: {
            jamTayang: {
                include: {
                    tanggalTayang: {
                        include: {
                            filmdiCinema: {
                                include: {
                                    film: true,
                                    Cinema: true
                                }
                            }
                        }
                    }
                }
            },
            kursiTerpesan: {
                include: {
                    masterKursi: true
                }
            }
        }
    })
}