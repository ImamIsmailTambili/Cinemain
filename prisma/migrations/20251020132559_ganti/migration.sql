/*
  Warnings:

  - You are about to drop the column `createAt` on the `Pesan` table. All the data in the column will be lost.
  - You are about to drop the column `kursiId` on the `Pesan` table. All the data in the column will be lost.
  - You are about to drop the `Kursi` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kursiTerpesanId]` on the table `Pesan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kursiTerpesanId` to the `Pesan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Kursi" DROP CONSTRAINT "Kursi_jamTayangId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pesan" DROP CONSTRAINT "Pesan_kursiId_fkey";

-- DropIndex
DROP INDEX "public"."Pesan_kursiId_key";

-- DropIndex
DROP INDEX "public"."User_pin_key";

-- AlterTable
ALTER TABLE "Pesan" DROP COLUMN "createAt",
DROP COLUMN "kursiId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "kursiTerpesanId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Kursi";

-- CreateTable
CREATE TABLE "MasterKursi" (
    "id" SERIAL NOT NULL,
    "nomorKursi" TEXT NOT NULL,

    CONSTRAINT "MasterKursi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KursiTerpesan" (
    "id" SERIAL NOT NULL,
    "jamTayangId" INTEGER NOT NULL,
    "masterKursiId" INTEGER NOT NULL,

    CONSTRAINT "KursiTerpesan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterKursi_nomorKursi_key" ON "MasterKursi"("nomorKursi");

-- CreateIndex
CREATE UNIQUE INDEX "KursiTerpesan_jamTayangId_masterKursiId_key" ON "KursiTerpesan"("jamTayangId", "masterKursiId");

-- CreateIndex
CREATE UNIQUE INDEX "Pesan_kursiTerpesanId_key" ON "Pesan"("kursiTerpesanId");

-- AddForeignKey
ALTER TABLE "KursiTerpesan" ADD CONSTRAINT "KursiTerpesan_jamTayangId_fkey" FOREIGN KEY ("jamTayangId") REFERENCES "JamTayang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KursiTerpesan" ADD CONSTRAINT "KursiTerpesan_masterKursiId_fkey" FOREIGN KEY ("masterKursiId") REFERENCES "MasterKursi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesan" ADD CONSTRAINT "Pesan_kursiTerpesanId_fkey" FOREIGN KEY ("kursiTerpesanId") REFERENCES "KursiTerpesan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
