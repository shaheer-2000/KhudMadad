/*
  Warnings:

  - Added the required column `disasterOccurredAt` to the `cluster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cluster" ADD COLUMN     "disasterOccurredAt" TIMESTAMP(3) NOT NULL;
