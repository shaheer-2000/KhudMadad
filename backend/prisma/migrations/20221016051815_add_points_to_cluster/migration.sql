/*
  Warnings:

  - Added the required column `points` to the `clusters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clusters" ADD COLUMN     "points" INTEGER NOT NULL;
