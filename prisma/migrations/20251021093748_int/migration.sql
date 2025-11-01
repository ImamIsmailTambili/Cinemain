/*
  Warnings:

  - Made the column `harga` on table `FilmDiCinema` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FilmDiCinema" ALTER COLUMN "harga" SET NOT NULL;
