/*
  Warnings:

  - Added the required column `overviewHtml` to the `Dao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenOverviewHtml` to the `Dao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dao" ADD COLUMN     "overviewHtml" TEXT NOT NULL,
ADD COLUMN     "tokenOverviewHtml" TEXT NOT NULL;
