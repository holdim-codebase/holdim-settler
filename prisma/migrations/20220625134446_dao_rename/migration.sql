/*
  Warnings:

  - You are about to drop the `DAO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_daoId_fkey";

-- DropTable
DROP TABLE "DAO";

-- CreateTable
CREATE TABLE "Dao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "Dao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
