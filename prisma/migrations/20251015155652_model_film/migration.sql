-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "produser" TEXT NOT NULL,
    "sutradara" TEXT NOT NULL,
    "production" TEXT NOT NULL,
    "pemeran" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);
