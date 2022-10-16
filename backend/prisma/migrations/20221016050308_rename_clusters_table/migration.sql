/*
  Warnings:

  - You are about to drop the `cluster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cluster_reports" DROP CONSTRAINT "cluster_reports_clusterId_fkey";

-- DropTable
DROP TABLE "cluster";

-- CreateTable
CREATE TABLE "clusters" (
    "clusterId" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "disasterType" "DisasterType" NOT NULL,
    "priorityIndex" "PriorityIndex" NOT NULL,
    "disasterOccurredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clusters_pkey" PRIMARY KEY ("clusterId")
);

-- AddForeignKey
ALTER TABLE "cluster_reports" ADD CONSTRAINT "cluster_reports_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "clusters"("clusterId") ON DELETE RESTRICT ON UPDATE CASCADE;
