-- CreateTable
CREATE TABLE "TanggalTayang" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "filmDiCinemaId" INTEGER NOT NULL,

    CONSTRAINT "TanggalTayang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JamTayang" (
    "id" SERIAL NOT NULL,
    "jam" TEXT NOT NULL,
    "tanggalTayangId" INTEGER NOT NULL,

    CONSTRAINT "JamTayang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TanggalTayang" ADD CONSTRAINT "TanggalTayang_filmDiCinemaId_fkey" FOREIGN KEY ("filmDiCinemaId") REFERENCES "FilmDiCinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JamTayang" ADD CONSTRAINT "JamTayang_tanggalTayangId_fkey" FOREIGN KEY ("tanggalTayangId") REFERENCES "TanggalTayang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
