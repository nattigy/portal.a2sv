/*
  Warnings:

  - Made the column `seasonId` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_seasonId_fkey";

-- DropIndex
DROP INDEX "Topic_seasonId_key";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "seasonId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
