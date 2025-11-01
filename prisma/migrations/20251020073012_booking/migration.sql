-- CreateTable
CREATE TABLE "Kursi" (
    "id" SERIAL NOT NULL,
    "nomorKursi" TEXT NOT NULL,
    "jamTayangId" INTEGER NOT NULL,

    CONSTRAINT "Kursi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kursiId" INTEGER NOT NULL,
    "jamTayangId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pesan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kursi_nomorKursi_jamTayangId_key" ON "Kursi"("nomorKursi", "jamTayangId");

-- CreateIndex
CREATE UNIQUE INDEX "Pesan_kursiId_key" ON "Pesan"("kursiId");

-- AddForeignKey
ALTER TABLE "Kursi" ADD CONSTRAINT "Kursi_jamTayangId_fkey" FOREIGN KEY ("jamTayangId") REFERENCES "JamTayang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesan" ADD CONSTRAINT "Pesan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesan" ADD CONSTRAINT "Pesan_kursiId_fkey" FOREIGN KEY ("kursiId") REFERENCES "Kursi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesan" ADD CONSTRAINT "Pesan_jamTayangId_fkey" FOREIGN KEY ("jamTayangId") REFERENCES "JamTayang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
