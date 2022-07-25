-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_daoId_fkey";

-- CreateTable
CREATE TABLE "Token" (
    "id" VARCHAR(255) NOT NULL,
    "name" TEXT,
    "daoId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "Dao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "Dao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
