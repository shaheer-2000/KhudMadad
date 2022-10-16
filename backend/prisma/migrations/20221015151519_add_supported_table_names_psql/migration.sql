/*
  Warnings:

  - You are about to drop the `Affiliation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cluster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Affiliation" DROP CONSTRAINT "Affiliation_username_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_username_fkey";

-- DropForeignKey
ALTER TABLE "affiliate_applications" DROP CONSTRAINT "affiliate_applications_username_fkey";

-- DropForeignKey
ALTER TABLE "cluster_reports" DROP CONSTRAINT "cluster_reports_clusterId_fkey";

-- DropForeignKey
ALTER TABLE "cluster_reports" DROP CONSTRAINT "cluster_reports_reportId_fkey";

-- DropTable
DROP TABLE "Affiliation";

-- DropTable
DROP TABLE "Cluster";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNum" TEXT NOT NULL,
    "idNum" TEXT NOT NULL,
    "isModerator" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "affiliations" (
    "username" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgType" "OrgType" NOT NULL,

    CONSTRAINT "affiliations_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "reports" (
    "reportId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "supportingMediaOne" TEXT NOT NULL,
    "supportingMediaTwo" TEXT,
    "priorityIndex" "PriorityIndex" NOT NULL DEFAULT 'LOW',
    "disasterType" "DisasterType" NOT NULL,
    "disasterOccurredAt" TIMESTAMP(3) NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isBoosted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "cluster" (
    "clusterId" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "disasterType" "DisasterType" NOT NULL,
    "priorityIndex" "PriorityIndex" NOT NULL,

    CONSTRAINT "cluster_pkey" PRIMARY KEY ("clusterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobileNum_key" ON "users"("mobileNum");

-- CreateIndex
CREATE UNIQUE INDEX "users_idNum_key" ON "users"("idNum");

-- AddForeignKey
ALTER TABLE "affiliate_applications" ADD CONSTRAINT "affiliate_applications_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliations" ADD CONSTRAINT "affiliations_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cluster_reports" ADD CONSTRAINT "cluster_reports_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "cluster"("clusterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cluster_reports" ADD CONSTRAINT "cluster_reports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("reportId") ON DELETE RESTRICT ON UPDATE CASCADE;
