/*
  Warnings:

  - Added the required column `snapshotLink` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "discussionLink" TEXT,
ADD COLUMN     "snapshotLink" TEXT NOT NULL;
