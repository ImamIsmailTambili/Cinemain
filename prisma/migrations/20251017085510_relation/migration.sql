-- CreateTable
CREATE TABLE "Daerah" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Daerah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cinema" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "daerahId" INTEGER NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilmDiCinema" (
    "id" SERIAL NOT NULL,
    "filmId" INTEGER NOT NULL,
    "cinemaId" INTEGER NOT NULL,

    CONSTRAINT "FilmDiCinema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmDiCinema_filmId_cinemaId_key" ON "FilmDiCinema"("filmId", "cinemaId");

-- AddForeignKey
ALTER TABLE "Cinema" ADD CONSTRAINT "Cinema_daerahId_fkey" FOREIGN KEY ("daerahId") REFERENCES "Daerah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmDiCinema" ADD CONSTRAINT "FilmDiCinema_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmDiCinema" ADD CONSTRAINT "FilmDiCinema_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
