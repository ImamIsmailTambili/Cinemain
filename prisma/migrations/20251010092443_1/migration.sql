-- CreateTable
CREATE TABLE "BuatAkun" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuatAkun_pkey" PRIMARY KEY ("id")
);
