/*
  Warnings:

  - Added the required column `penulis` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "penulis" TEXT NOT NULL;
