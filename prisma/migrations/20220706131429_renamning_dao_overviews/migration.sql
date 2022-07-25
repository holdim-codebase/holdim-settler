DELETE FROM "Dao";
-- AlterTable
ALTER TABLE "Dao" DROP COLUMN "overviewHtml",
DROP COLUMN "tokenOverviewHtml",
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "tokenOverview" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "main" BOOLEAN NOT NULL DEFAULT false;
