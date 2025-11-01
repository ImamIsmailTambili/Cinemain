/*
  Warnings:

  - You are about to drop the `BuatAkun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."BuatAkun";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "telepon" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "pin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telepon_key" ON "User"("telepon");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
