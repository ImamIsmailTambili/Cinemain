/*
  Warnings:

  - A unique constraint covering the columns `[telepon]` on the table `BuatAkun` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `BuatAkun` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BuatAkun_telepon_key" ON "BuatAkun"("telepon");

-- CreateIndex
CREATE UNIQUE INDEX "BuatAkun_email_key" ON "BuatAkun"("email");
