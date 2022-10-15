-- CreateEnum
CREATE TYPE "OrgType" AS ENUM ('NGO', 'GOVT');

-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "PriorityIndex" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "DisasterType" AS ENUM ('FLOOD', 'EARTHQUAKE', 'WILDFIRE', 'HURRICANE', 'TYPHOON');

-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "affiliate_applications" (
    "username" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "status" "AppStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "affiliate_applications_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Affiliation" (
    "username" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgType" "OrgType" NOT NULL,

    CONSTRAINT "Affiliation_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Report" (
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

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportId")
);

-- CreateTable
CREATE TABLE "Cluster" (
    "clusterId" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "disasterType" "DisasterType" NOT NULL,
    "priorityIndex" "PriorityIndex" NOT NULL,

    CONSTRAINT "Cluster_pkey" PRIMARY KEY ("clusterId")
);

-- CreateTable
CREATE TABLE "cluster_reports" (
    "clusterId" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "cluster_reports_pkey" PRIMARY KEY ("clusterId","reportId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNum_key" ON "User"("mobileNum");

-- CreateIndex
CREATE UNIQUE INDEX "User_idNum_key" ON "User"("idNum");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_reports_reportId_key" ON "cluster_reports"("reportId");

-- AddForeignKey
ALTER TABLE "affiliate_applications" ADD CONSTRAINT "affiliate_applications_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliation" ADD CONSTRAINT "Affiliation_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cluster_reports" ADD CONSTRAINT "cluster_reports_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("clusterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cluster_reports" ADD CONSTRAINT "cluster_reports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("reportId") ON DELETE RESTRICT ON UPDATE CASCADE;
