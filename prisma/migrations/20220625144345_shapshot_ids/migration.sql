/*
  Warnings:

  - You are about to drop the column `totalVoters` on the `Proposal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[snapshotId]` on the table `Dao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[snapshotId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `snapshotId` to the `Dao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snapshotId` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dao" ADD COLUMN     "snapshotId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "totalVoters",
ADD COLUMN     "snapshotId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dao_snapshotId_key" ON "Dao"("snapshotId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_snapshotId_key" ON "Proposal"("snapshotId");
