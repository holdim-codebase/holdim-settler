-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "userId" VARCHAR(255);

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UserDaoFollow" (
    "daoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDaoFollow_pkey" PRIMARY KEY ("daoId","userId")
);

-- CreateTable
CREATE TABLE "_DaoToUser" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DaoToUser_AB_unique" ON "_DaoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DaoToUser_B_index" ON "_DaoToUser"("B");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDaoFollow" ADD CONSTRAINT "UserDaoFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDaoFollow" ADD CONSTRAINT "UserDaoFollow_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "Dao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DaoToUser" ADD CONSTRAINT "_DaoToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DaoToUser" ADD CONSTRAINT "_DaoToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
