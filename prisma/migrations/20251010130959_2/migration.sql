/*
  Warnings:

  - You are about to drop the column `no` on the `BuatAkun` table. All the data in the column will be lost.
  - Added the required column `pin` to the `BuatAkun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telepon` to the `BuatAkun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuatAkun" DROP COLUMN "no",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pin" TEXT NOT NULL,
ADD COLUMN     "telepon" INTEGER NOT NULL;
