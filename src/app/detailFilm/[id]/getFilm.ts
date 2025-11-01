import { prisma } from "@/lib/prisma";

export const getFilm = async (id: number) => {
    return await prisma.film.findUnique({
        where: { id },
        include: {
            tayangDi: {
                include: {
                    Cinema: { include: { daerah: true } },
                    TanggalTayang: { include: { jam: true } },
                },
            },
        },
    });
};
