/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "DAO" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DAO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "daoId" INTEGER NOT NULL,
    "juniorDescription" TEXT,
    "middleDescription" TEXT,
    "seniorDescription" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "totalVoters" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
