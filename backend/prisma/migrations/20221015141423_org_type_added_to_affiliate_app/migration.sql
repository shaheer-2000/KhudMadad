/*
  Warnings:

  - Added the required column `orgType` to the `affiliate_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "affiliate_applications" ADD COLUMN     "orgType" "OrgType" NOT NULL;
